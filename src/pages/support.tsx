import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

// ─── DONATION FORM ─────────────────────────────────────────────────────────
const PRESET_AMOUNTS = [25, 50, 100, 250, 500, 1000];

const DONATION_TIERS = [
  { min: 25,   max: 99,   label: "Supporter",  desc: "Digital recognition on our supporter wall" },
  { min: 100,  max: 499,  label: "Conservator", desc: "Foundation sticker & decal pack mailed to you" },
  { min: 500,  max: 999,  label: "Steward",     desc: "Foundation hat + Flyway member patch" },
  { min: 1000, max: null, label: "Sentinel",    desc: "Full Sentinel package — hat, patch, jacket + personal note" },
];

function getDonationTier(amount: number) {
  return DONATION_TIERS.find((t) => amount >= t.min && (t.max === null || amount <= t.max));
}

function DonateSection() {
  const [selected, setSelected] = useState<number | null>(100);
  const [custom, setCustom] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const amount = custom ? parseFloat(custom) : selected;
  const tier = amount && amount >= 25 ? getDonationTier(amount) : null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || amount < 1) return;
    if (!email) { setError("Email is required"); return; }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, firstName, lastName, email, message }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create checkout");
      if (data.url) window.location.href = data.url;
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-[2fr_1fr] gap-16 lg:gap-24">
      <form onSubmit={handleSubmit} className="space-y-8">

        {/* Amount */}
        <div>
          <div className="grid grid-cols-3 gap-px bg-slate-200 mb-px">
            {PRESET_AMOUNTS.map((amt) => (
              <button
                key={amt}
                type="button"
                onClick={() => { setSelected(amt); setCustom(""); }}
                className={`py-4 text-center transition-colors font-['Cormorant_Garamond'] text-2xl font-light ${
                  selected === amt && !custom ? "bg-slate-900 text-white" : "bg-white text-slate-900 hover:bg-slate-50"
                }`}
              >
                ${amt}
              </button>
            ))}
          </div>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-light">$</span>
            <input
              type="number" min="1" placeholder="Custom amount" value={custom}
              onChange={(e) => { setCustom(e.target.value); setSelected(null); }}
              className="w-full border border-slate-200 bg-white pl-8 pr-4 py-3.5 text-slate-900 text-sm placeholder:text-slate-300 focus:border-slate-400 focus:outline-none"
            />
          </div>
          {tier && (
            <div className="mt-3 flex items-center gap-3 py-3 border-t border-slate-100">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
              <span className="text-[11px] text-slate-500 font-light">
                <span className="font-medium text-slate-900">{tier.label}</span> — {tier.desc}
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] tracking-[0.1em] uppercase text-slate-500 font-medium mb-2">First name</label>
              <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}
                className="w-full border border-slate-200 bg-white px-4 py-3 text-slate-900 text-sm placeholder:text-slate-300 focus:border-slate-400 focus:outline-none"
                placeholder="First" />
            </div>
            <div>
              <label className="block text-[11px] tracking-[0.1em] uppercase text-slate-500 font-medium mb-2">Last name</label>
              <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}
                className="w-full border border-slate-200 bg-white px-4 py-3 text-slate-900 text-sm placeholder:text-slate-300 focus:border-slate-400 focus:outline-none"
                placeholder="Last" />
            </div>
          </div>
          <div>
            <label className="block text-[11px] tracking-[0.1em] uppercase text-slate-500 font-medium mb-2">
              Email address <span className="text-slate-300">*</span>
            </label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-slate-200 bg-white px-4 py-3 text-slate-900 text-sm placeholder:text-slate-300 focus:border-slate-400 focus:outline-none"
              placeholder="you@example.com" />
            <p className="text-[11px] text-slate-400 font-light mt-1.5">Your tax receipt will be sent here</p>
          </div>
          <div>
            <label className="block text-[11px] tracking-[0.1em] uppercase text-slate-500 font-medium mb-2">
              Message <span className="text-slate-300 normal-case tracking-normal font-light">(optional)</span>
            </label>
            <textarea rows={2} value={message} onChange={(e) => setMessage(e.target.value)}
              className="w-full border border-slate-200 bg-white px-4 py-3 text-slate-900 text-sm placeholder:text-slate-300 focus:border-slate-400 focus:outline-none resize-none"
              placeholder="Leave a note with your donation..." />
          </div>
        </div>

        {error && <p className="text-sm text-red-600 font-light">{error}</p>}

        <button
          type="submit"
          disabled={loading || !amount || amount < 1}
          className="w-full text-[11px] font-medium tracking-[0.14em] uppercase bg-slate-900 text-white py-4 hover:bg-slate-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {loading ? "Redirecting..." : amount && amount >= 1 ? `Donate $${Number(amount).toFixed(2)} →` : "Select an amount"}
        </button>

        <p className="text-[11px] text-slate-400 font-light text-center">
          Redirected to Stripe's secure checkout. Card info never touches our servers.
        </p>
      </form>

      {/* Sidebar */}
      <div className="flex flex-col gap-px">
        <div className="bg-slate-50 border border-slate-100 p-7 mb-4">
          <div className="text-[10px] tracking-[0.2em] uppercase text-slate-400 font-medium mb-4">Tax receipt</div>
          <div className="space-y-2 text-[11px] text-slate-400 font-light">
            {[["Organization","The Blue Duck Foundation"],["Status","501(c)(3) Public Charity"],["EIN","41-4361489"],["Deductibility","Full — IRC §170"]].map(([l,v],i)=>(
              <div key={i} className="flex justify-between border-b border-slate-100 pb-2 last:border-0 last:pb-0">
                <span>{l}</span><span className="text-slate-600">{v}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-slate-50 border border-slate-100 p-7">
          <div className="text-[10px] tracking-[0.2em] uppercase text-slate-400 font-medium mb-4">Where it goes</div>
          <div className="space-y-2.5">
            {["Environmental conservation & ecosystems","Scientific research & monitoring","Archaeological & cultural preservation","Humanitarian environmental support","Forever 44 Scholarship Fund"].map((item,i)=>(
              <div key={i} className="flex items-start gap-3 text-sm text-slate-500 font-light">
                <span className="mt-2 w-1 h-1 rounded-full bg-emerald-500 flex-shrink-0" />{item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── MEMBERSHIP TIERS ──────────────────────────────────────────────────────
const MEMBERSHIP_TIERS = [
  {
    id: "playa", name: "Playa", subtitle: "Supporter",
    annual: 100, monthly: 10,
    benefits: ["Digital membership card","Quarterly newsletter","Member-only updates","Supporter recognition","Tax-deductible receipt"],
  },
  {
    id: "marsh", name: "Marsh", subtitle: "Member",
    annual: 250, monthly: 25,
    benefits: ["Everything in Playa","Printed card & welcome packet","Field event invitations","Behind-the-scenes updates","10% merchandise discount"],
  },
  {
    id: "flyway", name: "Flyway", subtitle: "Conservationist",
    annual: 600, monthly: 60,
    featured: true,
    benefits: ["Everything in Marsh","Named in annual report","Priority event access","Exclusive patch & hat","Conservation priority voting","Forever 44 recognition"],
  },
  {
    id: "sentinel", name: "Sentinel", subtitle: "Founding Patron",
    annual: 1500, monthly: 150,
    benefits: ["Everything in Flyway","Founding patron plaque","Personal impact briefing","Project signage recognition","Sentinel jacket","Annual Banquet seat"],
  },
];

function MembershipSection() {
  const [billing, setBilling] = useState<"annual"|"monthly">("annual");

  return (
    <div>
      {/* Billing toggle */}
      <div className="flex items-center justify-end mb-8">
        <div className="flex border border-slate-200 bg-white">
          {(["annual","monthly"] as const).map((b) => (
            <button
              key={b}
              onClick={() => setBilling(b)}
              className={`px-5 py-2 text-[11px] tracking-[0.1em] uppercase font-medium transition-all ${
                billing === b ? "bg-slate-900 text-white" : "text-slate-400 hover:text-slate-700"
              }`}
            >
              {b === "annual" ? "Annual · Save 17%" : "Monthly"}
            </button>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-100">
        {MEMBERSHIP_TIERS.map((tier) => {
          const price = billing === "annual" ? tier.annual : tier.monthly;
          const savings = tier.monthly * 12 - tier.annual;
          return (
            <div key={tier.id} className={`p-7 flex flex-col justify-between ${tier.featured ? "bg-slate-900" : "bg-white"}`}>
              <div>
                {tier.featured && (
                  <div className="text-[9px] tracking-[0.2em] uppercase text-emerald-400 font-medium mb-2">Most popular</div>
                )}
                <div className={`font-['Cormorant_Garamond'] text-2xl font-light mb-0.5 ${tier.featured ? "text-white" : "text-slate-900"}`}>
                  {tier.name}
                </div>
                <div className={`text-[10px] tracking-[0.12em] uppercase font-medium mb-5 ${tier.featured ? "text-slate-500" : "text-slate-300"}`}>
                  {tier.subtitle}
                </div>
                <div className={`font-['Cormorant_Garamond'] text-3xl font-light mb-1 ${tier.featured ? "text-white" : "text-slate-900"}`}>
                  ${price}
                </div>
                <div className={`text-[10px] tracking-[0.08em] uppercase mb-1 ${tier.featured ? "text-slate-500" : "text-slate-400"}`}>
                  per {billing === "annual" ? "year" : "month"}
                </div>
                {billing === "annual" && savings > 0 && (
                  <div className="text-[10px] text-emerald-500 font-medium mb-5">Save ${savings}</div>
                )}
                <div className={`h-px mb-5 ${tier.featured ? "bg-slate-800" : "bg-slate-100"}`} />
                <ul className="space-y-2 mb-6">
                  {tier.benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className={`mt-2 w-1 h-1 rounded-full flex-shrink-0 ${tier.featured ? "bg-slate-600" : "bg-slate-300"}`} />
                      <span className={`text-[12px] font-light leading-relaxed ${tier.featured ? "text-slate-300" : "text-slate-600"}`}>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href="/contact"
                className={`text-[11px] font-medium tracking-[0.12em] uppercase px-5 py-3 text-center transition-colors ${
                  tier.featured ? "bg-white text-slate-900 hover:bg-slate-100" : "border border-slate-200 text-slate-700 hover:border-slate-400"
                }`}
              >
                Join
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── PAGE ──────────────────────────────────────────────────────────────────
export default function SupportPage() {
  return (
    <>
      <Head>
        <title>Support — The Blue Duck Foundation</title>
        <meta name="description" content="Donate, become a member, or apply for the Forever 44 Scholarship. 501(c)(3) · EIN 41-4361489." />
      </Head>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-grow bg-white font-['Jost',sans-serif]">

          {/* ── HERO ────────────────────────────────────────────────────── */}
          <section className="border-b border-slate-100">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="grid lg:grid-cols-[55fr_45fr] min-h-[300px]">
                <div className="py-16 lg:py-24 lg:pr-16 lg:border-r border-slate-100 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-6 h-px bg-slate-300" />
                    <span className="text-[10px] tracking-[0.2em] uppercase text-slate-400 font-medium">
                      501(c)(3) · EIN 41-4361489 · Tax-deductible
                    </span>
                  </div>
                  <h1 className="font-['Cormorant_Garamond'] text-6xl lg:text-7xl font-light leading-[1.04] tracking-tight text-slate-900 mb-6">
                    Support the<br /><em className="italic">Foundation.</em>
                  </h1>
                  <p className="text-[15px] leading-[1.9] text-slate-500 font-light max-w-md">
                    Donate, become a member, or support the Forever 44 Scholarship — every contribution funds conservation, science, cultural preservation, and humanitarian work worldwide.
                  </p>
                </div>
                <div className="hidden lg:flex flex-col justify-center py-24 pl-16 gap-0">
                  {[
                    { label: "One-time donation", anchor: "#donate" },
                    { label: "Membership", anchor: "#membership" },
                    { label: "Forever 44 Scholarship", anchor: "#scholarship" },
                  ].map((item, i) => (
                    <a key={i} href={item.anchor}
                      className="flex items-baseline justify-between py-5 border-b border-slate-100 first:border-t group">
                      <span className="font-['Cormorant_Garamond'] text-[22px] font-light text-slate-700 group-hover:text-slate-900 transition-colors">
                        {item.label}
                      </span>
                      <span className="text-slate-300 group-hover:text-slate-500 transition-colors">↓</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ── DONATE ──────────────────────────────────────────────────── */}
          <section className="border-b border-slate-100 bg-slate-50" id="donate">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 lg:py-20">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-5 h-px bg-slate-300" />
                <span className="text-[10px] tracking-[0.2em] uppercase text-slate-400 font-medium">01 — Donate</span>
              </div>
              <h2 className="font-['Cormorant_Garamond'] text-4xl font-light text-slate-900 mb-10">
                Make a one-time gift
              </h2>
              <DonateSection />
            </div>
          </section>

          {/* ── MEMBERSHIP ──────────────────────────────────────────────── */}
          <section className="border-b border-slate-100" id="membership">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 lg:py-20">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-5 h-px bg-slate-300" />
                <span className="text-[10px] tracking-[0.2em] uppercase text-slate-400 font-medium">02 — Membership</span>
              </div>
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-10">
                <div>
                  <h2 className="font-['Cormorant_Garamond'] text-4xl font-light text-slate-900">
                    Become a member
                  </h2>
                  <p className="text-[15px] text-slate-500 font-light mt-2 max-w-xl">
                    Recurring support with exclusive benefits. Four tiers named for natural ecosystems — every level makes a direct impact.
                  </p>
                </div>
                <Link href="/membership" className="text-[11px] font-medium tracking-[0.1em] uppercase text-slate-400 hover:text-slate-900 transition-colors flex-shrink-0">
                  Full membership details →
                </Link>
              </div>
              <MembershipSection />
            </div>
          </section>

          {/* ── SCHOLARSHIP ─────────────────────────────────────────────── */}
          <section className="border-b border-slate-100 bg-slate-50" id="scholarship">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 lg:py-20">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-5 h-px bg-red-700" />
                <span className="text-[10px] tracking-[0.2em] uppercase text-red-700 font-medium">03 — Scholarship</span>
              </div>
              <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
                <div>
                  <h2 className="font-['Cormorant_Garamond'] text-4xl font-light text-slate-900 mb-2">
                    Forever 44<br /><em className="italic text-red-800">Scholarship Fund</em>
                  </h2>
                  <div className="w-10 h-px bg-red-700 mb-6" />
                  <p className="text-[15px] leading-[1.9] text-slate-500 font-light mb-6">
                    Established in memory of <strong className="text-slate-700 font-medium">Kaleb Cory</strong> (December 15, 1994 – July 27, 2014). This scholarship supports graduating seniors who demonstrate resilience, heart, and determination — the qualities that defined him.
                  </p>
                  <blockquote className="border-l-2 border-blue-800 pl-5 py-1 mb-8">
                    <p className="font-['Cormorant_Garamond'] text-lg italic text-slate-600 font-light">
                      "Legacy is not only something we remember — it is something we continue."
                    </p>
                  </blockquote>
                  <div className="flex gap-4">
                    <Link
                      href="/contact"
                      className="text-[11px] font-medium tracking-[0.14em] uppercase bg-red-700 text-white px-7 py-3.5 hover:bg-red-800 transition-colors inline-flex"
                    >
                      Apply now
                    </Link>
                    <Link
                      href="/scholarship"
                      className="text-[11px] font-medium tracking-[0.14em] uppercase border border-slate-200 text-slate-700 px-7 py-3.5 hover:border-slate-400 transition-colors inline-flex"
                    >
                      Full details
                    </Link>
                  </div>
                </div>

                <div className="flex flex-col gap-0">
                  <div className="text-[10px] tracking-[0.2em] uppercase text-slate-400 font-medium mb-4">Eligibility</div>
                  {[
                    "Graduating high school senior or current undergraduate student",
                    "Demonstrated resilience, perseverance, and strength of character",
                    "Commitment to family, community, and those around them",
                    "Personal essay on legacy, loss, or carrying someone's memory forward",
                    "One letter of recommendation from a teacher, coach, or mentor",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4 py-4 border-b border-slate-100 first:border-t">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-red-700 flex-shrink-0" />
                      <span className="text-sm text-slate-600 font-light leading-relaxed">{item}</span>
                    </div>
                  ))}
                  <div className="border-l-2 border-blue-800 pl-5 py-1 mt-6">
                    <p className="text-[10px] tracking-[0.12em] uppercase text-blue-800 font-medium mb-1">A note on selection</p>
                    <p className="text-sm text-slate-500 font-light leading-relaxed italic">
                      GPA matters less than character. We are looking for students who refuse to quit.
                    </p>
                  </div>

                  <div className="mt-8 grid grid-cols-3 gap-px bg-slate-200">
                    {[
                      { val: "19", label: "Years of life" },
                      { val: "∞",  label: "Years of legacy" },
                      { val: "44", label: "Forever his number" },
                    ].map((s, i) => (
                      <div key={i} className="bg-white p-5 text-center">
                        <div className="font-['Cormorant_Garamond'] text-3xl font-light text-red-800 mb-1">{s.val}</div>
                        <div className="text-[10px] tracking-[0.1em] uppercase text-slate-400">{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── CTA ─────────────────────────────────────────────────────── */}
          <section>
            <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 lg:py-20">
              <div className="bg-slate-900 px-10 py-12 lg:px-16 lg:py-14">
                <div className="grid lg:grid-cols-2 gap-10 lg:items-center">
                  <div>
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-5 h-px bg-slate-600" />
                      <span className="text-[10px] tracking-[0.2em] uppercase text-slate-500 font-medium">Questions</span>
                    </div>
                    <h3 className="font-['Cormorant_Garamond'] text-3xl font-light text-white mb-3 leading-tight">
                      Need help or have<br /><em className="italic">a specific request?</em>
                    </h3>
                    <p className="text-[15px] leading-relaxed text-slate-400 font-light">
                      For major gifts, institutional support, research grants, or corporate partnerships — reach out directly.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 lg:justify-end">
                    <Link href="/contact"
                      className="text-[11px] font-medium tracking-[0.14em] uppercase bg-white text-slate-900 px-8 py-4 hover:bg-slate-100 transition-colors text-center">
                      Contact us
                    </Link>
                    <Link href="/conservation"
                      className="text-[11px] font-medium tracking-[0.14em] uppercase border border-slate-700 text-white px-8 py-4 hover:border-slate-500 transition-colors text-center">
                      Our programs
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </main>

        <Footer />
      </div>
    </>
  );
}
