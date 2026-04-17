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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { tierId, tierName, amount, billing, firstName, lastName, email } = req.body;
  if (!tierId || !tierName || !billing) return res.status(400).json({ error: "Missing required fields" });

  const priceId = PRICE_IDS[tierId]?.[billing as "monthly" | "annual"];

  if (!priceId) {
    // Fallback to one-time until Price IDs are configured
    const amountInCents = Math.round(Number(amount) * 100);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: email || undefined,
      metadata: { type: "membership", tierId, tierName, billing, firstName: firstName || "", lastName: lastName || "", amount: String(amount) },
      line_items: [{
        price_data: {
          currency: "usd",
          product_data: { name: `${tierName} Membership — The Blue Duck Foundation`, description: `${billing === "annual" ? "Annual" : "Monthly"} · Tax-deductible · 501(c)(3) · EIN 41-4361489` },
          unit_amount: amountInCents,
        },
        quantity: 1,
      }],
      success_url: `${BASE_URL}/membership/success?session_id={CHECKOUT_SESSION_ID}&tier=${tierId}`,
      cancel_url: `${BASE_URL}/membership`,
    });
    return res.status(200).json({ url: session.url });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      customer_email: email || undefined,
      metadata: { type: "membership", tierId, tierName, billing, firstName: firstName || "", lastName: lastName || "", amount: String(amount) },
      subscription_data: { metadata: { tierId, tierName, billing } },
      line_items: [{ price: priceId, quantity: 1 }],
      allow_promotion_codes: true,
      billing_address_collection: "auto",
      success_url: `${BASE_URL}/membership/success?session_id={CHECKOUT_SESSION_ID}&tier=${tierId}`,
      cancel_url: `${BASE_URL}/membership`,
    });
    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Stripe membership error:", error);
    return res.status(500).json({ error: "Failed to create checkout session" });
  }
}
