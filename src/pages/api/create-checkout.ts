import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-03-25.dahlia" as any,
});

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://theblueduck.org";

// Stripe rejects metadata values over 500 characters, which would fail the
// whole session create rather than just dropping the note.
const MAX_MESSAGE = 450;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { amount, firstName, lastName, email, message } = req.body;
  if (!amount || !email) return res.status(400).json({ error: "Missing required fields" });

  const parsed = Number(amount);
  // NaN < 100 is false, so an unparseable amount used to slip past the old
  // guard and fail at the Stripe call instead.
  if (!Number.isFinite(parsed)) return res.status(400).json({ error: "Invalid amount" });

  const amountInCents = Math.round(parsed * 100);
  if (amountInCents < 100) return res.status(400).json({ error: "Minimum donation is $1" });
  if (amountInCents > 100_000_00) return res.status(400).json({ error: "Please contact us for gifts over $100,000" });

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: email,
      metadata: {
        firstName: firstName || "",
        lastName: lastName || "",
        email,
        message: String(message || "").slice(0, MAX_MESSAGE),
        amount: String(parsed),
      },
      line_items: [{
        price_data: {
          currency: "usd",
          product_data: {
            name: "Donation — The Blue Duck Foundation",
            description: "Tax-deductible · 501(c)(3) · EIN 41-4361489",
          },
          unit_amount: amountInCents,
        },
        quantity: 1,
      }],
      success_url: `${BASE_URL}/donate/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${BASE_URL}/donate`,
      // "required" so the acknowledgment can carry the donor's address.
      // "auto" only collects when a payment method or regulation forces it.
      billing_address_collection: "required",
      // NOTE: payment_intent_data.receipt_email was removed deliberately.
      // Setting it makes Stripe send its own payment receipt, which lacks the
      // EIN and the goods-or-services statement. The webhook now sends the
      // single authoritative acknowledgment instead.
    });
    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Stripe error:", error);
    return res.status(500).json({ error: "Failed to create checkout session" });
  }
}
