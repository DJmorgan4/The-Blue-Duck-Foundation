import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { Resend } from "resend";

export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-03-25.dahlia",
});

const resend = new Resend(process.env.RESEND_API_KEY);

async function getRawBody(req: NextApiRequest): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on("data", (chunk: Buffer) => chunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

function getTier(amount: number): { label: string; gift: string; color: string } {
  if (amount >= 1000) return {
    label: "Sentinel",
    gift: "Sentinel package — hat, patch, jacket + personal note. Ship to donor.",
    color: "#1e3a8a",
  };
  if (amount >= 500) return {
    label: "Steward",
    gift: "Foundation hat + Flyway patch. Ship to donor.",
    color: "#065f46",
  };
  if (amount >= 100) return {
    label: "Conservator",
    gift: "Foundation sticker/decal pack. Ship to donor.",
    color: "#92400e",
  };
  return {
    label: "Supporter",
    gift: "Digital recognition — add to supporter wall.",
    color: "#475569",
  };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const sig = req.headers["stripe-signature"];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !webhookSecret) {
    return res.status(400).json({ error: "Missing signature or webhook secret" });
  }

  let event: Stripe.Event;

  try {
    const rawBody = await getRawBody(req);
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err) {
    console.error("Webhook signature error:", err);
    return res.status(400).json({ error: "Invalid signature" });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const amount = session.amount_total ? session.amount_total / 100 : 0;
    const email = session.customer_email || session.metadata?.email || "";
    const firstName = session.metadata?.firstName || "";
    const lastName = session.metadata?.lastName || "";
    const message = session.metadata?.message || "";
    const fullName = `${firstName} ${lastName}`.trim() || "Supporter";
    const tier = getTier(amount);
    const date = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    // ── Email to donor ────────────────────────────────────────────────────
    if (email) {
      await resend.emails.send({
        from: "The Blue Duck Foundation <info@theblueduck.org>",
        to: email,
        subject: `Thank you for your donation — The Blue Duck Foundation`,
        html: `
          <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #1e293b;">
            <div style="border-bottom: 2px solid #0f172a; padding-bottom: 16px; margin-bottom: 28px;">
              <p style="font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #94a3b8; margin: 0 0 4px;">The Blue Duck Foundation</p>
              <h1 style="font-size: 26px; font-weight: 300; margin: 0;">Thank you, ${firstName || fullName}.</h1>
            </div>

            <p style="font-size: 15px; line-height: 1.8; color: #334155; margin-bottom: 24px;">
              Your contribution helps fund conservation, environmental science, cultural preservation, and humanitarian work — wherever it's needed. We're grateful you're part of this.
            </p>

            <div style="background: #f8fafc; border-left: 3px solid #0f172a; padding: 20px 24px; margin-bottom: 28px;">
              <p style="font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; color: #94a3b8; margin: 0 0 14px;">Donation receipt</p>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.08em; width: 160px;">Organization</td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; font-size: 14px; color: #1e293b;">The Blue Duck Foundation</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.08em;">EIN</td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; font-size: 14px; color: #1e293b;">41-4361489</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.08em;">Date</td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; font-size: 14px; color: #1e293b;">${date}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.08em;">Donor</td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; font-size: 14px; color: #1e293b;">${fullName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-size: 12px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.08em;">Amount</td>
                  <td style="padding: 8px 0; font-size: 20px; font-weight: 300; color: #0f172a;">$${amount.toFixed(2)}</td>
                </tr>
              </table>
            </div>

            <p style="font-size: 13px; line-height: 1.7; color: #64748b; margin-bottom: 24px;">
              <strong style="color: #1e293b;">Tax deductibility notice:</strong> The Blue Duck Foundation is a 501(c)(3) tax-exempt public charity. Your contribution of <strong>$${amount.toFixed(2)}</strong> is tax-deductible to the extent permitted by law. No goods or services were provided in exchange for this donation. Please retain this receipt for your tax records.
            </p>

            ${message ? `
            <div style="border: 1px solid #e2e8f0; padding: 16px 20px; margin-bottom: 24px;">
              <p style="font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: #94a3b8; margin: 0 0 8px;">Your message</p>
              <p style="font-size: 14px; color: #334155; margin: 0; font-style: italic;">"${message}"</p>
            </div>` : ""}

            <p style="font-size: 14px; line-height: 1.8; color: #334155; margin-bottom: 32px;">
              If you have any questions about your donation, please reply to this email or contact us at <a href="mailto:info@theblueduck.org" style="color: #0f172a;">info@theblueduck.org</a>.
            </p>

            <div style="border-top: 1px solid #e2e8f0; padding-top: 20px;">
              <p style="font-size: 11px; color: #94a3b8; margin: 0;">The Blue Duck Foundation · McKinney, Texas · theblueduck.org</p>
              <p style="font-size: 11px; color: #94a3b8; margin: 4px 0 0;">501(c)(3) Public Charity · EIN 41-4361489 · IRC 170(b)(1)(A)(vi)</p>
            </div>
          </div>
        `,
      });
    }

    // ── Email to DJ ───────────────────────────────────────────────────────
    await resend.emails.send({
      from: "The Blue Duck Foundation <info@theblueduck.org>",
      to: "dj@theblueduckllc.com",
      subject: `[$${amount.toFixed(2)} donation] ${fullName} — ${tier.label}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #1e293b;">
          <div style="border-bottom: 2px solid #0f172a; padding-bottom: 16px; margin-bottom: 24px;">
            <p style="font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #94a3b8; margin: 0 0 4px;">Blue Duck Foundation — New Donation</p>
            <h1 style="font-size: 24px; font-weight: 300; margin: 0;">$${amount.toFixed(2)} from ${fullName}</h1>
          </div>

          <div style="background: ${tier.color}; color: #fff; padding: 12px 20px; margin-bottom: 24px;">
            <p style="font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; margin: 0 0 2px; opacity: 0.7;">Donor tier</p>
            <p style="font-size: 18px; font-weight: 300; margin: 0;">${tier.label}</p>
          </div>

          <div style="background: #fef3c7; border-left: 3px solid #92400e; padding: 16px 20px; margin-bottom: 24px;">
            <p style="font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: #92400e; margin: 0 0 6px;">Action required</p>
            <p style="font-size: 14px; color: #1e293b; margin: 0;">${tier.gift}</p>
          </div>

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: #94a3b8; width: 140px;">Name</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #1e293b;">${fullName}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: #94a3b8;">Email</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #1e293b;"><a href="mailto:${email}" style="color: #1e293b;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: #94a3b8;">Amount</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #1e293b;">$${amount.toFixed(2)}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: #94a3b8;">Date</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 14px; color: #1e293b;">${date}</td>
            </tr>
            ${message ? `
            <tr>
              <td style="padding: 10px 0; font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: #94a3b8;">Message</td>
              <td style="padding: 10px 0; font-size: 14px; color: #334155; font-style: italic;">"${message}"</td>
            </tr>` : ""}
          </table>

          <p style="font-size: 11px; color: #cbd5e1;">Stripe session: ${session.id}</p>
        </div>
      `,
    });
  }

  return res.status(200).json({ received: true });
}
