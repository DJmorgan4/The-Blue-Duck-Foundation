import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { Resend } from "resend";

export const config = { api: { bodyParser: false } };

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2026-03-25.dahlia" as any });
const resend = new Resend(process.env.RESEND_API_KEY);

async function getRawBody(req: NextApiRequest): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on("data", (chunk: Buffer) => chunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

function getDonationTier(amount: number) {
  if (amount >= 1000) return { label: "Sentinel",    gift: "Ship: Sentinel package — hat, patch, jacket + personal note", color: "#1e3a8a" };
  if (amount >= 500)  return { label: "Steward",     gift: "Ship: Foundation hat + Flyway patch", color: "#065f46" };
  if (amount >= 100)  return { label: "Conservator", gift: "Ship: Foundation sticker/decal pack", color: "#92400e" };
  return               { label: "Supporter",   gift: "Digital: Add to supporter wall on website", color: "#475569" };
}

const BENEFITS: Record<string, string[]> = {
  playa:    ["Digital membership card", "Quarterly newsletter", "Member-only updates", "Supporter recognition", "Tax-deductible receipt"],
  marsh:    ["Everything in Playa", "Printed card & welcome packet", "Field event invitations", "10% merchandise discount", "Annual impact report"],
  flyway:   ["Everything in Marsh", "Named in annual report", "Exclusive patch & hat", "Conservation priority voting", "Forever 44 recognition", "Private donor briefings"],
  sentinel: ["Everything in Flyway", "Founding patron plaque", "Personal impact briefing", "Project signage recognition", "Sentinel jacket", "Annual Banquet seat"],
};

function wrap(body: string) {
  return `<!DOCTYPE html><html><head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:Georgia,serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border:1px solid #e2e8f0;">
<tr><td style="background:#0f172a;padding:28px 48px;">
  <div style="color:#94a3b8;font-size:9px;letter-spacing:0.2em;text-transform:uppercase;margin-bottom:4px;">501(c)(3) · EIN 41-4361489</div>
  <div style="color:#fff;font-size:20px;font-weight:300;">The Blue Duck Foundation</div>
</td></tr>
<tr><td style="padding:40px 48px;">${body}</td></tr>
<tr><td style="background:#f8fafc;border-top:1px solid #e2e8f0;padding:20px 48px;">
  <p style="margin:0;font-size:11px;color:#94a3b8;line-height:1.6;">The Blue Duck Foundation · 501(c)(3) · EIN 41-4361489 · IRC Section 170 · McKinney, Texas · <a href="https://theblueduck.org" style="color:#64748b">theblueduck.org</a></p>
</td></tr>
</table>
</td></tr>
</table></body></html>`;
}

const row = (l: string, v: string, last = false) =>
  `<tr style="border-bottom:${last ? "none" : "1px solid #f1f5f9"}">
    <td style="padding:9px 0;font-size:11px;color:#94a3b8;text-transform:uppercase;letter-spacing:0.08em;width:40%">${l}</td>
    <td style="padding:9px 0;font-size:13px;color:#334155">${v}</td>
  </tr>`;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const sig = req.headers["stripe-signature"];
  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) return res.status(400).json({ error: "Missing signature" });

  let event: Stripe.Event;
  try {
    const raw = await getRawBody(req);
    event = stripe.webhooks.constructEvent(raw, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    console.error("Webhook sig error:", err);
    return res.status(400).json({ error: "Invalid signature" });
  }

  console.log(`[webhook] ${event.type}`);

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const meta = session.metadata || {};
      const amount = (session.amount_total ?? 0) / 100;
      const email = session.customer_email || meta.email || "";
      const firstName = meta.firstName || "";
      const lastName = meta.lastName || "";
      const fullName = `${firstName} ${lastName}`.trim() || "Supporter";
      const date = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
      const ref = session.id.slice(-12).toUpperCase();
      const fmt = (n: number) => `$${n.toFixed(2)}`;

      if (meta.type === "membership") {
        const tierName = meta.tierName || "";
        const tierId = meta.tierId || "";
        const billing = meta.billing || "monthly";
        const cycle = billing === "annual" ? "year" : "month";
        const benefits = BENEFITS[tierId] || [];

        // Welcome email to member
        if (email) {
          await resend.emails.send({
            from: "The Blue Duck Foundation <info@theblueduck.org>",
            to: email,
            subject: `Welcome, ${tierName} Member — The Blue Duck Foundation`,
            html: wrap(`
              <div style="border-left:3px solid #3b82f6;padding-left:14px;margin-bottom:28px;">
                <div style="font-size:9px;letter-spacing:0.2em;text-transform:uppercase;color:#3b82f6;margin-bottom:4px;">Membership Confirmed</div>
                <div style="font-size:26px;font-weight:300;color:#0f172a;">Welcome, ${firstName || fullName}.</div>
              </div>
              <p style="font-size:15px;line-height:1.8;color:#475569;font-weight:300;margin:0 0 24px;">
                Your <strong style="color:#0f172a">${tierName}</strong> membership is active and fully tax-deductible under IRC Section 170.
                This email is your official receipt — retain it for your tax records.
              </p>
              <table style="width:100%;background:#f8fafc;border:1px solid #e2e8f0;margin:0 0 24px;"><tr><td style="padding:20px 24px;">
                <div style="font-size:9px;letter-spacing:0.15em;text-transform:uppercase;color:#94a3b8;margin-bottom:4px;">${tierName} · ${billing === "annual" ? "Annual" : "Monthly"}</div>
                <div style="font-size:34px;font-weight:300;color:#0f172a;">${fmt(amount)}<span style="font-size:14px;color:#94a3b8">/${cycle}</span></div>
              </td></tr></table>
              <table style="width:100%;border-collapse:collapse;margin:0 0 24px;">
                ${row("Organization", "The Blue Duck Foundation")}
                ${row("EIN", "41-4361489")}
                ${row("Tax Status", "501(c)(3) Public Charity")}
                ${row("Deductibility", "Full — IRC Section 170")}
                ${row("Tier", `${tierName} · ${billing === "annual" ? "Annual" : "Monthly"}`)}
                ${row("Date", date)}
                ${row("Reference", ref, true)}
              </table>
              ${benefits.length ? `<div style="margin:0 0 24px;">
                <div style="font-size:9px;letter-spacing:0.15em;text-transform:uppercase;color:#94a3b8;margin-bottom:10px;">Your ${tierName} benefits</div>
                ${benefits.map(b => `<div style="padding:7px 0;border-bottom:1px solid #f1f5f9;font-size:13px;color:#475569;"><span style="color:#10b981;margin-right:8px;">✓</span>${b}</div>`).join("")}
              </div>` : ""}
              <div style="background:#0f172a;padding:18px 22px;margin:24px 0 0;">
                <p style="margin:0;font-size:13px;color:#94a3b8;line-height:1.7;"><strong style="color:#e2e8f0;">Tax note:</strong> No goods or services of material value were exchanged for the deductible portion of your contribution. To manage or cancel, reply to this email.</p>
              </div>
            `),
          });
        }

        // Internal alert to DJ
        await resend.emails.send({
          from: "The Blue Duck Foundation <info@theblueduck.org>",
          to: "dj@theblueduckllc.com",
          subject: `[New Member] ${fullName} — ${tierName} (${billing})`,
          html: wrap(`
            <div style="border-bottom:2px solid #0f172a;padding-bottom:14px;margin-bottom:24px;">
              <div style="font-size:9px;letter-spacing:0.2em;text-transform:uppercase;color:#94a3b8;margin-bottom:4px;">New Membership</div>
              <div style="font-size:22px;font-weight:300;">${fmt(amount)} · ${fullName}</div>
            </div>
            <div style="background:#1e3a8a;color:#fff;padding:12px 18px;margin-bottom:20px;">
              <div style="font-size:9px;letter-spacing:0.2em;text-transform:uppercase;opacity:0.7;margin-bottom:2px;">Tier</div>
              <div style="font-size:16px;font-weight:300;">${tierName} · ${billing === "annual" ? "Annual" : "Monthly"}</div>
            </div>
            <table style="width:100%;border-collapse:collapse;">
              ${row("Name", fullName)}
              ${row("Email", `<a href="mailto:${email}" style="color:#0f172a">${email}</a>`)}
              ${row("Amount", `${fmt(amount)}/${cycle}`)}
              ${row("Date", date)}
              ${row("Session", ref, true)}
            </table>
          `),
        });

      } else {
        // DONATION
        const tier = getDonationTier(amount);

        if (email) {
          await resend.emails.send({
            from: "The Blue Duck Foundation <info@theblueduck.org>",
            to: email,
            subject: `Tax Receipt — ${fmt(amount)} Gift to The Blue Duck Foundation`,
            html: wrap(`
              <div style="border-left:3px solid #10b981;padding-left:14px;margin-bottom:28px;">
                <div style="font-size:9px;letter-spacing:0.2em;text-transform:uppercase;color:#10b981;margin-bottom:4px;">Official Tax Receipt</div>
                <div style="font-size:26px;font-weight:300;color:#0f172a;">Thank you, ${firstName || fullName}.</div>
              </div>
              <p style="font-size:15px;line-height:1.8;color:#475569;font-weight:300;margin:0 0 24px;">
                Your contribution funds conservation, science, cultural preservation, and humanitarian work worldwide.
                No goods or services were provided in exchange for this gift.
              </p>
              <table style="width:100%;background:#f8fafc;border:1px solid #e2e8f0;margin:0 0 24px;"><tr><td style="padding:20px 24px;">
                <div style="font-size:9px;letter-spacing:0.15em;text-transform:uppercase;color:#94a3b8;margin-bottom:4px;">Donation Amount</div>
                <div style="font-size:38px;font-weight:300;color:#0f172a;">${fmt(amount)}</div>
              </td></tr></table>
              <table style="width:100%;border-collapse:collapse;margin:0 0 24px;">
                ${row("Organization", "The Blue Duck Foundation")}
                ${row("Tax Status", "501(c)(3) Public Charity")}
                ${row("EIN", "41-4361489")}
                ${row("Deductibility", "Full — IRC Section 170")}
                ${row("Donor", fullName)}
                ${row("Date", date)}
                ${row("Reference", ref, true)}
              </table>
              ${meta.message ? `<div style="border-left:2px solid #e2e8f0;padding:10px 14px;margin:0 0 24px;"><div style="font-size:9px;letter-spacing:0.15em;text-transform:uppercase;color:#94a3b8;margin-bottom:4px">Your note</div><p style="font-size:13px;color:#475569;font-style:italic;margin:0">"${meta.message}"</p></div>` : ""}
              <div style="background:#0f172a;padding:18px 22px;margin:24px 0 0;">
                <p style="margin:0;font-size:13px;color:#94a3b8;line-height:1.7;"><strong style="color:#e2e8f0;">Important:</strong> Please retain this email as your official charitable contribution receipt. The Blue Duck Foundation provided no goods or services in exchange for this gift. This contribution is deductible under IRC Section 170.</p>
              </div>
            `),
          });
        }

        await resend.emails.send({
          from: "The Blue Duck Foundation <info@theblueduck.org>",
          to: "dj@theblueduckllc.com",
          subject: `[$${amount.toFixed(2)} donation] ${fullName} — ${tier.label}`,
          html: wrap(`
            <div style="border-bottom:2px solid #0f172a;padding-bottom:14px;margin-bottom:24px;">
              <div style="font-size:9px;letter-spacing:0.2em;text-transform:uppercase;color:#94a3b8;margin-bottom:4px;">New Donation</div>
              <div style="font-size:22px;font-weight:300;">${fmt(amount)} · ${fullName}</div>
            </div>
            <div style="background:${tier.color};color:#fff;padding:12px 18px;margin-bottom:16px;">
              <div style="font-size:9px;text-transform:uppercase;letter-spacing:0.2em;opacity:0.7;margin-bottom:2px;">Tier</div>
              <div style="font-size:16px;font-weight:300;">${tier.label}</div>
            </div>
            <div style="background:#fef3c7;border-left:3px solid #92400e;padding:14px 18px;margin-bottom:20px;">
              <div style="font-size:9px;letter-spacing:0.12em;text-transform:uppercase;color:#92400e;margin-bottom:4px;">Action needed</div>
              <div style="font-size:13px;color:#1e293b;">${tier.gift}</div>
            </div>
            <table style="width:100%;border-collapse:collapse;">
              ${row("Name", fullName)}
              ${row("Email", `<a href="mailto:${email}" style="color:#0f172a">${email}</a>`)}
              ${row("Amount", fmt(amount))}
              ${row("Date", date)}
              ${row("Session", session.id)}
              ${meta.message ? row("Message", `<em>${meta.message}</em>`, true) : row("Message", "—", true)}
            </table>
          `),
        });
      }
    }

    if (event.type === "invoice.payment_succeeded") {
      const invoice = event.data.object as Stripe.Invoice;
      if (invoice.billing_reason === "subscription_cycle") {
        const email = invoice.customer_email || "";
        const amount = invoice.amount_paid / 100;
        const date = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
        const subId = typeof invoice.subscription === "string" ? invoice.subscription : (invoice.subscription as any)?.id;
        const sub = subId ? await stripe.subscriptions.retrieve(subId) : null;
        const tierName = sub?.metadata?.tierName || "Member";
        const billing = sub?.metadata?.billing || "monthly";

        if (email) {
          await resend.emails.send({
            from: "The Blue Duck Foundation <info@theblueduck.org>",
            to: email,
            subject: `Membership Renewed — $${amount.toFixed(2)} · The Blue Duck Foundation`,
            html: wrap(`
              <div style="border-left:3px solid #10b981;padding-left:14px;margin-bottom:28px;">
                <div style="font-size:9px;letter-spacing:0.2em;text-transform:uppercase;color:#10b981;margin-bottom:4px;">Renewal Receipt</div>
                <div style="font-size:26px;font-weight:300;color:#0f172a;">Your membership renewed.</div>
              </div>
              <p style="font-size:15px;line-height:1.8;color:#475569;font-weight:300;margin:0 0 24px;">
                Your <strong style="color:#0f172a">${tierName}</strong> membership has been renewed. This is your official tax receipt.
              </p>
              <table style="width:100%;background:#f8fafc;border:1px solid #e2e8f0;margin:0 0 24px;"><tr><td style="padding:20px 24px;">
                <div style="font-size:9px;text-transform:uppercase;color:#94a3b8;margin-bottom:4px;">${tierName} · ${billing === "annual" ? "Annual" : "Monthly"} Renewal</div>
                <div style="font-size:34px;font-weight:300;color:#0f172a;">$${amount.toFixed(2)}</div>
                <div style="font-size:11px;color:#10b981;margin-top:4px;">Renewed: ${date}</div>
              </td></tr></table>
              <table style="width:100%;border-collapse:collapse;">
                ${row("Organization", "The Blue Duck Foundation")}
                ${row("EIN", "41-4361489")}
                ${row("Deductibility", "Full — IRC Section 170")}
                ${row("Date", date, true)}
              </table>
              ${invoice.hosted_invoice_url ? `<a href="${invoice.hosted_invoice_url}" style="display:inline-block;background:#0f172a;color:#fff;text-decoration:none;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;padding:12px 22px;margin-top:20px;">View full invoice →</a>` : ""}
            `),
          });
        }
      }
    }

    if (event.type === "customer.subscription.deleted") {
      const sub = event.data.object as Stripe.Subscription;
      console.log(`[webhook] Cancelled: ${sub.id} — ${sub.metadata?.tierName}`);
    }

  } catch (err) {
    console.error(`[webhook] Error on ${event.type}:`, err);
    return res.status(200).json({ received: true, error: String(err) });
  }

  return res.status(200).json({ received: true });
}
