import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-03-25.dahlia" as any,
});

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://theblueduck.org";

const PRICE_IDS: Record<string, { monthly: string; annual: string }> = {
  playa:    { monthly: process.env.STRIPE_PRICE_PLAYA_MONTHLY    || "", annual: process.env.STRIPE_PRICE_PLAYA_ANNUAL    || "" },
  marsh:    { monthly: process.env.STRIPE_PRICE_MARSH_MONTHLY    || "", annual: process.env.STRIPE_PRICE_MARSH_ANNUAL    || "" },
  flyway:   { monthly: process.env.STRIPE_PRICE_FLYWAY_MONTHLY   || "", annual: process.env.STRIPE_PRICE_FLYWAY_ANNUAL   || "" },
  sentinel: { monthly: process.env.STRIPE_PRICE_SENTINEL_MONTHLY || "", annual: process.env.STRIPE_PRICE_SENTINEL_ANNUAL || "" },
};

/**
 * Tiers that may only be purchased annually.
 *
 * Sentinel benefits (plaque, jacket, banquet seat) carry roughly $333 of
 * fair market value and ship once at signup. Against a $150 monthly charge
 * that leaves nothing deductible in month one, and the charge clears the $75
 * quid pro quo threshold, so disclosure is required and reads badly. Annual
 * billing nets the same benefits against $1,800 and deducts about $1,467.
 */
const ANNUAL_ONLY = new Set(["sentinel"]);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { tierId, tierName, amount, billing, firstName, lastName, email } = req.body;
  if (!tierId || !tierName || !billing) return res.status(400).json({ error: "Missing required fields" });

  if (!PRICE_IDS[tierId]) return res.status(400).json({ error: "Unknown membership tier" });
  if (billing !== "monthly" && billing !== "annual") return res.status(400).json({ error: "Invalid billing period" });

  if (ANNUAL_ONLY.has(tierId) && billing === "monthly") {
    return res.status(400).json({
      error: "This membership is available on an annual basis only.",
      annualOnly: true,
    });
  }

  const priceId = PRICE_IDS[tierId][billing as "monthly" | "annual"];

  // No silent fallback. The previous version dropped to a one-time payment
  // when a price ID was missing, which charged the member once, sent them a
  // welcome email, and created no subscription — they believed they were
  // enrolled when they were not. Failing loudly is the safer behavior.
  if (!priceId) {
    console.error(`[membership] Missing Stripe price ID for ${tierId}/${billing}`);
    return res.status(500).json({
      error: "This membership option is temporarily unavailable. Please try again shortly or contact us.",
    });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      customer_email: email || undefined,
      metadata: {
        type: "membership",
        tierId,
        tierName,
        billing,
        firstName: firstName || "",
        lastName: lastName || "",
        amount: String(amount ?? ""),
      },
      subscription_data: { metadata: { tierId, tierName, billing } },
      line_items: [{ price: priceId, quantity: 1 }],
      allow_promotion_codes: true,
      billing_address_collection: "required",
      success_url: `${BASE_URL}/membership/success?session_id={CHECKOUT_SESSION_ID}&tier=${tierId}`,
      cancel_url: `${BASE_URL}/membership`,
    });
    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Stripe membership error:", error);
    return res.status(500).json({ error: "Failed to create checkout session" });
  }
}
