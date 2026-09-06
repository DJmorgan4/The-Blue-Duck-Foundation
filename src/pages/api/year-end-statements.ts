import type { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

/**
 * Annual giving statements.
 *
 * Monthly members receive payment confirmations during the year, not tax
 * receipts — each charge sits below the $250 acknowledgment threshold and the
 * $75 disclosure threshold. This endpoint sends the one document that does the
 * tax work: total contributed, total value of benefits received, and the
 * resulting deductible amount, netted once across the whole year.
 *
 * Timing matters. A donor needs substantiation by the earlier of the date they
 * file or their return's due date, so this should run in early January.
 *
 * Usage:
 *   GET  /api/year-end-statements?year=2026&secret=...            → dry run
 *   POST /api/year-end-statements  { year: 2026, secret, send: true }
 *
 * Dry run reports exactly what would be sent, and sends nothing.
 */

const resend = new Resend(process.env.RESEND_API_KEY);
// Dedicated Foundation project — NOT the shared NEXT_PUBLIC_SUPABASE_URL,
// which points at Lithic Earth. Donor records stay isolated from venture data.
const supabase = createClient(
  process.env.FOUNDATION_SUPABASE_URL!,
  process.env.FOUNDATION_SUPABASE_SERVICE_KEY!,
  { auth: { persistSession: false } }
);

const ORG = {
  name: "The Blue Duck Foundation",
  tagline: "People · Places · Wildlife · A Brighter Tomorrow",
  footerTagline: "Conservation today for a brighter tomorrow",
  ein: "41-4361489",
  cityStateZip: "Frisco, Texas",
  site: "theblueduck.org",
  email: "info@theblueduck.org",
  from: "The Blue Duck Foundation <info@theblueduck.org>",
  admin: "dj@theblueduckllc.com",
  tz: "America/Chicago",
  logo: "https://theblueduck.org/receipt-seal.png",
  duckMark: "https://theblueduck.org/receipt-duck.png",
};

const C = {
  ink: "#16243C", inkSoft: "#2C3E5A", slate: "#6E839B", slateLight: "#8FA3B8",
  rule: "#C3CFDB", ruleFaint: "#DEE6EE", panel: "#EDF1F5", paper: "#FFFFFF", page: "#F7F9FB",
};
const SERIF = "Georgia, 'Times New Roman', serif";

const esc = (s: any) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
const fmt = (n: number) => `$${n.toFixed(2)}`;
const dateStr = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: ORG.tz });

/* ------------------------------------------------------------------------- */

function letterhead() {
  return `
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
    <tr>
      <td width="172" valign="middle" style="padding:0 20px 0 0;">
        <img src="${ORG.logo}" width="170" alt="${ORG.name}" style="display:block;width:170px;max-width:170px;height:auto;border:0;">
      </td>
      <td valign="middle" align="center" style="border-left:1px solid ${C.rule};padding:6px 0 6px 26px;">
        <div style="font:400 25px/1.15 ${SERIF};letter-spacing:0.02em;color:${C.ink};">THE BLUE DUCK</div>
        <div style="font:400 25px/1.15 ${SERIF};letter-spacing:0.02em;color:${C.ink};margin-bottom:10px;">FOUNDATION</div>
        <div style="font:400 8px/1.5 ${SERIF};letter-spacing:0.1em;color:${C.slate};text-transform:uppercase;white-space:nowrap;margin-bottom:14px;">${ORG.tagline}</div>
        <div style="font:400 13px/1.6 ${SERIF};color:${C.inkSoft};">${ORG.cityStateZip}</div>
        <div style="font:400 13px/1.6 ${SERIF};color:${C.inkSoft};">www.${ORG.site}</div>
        <div style="font:400 13px/1.6 ${SERIF};color:${C.inkSoft};margin-bottom:10px;">${ORG.email}</div>
        <div style="font:400 13px/1.6 ${SERIF};color:${C.inkSoft};">EIN: ${ORG.ein}</div>
        <div style="font:400 13px/1.6 ${SERIF};color:${C.inkSoft};">501(c)(3) Public Charity</div>
      </td>
    </tr>
  </table>`;
}

function ruledTitle(text: string, sub?: string) {
  const line = `<div style="height:1px;background:${C.ink};font-size:0;line-height:0;">&nbsp;</div>`;
  return `
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin:34px 0 0;">
    <tr>
      <td width="12%" valign="middle">${line}</td>
      <td align="center" style="padding:0 18px;font:400 26px/1.1 ${SERIF};letter-spacing:0.07em;color:${C.ink};white-space:nowrap;">${text}</td>
      <td width="12%" valign="middle">${line}</td>
    </tr>
  </table>
  ${sub ? `<div style="text-align:center;font:400 11px/1.6 ${SERIF};letter-spacing:0.22em;color:${C.slate};text-transform:uppercase;margin-top:12px;">${sub}</div>` : ""}`;
}

function sectionHeading(text: string) {
  return `
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin:34px 0 18px;">
    <tr>
      <td valign="middle" style="font:400 13px/1.4 ${SERIF};letter-spacing:0.19em;color:${C.ink};text-transform:uppercase;white-space:nowrap;padding-right:16px;">${text}</td>
      <td valign="middle" width="100%"><div style="height:1px;background:${C.rule};font-size:0;line-height:0;">&nbsp;</div></td>
    </tr>
  </table>`;
}

const para = (html: string) =>
  `<p style="margin:0 0 14px;font:400 14px/1.75 ${SERIF};color:${C.inkSoft};">${html}</p>`;

function shell(inner: string) {
  return `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<!--[if mso]><style>body,table,td{font-family:Georgia,serif !important;}</style><![endif]-->
</head>
<body style="margin:0;padding:0;background:${C.page};-webkit-text-size-adjust:100%;">
<table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:${C.page};padding:32px 0;">
<tr><td align="center">
  <table width="600" cellpadding="0" cellspacing="0" role="presentation" style="width:600px;max-width:600px;background:${C.paper};border:1px solid ${C.ruleFaint};">
    <tr><td style="padding:44px 46px 40px;">${inner}</td></tr>
    <tr><td style="padding:0 46px 40px;">
      <div style="height:1px;background:${C.rule};font-size:0;line-height:0;margin-bottom:26px;">&nbsp;</div>
      <div style="text-align:center;font:400 10px/1.6 ${SERIF};letter-spacing:0.19em;color:${C.slate};text-transform:uppercase;margin-bottom:16px;">${ORG.footerTagline}</div>
      <div style="text-align:center;margin-bottom:14px;"><img src="${ORG.duckMark}" width="40" alt="" style="display:inline-block;width:40px;height:auto;border:0;"></div>
      <div style="text-align:center;font:400 11px/1.6 ${SERIF};letter-spacing:0.26em;color:${C.slateLight};text-transform:uppercase;">${ORG.site}</div>
    </td></tr>
  </table>
</td></tr>
</table></body></html>`;
}

/* ------------------------------------------------------------------------- */

type Row = {
  id: number; occurred_at: string; email: string; donor_name: string | null;
  kind: string; tier_name: string | null; billing: string | null;
  amount_cents: number; benefit_fmv_cents: number;
  benefit_items: { label: string; fmv: number }[] | null;
};

type Summary = {
  email: string; name: string; year: number;
  gifts: Row[]; total: number; benefitFmv: number; deductible: number;
  benefitLabels: { label: string; fmv: number }[];
  hasSingleGiftOver250: boolean;
};

function summarize(email: string, rows: Row[], year: number): Summary {
  const total = rows.reduce((s, r) => s + r.amount_cents, 0) / 100;
  const benefitFmv = rows.reduce((s, r) => s + r.benefit_fmv_cents, 0) / 100;
  const labels: { label: string; fmv: number }[] = [];
  for (const r of rows) for (const i of r.benefit_items || []) if (i.fmv > 0) labels.push(i);

  return {
    email,
    name: rows.find((r) => r.donor_name)?.donor_name || "Friend",
    year,
    gifts: rows.slice().sort((a, b) => a.occurred_at.localeCompare(b.occurred_at)),
    total,
    benefitFmv,
    deductible: Math.max(0, total - benefitFmv),
    benefitLabels: labels,
    hasSingleGiftOver250: rows.some((r) => r.amount_cents >= 25000),
  };
}

function statementEmail(s: Summary) {
  const giftRows = s.gifts.map((g) => `
    <tr>
      <td style="padding:7px 0;border-bottom:1px solid ${C.ruleFaint};font:400 13px/1.5 ${SERIF};color:${C.inkSoft};">${dateStr(g.occurred_at)}</td>
      <td style="padding:7px 0;border-bottom:1px solid ${C.ruleFaint};font:400 13px/1.5 ${SERIF};color:${C.slate};">${esc(
        g.kind === "donation" ? "Donation" : `${g.tier_name || "Membership"} · ${g.billing === "annual" ? "Annual" : "Monthly"}`
      )}</td>
      <td align="right" style="padding:7px 0;border-bottom:1px solid ${C.ruleFaint};font:400 13px/1.5 ${SERIF};color:${C.ink};">${fmt(g.amount_cents / 100)}</td>
    </tr>`).join("");

  const benefitBlock = s.benefitFmv > 0
    ? sectionHeading("Goods and Services Received") +
      para(`During ${s.year} you received the following member benefits. Their good-faith estimated value reduces the deductible portion of your contributions.`) +
      `<table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:${C.panel};margin:0 0 14px;">
        <tr><td style="padding:18px 22px;">
          <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
            ${s.benefitLabels.map((i) => `
              <tr><td style="padding:4px 0;font:400 13px/1.6 ${SERIF};color:${C.slate};">${esc(i.label)}</td>
                  <td align="right" style="padding:4px 0;font:400 13px/1.6 ${SERIF};color:${C.slate};">${fmt(i.fmv)}</td></tr>`).join("")}
          </table>
        </td></tr></table>`
    : "";

  const ledger = `
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:${C.panel};margin:0 0 20px;">
      <tr><td style="padding:20px 24px;">
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
          <tr>
            <td style="padding:8px 0 0;font:400 14px/1.6 ${SERIF};color:${C.inkSoft};">Total contributed in ${s.year}</td>
            <td align="right" style="padding:8px 0 0;font:400 14px/1.6 ${SERIF};color:${C.inkSoft};">${fmt(s.total)}</td>
          </tr>
          ${s.benefitFmv > 0 ? `
          <tr>
            <td style="font:400 14px/1.6 ${SERIF};color:${C.inkSoft};">Value of benefits received</td>
            <td align="right" style="font:400 14px/1.6 ${SERIF};color:${C.inkSoft};">&minus;${fmt(s.benefitFmv)}</td>
          </tr>` : ""}
          <tr><td colspan="2" style="padding:8px 0 0;"><div style="height:1px;background:${C.rule};font-size:0;line-height:0;">&nbsp;</div></td></tr>
          <tr>
            <td style="padding:10px 0 0;font:400 17px/1.5 ${SERIF};color:${C.ink};">Deductible amount</td>
            <td align="right" style="padding:10px 0 0;font:400 17px/1.5 ${SERIF};color:${C.ink};">${fmt(s.deductible)}</td>
          </tr>
        </table>
      </td></tr></table>`;

  const goodsSentence = s.benefitFmv > 0
    ? `In exchange for these contributions you received goods or services with a good-faith estimated value of ${fmt(s.benefitFmv)}. Only the amount contributed in excess of that value is deductible under IRC Section 170.`
    : `No goods or services were provided in exchange for these contributions.`;

  return shell(
    letterhead() +
    ruledTitle(`${s.year} GIVING STATEMENT`, "Annual summary for your tax records") +
    `<p style="margin:30px 0 14px;font:400 15px/1.75 ${SERIF};color:${C.inkSoft};">Dear ${esc(s.name)},</p>` +
    para(`Thank you for supporting ${ORG.name} in ${s.year}. This statement summarizes your contributions for the year and serves as your written acknowledgment for tax purposes.`) +
    sectionHeading("Contributions") +
    `<table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin:0 0 20px;">
      <tr>
        <td style="padding:0 0 8px;font:400 9px/1.6 ${SERIF};letter-spacing:0.13em;color:${C.slate};text-transform:uppercase;">Date</td>
        <td style="padding:0 0 8px;font:400 9px/1.6 ${SERIF};letter-spacing:0.13em;color:${C.slate};text-transform:uppercase;">Type</td>
        <td align="right" style="padding:0 0 8px;font:400 9px/1.6 ${SERIF};letter-spacing:0.13em;color:${C.slate};text-transform:uppercase;">Amount</td>
      </tr>
      ${giftRows}
    </table>` +
    benefitBlock +
    sectionHeading("Summary") +
    ledger +
    sectionHeading("Tax Information") +
    para(`${ORG.name} is a 501(c)(3) public charity. Contributions are tax-deductible to the fullest extent allowed by law under IRC Section 170.`) +
    para(goodsSentence) +
    para(`Our federal tax identification number (EIN) is ${ORG.ein}. Please retain this statement for your tax records.`) +
    para(`<span style="color:${C.slate};font-size:13px;">If anything here looks wrong, reply to this email and we'll correct it.</span>`)
  );
}

/* ------------------------------------------------------------------------- */

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const secret = (req.method === "POST" ? req.body?.secret : req.query.secret) as string | undefined;
  if (!process.env.STATEMENTS_SECRET || secret !== process.env.STATEMENTS_SECRET) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const year = Number(
    (req.method === "POST" ? req.body?.year : req.query.year) ?? new Date().getFullYear() - 1
  );
  if (!Number.isInteger(year) || year < 2026 || year > 2100) {
    return res.status(400).json({ error: "Invalid year" });
  }

  const send = req.method === "POST" && req.body?.send === true;

  try {
    const { data, error } = await supabase
      .from("contributions")
      .select("id, occurred_at, email, donor_name, kind, tier_name, billing, amount_cents, benefit_fmv_cents, benefit_items, statement_sent_at")
      .eq("tax_year", year)
      .order("occurred_at", { ascending: true });

    if (error) throw error;

    const byEmail = new Map<string, Row[]>();
    for (const r of (data || []) as any[]) {
      if (!r.email) continue;
      const key = String(r.email).toLowerCase();
      if (!byEmail.has(key)) byEmail.set(key, []);
      byEmail.get(key)!.push(r);
    }

    const summaries = [...byEmail.entries()].map(([email, rows]) => summarize(email, rows, year));
    summaries.sort((a, b) => b.total - a.total);

    if (!send) {
      return res.status(200).json({
        mode: "dry-run",
        year,
        donors: summaries.length,
        totalRaised: summaries.reduce((s, x) => s + x.total, 0),
        preview: summaries.map((s) => ({
          email: s.email, name: s.name, gifts: s.gifts.length,
          total: s.total, benefitFmv: s.benefitFmv, deductible: s.deductible,
          needsWrittenAcknowledgment: s.hasSingleGiftOver250 || s.total >= 250,
        })),
      });
    }

    const results: { email: string; ok: boolean; error?: string }[] = [];
    for (const s of summaries) {
      try {
        await resend.emails.send({
          from: ORG.from,
          to: s.email,
          subject: `Your ${year} Giving Statement — ${ORG.name}`,
          html: statementEmail(s),
        });
        await supabase
          .from("contributions")
          .update({ statement_sent_at: new Date().toISOString() })
          .in("id", s.gifts.map((g) => g.id));
        results.push({ email: s.email, ok: true });
      } catch (err) {
        console.error(`[statements] failed for ${s.email}:`, err);
        results.push({ email: s.email, ok: false, error: String(err) });
      }
      // Resend's default rate limit is modest; pace the sends.
      await new Promise((r) => setTimeout(r, 600));
    }

    const failed = results.filter((r) => !r.ok);
    await resend.emails.send({
      from: ORG.from,
      to: ORG.admin,
      subject: `[Statements] ${year} — ${results.length - failed.length} sent, ${failed.length} failed`,
      html: shell(
        ruledTitle(`${year} STATEMENTS`) +
        para(`Sent ${results.length - failed.length} of ${results.length}.`) +
        (failed.length ? para(`Failed: ${failed.map((f) => esc(f.email)).join(", ")}`) : "")
      ),
    });

    return res.status(200).json({ mode: "sent", year, results });
  } catch (err) {
    console.error("[statements] error:", err);
    return res.status(500).json({ error: String(err) });
  }
}
