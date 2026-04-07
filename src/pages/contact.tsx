import React, { useState } from "react";
import Link from "next/link";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const INQUIRY_TYPES = [
  "General inquiry",
  "Board membership interest",
  "Sponsorship & partnerships",
  "Research partnership",
  "Volunteer & get involved",
  "Media & press",
  "Conservation tip or local issue",
  "Donation inquiry",
  "International collaboration",
  "Other",
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow bg-white font-['Jost',sans-serif]">

        {/* ── HERO ──────────────────────────────────────────────────────── */}
        <section className="border-b border-slate-100">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-[55fr_45fr] min-h-[360px]">

              <div className="py-20 lg:py-24 lg:pr-16 lg:border-r border-slate-100 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-10">
                  <div className="w-6 h-px bg-slate-300" />
                  <span className="text-[10px] tracking-[0.2em] uppercase text-slate-400 font-medium">
                    We respond within 48 hours
                  </span>
                </div>
                <h1 className="font-['Cormorant_Garamond'] text-6xl lg:text-7xl font-light leading-[1.04] tracking-tight text-slate-900 mb-8">
                  Let's talk.
                </h1>
                <p className="text-[15px] leading-[1.9] text-slate-500 font-light max-w-md">
                  Whether you're interested in the board, want to partner on a project, have a conservation tip, or are exploring how the Foundation can support your work — we'd like to hear from you.
                </p>
              </div>

              <div className="hidden lg:flex flex-col justify-center py-24 pl-16 gap-0">
                {[
                  { label: "General inquiries", detail: "info@theblueduck.org" },
                  { label: "Partnerships & sponsorships", detail: "partnerships@theblueduck.org" },
                  { label: "Board membership", detail: "Learn about open seats →" },
                  { label: "Headquartered", detail: "McKinney, Texas · Operating worldwide" },
                  { label: "EIN", detail: "41-4361489" },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-baseline py-4 border-b border-slate-100 first:border-t">
                    <span className="text-[11px] tracking-[0.1em] uppercase text-slate-400 font-medium">{item.label}</span>
                    <span className="text-sm text-slate-600 font-light">{item.detail}</span>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* ── FORM + SIDEBAR ────────────────────────────────────────────── */}
        <section className="border-b border-slate-100 bg-slate-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-24">
            <div className="grid lg:grid-cols-[2fr_1fr] gap-16 lg:gap-24">

              {/* FORM */}
              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-5 h-px bg-slate-300" />
                  <span className="text-[10px] tracking-[0.2em] uppercase text-slate-400 font-medium">
                    Send a message
                  </span>
                </div>
                <h2 className="font-['Cormorant_Garamond'] text-4xl font-light text-slate-900 mb-8">
                  How can we help?
                </h2>

                {submitted ? (
                  <div className="border border-slate-200 bg-white p-12 text-center">
                    <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto mb-5">
                      <span className="text-emerald-600 text-lg">✓</span>
                    </div>
                    <h3 className="font-['Cormorant_Garamond'] text-2xl font-light text-slate-900 mb-2">
                      Message received
                    </h3>
                    <p className="text-sm text-slate-500 font-light mb-6">
                      Thank you for reaching out. We'll be in touch within 48 hours.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="text-[11px] font-medium tracking-[0.12em] uppercase text-slate-500 hover:text-slate-900 transition-colors"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="firstName" className="block text-[11px] tracking-[0.1em] uppercase text-slate-500 font-medium mb-2">
                          First name <span className="text-slate-300">*</span>
                        </label>
                        <input
                          id="firstName"
                          type="text"
                          required
                          className="w-full border border-slate-200 bg-white px-4 py-3 text-slate-900 text-sm placeholder:text-slate-300 focus:border-slate-400 focus:outline-none"
                          placeholder="First"
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-[11px] tracking-[0.1em] uppercase text-slate-500 font-medium mb-2">
                          Last name <span className="text-slate-300">*</span>
                        </label>
                        <input
                          id="lastName"
                          type="text"
                          required
                          className="w-full border border-slate-200 bg-white px-4 py-3 text-slate-900 text-sm placeholder:text-slate-300 focus:border-slate-400 focus:outline-none"
                          placeholder="Last"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-[11px] tracking-[0.1em] uppercase text-slate-500 font-medium mb-2">
                        Email address <span className="text-slate-300">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        className="w-full border border-slate-200 bg-white px-4 py-3 text-slate-900 text-sm placeholder:text-slate-300 focus:border-slate-400 focus:outline-none"
                        placeholder="you@example.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="organization" className="block text-[11px] tracking-[0.1em] uppercase text-slate-500 font-medium mb-2">
                        Organization <span className="text-slate-300 normal-case tracking-normal font-light">(optional)</span>
                      </label>
                      <input
                        id="organization"
                        type="text"
                        className="w-full border border-slate-200 bg-white px-4 py-3 text-slate-900 text-sm placeholder:text-slate-300 focus:border-slate-400 focus:outline-none"
                        placeholder="Company, institution, or organization"
                      />
                    </div>

                    <div>
                      <label htmlFor="inquiryType" className="block text-[11px] tracking-[0.1em] uppercase text-slate-500 font-medium mb-2">
                        Inquiry type <span className="text-slate-300">*</span>
                      </label>
                      <select
                        id="inquiryType"
                        required
                        defaultValue=""
                        className="w-full border border-slate-200 bg-white px-4 py-3 text-slate-900 text-sm focus:border-slate-400 focus:outline-none"
                      >
                        <option value="" disabled>Select a category</option>
                        {INQUIRY_TYPES.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-[11px] tracking-[0.1em] uppercase text-slate-500 font-medium mb-2">
                        Message <span className="text-slate-300">*</span>
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={5}
                        className="w-full border border-slate-200 bg-white px-4 py-3 text-slate-900 text-sm placeholder:text-slate-300 focus:border-slate-400 focus:outline-none resize-none"
                        placeholder="Tell us how we can help, how you'd like to get involved, or about the work you're doing..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="text-[11px] font-medium tracking-[0.14em] uppercase bg-slate-900 text-white px-8 py-4 hover:bg-slate-700 transition-colors"
                    >
                      Send message
                    </button>
                  </form>
                )}
              </div>

              {/* SIDEBAR */}
              <aside className="flex flex-col gap-px">

                <div className="bg-white border border-slate-100 p-8 mb-4">
                  <div className="text-[10px] tracking-[0.2em] uppercase text-slate-400 font-medium mb-5">
                    What to expect
                  </div>
                  <div className="space-y-5">
                    {[
                      { step: "01", text: "Every message is reviewed personally — no auto-responders beyond the confirmation." },
                      { step: "02", text: "Responses typically within 48 business hours." },
                      { step: "03", text: "For board, sponsorship, and research inquiries, we'll schedule a call." },
                    ].map((item) => (
                      <div key={item.step} className="flex gap-4">
                        <span className="text-[10px] tracking-[0.15em] text-slate-300 font-medium pt-0.5 flex-shrink-0">{item.step}</span>
                        <p className="text-sm leading-relaxed text-slate-500 font-light">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white border border-slate-100 p-8 mb-4">
                  <div className="text-[10px] tracking-[0.2em] uppercase text-slate-400 font-medium mb-5">
                    Common inquiries
                  </div>
                  <div className="space-y-0">
                    {[
                      { label: "Board membership", href: "/about#board" },
                      { label: "Event sponsorships", href: "/events" },
                      { label: "Conservation & research", href: "/conservation" },
                      { label: "Volunteer opportunities", href: "/contribute" },
                      { label: "Submit a conservation tip", href: "/conservation" },
                      { label: "International collaboration", href: "/contact" },
                    ].map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="flex items-center justify-between py-3 border-b border-slate-100 last:border-b-0 text-sm text-slate-600 hover:text-slate-900 font-light transition-colors"
                      >
                        {item.label}
                        <span className="text-slate-300">→</span>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-900 p-8">
                  <div className="text-[10px] tracking-[0.2em] uppercase text-slate-600 font-medium mb-4">
                    Based in Texas
                  </div>
                  <p className="font-['Cormorant_Garamond'] text-xl font-light text-white mb-3">
                    McKinney, Texas.<br />Operating worldwide.
                  </p>
                  <p className="text-sm leading-relaxed text-slate-400 font-light mb-4">
                    We welcome inquiries from anywhere in the world — conservation doesn't stop at borders, and neither do we.
                  </p>
                  <div className="text-[11px] tracking-[0.08em] text-slate-600 font-medium">
                    EIN 41-4361489
                  </div>
                </div>

              </aside>
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
                      Make an impact
                    </span>
                  </div>
                  <h3 className="font-['Cormorant_Garamond'] text-4xl font-light text-white mb-4 leading-tight">
                    Ready to<br /><em className="italic">get involved?</em>
                  </h3>
                  <p className="text-[15px] leading-relaxed text-slate-400 font-light">
                    Whether you give time, resources, or expertise — every contribution builds the Foundation's capacity to protect the natural world and the communities that depend on it.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 lg:justify-end">
                  <Link
                    href="/about"
                    className="text-[11px] font-medium tracking-[0.14em] uppercase bg-white text-slate-900 px-8 py-4 hover:bg-slate-100 transition-colors text-center"
                  >
                    Learn about us
                  </Link>
                  <Link
                    href="/conservation"
                    className="text-[11px] font-medium tracking-[0.14em] uppercase border border-slate-700 text-white px-8 py-4 hover:border-slate-500 transition-colors text-center"
                  >
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
  );
}
