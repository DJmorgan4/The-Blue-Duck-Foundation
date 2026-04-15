import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-03-25.dahlia",
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { tierId, tierName, amount, billing, firstName, lastName, email } = req.body;

  if (!amount || !tierId) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const amountInCents = Math.round(Number(amount) * 100);

  if (amountInCents < 100) {
    return res.status(400).json({ error: "Minimum membership is $1" });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: email || undefined,
      metadata: {
        type: "membership",
        tierId: tierId || "",
        tierName: tierName || "",
        billing: billing || "",
        firstName: firstName || "",
        lastName: lastName || "",
        amount: String(amount),
      },
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `${tierName} Membership — The Blue Duck Foundation`,
              description: `${billing === "annual" ? "Annual" : "Monthly"} membership · Tax-deductible · 501(c)(3) · EIN 41-4361489`,
            },
            unit_amount: amountInCents,
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/membership/success?session_id={CHECKOUT_SESSION_ID}&tier=${tierId}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/membership`,
      payment_intent_data: {
        description: `${tierName} Membership — The Blue Duck Foundation`.trim(),
      },
    });

    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Stripe membership error:", error);
    return res.status(500).json({ error: "Failed to create checkout session" });
  }
}
