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
  color: string;
  accentColor: string;
  bgColor: string;
  borderColor: string;
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
    color: "#6b7280",
    accentColor: "#9ca3af",
    bgColor: "bg-stone-50",
    borderColor: "border-stone-300",
    featured: false,
    icon: "◎",
    description: "Begin your conservation journey. Every drop fills the playa.",
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
    color: "#0d9488",
    accentColor: "#14b8a6",
    bgColor: "bg-teal-950",
    borderColor: "border-teal-700",
    featured: false,
    icon: "◈",
    description: "Wade deeper. The marsh is where life flourishes and purpose takes root.",
    benefits: [
      "Everything in Playa",
      "Printed membership card & welcome packet",
      "Invitations to conservation field events",
      "Behind-the-scenes project updates",
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
    color: "#d97706",
    accentColor: "#f59e0b",
    bgColor: "bg-stone-950",
    borderColor: "border-amber-600",
    featured: true,
    badge: "Most Popular",
    icon: "◆",
    description: "Soar with us. Flyway members are the backbone of everything we build.",
    benefits: [
      "Everything in Marsh",
      "Named recognition in annual conservation report",
      "Priority access to Foundation events & hunts",
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
    color: "#1e293b",
    accentColor: "#475569",
    bgColor: "bg-slate-950",
    borderColor: "border-slate-600",
    featured: false,
    badge: "Founding Patron",
    icon: "❖",
    description: "The sentinels stand watch over what matters most. You are foundational.",
    benefits: [
      "Everything in Flyway",
      "Founding Patron plaque at Foundation headquarters",
      "Personalized conservation impact briefing (annual)",
      "Name on all major conservation project signage",
      "Exclusive Sentinel member jacket",
      "One complimentary seat at annual Gala",
      "Input on Foundation strategic direction",
      "Direct scholarship fund contribution credited",
      "Legacy giving program access",
    ],
    cta: "Become a Sentinel",
  },
];

const impactStats = [
  { value: "100%", label: "of membership fees go directly to conservation programs" },
  { value: "501(c)(3)", label: "federally recognized — all contributions are tax-deductible" },
  { value: "Texas", label: "Central Flyway focus — protecting wetlands from source to coast" },
  { value: "2026", label: "founding year — be part of the beginning" },
];

const faqs = [
  { q: "Is my membership tax-deductible?", a: "Yes. The Blue Duck Foundation is a registered 501(c)(3) nonprofit (EIN 41-4361489). All membership contributions are tax-deductible to the extent permitted by law. You will receive an official receipt for your records." },
  { q: "Can I cancel or change my membership tier?", a: "Absolutely. You can upgrade, downgrade, or cancel your membership at any time. Annual memberships are non-refundable but can be upgraded. We believe in making conservation accessible, not locked in." },
  { q: "How are membership funds used?", a: "Membership fees directly fund conservation programs, wetland restoration initiatives, the Forever 44 Scholarship Fund, IoT environmental monitoring systems, and community engagement events across Texas." },
  { q: "What is the Forever 44 Scholarship Fund?", a: "The Forever 44 Scholarship Fund is established in memory of Kaleb Cory and supports graduating seniors who demonstrate resilience, heart, and determination. Flyway and above members are recognized as scholarship supporters." },
  { q: "Do you offer corporate or organizational memberships?", a: "Yes. We offer custom partnership packages for businesses, landowner associations, hunting clubs, and conservation organizations. Contact us directly to discuss a partnership that fits your goals." },
];

function TierCard({ tier, billing }: { tier: Tier; billing: BillingCycle }) {
  const price = billing === "annual" ? tier.annualPrice : tier.monthlyPrice;
  const savings = tier.monthlyPrice * 12 - tier.annualPrice;
  return (
    <div
      className={`relative flex flex-col rounded-none border-2 ${tier.borderColor} ${tier.bgColor} transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl`}
      style={tier.featured ? { boxShadow: `0 0 40px ${tier.color}30` } : {}}
    >
      {tier.badge && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-1.5 text-xs font-mono-custom tracking-widest uppercase" style={{ backgroundColor: tier.color, color: tier.featured ? "#000" : "#fff" }}>
          {tier.badge}
        </div>
      )}
      <div className="p-8 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="text-3xl mb-2" style={{ color: tier.accentColor }}>{tier.icon}</div>
            <h3 className={`font-display text-2xl font-bold ${tier.featured || tier.id === "marsh" || tier.id === "sentinel" ? "text-white" : "text-stone-900"}`}>{tier.name}</h3>
            <p className="font-mono-custom text-xs tracking-widest uppercase mt-1" style={{ color: tier.accentColor }}>{tier.subtitle}</p>
          </div>
          <div className="text-right">
            <div className={`font-display text-4xl font-light ${tier.featured || tier.id === "marsh" || tier.id === "sentinel" ? "text-white" : "text-stone-900"}`}>${price}</div>
            <div className="font-mono-custom text-xs mt-1" style={{ color: tier.accentColor }}>{billing === "annual" ? "/ year" : "/ month"}</div>
            {billing === "annual" && savings > 0 && <div className="font-mono-custom text-xs mt-1 text-emerald-400">Save ${savings}</div>}
          </div>
        </div>
        <p className={`font-body-serif text-sm italic leading-relaxed mb-6 ${tier.featured || tier.id === "marsh" || tier.id === "sentinel" ? "text-stone-400" : "text-stone-500"}`}>{tier.description}</p>
        <div className="h-px mb-6" style={{ backgroundColor: `${tier.color}40` }} />
        <ul className="space-y-3 flex-1 mb-8">
          {tier.benefits.map((benefit, i) => (
            <li key={i} className="flex items-start gap-3">
              <svg className="mt-0.5 h-4 w-4 flex-shrink-0" style={{ color: tier.accentColor }} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
              </svg>
              <span className={`text-sm font-light leading-relaxed ${tier.featured || tier.id === "marsh" || tier.id === "sentinel" ? "text-stone-300" : "text-stone-600"}`}>{benefit}</span>
            </li>
          ))}
        </ul>
        <Link href="/contact" className="block text-center py-4 font-mono-custom text-xs tracking-widest uppercase transition-all duration-200 border-2"
          style={tier.featured ? { backgroundColor: tier.color, borderColor: tier.color, color: "#000" } : { backgroundColor: "transparent", borderColor: tier.color, color: tier.accentColor }}
          onMouseEnter={(e) => { if (!tier.featured) { (e.target as HTMLElement).style.backgroundColor = tier.color; (e.target as HTMLElement).style.color = "#000"; } }}
          onMouseLeave={(e) => { if (!tier.featured) { (e.target as HTMLElement).style.backgroundColor = "transparent"; (e.target as HTMLElement).style.color = tier.accentColor; } }}
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
    <div className="border-b border-stone-800">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-6 text-left">
        <span className="font-display text-lg text-white pr-8">{q}</span>
        <span className={`flex-shrink-0 text-amber-500 transition-transform duration-300 ${open ? "rotate-45" : ""}`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" /></svg>
        </span>
      </button>
      {open && <div className="pb-6 font-body-serif text-stone-400 leading-relaxed text-sm -mt-2">{a}</div>}
    </div>
  );
}

export default function MembershipPage() {
  const [billing, setBilling] = useState<BillingCycle>("annual");

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow bg-stone-950">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Mono:wght@300;400;500&family=Lora:ital,wght@0,400;0,500;1,400&display=swap');
          .font-display { font-family: 'Playfair Display', Georgia, serif; }
          .font-mono-custom { font-family: 'DM Mono', monospace; }
          .font-body-serif { font-family: 'Lora', Georgia, serif; }
          @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes drift { 0%, 100% { transform: translateX(0px) translateY(0px); } 33% { transform: translateX(8px) translateY(-6px); } 66% { transform: translateX(-5px) translateY(4px); } }
          .animate-fade-up { animation: fadeUp 0.9s ease forwards; }
          .animate-fade-up-d1 { animation: fadeUp 0.9s ease 0.15s forwards; opacity: 0; }
          .animate-fade-up-d2 { animation: fadeUp 0.9s ease 0.3s forwards; opacity: 0; }
          .animate-fade-up-d3 { animation: fadeUp 0.9s ease 0.45s forwards; opacity: 0; }
          .drift { animation: drift 12s ease-in-out infinite; }
        `}</style>

        {/* HERO */}
        <section className="relative overflow-hidden min-h-[70vh] flex items-center">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-stone-950 via-stone-900 to-teal-950/30" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(217,119,6,0.08),transparent)]" />
            <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />
          </div>
          <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-amber-500/5 blur-3xl drift" />
          <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full bg-teal-500/5 blur-3xl drift" style={{ animationDelay: "4s" }} />
          <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 py-28">
            <div className="max-w-3xl">
              <div className="flex items-center gap-4 mb-8 animate-fade-up">
                <div className="h-px w-12 bg-amber-500/60" />
                <span className="font-mono-custom text-amber-500 text-xs tracking-[0.4em] uppercase">Join the Foundation</span>
              </div>
              <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl text-white font-light leading-none animate-fade-up-d1">
                Become a<br /><em className="italic text-amber-400">Member</em>
              </h1>
              <p className="mt-8 font-body-serif text-xl text-stone-400 leading-relaxed max-w-xl animate-fade-up-d2">
                Conservation is not a spectator sport. Every member of the Blue Duck Foundation is a stakeholder in Texas wetlands, wildlife, and the legacies we're building together.
              </p>
              <div className="mt-10 flex flex-wrap gap-6 animate-fade-up-d3">
                <div className="flex items-center gap-2 font-mono-custom text-xs text-stone-500 tracking-wider uppercase"><div className="w-2 h-2 rounded-full bg-emerald-500" />501(c)(3) Nonprofit · Tax-Deductible</div>
                <div className="flex items-center gap-2 font-mono-custom text-xs text-stone-500 tracking-wider uppercase"><div className="w-2 h-2 rounded-full bg-amber-500" />EIN 41-4361489</div>
                <div className="flex items-center gap-2 font-mono-custom text-xs text-stone-500 tracking-wider uppercase"><div className="w-2 h-2 rounded-full bg-teal-500" />Cancel Anytime</div>
              </div>
            </div>
          </div>
        </section>

        {/* IMPACT STATS */}
        <section className="border-y border-stone-800 bg-stone-900/50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {impactStats.map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="font-display text-3xl text-amber-400 font-light">{stat.value}</div>
                  <div className="font-mono-custom text-xs text-stone-500 tracking-wide mt-2 uppercase leading-relaxed">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TIERS */}
        <section className="pt-24 pb-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="font-mono-custom text-amber-500 text-xs tracking-[0.4em] uppercase mb-4">Membership Tiers</p>
              <h2 className="font-display text-5xl text-white font-light">Choose your <em className="italic text-amber-400">place</em> in the flyway</h2>
              <p className="mt-4 font-body-serif text-stone-400 max-w-xl mx-auto leading-relaxed">Four tiers, each named for a Texas wetland ecosystem. Every level makes a direct impact on conservation across the Central Flyway.</p>
              <div className="mt-10 inline-flex items-center gap-1 border border-stone-700 bg-stone-900 p-1 rounded-none">
                <button onClick={() => setBilling("monthly")} className={`px-6 py-2.5 font-mono-custom text-xs tracking-widest uppercase transition-all ${billing === "monthly" ? "bg-amber-500 text-stone-950" : "text-stone-400 hover:text-white"}`}>Monthly</button>
                <button onClick={() => setBilling("annual")} className={`px-6 py-2.5 font-mono-custom text-xs tracking-widest uppercase transition-all ${billing === "annual" ? "bg-amber-500 text-stone-950" : "text-stone-400 hover:text-white"}`}>Annual <span className="ml-2 text-emerald-400 normal-case">(Save 17%)</span></button>
              </div>
            </div>
            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">
              {tiers.map((tier) => <TierCard key={tier.id} tier={tier} billing={billing} />)}
            </div>
            <div className="mt-8 border border-stone-700 bg-stone-900/60 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <p className="font-mono-custom text-amber-500 text-xs tracking-widest uppercase mb-2">For Organizations</p>
                <h3 className="font-display text-2xl text-white font-light">Corporate & Organizational Partnerships</h3>
                <p className="mt-2 font-body-serif text-stone-400 text-sm leading-relaxed max-w-lg">Hunting clubs, landowner associations, conservation orgs, and businesses — we offer custom partnership packages built around your goals and values.</p>
              </div>
              <Link href="/contact" className="flex-shrink-0 border-2 border-amber-500 px-8 py-4 font-mono-custom text-xs tracking-widest text-amber-400 uppercase hover:bg-amber-500 hover:text-stone-950 transition-all">Inquire About Partnerships</Link>
            </div>
          </div>
        </section>

        {/* WHY MEMBER */}
        <section className="border-t border-stone-800 bg-stone-900/30 py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <p className="font-mono-custom text-amber-500 text-xs tracking-[0.4em] uppercase mb-4">Why it Matters</p>
                <h2 className="font-display text-5xl text-white font-light leading-tight">Your membership is<br /><em className="italic text-amber-400">land, water, and legacy</em></h2>
                <div className="mt-8 space-y-6 font-body-serif text-stone-400 leading-relaxed">
                  <p>Texas is losing wetlands at an alarming rate. The playas of the Panhandle, the marshes of the coast, the riparian corridors that birds depend on — they don't protect themselves.</p>
                  <p>The Blue Duck Foundation exists to change that. But foundations are only as strong as the people behind them. Your membership isn't a donation — it's a stake in something real, something that outlasts all of us.</p>
                  <p className="text-amber-300/80 font-display text-lg italic">"We are here not only to preserve the earth, but to preserve the special bonds that connect families and friends across generations and across the world."</p>
                </div>
              </div>
              <div className="space-y-4">
                {[
                  { icon: "🦆", title: "Wetland Restoration", desc: "Directly funding playa lake restoration, coastal marsh protection, and waterway health monitoring across the Central Flyway." },
                  { icon: "📡", title: "Environmental Intelligence", desc: "Deploying IoT sensor networks and environmental monitoring systems to track wetland health in real time." },
                  { icon: "🎓", title: "Forever 44 Scholarship", desc: "Supporting students who embody resilience and perseverance in memory of Kaleb Cory — because legacy is something we continue." },
                  { icon: "🤝", title: "Community & Stewardship", desc: "Building a network of hunters, landowners, and conservationists committed to ethical, science-backed stewardship." },
                ].map((item) => (
                  <div key={item.title} className="flex gap-5 p-5 border border-stone-800 hover:border-stone-600 transition-colors bg-stone-950/50">
                    <div className="text-2xl flex-shrink-0 mt-0.5">{item.icon}</div>
                    <div>
                      <h3 className="font-display text-lg text-white font-medium">{item.title}</h3>
                      <p className="mt-1 font-body-serif text-stone-500 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* COMPARISON TABLE */}
        <section className="border-t border-stone-800 py-28 bg-stone-950">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <p className="font-mono-custom text-amber-500 text-xs tracking-[0.4em] uppercase mb-4">Full Comparison</p>
              <h2 className="font-display text-4xl text-white font-light">Everything side by <em className="italic text-amber-400">side</em></h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="text-left py-4 px-6 font-mono-custom text-xs tracking-widest uppercase text-stone-500 border-b border-stone-800 w-1/3">Feature</th>
                    {tiers.map((tier) => (
                      <th key={tier.id} className="py-4 px-4 text-center border-b border-stone-800">
                        <div className="font-display text-base font-bold" style={{ color: tier.accentColor }}>{tier.name}</div>
                        <div className="font-mono-custom text-xs text-stone-600 mt-1">${tier.annualPrice}/yr</div>
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
                    ["Foundation merchandise discount", false, "10%", "15%", "20%"],
                    ["Annual impact report (printed)", false, true, true, true],
                    ["Exclusive member patch & hat", false, false, true, true],
                    ["Conservation priority voting", false, false, true, true],
                    ["Scholarship supporter recognition", false, false, true, true],
                    ["Private donor briefings", false, false, true, true],
                    ["Founding patron plaque", false, false, false, true],
                    ["Annual impact briefing (personal)", false, false, false, true],
                    ["Project signage recognition", false, false, false, true],
                    ["Sentinel member jacket", false, false, false, true],
                    ["Annual Gala seat", false, false, false, true],
                  ].map(([feature, ...values], i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-stone-900/20" : ""}>
                      <td className="py-3.5 px-6 font-body-serif text-sm text-stone-400">{feature as string}</td>
                      {values.map((val, j) => (
                        <td key={j} className="py-3.5 px-4 text-center">
                          {val === true ? (
                            <svg className="h-5 w-5 mx-auto text-emerald-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                          ) : val === false ? (
                            <svg className="h-4 w-4 mx-auto text-stone-700" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg>
                          ) : (
                            <span className="font-mono-custom text-xs text-amber-500">{val as string}</span>
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

        {/* FAQ */}
        <section className="border-t border-stone-800 bg-stone-900/30 py-28">
          <div className="mx-auto max-w-4xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <p className="font-mono-custom text-amber-500 text-xs tracking-[0.4em] uppercase mb-4">Questions</p>
              <h2 className="font-display text-4xl text-white font-light">Frequently <em className="italic text-amber-400">asked</em></h2>
            </div>
            <div>{faqs.map((faq, i) => <FAQ key={i} q={faq.q} a={faq.a} />)}</div>
          </div>
        </section>

        {/* CLOSING CTA */}
        <section className="border-t border-stone-800 py-32 bg-stone-950">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <div className="text-5xl mb-8">🦆</div>
            <h2 className="font-display text-5xl sm:text-6xl text-white font-light leading-tight">
              The flyway doesn't wait.<br /><em className="italic text-amber-400">Neither should you.</em>
            </h2>
            <p className="mt-6 font-body-serif text-stone-400 text-lg leading-relaxed max-w-xl mx-auto">Join the Blue Duck Foundation and become part of the conservation story being written across Texas right now.</p>
            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="inline-flex items-center justify-center border-2 border-amber-500 bg-amber-500 px-10 py-4 font-mono-custom text-xs tracking-widest text-stone-950 uppercase hover:bg-transparent hover:text-amber-400 transition-all">Join as Flyway Member</Link>
              <Link href="/about" className="inline-flex items-center justify-center border-2 border-stone-700 px-10 py-4 font-mono-custom text-xs tracking-widest text-stone-400 uppercase hover:border-stone-500 hover:text-white transition-all">Learn About the Foundation</Link>
            </div>
            <p className="mt-8 font-mono-custom text-xs text-stone-600 tracking-wider">501(c)(3) · EIN 41-4361489 · All memberships are tax-deductible</p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
