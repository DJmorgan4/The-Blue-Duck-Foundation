import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

export const config = { api: { bodyParser: false } };

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2026-03-25.dahlia" as any });
const resend = new Resend(process.env.RESEND_API_KEY);

// Service role key: the webhook writes the contributions ledger, which is
// RLS-protected against anon clients. Add SUPABASE_SERVICE_ROLE_KEY in Vercel.
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
  mailing: "", // no street address printed by choice; not required on an acknowledgment
  cityStateZip: "Frisco, Texas",
  site: "theblueduck.org",
  email: "info@theblueduck.org",
  from: "The Blue Duck Foundation <info@theblueduck.org>",
  admin: "dj@theblueduckllc.com",
  tz: "America/Chicago",
  // Absolute, publicly reachable PNGs. SVG does not render in Outlook.
  logo: "https://theblueduck.org/receipt-seal.png",
  duckMark: "https://theblueduck.org/receipt-duck.png",
};

const C = {
  ink: "#16243C",
  inkSoft: "#2C3E5A",
  slate: "#6E839B",
  slateLight: "#8FA3B8",
  rule: "#C3CFDB",
  ruleFaint: "#DEE6EE",
  panel: "#EDF1F5",
  paper: "#FFFFFF",
  page: "#F7F9FB",
};

/* ---------------------------------------------------------------------------
 * IRS thresholds — Rev. Proc. 90-12, inflation-adjusted annually.
 * VERIFY EACH JANUARY against the current-year revenue procedure.
 * ------------------------------------------------------------------------- */
const IRS = {
  disclosureThreshold: 75,
  tokenMinPayment: 66,
  tokenItemCostCap: 13.2,
  insubstantialPct: 0.02,
  insubstantialCap: 132,
};

/* ---------------------------------------------------------------------------
 * FAIR MARKET VALUE TABLE
 *
 * PROVISIONAL. No merchandise has been purchased yet, so these are market-rate
 * estimates, not invoice figures. Replace every pair with real numbers once
 * suppliers are chosen, and keep the invoices on file — a good-faith estimate
 * has to trace back to something.
 *
 * fmv  = retail price of a comparable item (reduces the donor's deduction)
 * cost = what the Foundation paid (tested against the token exception)
 * ------------------------------------------------------------------------- */
type Benefit = { label: string; fmv: number; cost: number; logoBearing: boolean };

const DONATION_BENEFITS: { min: number; label: string; items: Benefit[] }[] = [
  {
    min: 1000, label: "Sentinel", items: [
      { label: "Foundation jacket", fmv: 115, cost: 70, logoBearing: true },
      { label: "Foundation hat", fmv: 32, cost: 15, logoBearing: true },
      { label: "Patch", fmv: 10, cost: 3, logoBearing: true },
    ],
  },
  {
    min: 500, label: "Steward", items: [
      { label: "Foundation hat", fmv: 32, cost: 15, logoBearing: true },
      { label: "Flyway patch", fmv: 10, cost: 3, logoBearing: true },
    ],
  },
  {
    min: 100, label: "Conservator", items: [
      { label: "Sticker / decal pack", fmv: 12, cost: 3.5, logoBearing: true },
    ],
  },
  { min: 0, label: "Supporter", items: [] },
];

const MEMBERSHIP_BENEFITS: Record<string, Benefit[]> = {
  playa: [],
  marsh: [
    { label: "Printed card & welcome packet", fmv: 16, cost: 7, logoBearing: true },
  ],
  flyway: [
    { label: "Printed card & welcome packet", fmv: 16, cost: 7, logoBearing: true },
    { label: "Exclusive patch", fmv: 10, cost: 3, logoBearing: true },
    { label: "Foundation hat", fmv: 32, cost: 15, logoBearing: true },
  ],
  sentinel: [
    { label: "Printed card & welcome packet", fmv: 16, cost: 7, logoBearing: true },
    { label: "Exclusive patch", fmv: 10, cost: 3, logoBearing: true },
    { label: "Foundation hat", fmv: 32, cost: 15, logoBearing: true },
    { label: "Founding patron plaque", fmv: 85, cost: 48, logoBearing: true },
    { label: "Sentinel jacket", fmv: 115, cost: 70, logoBearing: true },
    { label: "Annual Banquet seat", fmv: 75, cost: 40, logoBearing: false },
  ],
};

const BENEFITS: Record<string, string[]> = {
  playa: ["Digital membership card", "Quarterly newsletter", "Member-only updates", "Supporter recognition", "Tax-deductible receipt"],
  marsh: ["Everything in Playa", "Printed card & welcome packet", "Field event invitations", "10% merchandise discount", "Annual impact report"],
  flyway: ["Everything in Marsh", "Named in annual report", "Exclusive patch & hat", "Conservation priority voting", "Forever 44 recognition", "Private donor briefings"],
  sentinel: ["Everything in Flyway", "Founding patron plaque", "Personal impact briefing", "Project signage recognition", "Sentinel jacket", "Annual Banquet seat"],
};

/* ------------------------------------------------------------------------- */

type Deduction = {
  payment: number; fmv: number; deductible: number;
  disclose: boolean; unpriced: boolean; items: Benefit[];
};

function computeDeduction(payment: number, items: Benefit[]): Deduction {
  const base = { payment, items };
  if (items.length === 0) return { ...base, fmv: 0, deductible: payment, disclose: false, unpriced: false };

  const fmv = items.reduce((s, i) => s + i.fmv, 0);
  const cost = items.reduce((s, i) => s + i.cost, 0);
  const unpriced = items.some((i) => i.fmv === 0);

  const tokenQualifies =
    payment >= IRS.tokenMinPayment && cost > 0 && cost <= IRS.tokenItemCostCap && items.every((i) => i.logoBearing);
  const insubstantial = fmv > 0 && fmv <= Math.min(payment * IRS.insubstantialPct, IRS.insubstantialCap);

  if (tokenQualifies || insubstantial) return { ...base, fmv, deductible: payment, disclose: false, unpriced };

  // $75 is the threshold above which disclosure is *required*. Below it the
  // "no goods or services" sentence would still be false, so disclose whenever
  // benefits carry real value: accurate below the line, compliant above it.
  return { ...base, fmv, deductible: Math.max(0, payment - fmv), disclose: fmv > 0, unpriced };
}

const esc = (s: any) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
const fmt = (n: number) => `$${n.toFixed(2)}`;

// Receipt dates must fall in the donor's tax year. Vercel runs UTC, so a
// Dec 31 evening gift in Central time would otherwise be dated Jan 1.
const receiptDate = (unixSeconds: number) =>
  new Date(unixSeconds * 1000).toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric", timeZone: ORG.tz,
  });

const receiptNumber = (unixSeconds: number, id: string) => {
  const year = new Date(unixSeconds * 1000).toLocaleDateString("en-US", { year: "numeric", timeZone: ORG.tz });
  // TODO: for a true sequential series (BD-2026-000123), keep a counter in
  // Supabase and increment it here. This derives a stable ID from the session.
  return `BD-${year}-${id.replace(/[^a-zA-Z0-9]/g, "").slice(-6).toUpperCase()}`;
};

/* ---------------------------------------------------------------------------
 * Layout. Tables only — flex and grid do not work in Outlook. Every style is
 * inline; <style> blocks are stripped by Gmail. Widths are fixed at 600px.
 * ------------------------------------------------------------------------- */

const SERIF = "Georgia, 'Times New Roman', serif";

function letterhead() {
  return `
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
    <tr>
      <td width="172" valign="middle" style="padding:0 20px 0 0;">
        <img src="${ORG.logo}" width="170" alt="${ORG.name}"
             style="display:block;width:170px;max-width:170px;height:auto;border:0;outline:none;text-decoration:none;">
      </td>
      <td valign="middle" align="center" style="border-left:1px solid ${C.rule};padding:6px 0 6px 26px;">
        <div style="font:400 25px/1.15 ${SERIF};letter-spacing:0.02em;color:${C.ink};">THE BLUE DUCK</div>
        <div style="font:400 25px/1.15 ${SERIF};letter-spacing:0.02em;color:${C.ink};margin-bottom:10px;">FOUNDATION</div>
        <div style="font:400 8px/1.5 ${SERIF};letter-spacing:0.1em;color:${C.slate};text-transform:uppercase;white-space:nowrap;margin-bottom:14px;">${ORG.tagline}</div>
        <div style="font:400 13px/1.6 ${SERIF};color:${C.inkSoft};">${ORG.mailing ? `${ORG.mailing} &nbsp;|&nbsp; ` : ""}${ORG.cityStateZip}</div>
        <div style="font:400 13px/1.6 ${SERIF};color:${C.inkSoft};">www.${ORG.site}</div>
        <div style="font:400 13px/1.6 ${SERIF};color:${C.inkSoft};margin-bottom:10px;">${ORG.email}</div>
        <div style="font:400 13px/1.6 ${SERIF};color:${C.inkSoft};">EIN: ${ORG.ein}</div>
        <div style="font:400 13px/1.6 ${SERIF};color:${C.inkSoft};">501(c)(3) Public Charity</div>
      </td>
    </tr>
  </table>`;
}

// Centered title flanked by rules, as in the letterhead.
function ruledTitle(text: string, sub?: string) {
  const line = `<div style="height:1px;background:${C.ink};font-size:0;line-height:0;">&nbsp;</div>`;
  return `
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin:34px 0 0;">
    <tr>
      <td width="15%" valign="middle">${line}</td>
      <td align="center" style="padding:0 18px;font:400 29px/1.1 ${SERIF};letter-spacing:0.07em;color:${C.ink};white-space:nowrap;">${text}</td>
      <td width="15%" valign="middle">${line}</td>
    </tr>
  </table>
  ${sub ? `<div style="text-align:center;font:400 11px/1.6 ${SERIF};letter-spacing:0.22em;color:${C.slate};text-transform:uppercase;margin-top:12px;">${sub}</div>` : ""}`;
}

const field = (label: string, value: string) => `
  <tr>
    <td width="112" valign="top" style="width:112px;padding:0 12px 13px 0;font:400 9px/1.6 ${SERIF};letter-spacing:0.09em;color:${C.slate};text-transform:uppercase;">${label}</td>
    <td valign="top" style="padding:0 0 13px;font:400 14px/1.5 ${SERIF};color:${C.ink};">${value}</td>
  </tr>`;

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
      <div style="text-align:center;margin-bottom:14px;">
        <img src="${ORG.duckMark}" width="40" alt="" style="display:inline-block;width:40px;height:auto;border:0;">
      </div>
      <div style="text-align:center;font:400 11px/1.6 ${SERIF};letter-spacing:0.26em;color:${C.slateLight};text-transform:uppercase;">${ORG.site}</div>
    </td></tr>
  </table>
</td></tr>
</table></body></html>`;
}

/**
 * The legally operative block: either the no-goods statement or the quid pro
 * quo disclosure with a good-faith estimate and the deductible arithmetic.
 */
function taxSection(d: Deduction) {
  const intro = para(
    `${ORG.name} is a 501(c)(3) public charity. Contributions are tax-deductible to the fullest extent allowed by law under IRC Section 170.`
  );
  const ein = para(`Our federal tax identification number (EIN) is ${ORG.ein}.`);

  if (!d.disclose) {
    const token = d.fmv > 0
      ? ` Any items sent with our thanks are of insubstantial value under IRS guidelines and do not reduce your deduction.`
      : "";
    return sectionHeading("Tax Information") + intro +
      para(`No goods or services were provided in exchange for this contribution.${token} Please retain this receipt for your tax records.`) +
      ein;
  }

  const lines = d.items.filter((i) => i.fmv > 0)
    .map((i) => `
      <tr><td style="padding:3px 0;font:400 13px/1.6 ${SERIF};color:${C.slate};">${esc(i.label)}</td>
          <td align="right" style="padding:3px 0;font:400 13px/1.6 ${SERIF};color:${C.slate};">${fmt(i.fmv)}</td></tr>`)
    .join("");

  return sectionHeading("Tax Information") + intro +
    para(`In exchange for this contribution you received goods or services with a good-faith estimated value of <strong style="color:${C.ink};">${fmt(d.fmv)}</strong>. Only the amount contributed in excess of that value is deductible.`) +
    `<table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:${C.panel};margin:0 0 14px;">
      <tr><td style="padding:18px 22px;">
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
          ${lines}
          <tr><td colspan="2" style="padding:8px 0 0;"><div style="height:1px;background:${C.rule};font-size:0;line-height:0;">&nbsp;</div></td></tr>
          <tr><td style="padding:10px 0 0;font:400 14px/1.6 ${SERIF};color:${C.inkSoft};">Contribution</td>
              <td align="right" style="padding:10px 0 0;font:400 14px/1.6 ${SERIF};color:${C.inkSoft};">${fmt(d.payment)}</td></tr>
          <tr><td style="font:400 14px/1.6 ${SERIF};color:${C.inkSoft};">Value received</td>
              <td align="right" style="font:400 14px/1.6 ${SERIF};color:${C.inkSoft};">&minus;${fmt(d.fmv)}</td></tr>
          <tr><td style="padding:6px 0 0;font:400 16px/1.6 ${SERIF};color:${C.ink};">Deductible amount</td>
              <td align="right" style="padding:6px 0 0;font:400 16px/1.6 ${SERIF};color:${C.ink};">${fmt(d.deductible)}</td></tr>
        </table>
      </td></tr></table>` +
    para(`Please retain this receipt for your tax records.`) + ein;
}

/**
 * The detail panel — donor and gift facts on the left, acknowledgment on the
 * right, matching the letterhead layout.
 */
function detailPanel(opts: {
  number: string; date: string; name: string; address: string;
  amount: number; method: string; type: string; d: Deduction;
}) {
  const ackRight = opts.d.disclose
    ? `Goods or services valued at ${fmt(opts.d.fmv)} were provided in exchange for this contribution. See tax information below.`
    : `No goods or services were provided in exchange for this contribution.`;

  return `
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:${C.panel};margin:30px 0 0;">
    <tr><td style="padding:28px 30px;">
      <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
        <tr>
          <td width="62%" valign="top" style="padding-right:22px;">
            <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
              ${field("Receipt Number", esc(opts.number))}
              ${field("Date of Donation", esc(opts.date))}
              ${field("Donor Name", esc(opts.name))}
              ${opts.address ? field("Donor Address", opts.address) : ""}
              ${field("Donation Amount", fmt(opts.amount))}
              ${field("Payment Method", esc(opts.method))}
            </table>
          </td>
          <td width="38%" valign="top" style="border-left:1px solid ${C.rule};padding-left:22px;">
            <div style="font:400 10px/1.5 ${SERIF};letter-spacing:0.13em;color:${C.slate};text-transform:uppercase;margin-bottom:6px;">Donation Type</div>
            <div style="font:400 15px/1.5 ${SERIF};color:${C.ink};margin-bottom:14px;">${esc(opts.type)}</div>
            <div style="font:400 13px/1.65 ${SERIF};color:${C.slate};margin-bottom:22px;">${ackRight}</div>
            <div style="font:400 22px/1.2 ${SERIF};font-style:italic;color:${C.ink};margin-bottom:10px;">Thank you.</div>
            <div style="font:400 13px/1.65 ${SERIF};color:${C.slate};">Your generosity helps us continue our mission and creates a lasting impact for future generations.</div>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>`;
}

function formatAddress(a: any) {
  if (!a || !a.line1) return "";
  const l2 = [a.city, a.state, a.postal_code].filter(Boolean).join(a.city ? ", " : " ")
    .replace(`${a.city}, ${a.state}, `, `${a.city}, ${a.state} `);
  return [esc(a.line1), esc(a.line2), esc(l2)].filter(Boolean).join("<br>");
}

async function paymentMethodLabel(session: any): Promise<string> {
  try {
    const piId = typeof session.payment_intent === "string" ? session.payment_intent : session.payment_intent?.id;
    if (!piId) return "Card";
    const pi: any = await stripe.paymentIntents.retrieve(piId, { expand: ["payment_method"] });
    const pm = pi.payment_method;
    if (pm?.card) {
      const brand = pm.card.brand ? pm.card.brand.charAt(0).toUpperCase() + pm.card.brand.slice(1) : "Card";
      return `${brand} (ending ${pm.card.last4})`;
    }
    return "Card";
  } catch {
    return "Card";
  }
}

/* ------------------------------------------------------------------------- */

/* ---------------------------------------------------------------------------
 * Confirmation email for monthly charges.
 *
 * A monthly membership charge is below both IRS thresholds — $250 for a
 * required written acknowledgment and $75 for quid pro quo disclosure — so it
 * does not need to carry tax language, and it should not. Netting a one-time
 * welcome package against a single month's dues produces a technically true
 * but badly misleading deductible figure. The January statement does the tax
 * work once, against the year's total.
 * ------------------------------------------------------------------------- */
function confirmationEmail(opts: {
  firstName: string; tierName: string; billing: string;
  amount: number; date: string; ref: string;
  benefits: string[]; benefitItems: Benefit[];
}) {
  const shipped = opts.benefitItems.filter((i) => i.fmv > 0);
  return shell(
    letterhead() +
    ruledTitle("PAYMENT CONFIRMATION", `${opts.tierName} Membership`) +
    `<table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:${C.panel};margin:30px 0 0;">
      <tr><td style="padding:28px 30px;">
        <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
          ${field("Amount", fmt(opts.amount))}
          ${field("Date", opts.date)}
          ${field("Membership", `${esc(opts.tierName)} · Monthly`)}
          ${field("Reference", esc(opts.ref))}
        </table>
      </td></tr></table>` +
    sectionHeading("Tax Information") +
    para(`${ORG.name} is a 501(c)(3) public charity, EIN ${ORG.ein}. This message confirms your payment; it is not your tax receipt.`) +
    para(`Each January we send a single statement summarizing everything you contributed during the prior year, together with the value of any member benefits you received and the resulting deductible amount. That statement is the document to keep for your records.`) +
    (shipped.length
      ? para(`Your membership includes items we send once, when you join: ${shipped.map((i) => esc(i.label)).join(", ")}. Their value is accounted for in the annual statement rather than against any single month.`)
      : "") +
    (opts.benefits.length
      ? sectionHeading(`Your ${opts.tierName} Benefits`) +
        `<table width="100%" cellpadding="0" cellspacing="0" role="presentation">
          ${opts.benefits.map((b) => `<tr><td style="padding:8px 0;border-bottom:1px solid ${C.ruleFaint};font:400 14px/1.6 ${SERIF};color:${C.inkSoft};">${esc(b)}</td></tr>`).join("")}
        </table>`
      : "") +
    para(`<span style="color:${C.slate};font-size:13px;">To manage or cancel your membership, reply to this email.</span>`)
  );
}

/* ------------------------------------------------------------------------- */

type LedgerRow = {
  stripe_event_id: string;
  stripe_session_id?: string | null;
  stripe_customer?: string | null;
  occurred_at: string;
  tax_year: number;
  email: string;
  donor_name?: string | null;
  kind: "donation" | "membership_initial" | "membership_renewal";
  tier_id?: string | null;
  tier_name?: string | null;
  billing?: string | null;
  amount_cents: number;
  benefit_fmv_cents: number;
  benefit_items: { label: string; fmv: number }[];
  receipt_number?: string | null;
  receipt_sent: boolean;
};

/**
 * Records the gift. Deliberately never throws.
 *
 * The donor's acknowledgment is the legally significant artifact; the ledger
 * feeds year-end statements. On the free tier this project pauses after about
 * a week of inactivity, and a paused database must not take down receipts. A
 * failure here is logged loudly and surfaced in the admin email so the row can
 * be backfilled from Stripe.
 */
async function recordContribution(row: LedgerRow): Promise<boolean> {
  try {
    const { error } = await supabase.from("contributions").insert(row);
    // Duplicate stripe_event_id means Stripe retried after we recorded it.
    if (error && error.code !== "23505") throw error;
    return true;
  } catch (err) {
    console.error(`[webhook] LEDGER WRITE FAILED for ${row.stripe_event_id} — backfill needed:`, err);
    return false;
  }
}

/** True when this event was already processed, so a retry can't double-send. */
async function alreadyProcessed(eventId: string): Promise<boolean> {
  const { data, error } = await supabase
    .from("contributions")
    .select("id")
    .eq("stripe_event_id", eventId)
    .maybeSingle();
  if (error) {
    // Fail open: a ledger outage should not block receipts.
    console.error("[webhook] idempotency check failed:", error);
    return false;
  }
  return !!data;
}

const taxYear = (unixSeconds: number) =>
  Number(new Date(unixSeconds * 1000).toLocaleDateString("en-US", { year: "numeric", timeZone: ORG.tz }));

/* ------------------------------------------------------------------------- */

async function getRawBody(req: NextApiRequest): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on("data", (chunk: Buffer) => chunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const sig = req.headers["stripe-signature"];
  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) return res.status(400).json({ error: "Missing signature" });

  let event: any;
  try {
    const raw = await getRawBody(req);
    event = stripe.webhooks.constructEvent(raw, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    console.error("Webhook sig error:", err);
    return res.status(400).json({ error: "Invalid signature" });
  }

  console.log(`[webhook] ${event.type} ${event.id}`);

  if (await alreadyProcessed(event.id)) {
    console.log(`[webhook] ${event.id} already handled — skipping`);
    return res.status(200).json({ received: true, duplicate: true });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session: any = event.data.object;
      const meta = session.metadata || {};
      const amount = (session.amount_total ?? 0) / 100;

      const email = session.customer_details?.email || session.customer_email || meta.email || "";
      const firstName = meta.firstName || "";
      const fullName = `${firstName} ${meta.lastName || ""}`.trim() || session.customer_details?.name || "Supporter";
      const date = receiptDate(session.created);
      const number = receiptNumber(session.created, session.id);
      const address = formatAddress(session.customer_details?.address);
      const method = await paymentMethodLabel(session);

      if (!email) console.error(`[webhook] No email on session ${session.id} — no receipt sent`);

      if (meta.type === "membership") {
        const tierName = meta.tierName || "";
        const tierId = meta.tierId || "";
        const billing = meta.billing || "monthly";
        const benefits = BENEFITS[tierId] || [];
        const items = MEMBERSHIP_BENEFITS[tierId] || [];
        const isAnnual = billing === "annual";

        // Benefits ship once, at signup. On an annual plan the disclosure sits
        // naturally against the year's payment. On a monthly plan it belongs in
        // the January statement, not against one month's dues.
        const d = computeDeduction(amount, isAnnual ? items : []);
        if (isAnnual && d.unpriced) console.warn(`[webhook] Unpriced benefit in tier ${tierId}`);

        if (email) {
          await resend.emails.send({
            from: ORG.from,
            to: email,
            subject: isAnnual
              ? `Membership Receipt — ${tierName} · ${ORG.name}`
              : `Payment Confirmation — ${tierName} Membership`,
            html: isAnnual
              ? shell(
                  letterhead() +
                  ruledTitle("MEMBERSHIP RECEIPT", "Welcome to the Foundation") +
                  detailPanel({
                    number, date, name: fullName, address, amount, method,
                    type: `${tierName} Membership · Annual`, d,
                  }) +
                  (benefits.length
                    ? sectionHeading(`Your ${tierName} Benefits`) +
                      `<table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                        ${benefits.map((b) => `<tr><td style="padding:8px 0;border-bottom:1px solid ${C.ruleFaint};font:400 14px/1.6 ${SERIF};color:${C.inkSoft};">${esc(b)}</td></tr>`).join("")}
                      </table>`
                    : "") +
                  taxSection(d) +
                  para(`<span style="color:${C.slate};font-size:13px;">To manage or cancel your membership, reply to this email.</span>`)
                )
              : confirmationEmail({
                  firstName, tierName, billing, amount, date, ref: number,
                  benefits, benefitItems: items,
                }),
          });
        }

        const logged = await recordContribution({
          stripe_event_id: event.id,
          stripe_session_id: session.id,
          stripe_customer: typeof session.customer === "string" ? session.customer : session.customer?.id,
          occurred_at: new Date(session.created * 1000).toISOString(),
          tax_year: taxYear(session.created),
          email,
          donor_name: fullName,
          kind: "membership_initial",
          tier_id: tierId,
          tier_name: tierName,
          billing,
          amount_cents: session.amount_total ?? 0,
          // Monthly members still received the package — the value is carried
          // to the annual statement rather than netted here.
          benefit_fmv_cents: Math.round(items.reduce((s, i) => s + i.fmv, 0) * 100),
          benefit_items: items.map((i) => ({ label: i.label, fmv: i.fmv })),
          receipt_number: number,
          receipt_sent: isAnnual,
        });

        await resend.emails.send({
          from: ORG.from, to: ORG.admin,
          subject: `${logged ? "" : "[LEDGER FAILED] "}[New Member] ${fullName} — ${tierName} (${billing})`,
          html: shell(
            ruledTitle("NEW MEMBERSHIP") +
            `<table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin-top:28px;">
              ${field("Name", esc(fullName))}
              ${field("Email", `<a href="mailto:${esc(email)}" style="color:${C.ink};">${esc(email)}</a>`)}
              ${field("Tier", `${esc(tierName)} · ${esc(billing)}`)}
              ${field("Amount", fmt(amount))}
              ${field("Sent", isAnnual ? "Tax receipt" : "Payment confirmation (statement in January)")}
              ${field("Benefit FMV", fmt(items.reduce((s, i) => s + i.fmv, 0)))}
              ${field("Date", date)}
              ${field("Receipt", number)}
            </table>`
          ),
        });

      } else {
        // One-time donations are complete transactions: the acknowledgment
        // goes out now, with disclosure where benefits shipped.
        const tier = DONATION_BENEFITS.find((t) => amount >= t.min) || DONATION_BENEFITS[DONATION_BENEFITS.length - 1];
        const shipping: Record<string, string> = {
          Sentinel: "Ship: Sentinel package — hat, patch, jacket + personal note",
          Steward: "Ship: Foundation hat + Flyway patch",
          Conservator: "Ship: Foundation sticker/decal pack",
          Supporter: "Digital: Add to supporter wall on website",
        };
        const d = computeDeduction(amount, tier.items);
        if (d.unpriced) console.warn(`[webhook] Unpriced benefit in tier ${tier.label}`);

        if (email) {
          await resend.emails.send({
            from: ORG.from, to: email,
            subject: `Donation Receipt — ${fmt(amount)} · ${ORG.name}`,
            html: shell(
              letterhead() +
              ruledTitle("DONATION RECEIPT", "Thank you for making a difference") +
              detailPanel({ number, date, name: fullName, address, amount, method, type: "General Support", d }) +
              (meta.message
                ? sectionHeading("Your Note") +
                  `<p style="margin:0;padding-left:16px;border-left:2px solid ${C.rule};font:400 14px/1.75 ${SERIF};font-style:italic;color:${C.inkSoft};">${esc(meta.message)}</p>`
                : "") +
              taxSection(d)
            ),
          });
        }

        const logged = await recordContribution({
          stripe_event_id: event.id,
          stripe_session_id: session.id,
          stripe_customer: typeof session.customer === "string" ? session.customer : session.customer?.id,
          occurred_at: new Date(session.created * 1000).toISOString(),
          tax_year: taxYear(session.created),
          email,
          donor_name: fullName,
          kind: "donation",
          tier_name: tier.label,
          amount_cents: session.amount_total ?? 0,
          benefit_fmv_cents: Math.round(d.fmv * 100),
          benefit_items: d.items.map((i) => ({ label: i.label, fmv: i.fmv })),
          receipt_number: number,
          receipt_sent: true,
        });

        await resend.emails.send({
          from: ORG.from, to: ORG.admin,
          subject: `${logged ? "" : "[LEDGER FAILED] "}[${fmt(amount)} donation] ${fullName} — ${tier.label}`,
          html: shell(
            ruledTitle("NEW DONATION") +
            `<table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:${C.panel};margin:28px 0 0;">
              <tr><td style="padding:18px 22px;font:400 14px/1.6 ${SERIF};color:${C.ink};">
                <strong>Action needed:</strong> ${shipping[tier.label]}
              </td></tr></table>
            <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin-top:24px;">
              ${field("Tier", tier.label)}
              ${field("Name", esc(fullName))}
              ${field("Email", `<a href="mailto:${esc(email)}" style="color:${C.ink};">${esc(email)}</a>`)}
              ${field("Address", address || "—")}
              ${field("Amount", fmt(amount))}
              ${field("Deductible", fmt(d.deductible))}
              ${field("Benefit FMV", fmt(d.fmv))}
              ${field("Date", date)}
              ${field("Receipt", number)}
              ${field("Message", meta.message ? `<em>${esc(meta.message)}</em>` : "—")}
            </table>`
          ),
        });
      }
    }

    if (event.type === "invoice.payment_succeeded") {
      const invoice: any = event.data.object;
      if (invoice.billing_reason === "subscription_cycle") {
        const email = invoice.customer_email || "";
        const amount = invoice.amount_paid / 100;
        const date = receiptDate(invoice.created);
        const number = receiptNumber(invoice.created, invoice.id);

        const subId =
          (typeof invoice.subscription === "string" ? invoice.subscription : invoice.subscription?.id) ||
          invoice.parent?.subscription_details?.subscription;
        const sub: any = subId ? await stripe.subscriptions.retrieve(subId) : null;
        const tierName = sub?.metadata?.tierName || "Member";
        const tierId = sub?.metadata?.tierId || "";
        const billing = sub?.metadata?.billing || "monthly";
        const isAnnual = billing === "annual";

        // Renewals ship no new goods, so the payment is fully deductible.
        const d = computeDeduction(amount, []);

        if (email) {
          await resend.emails.send({
            from: ORG.from, to: email,
            subject: isAnnual
              ? `Membership Renewed — ${fmt(amount)} · ${ORG.name}`
              : `Payment Confirmation — ${tierName} Membership`,
            html: isAnnual
              ? shell(
                  letterhead() +
                  ruledTitle("RENEWAL RECEIPT", `${tierName} Membership`) +
                  detailPanel({
                    number, date, name: invoice.customer_name || "Member", address: "",
                    amount, method: "Card on file",
                    type: `${tierName} Renewal · Annual`, d,
                  }) +
                  taxSection(d) +
                  (invoice.hosted_invoice_url
                    ? `<p style="margin:22px 0 0;"><a href="${invoice.hosted_invoice_url}" style="font:400 12px/1.5 ${SERIF};letter-spacing:0.16em;text-transform:uppercase;color:${C.ink};">View full invoice</a></p>`
                    : "")
                )
              : confirmationEmail({
                  firstName: invoice.customer_name || "",
                  tierName, billing, amount, date, ref: number,
                  benefits: BENEFITS[tierId] || [],
                  benefitItems: [], // nothing new ships on a renewal
                }),
          });
        }

        await recordContribution({
          stripe_event_id: event.id,
          stripe_customer: typeof invoice.customer === "string" ? invoice.customer : invoice.customer?.id,
          occurred_at: new Date(invoice.created * 1000).toISOString(),
          tax_year: taxYear(invoice.created),
          email,
          donor_name: invoice.customer_name || null,
          kind: "membership_renewal",
          tier_id: tierId,
          tier_name: tierName,
          billing,
          amount_cents: invoice.amount_paid,
          benefit_fmv_cents: 0,
          benefit_items: [],
          receipt_number: number,
          receipt_sent: isAnnual,
        });
      }
    }

    if (event.type === "customer.subscription.deleted") {
      const sub: any = event.data.object;
      console.log(`[webhook] Cancelled: ${sub.id} — ${sub.metadata?.tierName}`);
    }

  } catch (err) {
    // 500 so Stripe retries. The ledger's unique constraint keeps a retry from
    // producing a second receipt.
    console.error(`[webhook] Error on ${event.type} ${event.id}:`, err);
    return res.status(500).json({ received: false, error: String(err) });
  }

  return res.status(200).json({ received: true });
}
