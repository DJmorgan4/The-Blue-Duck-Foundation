import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const PRESET_AMOUNTS = [25, 50, 100, 250, 500, 1000];

const TIERS = [
  { min: 25,   max: 99,   label: "Supporter",   desc: "Digital recognition on our supporter wall" },
  { min: 100,  max: 499,  label: "Conservator",  desc: "Foundation sticker & decal pack mailed to you" },
  { min: 500,  max: 999,  label: "Steward",      desc: "Foundation hat + Flyway member patch" },
  { min: 1000, max: null, label: "Sentinel",     desc: "Full Sentinel package — hat, patch, jacket + personal note" },
];

function getTier(amount: number) {
  return TIERS.find((t) => amount >= t.min && (t.max === null || amount <= t.max));
}

export default function DonatePage() {
  const [selected, setSelected] = useState<number | null>(100);
  const [custom, setCustom] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const amount = custom ? parseFloat(custom) : selected;
  const tier = amount && amount >= 25 ? getTier(amount) : null;

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
    <>
      <Head>
        <title>Donate — The Blue Duck Foundation</title>
        <meta name="description" content="Support conservation, environmental science, cultural preservation, and humanitarian work. All donations are tax-deductible. 501(c)(3) · EIN 41-4361489." />
      </Head>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-grow bg-white font-['Jost',sans-serif]">

          {/* ── HERO ──────────────────────────────────────────────────── */}
          <section className="border-b border-slate-100">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="grid lg:grid-cols-[55fr_45fr] min-h-[340px]">

                <div className="py-20 lg:py-24 lg:pr-16 lg:border-r border-slate-100 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-10">
                    <div className="w-6 h-px bg-slate-300" />
                    <span className="text-[10px] tracking-[0.2em] uppercase text-slate-400 font-medium">
                      501(c)(3) · EIN 41-4361489 · Tax-deductible
                    </span>
                  </div>
                  <h1 className="font-['Cormorant_Garamond'] text-6xl lg:text-7xl font-light leading-[1.04] tracking-tight text-slate-900 mb-8">
                    Support the<br />
                    <em className="italic">work.</em>
                  </h1>
                  <p className="text-[15px] leading-[1.9] text-slate-500 font-light max-w-md">
                    Every dollar funds conservation, environmental science, cultural preservation, and humanitarian work — wherever it's needed. Your contribution is fully tax-deductible.
                  </p>
                </div>

                <div className="hidden lg:flex flex-col justify-center py-24 pl-16">
                  <div className="space-y-0">
                    {TIERS.map((t, i) => (
                      <div key={i} className="flex items-start justify-between py-4 border-b border-slate-100 first:border-t gap-6">
                        <div>
                          <div className="font-['Cormorant_Garamond'] text-[19px] font-light text-slate-800">{t.label}</div>
                          <div className="text-[11px] text-slate-400 font-light mt-0.5">{t.desc}</div>
                        </div>
                        <div className="text-[11px] tracking-[0.08em] text-slate-300 font-medium flex-shrink-0 mt-1">
                          ${t.min}{t.max ? `–$${t.max}` : "+"}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 text-[11px] text-slate-400 font-light">
                    Gifts above $100 include physical merch mailed to you
                  </div>
                </div>

              </div>
            </div>
          </section>

          {/* ── DONATION FORM ─────────────────────────────────────────── */}
          <section className="border-b border-slate-100 bg-slate-50">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-24">
              <div className="grid lg:grid-cols-[2fr_1fr] gap-16 lg:gap-24">

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-5 h-px bg-slate-300" />
                      <span className="text-[10px] tracking-[0.2em] uppercase text-slate-400 font-medium">
                        Select an amount
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-px bg-slate-200 mb-px">
                      {PRESET_AMOUNTS.map((amt) => (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => { setSelected(amt); setCustom(""); }}
                          className={`py-4 text-center transition-colors font-['Cormorant_Garamond'] text-2xl font-light ${
                            selected === amt && !custom
                              ? "bg-slate-900 text-white"
                              : "bg-white text-slate-900 hover:bg-slate-50"
                          }`}
                        >
                          ${amt}
                        </button>
                      ))}
                    </div>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-light">$</span>
                      <input
                        type="number"
                        min="1"
                        placeholder="Custom amount"
                        value={custom}
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

                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-5 h-px bg-slate-300" />
                      <span className="text-[10px] tracking-[0.2em] uppercase text-slate-400 font-medium">
                        Your information
                      </span>
                    </div>
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
                        <p className="text-[11px] text-slate-400 font-light mt-1.5">Your receipt will be sent here</p>
                      </div>
                      <div>
                        <label className="block text-[11px] tracking-[0.1em] uppercase text-slate-500 font-medium mb-2">
                          Message <span className="text-slate-300 normal-case tracking-normal font-light">(optional)</span>
                        </label>
                        <textarea rows={3} value={message} onChange={(e) => setMessage(e.target.value)}
                          className="w-full border border-slate-200 bg-white px-4 py-3 text-slate-900 text-sm placeholder:text-slate-300 focus:border-slate-400 focus:outline-none resize-none"
                          placeholder="Leave a note with your donation..." />
                      </div>
                    </div>
                  </div>

                  {error && <p className="text-sm text-red-600 font-light">{error}</p>}

                  <button
                    type="submit"
                    disabled={loading || !amount || amount < 1}
                    className="w-full text-[11px] font-medium tracking-[0.14em] uppercase bg-slate-900 text-white py-4 hover:bg-slate-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {loading ? "Redirecting to payment..." : amount && amount >= 1 ? `Donate $${Number(amount).toFixed(2)} →` : "Select an amount to continue"}
                  </button>

                  <p className="text-[11px] text-slate-400 font-light text-center leading-relaxed">
                    You'll be redirected to Stripe's secure checkout. Your card information never touches our servers.
                  </p>
                </form>

                <aside className="flex flex-col gap-px">
                  <div className="bg-white border border-slate-100 p-8 mb-4">
                    <div className="text-[10px] tracking-[0.2em] uppercase text-slate-400 font-medium mb-5">Tax receipt</div>
                    <p className="text-sm text-slate-500 font-light leading-relaxed mb-4">
                      You'll receive an official tax receipt by email immediately after your donation.
                    </p>
                    <div className="space-y-2 text-[11px] text-slate-400 font-light">
                      {[
                        ["Organization", "The Blue Duck Foundation"],
                        ["Status", "501(c)(3) Public Charity"],
                        ["EIN", "41-4361489"],
                        ["Deductibility", "Full — IRC Section 170"],
                      ].map(([label, val], i) => (
                        <div key={i} className="flex justify-between border-b border-slate-100 pb-2 last:border-0 last:pb-0">
                          <span>{label}</span>
                          <span className="text-slate-600">{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white border border-slate-100 p-8 mb-4">
                    <div className="text-[10px] tracking-[0.2em] uppercase text-slate-400 font-medium mb-5">Where it goes</div>
                    <div className="space-y-3">
                      {[
                        "Environmental conservation & ecosystems",
                        "Scientific research & monitoring tech",
                        "Archaeological & cultural preservation",
                        "Humanitarian environmental support",
                        "Forever 44 Scholarship Fund",
                      ].map((item, i) => (
                        <div key={i} className="flex items-start gap-3 text-sm text-slate-500 font-light">
                          <span className="mt-2 w-1 h-1 rounded-full bg-emerald-500 flex-shrink-0" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-slate-900 p-8">
                    <div className="text-[10px] tracking-[0.2em] uppercase text-slate-600 font-medium mb-3">Secure payment</div>
                    <p className="text-sm text-slate-400 font-light leading-relaxed">
                      Payments processed by Stripe. Your financial information is encrypted and never stored on our servers.
                    </p>
                  </div>
                </aside>
              </div>
            </div>
          </section>

          {/* ── OTHER WAYS TO HELP ────────────────────────────────────── */}
          <section className="border-b border-slate-100">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-24">
              <div className="grid lg:grid-cols-[1fr_3fr] gap-16 lg:gap-24">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-5 h-px bg-slate-300" />
                    <span className="text-[10px] tracking-[0.2em] uppercase text-slate-400 font-medium">Other ways to help</span>
                  </div>
                  <h2 className="font-['Cormorant_Garamond'] text-4xl font-light text-slate-900 leading-tight">
                    Beyond<br />a donation
                  </h2>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10">
                  {[
                    { num: "01", title: "Become a member", desc: "Monthly giving with exclusive member benefits starting at $10/month.", href: "/membership", cta: "View tiers" },
                    { num: "02", title: "Skills & expertise", desc: "Contribute your background in conservation, law, finance, science, or tech to build real capacity.", href: "/contact", cta: "Volunteer" },
                    { num: "03", title: "Research partnership", desc: "Working on conservation science, archaeology, or humanitarian work? Let's explore how we can support each other.", href: "/contact", cta: "Connect" },
                    { num: "04", title: "Make an introduction", desc: "Know someone doing important work that could benefit from a transparent support pathway? Make the introduction.", href: "/contact", cta: "Reach out" },
                    { num: "05", title: "Corporate partnership", desc: "Custom sponsorship packages for businesses, institutions, and organizations.", href: "/contact", cta: "Get in touch" },
                    { num: "06", title: "Stay informed", desc: "Subscribe to updates on programs, partnerships, and opportunities as we grow.", href: "/contact", cta: "Subscribe" },
                  ].map((item) => (
                    <div key={item.num} className="border-t border-slate-100 pt-6 pb-2">
                      <div className="text-[10px] tracking-[0.2em] uppercase text-slate-300 font-medium mb-3">{item.num}</div>
                      <h3 className="font-['Cormorant_Garamond'] text-xl font-light text-slate-900 mb-2">{item.title}</h3>
                      <p className="text-sm leading-relaxed text-slate-500 font-light mb-4">{item.desc}</p>
                      <Link href={item.href} className="text-[11px] font-medium tracking-[0.1em] uppercase text-slate-500 hover:text-slate-900 transition-colors">
                        {item.cta} →
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ── TRANSPARENCY ──────────────────────────────────────────── */}
          <section>
            <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-24">
              <div className="grid lg:grid-cols-[1fr_2fr] gap-16 lg:gap-24">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-5 h-px bg-slate-300" />
                    <span className="text-[10px] tracking-[0.2em] uppercase text-slate-400 font-medium">Accountability</span>
                  </div>
                  <h2 className="font-['Cormorant_Garamond'] text-4xl font-light text-slate-900 leading-tight">
                    Our commitment<br />to transparency
                  </h2>
                </div>
                <div>
                  <p className="text-[15px] leading-[1.9] text-slate-500 font-light mb-10">
                    Transparency isn't a feature of The Blue Duck Foundation — it's the foundation itself. Every dollar raised, every program funded, and every outcome achieved will be publicly documented.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-x-10">
                    {[
                      "Detailed financial reports published quarterly",
                      "Project-specific budgets and expenditure tracking",
                      "Third-party verification of program outcomes",
                      "Annual independent financial audit",
                      "Public disclosure of all board members and advisors",
                      "Open access to IRS filings and governing documents",
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3 py-3.5 border-b border-slate-100">
                        <span className="mt-2 w-1 h-1 rounded-full bg-emerald-500 flex-shrink-0" />
                        <span className="text-sm text-slate-600 font-light">{item}</span>
                      </div>
                    ))}
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
