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
  badge?: string;
  icon: string;
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
    icon: "◎",
    description: "Begin your conservation journey. Every contribution, every voice, every drop counts.",
    benefits: [
      "Blue Duck Foundation digital membership card",
      "Quarterly conservation newsletter",
      "Access to member-only updates & reports",
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
    icon: "◈",
    description: "Wade deeper. The marsh is where life flourishes — and where real work takes root.",
    benefits: [
      "Everything in Playa",
      "Printed membership card & welcome packet",
      "Invitations to conservation field events",
      "Behind-the-scenes program and project updates",
      "Member forum & community access",
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
    badge: "Most Popular",
    icon: "◆",
    description: "Soar with us. Flyway members are the backbone of everything we build — here and globally.",
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
    badge: "Founding Patron",
    icon: "❖",
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

function TierCard({ tier, billing }: { tier: Tier; billing: BillingCycle }) {
  const price = billing === "annual" ? tier.annualPrice : tier.monthlyPrice;
  const savings = tier.monthlyPrice * 12 - tier.annualPrice;

  return (
    <div
      className={`group relative flex flex-col rounded-2xl border transition-all hover:shadow-lg ${
        tier.featured
          ? "border-slate-900 bg-slate-900 text-white"
          : "border-slate-200/80 bg-white hover:border-slate-300"
      }`}
    >
      {tier.badge && (
        <div
          className={`absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-xs font-semibold ${
            tier.featured ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-700"
          }`}
        >
          {tier.badge}
        </div>
      )}

      <div className="p-8 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className={`text-2xl mb-1 ${tier.featured ? "text-white" : "text-slate-400"}`}>{tier.icon}</div>
            <h3 className={`text-xl font-semibold ${tier.featured ? "text-white" : "text-slate-900"}`}>{tier.name}</h3>
            <p className={`text-xs font-medium tracking-widest uppercase mt-0.5 ${tier.featured ? "text-slate-400" : "text-slate-400"}`}>
              {tier.subtitle}
            </p>
          </div>
          <div className="text-right">
            <div className={`text-4xl font-light tracking-tight ${tier.featured ? "text-white" : "text-slate-900"}`}>
              ${price}
            </div>
            <div className={`text-xs mt-0.5 ${tier.featured ? "text-slate-400" : "text-slate-500"}`}>
              {billing === "annual" ? "/ year" : "/ month"}
            </div>
            {billing === "annual" && savings > 0 && (
              <div className="text-xs mt-0.5 text-emerald-500 font-medium">Save ${savings}</div>
            )}
          </div>
        </div>

        <p className={`text-sm italic leading-relaxed mb-5 ${tier.featured ? "text-slate-400" : "text-slate-500"}`}>
          {tier.description}
        </p>

        <div className={`h-px mb-5 ${tier.featured ? "bg-slate-700" : "bg-slate-100"}`} />

        <ul className="space-y-2.5 flex-1 mb-8">
          {tier.benefits.map((benefit, i) => (
            <li key={i} className="flex items-start gap-3">
              <svg
                className={`mt-0.5 h-4 w-4 flex-shrink-0 ${tier.featured ? "text-emerald-400" : "text-emerald-500"}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd"
                />
              </svg>
              <span className={`text-sm leading-relaxed ${tier.featured ? "text-slate-300" : "text-slate-600"}`}>
                {benefit}
              </span>
            </li>
          ))}
        </ul>

        <Link
          href="/contact"
          className={`block text-center rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
            tier.featured
              ? "bg-white text-slate-900 hover:bg-slate-100"
              : "bg-slate-900 text-white hover:bg-slate-800"
          }`}
        >
          {tier.cta}
        </Link>
      </div>
    </div>
  );
}

function FAQ({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-slate-200">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-5 text-left">
        <span className="text-base font-semibold text-slate-900 pr-8">{q}</span>
        <span className={`flex-shrink-0 text-slate-400 transition-transform duration-200 ${open ? "rotate-45" : ""}`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
          </svg>
        </span>
      </button>
      {open && <div className="pb-5 text-slate-600 leading-relaxed text-sm -mt-1">{a}</div>}
    </div>
  );
}

export default function MembershipPage() {
  const [billing, setBilling] = useState<BillingCycle>("annual");

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow bg-white">
        {/* HERO */}
        <section className="relative overflow-hidden border-b border-slate-100">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#f1f5f9_0%,_transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_#f8fafc_0%,_transparent_50%)]" />
          </div>
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
            <div className="max-w-3xl">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm font-medium text-slate-700 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                </span>
                501(c)(3) Nonprofit · Tax-Deductible
              </div>
              <h1 className="mt-8 text-5xl font-light tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
                Become a Member
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-slate-600 max-w-2xl">
                Conservation is not a spectator sport. Every member of The Blue Duck Foundation is a stakeholder in the natural world, the communities that depend on it, and the legacies we're building together — here and globally.
              </p>
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
                {["501(c)(3) · EIN 41-4361489", "Funds global programs", "Cancel anytime"].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-slate-600">
                    <svg className="h-5 w-5 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* TIERS */}
        <section className="border-b border-slate-100 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center mb-12">
              <h2 className="text-4xl font-light tracking-tight text-slate-900">Choose your membership</h2>
              <p className="mt-4 text-lg text-slate-600">
                Four tiers, each named for a natural ecosystem. Every level makes a direct impact on conservation, research, and community work — locally and around the world.
              </p>

              <div className="mt-8 inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-slate-50 p-1">
                <button
                  onClick={() => setBilling("monthly")}
                  className={`rounded-lg px-6 py-2.5 text-sm font-semibold transition-all ${
                    billing === "monthly" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setBilling("annual")}
                  className={`rounded-lg px-6 py-2.5 text-sm font-semibold transition-all ${
                    billing === "annual" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  Annual <span className="ml-1 text-emerald-600">(Save 17%)</span>
                </button>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {tiers.map((tier) => (
                <TierCard key={tier.id} tier={tier} billing={billing} />
              ))}
            </div>

            {/* Corporate callout */}
            <div className="mt-10 rounded-2xl border border-slate-200/80 bg-slate-50 p-8">
              <div className="grid gap-6 md:grid-cols-2 md:items-center">
                <div>
                  <h3 className="text-xl font-semibold text-slate-900">Corporate & Organizational Partnerships</h3>
                  <p className="mt-2 text-slate-600">
                    Conservation organizations, academic institutions, energy companies, businesses, and community groups — we offer custom partnership packages built around your goals, values, and global reach.
                  </p>
                </div>
                <div className="md:text-right">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
                  >
                    Inquire About Partnerships
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* COMPARISON TABLE */}
        <section className="border-b border-slate-100 bg-slate-50">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center mb-12">
              <h2 className="text-4xl font-light tracking-tight text-slate-900">Everything side by side</h2>
            </div>
            <div className="overflow-x-auto rounded-2xl border border-slate-200/80 bg-white">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="text-left py-4 px-6 text-sm font-semibold text-slate-500 w-1/3">Feature</th>
                    {tiers.map((tier) => (
                      <th key={tier.id} className="py-4 px-4 text-center">
                        <div className="text-sm font-semibold text-slate-900">{tier.name}</div>
                        <div className="text-xs text-slate-400 mt-0.5">${tier.annualPrice}/yr</div>
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
                      <td className="py-3 px-6 text-sm text-slate-600">{feature as string}</td>
                      {values.map((val, j) => (
                        <td key={j} className="py-3 px-4 text-center">
                          {val === true ? (
                            <svg className="h-5 w-5 mx-auto text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                clipRule="evenodd"
                              />
                            </svg>
                          ) : val === false ? (
                            <svg className="h-4 w-4 mx-auto text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                          ) : (
                            <span className="text-xs font-semibold text-slate-700">{val as string}</span>
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

        {/* WHY MEMBER */}
        <section className="border-b border-slate-100 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 items-center">
              <div>
                <h2 className="text-4xl font-light tracking-tight text-slate-900">
                  Your membership is land, water, and legacy
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-slate-600">
                  Ecosystems are disappearing. Archaeological sites are being lost. Communities in resource-dependent regions lack access to basic environmental safety and clean water. Forward-thinking research in conservation and renewable energy too often goes unfunded.
                </p>
                <p className="mt-4 leading-relaxed text-slate-600">
                  The Blue Duck Foundation exists to change that — creating transparent, accountable pathways for support that make a measurable difference. Your membership isn't a donation. It's a stake in something real, something that outlasts all of us.
                </p>
                <p className="mt-6 text-lg italic text-slate-500">
                  "We are here not only to preserve the earth, but to preserve the bonds that connect people, place, and purpose across generations."
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  {
                    icon: "🌍",
                    title: "Global Conservation",
                    desc: "Funding ecosystem protection, habitat restoration, and biodiversity programs worldwide.",
                  },
                  {
                    icon: "📡",
                    title: "Environmental Intelligence",
                    desc: "Deploying IoT sensor networks and open data platforms for real-time conservation accountability.",
                  },
                  {
                    icon: "🏺",
                    title: "Heritage Preservation",
                    desc: "Protecting archaeological sites, indigenous histories, and culturally significant landscapes.",
                  },
                  {
                    icon: "🎓",
                    title: "Forever 44 Scholarship",
                    desc: "Supporting students in memory of Kaleb Cory — because legacy is something we continue.",
                  },
                  {
                    icon: "💧",
                    title: "Clean Water & Humanitarian Aid",
                    desc: "Freshwater access initiatives and direct assistance for underserved communities globally.",
                  },
                  {
                    icon: "🤝",
                    title: "Open Pathways",
                    desc: "Creating compliant, transparent channels for forward-thinking research and conservation support.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="group relative rounded-2xl border border-slate-200/80 bg-white p-6 transition-all hover:border-slate-300 hover:shadow-sm"
                  >
                    <div className="text-2xl mb-3">{item.icon}</div>
                    <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
                    <p className="mt-1 text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="border-b border-slate-100 bg-slate-50">
          <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-light tracking-tight text-slate-900">Frequently asked questions</h2>
            </div>
            <div>{faqs.map((faq, i) => <FAQ key={i} q={faq.q} a={faq.a} />)}</div>
          </div>
        </section>

        {/* CLOSING CTA */}
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="overflow-hidden rounded-2xl bg-slate-900 shadow-xl">
              <div className="px-8 py-12 md:px-12 md:py-16">
                <div className="grid gap-8 md:grid-cols-2 md:items-center">
                  <div>
                    <h3 className="text-3xl font-light tracking-tight text-white">
                      The world doesn't wait.<br />Neither should you.
                    </h3>
                    <p className="mt-3 text-lg text-slate-300">
                      Join The Blue Duck Foundation and become part of a conservation story being written across communities, ecosystems, and borders — right now.
                    </p>
                    <p className="mt-4 text-sm text-slate-500">501(c)(3) · EIN 41-4361489 · All memberships are tax-deductible</p>
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 font-semibold text-slate-900 transition-colors hover:bg-slate-100"
                    >
                      Join as Flyway Member
                    </Link>
                    <Link
                      href="/about"
                      className="inline-flex items-center justify-center rounded-xl border border-white/30 px-8 py-4 font-semibold text-white transition-colors hover:bg-white/10"
                    >
                      Learn More
                    </Link>
                  </div>
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
