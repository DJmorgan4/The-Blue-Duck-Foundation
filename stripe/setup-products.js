const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2026-03-25.dahlia" });

const TIERS = [
  { id: "playa",    name: "Playa — Supporter",         monthly: 1000,  annual: 10000  },
  { id: "marsh",    name: "Marsh — Member",             monthly: 2500,  annual: 25000  },
  { id: "flyway",   name: "Flyway — Conservationist",   monthly: 6000,  annual: 60000  },
  { id: "sentinel", name: "Sentinel — Founding Patron", monthly: 15000, annual: 150000 },
];

async function main() {
  console.log("\nCreating Stripe Products & Prices...\n");
  for (const tier of TIERS) {
    const product = await stripe.products.create({
      name: `${tier.name} Membership — The Blue Duck Foundation`,
      description: "Tax-deductible membership · 501(c)(3) · EIN 41-4361489",
      metadata: { tier_id: tier.id, ein: "41-4361489" },
    });
    const monthly = await stripe.prices.create({ product: product.id, currency: "usd", unit_amount: tier.monthly, recurring: { interval: "month" } });
    const annual  = await stripe.prices.create({ product: product.id, currency: "usd", unit_amount: tier.annual,  recurring: { interval: "year"  } });
    console.log(`STRIPE_PRICE_${tier.id.toUpperCase()}_MONTHLY=${monthly.id}`);
    console.log(`STRIPE_PRICE_${tier.id.toUpperCase()}_ANNUAL=${annual.id}`);
    console.log();
  }
  console.log("✅ Done. Paste these into .env.local and Vercel.");
}
main().catch(console.error);
