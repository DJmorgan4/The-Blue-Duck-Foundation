import Link from "next/link";
import { useState } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

type BillingCycle = "monthly" | "annual";

interface Tier {
  id: string;
  name: string;
  subtitle: string;
  monthlyPrice: number;
  annualPrice: number;
  featured: boolean;
  description: string;
  benefits: string[];
  cta: string;
}

const tiers: Tier[] = [
  {
    id: "playa",
    name: "Playa",
    subtitle: "Supporter",
    monthlyPrice: 10,
    annualPrice: 100,
    featured: false,
    description: "Begin your conservation journey. Every contribution, every voice, every drop counts.",
    benefits: [
      "Digital membership card",
      "Quarterly conservation newsletter",
      "Member-only updates & reports",
      "Recognition on our supporter wall",
      "Tax-deductible contribution receipt",
    ],
    cta: "Join as Playa",
  },
  {
    id: "marsh",
    name: "Marsh",
    subtitle: "Member",
    monthlyPrice: 25,
    annualPrice: 250,
    featured: false,
    description: "Wade deeper. The marsh is where life flourishes — and where real work takes root.",
    benefits: [
      "Everything in Playa",
      "Printed membership card & welcome packet",
      "Invitations to conservation field events",
      "Behind-the-scenes program updates",
      "Member community access",
      "10% discount on Foundation merchandise",
      "Annual impact report (printed)",
    ],
    cta: "Join as Marsh",
  },
  {
    id: "flyway",
    name: "Flyway",
    subtitle: "Conservationist",
    monthlyPrice: 60,
    annualPrice: 600,
    featured: true,
    description: "Flyway members are the backbone of everything we build — here and globally.",
    benefits: [
      "Everything in Marsh",
      "Named recognition in annual conservation report",
      "Priority access to Foundation events",
      "Exclusive Flyway member patch & hat",
      "Direct line to Foundation leadership",
      "Voting rights on conservation priorities",
      "Forever 44 Scholarship supporter recognition",
      "Invitations to private donor briefings",
    ],
    cta: "Join as Flyway",
  },
  {
    id: "sentinel",
    name: "Sentinel",
    subtitle: "Founding Patron",
    monthlyPrice: 150,
    annualPrice: 1500,
    featured: false,
    description: "The sentinels stand watch over what matters most. You are foundational to everything we become.",
    benefits: [
      "Everything in Flyway",
      "Founding Patron plaque at Foundation headquarters",
      "Personalized conservation impact briefing (annual)",
      "Name on all major conservation project signage",
      "Exclusive Sentinel member jacket",
      "One complimentary seat at annual Banquet",
      "Input on Foundation strategic direction",
      "Direct scholarship fund contribution credited",
      "Legacy giving program access",
    ],
    cta: "Become a Sentinel",
  },
];

const faqs = [
  {
    q: "Is my membership tax-deductible?",
    a: "Yes. The Blue Duck Foundation is a registered 501(c)(3) nonprofit (EIN 41-4361489). All membership contributions are tax-deductible to the extent permitted by law. You will receive an official receipt for your records.",
  },
  {
    q: "Can I cancel or change my membership tier?",
    a: "Absolutely. You can upgrade, downgrade, or cancel your membership at any time. Annual memberships are non-refundable but can be upgraded. We believe in making conservation accessible — not locked in.",
  },
  {
    q: "How are membership funds used?",
    a: "Membership fees directly fund our conservation programs, environmental monitoring technology, archaeological and cultural preservation work, the Forever 44 Scholarship Fund, humanitarian environmental support, and community engagement events.",
  },
  {
    q: "What is the Forever 44 Scholarship Fund?",
    a: "The Forever 44 Scholarship Fund is established in memory of Kaleb Cory and supports graduating seniors who demonstrate resilience, heart, and determination. Flyway and above members are recognized as scholarship supporters.",
  },
  {
    q: "Do you offer corporate or organizational memberships?",
    a: "Yes. We offer custom partnership packages for businesses, conservation organizations, academic institutions, and community groups — domestically and internationally. Contact us directly to explore a partnership built around your goals.",
  },
  {
    q: "Can international supporters become members?",
    a: "Yes. The Blue Duck Foundation welcomes members and supporters from anywhere in the world. Our mission is global, and so is our community. Membership benefits are delivered digitally where applicable.",
  },
];

// ─── TIER CARD ─────────────────────────────────────────────────────────────
function TierCard({ tier, billing }: { tier: Tier; billing: BillingCycle }) {
  const price = billing === "annual" ? tier.annualPrice : tier.monthlyPrice;
  const savings = tier.monthlyPrice * 12 - tier.annualPrice;

  return (
    <div className={`flex flex-col justify-between p-8 border ${
      tier.featured
        ? "border-slate-900 bg-slate-900"
        : "border-slate-100 bg-white"
    }`}>
      <div>
        <div className="flex items-baseline justify-between mb-6">
          <div>
            {tier.featured && (
              <div className="text-[10px] tracking-[0.2em] uppercase text-emerald-400 font-medium mb-2">
                Most popular
              </div>
            )}
            <div className={`font-['Cormorant_Garamond'] text-3xl font-light mb-0.5 ${tier.featured ? "text-white" : "text-slate-900"}`}>
              {tier.name}
            </div>
            <div className={`text-[10px] tracking-[0.15em] uppercase font-medium ${tier.featured ? "text-slate-500" : "text-slate-300"}`}>
              {tier.subtitle}
            </div>
          </div>
          <div className="text-right">
            <div className={`font-['Cormorant_Garamond'] text-4xl font-light ${tier.featured ? "text-white" : "text-slate-900"}`}>
              ${price}
            </div>
            <div className={`text-[10px] tracking-[0.08em] uppercase ${tier.featured ? "text-slate-500" : "text-slate-400"}`}>
              {billing === "annual" ? "per year" : "per month"}
            </div>
            {billing === "annual" && savings > 0 && (
              <div className="text-[10px] text-emerald-500 font-medium mt-0.5">Save ${savings}</div>
            )}
          </div>
        </div>

        <p className={`text-sm leading-relaxed font-light italic mb-6 ${tier.featured ? "text-slate-400" : "text-slate-500"}`}>
          {tier.description}
        </p>

        <div className={`h-px mb-6 ${tier.featured ? "bg-slate-800" : "bg-slate-100"}`} />

        <ul className="space-y-2.5 mb-8">
          {tier.benefits.map((benefit, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className={`mt-2 w-1 h-1 rounded-full flex-shrink-0 ${tier.featured ? "bg-slate-500" : "bg-slate-300"}`} />
              <span className={`text-sm font-light leading-relaxed ${tier.featured ? "text-slate-300" : "text-slate-600"}`}>
                {benefit}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <Link
        href="/contact"
        className={`text-[11px] font-medium tracking-[0.14em] uppercase px-6 py-3.5 text-center inline-block transition-colors ${
          tier.featured
            ? "bg-white text-slate-900 hover:bg-slate-100"
            : "border border-slate-200 text-slate-700 hover:border-slate-400"
        }`}
      >
        {tier.cta}
      </Link>
    </div>
  );
}

// ─── FAQ ───────────────────────────────────────────────────────────────────
function FAQ({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-slate-100">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left gap-8"
      >
        <span className="text-sm font-medium text-slate-900">{q}</span>
        <span className={`flex-shrink-0 text-slate-300 transition-transform duration-200 ${open ? "rotate-45" : ""}`}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
          </svg>
        </span>
      </button>
      {open && (
        <div className="pb-5 text-sm text-slate-500 font-light leading-relaxed -mt-1">{a}</div>
      )}
    </div>
  );
}

// ─── PAGE ──────────────────────────────────────────────────────────────────
export default function MembershipPage() {
  const [billing, setBilling] = useState<BillingCycle>("annual");

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow bg-white font-['Jost',sans-serif]">

        {/* ── HERO ──────────────────────────────────────────────────────── */}
        <section className="border-b border-slate-100">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-[55fr_45fr] min-h-[400px]">

              <div className="py-20 lg:py-28 lg:pr-16 lg:border-r border-slate-100 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-10">
                    <div className="w-6 h-px bg-slate-300" />
                    <span className="text-[10px] tracking-[0.2em] uppercase text-slate-400 font-medium">
                      501(c)(3) · EIN 41-4361489 · Tax-deductible
                    </span>
                  </div>
                  <h1 className="font-['Cormorant_Garamond'] text-6xl lg:text-7xl font-light leading-[1.04] tracking-tight text-slate-900 mb-8">
                    Become<br />
                    a <em className="italic">member.</em>
                  </h1>
                  <p className="text-[15px] leading-[1.9] text-slate-500 font-light max-w-md">
                    Conservation is not a spectator sport. Every member of The Blue Duck Foundation is a stakeholder in the natural world, the communities that depend on it, and the legacies we're building together.
                  </p>
                </div>
              </div>

              <div className="hidden lg:flex flex-col justify-center py-28 pl-16">
                <div className="space-y-0">
                  {tiers.map((tier, i) => (
                    <div key={i} className="flex items-baseline justify-between py-4 border-b border-slate-100 first:border-t">
                      <div>
                        <span className="font-['Cormorant_Garamond'] text-[20px] font-light text-slate-800 mr-3">
                          {tier.name}
                        </span>
                        <span className="text-[10px] tracking-[0.1em] uppercase text-slate-300 font-medium">
                          {tier.subtitle}
                        </span>
                      </div>
                      <span className="text-sm text-slate-500 font-light">
                        ${tier.annualPrice}/yr
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 text-[11px] tracking-[0.08em] text-slate-400 font-light">
                  All memberships fully tax-deductible · Cancel anytime
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── TIER CARDS ────────────────────────────────────────────────── */}
        <section className="border-b border-slate-100">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-24">

            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-5 h-px bg-slate-300" />
                  <span className="text-[10px] tracking-[0.2em] uppercase text-slate-400 font-medium">
                    Membership tiers
                  </span>
                </div>
                <h2 className="font-['Cormorant_Garamond'] text-4xl font-light text-slate-900">
                  Choose your level
                </h2>
              </div>
              <div className="flex items-center border border-slate-200 bg-slate-50 p-1 self-start sm:self-auto">
                <button
                  onClick={() => setBilling("monthly")}
                  className={`px-5 py-2 text-[11px] tracking-[0.1em] uppercase font-medium transition-all ${
                    billing === "monthly"
                      ? "bg-white text-slate-900"
                      : "text-slate-400 hover:text-slate-700"
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBilling("annual")}
                  className={`px-5 py-2 text-[11px] tracking-[0.1em] uppercase font-medium transition-all ${
                    billing === "annual"
                      ? "bg-white text-slate-900"
                      : "text-slate-400 hover:text-slate-700"
                  }`}
                >
                  Annual · Save 17%
                </button>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-100">
              {tiers.map((tier) => (
                <TierCard key={tier.id} tier={tier} billing={billing} />
              ))}
            </div>

            <div className="mt-px bg-white border border-slate-100 p-8 lg:p-10">
              <div className="grid lg:grid-cols-2 gap-8 lg:items-center">
                <div>
                  <h3 className="font-['Cormorant_Garamond'] text-2xl font-light text-slate-900 mb-2">
                    Corporate & organizational partnerships
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-500 font-light">
                    Conservation organizations, academic institutions, energy companies, businesses, and community groups — we offer custom partnership packages built around your goals, values, and global reach.
                  </p>
                </div>
                <div className="lg:flex lg:justify-end">
                  <Link
                    href="/contact"
                    className="text-[11px] font-medium tracking-[0.14em] uppercase bg-slate-900 text-white px-7 py-3.5 hover:bg-slate-700 transition-colors inline-flex"
                  >
                    Inquire about partnerships
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── COMPARISON TABLE ──────────────────────────────────────────── */}
        <section className="border-b border-slate-100 bg-slate-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-5 h-px bg-slate-300" />
              <span className="text-[10px] tracking-[0.2em] uppercase text-slate-400 font-medium">
                Compare
              </span>
            </div>
            <h2 className="font-['Cormorant_Garamond'] text-4xl font-light text-slate-900 mb-12">
              Everything side by side
            </h2>
            <div className="overflow-x-auto border border-slate-100 bg-white">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="text-left py-4 px-6 text-[10px] tracking-[0.15em] uppercase font-medium text-slate-400 w-1/3">
                      Feature
                    </th>
                    {tiers.map((tier) => (
                      <th key={tier.id} className="py-4 px-4 text-center">
                        <div className="font-['Cormorant_Garamond'] text-lg font-light text-slate-900">{tier.name}</div>
                        <div className="text-[10px] tracking-[0.08em] uppercase text-slate-400 mt-0.5">${tier.annualPrice}/yr</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Digital membership card", true, true, true, true],
                    ["Conservation newsletter", true, true, true, true],
                    ["Member-only updates", true, true, true, true],
                    ["Printed membership card", false, true, true, true],
                    ["Field event invitations", false, true, true, true],
                    ["Merchandise discount", false, "10%", "15%", "20%"],
                    ["Annual impact report (printed)", false, true, true, true],
                    ["Exclusive patch & hat", false, false, true, true],
                    ["Conservation priority voting", false, false, true, true],
                    ["Scholarship supporter recognition", false, false, true, true],
                    ["Private donor briefings", false, false, true, true],
                    ["Founding patron plaque", false, false, false, true],
                    ["Personal impact briefing", false, false, false, true],
                    ["Project signage recognition", false, false, false, true],
                    ["Sentinel member jacket", false, false, false, true],
                    ["Annual Banquet seat", false, false, false, true],
                  ].map(([feature, ...values], i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-slate-50/50" : ""}>
                      <td className="py-3 px-6 text-sm text-slate-500 font-light">{feature as string}</td>
                      {values.map((val, j) => (
                        <td key={j} className="py-3 px-4 text-center">
                          {val === true ? (
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-slate-900" />
                          ) : val === false ? (
                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-slate-100" />
                          ) : (
                            <span className="text-[11px] font-medium text-slate-700">{val as string}</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── WHY MEMBER ────────────────────────────────────────────────── */}
        <section className="border-b border-slate-100">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-24">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-5 h-px bg-slate-300" />
                  <span className="text-[10px] tracking-[0.2em] uppercase text-slate-400 font-medium">
                    Why it matters
                  </span>
                </div>
                <h2 className="font-['Cormorant_Garamond'] text-4xl font-light text-slate-900 mb-8 leading-tight">
                  Your membership is<br /><em className="italic">land, water, and legacy.</em>
                </h2>
                <div className="space-y-5 text-[15px] leading-[1.9] text-slate-500 font-light">
                  <p>
                    Ecosystems are disappearing. Archaeological sites are being lost. Communities in resource-dependent regions lack access to basic environmental safety and clean water.
                  </p>
                  <p>
                    The Blue Duck Foundation exists to change that — creating transparent, accountable pathways for support that make a measurable difference.
                  </p>
                  <p className="font-medium text-slate-700">
                    Your membership isn't a donation. It's a stake in something real, something that outlasts all of us.
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-0">
                {[
                  { title: "Global Conservation", desc: "Funding ecosystem protection, habitat restoration, and biodiversity programs worldwide." },
                  { title: "Environmental Intelligence", desc: "Deploying IoT sensor networks and open data platforms for real-time conservation accountability." },
                  { title: "Heritage Preservation", desc: "Protecting archaeological sites, indigenous histories, and culturally significant landscapes." },
                  { title: "Forever 44 Scholarship", desc: "Supporting students in memory of Kaleb Cory — because legacy is something we continue." },
                  { title: "Clean Water & Humanitarian Aid", desc: "Freshwater access initiatives and direct assistance for underserved communities globally." },
                  { title: "Open Pathways", desc: "Transparent, compliant channels for forward-thinking research and conservation support." },
                ].map((item, i) => (
                  <div key={i} className="border-t border-slate-100 py-5 last:border-b grid grid-cols-[1fr_2fr] gap-8">
                    <div className="font-['Cormorant_Garamond'] text-lg font-light text-slate-900">
                      {item.title}
                    </div>
                    <p className="text-sm text-slate-500 font-light leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── FAQ ───────────────────────────────────────────────────────── */}
        <section className="border-b border-slate-100 bg-slate-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-24">
            <div className="grid lg:grid-cols-[1fr_2fr] gap-16 lg:gap-24">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-5 h-px bg-slate-300" />
                  <span className="text-[10px] tracking-[0.2em] uppercase text-slate-400 font-medium">
                    FAQ
                  </span>
                </div>
                <h2 className="font-['Cormorant_Garamond'] text-4xl font-light text-slate-900 leading-tight">
                  Questions<br />answered.
                </h2>
              </div>
              <div>
                {faqs.map((faq, i) => <FAQ key={i} q={faq.q} a={faq.a} />)}
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────────────────── */}
        <section>
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-24">
            <div className="bg-slate-900 px-10 py-14 lg:px-16 lg:py-16">
              <div className="grid lg:grid-cols-2 gap-10 lg:items-center">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-5 h-px bg-slate-600" />
                    <span className="text-[10px] tracking-[0.2em] uppercase text-slate-500 font-medium">
                      Join today
                    </span>
                  </div>
                  <h3 className="font-['Cormorant_Garamond'] text-4xl font-light text-white mb-4 leading-tight">
                    The world doesn't wait.<br /><em className="italic">Neither should you.</em>
                  </h3>
                  <p className="text-[15px] leading-relaxed text-slate-400 font-light mb-4">
                    Join The Blue Duck Foundation and become part of a conservation story being written across communities, ecosystems, and borders — right now.
                  </p>
                  <div className="text-[11px] tracking-[0.08em] text-slate-600 font-medium">
                    501(c)(3) · EIN 41-4361489 · All memberships tax-deductible
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 lg:justify-end">
                  <Link
                    href="/contact"
                    className="text-[11px] font-medium tracking-[0.14em] uppercase bg-white text-slate-900 px-8 py-4 hover:bg-slate-100 transition-colors text-center"
                  >
                    Join as Flyway member
                  </Link>
                  <Link
                    href="/about"
                    className="text-[11px] font-medium tracking-[0.14em] uppercase border border-slate-700 text-white px-8 py-4 hover:border-slate-500 transition-colors text-center"
                  >
                    Learn more
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
