import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-03-25.dahlia",
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { amount, firstName, lastName, email, message } = req.body;

  if (!amount || !email) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const amountInCents = Math.round(Number(amount) * 100);

  if (amountInCents < 100) {
    return res.status(400).json({ error: "Minimum donation is $1" });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: email,
      metadata: {
        firstName: firstName || "",
        lastName: lastName || "",
        email,
        message: message || "",
        amount: String(amount),
      },
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Donation — The Blue Duck Foundation",
              description:
                "Tax-deductible charitable contribution · 501(c)(3) · EIN 41-4361489",
            },
            unit_amount: amountInCents,
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/donate/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/donate`,
      payment_intent_data: {
        description: `Donation to The Blue Duck Foundation from ${firstName || ""} ${lastName || ""}`.trim(),
      },
    });

    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Stripe error:", error);
    return res.status(500).json({ error: "Failed to create checkout session" });
  }
}
