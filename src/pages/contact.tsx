import React, { useState } from "react";
import Link from "next/link";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

function ContactCard({
  title,
  desc,
  detail,
  href,
  linkLabel,
  icon,
}: {
  title: string;
  desc: string;
  detail?: string;
  href: string;
  linkLabel: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="group relative">
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-slate-100 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="relative rounded-2xl border border-slate-200/80 bg-white p-8 transition-all group-hover:border-slate-300">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-white">
          {icon}
        </div>
        <h3 className="mt-5 text-lg font-semibold text-slate-900">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">{desc}</p>
        {detail && <p className="mt-3 text-sm font-medium text-slate-900">{detail}</p>}
        <a
          href={href}
          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-700 transition-colors hover:text-slate-900"
        >
          {linkLabel}
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  );
}

const INQUIRY_TYPES = [
  "General inquiry",
  "Board membership interest",
  "Sponsorship & partnerships",
  "Volunteer & get involved",
  "Media & press",
  "Wetlands permitting & landowner",
  "Conservation tip or local issue",
  "Donation inquiry",
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

      <main className="flex-grow bg-white">
        {/* HERO */}
        <section className="relative overflow-hidden border-b border-slate-100">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#f1f5f9_0%,_transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_#f8fafc_0%,_transparent_50%)]" />
          </div>
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
            <div className="max-w-3xl">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm font-medium text-slate-700 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                </span>
                We respond within 48 hours
              </div>
              <h1 className="mt-8 text-5xl font-light tracking-tight text-slate-900 sm:text-6xl">
                Get in Touch
              </h1>
              <p className="mt-6 text-xl leading-relaxed text-slate-600">
                Whether you're interested in the board, want to partner with us, have a conservation tip, or just want to learn more — we'd love to hear from you.
              </p>
            </div>
          </div>
        </section>

        {/* CONTACT CARDS */}
        <section className="border-b border-slate-100 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <ContactCard
                title="General Inquiries"
                desc="Questions about The Blue Duck Foundation, our programs, or how we operate."
                detail="info@theblueduck.org"
                href="mailto:info@theblueduck.org"
                linkLabel="Send an email"
                icon={
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                }
              />
              <ContactCard
                title="Partnerships & Sponsorships"
                desc="Interested in sponsoring events, partnering on conservation initiatives, or supporting our programs."
                detail="partnerships@theblueduck.org"
                href="mailto:partnerships@theblueduck.org"
                linkLabel="Explore partnership"
                icon={
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                  </svg>
                }
              />
              <ContactCard
                title="Board Membership"
                desc="We're actively seeking experienced professionals to fill two open board seats. Conservation, law, finance, and ag backgrounds welcome."
                href="/about#board"
                linkLabel="Learn about the board"
                icon={
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
                  </svg>
                }
              />
            </div>
          </div>
        </section>

        {/* CONTACT FORM */}
        <section className="border-b border-slate-100 bg-slate-50">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="grid gap-16 lg:grid-cols-[1fr_420px]">

              {/* FORM */}
              <div>
                <h2 className="text-4xl font-light tracking-tight text-slate-900">Send us a message</h2>
                <p className="mt-3 text-lg text-slate-600">
                  Fill out the form and the right person on our team will follow up directly.
                </p>

                {submitted ? (
                  <div className="mt-10 rounded-2xl border border-emerald-200 bg-emerald-50 p-10 text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
                      <svg className="h-7 w-7 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="mt-4 text-xl font-semibold text-slate-900">Message received</h3>
                    <p className="mt-2 text-slate-600">Thank you for reaching out. We'll be in touch within 48 hours.</p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-6 text-sm font-semibold text-slate-600 underline underline-offset-2 hover:text-slate-900"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="mt-10 space-y-6">
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-semibold text-slate-700 mb-2">
                          First name <span className="text-slate-400">*</span>
                        </label>
                        <input
                          id="firstName"
                          type="text"
                          required
                          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400/20"
                          placeholder="First"
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-semibold text-slate-700 mb-2">
                          Last name <span className="text-slate-400">*</span>
                        </label>
                        <input
                          id="lastName"
                          type="text"
                          required
                          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400/20"
                          placeholder="Last"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                        Email address <span className="text-slate-400">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400/20"
                        placeholder="you@example.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="organization" className="block text-sm font-semibold text-slate-700 mb-2">
                        Organization <span className="text-slate-400 font-normal">(optional)</span>
                      </label>
                      <input
                        id="organization"
                        type="text"
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400/20"
                        placeholder="Company or organization"
                      />
                    </div>

                    <div>
                      <label htmlFor="inquiryType" className="block text-sm font-semibold text-slate-700 mb-2">
                        Inquiry type <span className="text-slate-400">*</span>
                      </label>
                      <select
                        id="inquiryType"
                        required
                        defaultValue=""
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400/20"
                      >
                        <option value="" disabled>Select a category</option>
                        {INQUIRY_TYPES.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-2">
                        Message <span className="text-slate-400">*</span>
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={5}
                        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400/20 resize-none"
                        placeholder="Tell us how we can help or how you'd like to get involved..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-8 py-4 font-semibold text-white shadow-sm transition-all hover:bg-slate-800 hover:shadow-md sm:w-auto"
                    >
                      Send message
                    </button>
                  </form>
                )}
              </div>

              {/* SIDEBAR INFO */}
              <aside className="space-y-6">
                <div className="rounded-2xl border border-slate-200/80 bg-white p-8">
                  <h3 className="text-lg font-semibold text-slate-900">What to expect</h3>
                  <ul className="mt-5 space-y-4">
                    {[
                      { step: "01", text: "We review every message personally — no auto-responders beyond the confirmation." },
                      { step: "02", text: "Responses typically within 48 business hours." },
                      { step: "03", text: "For board and sponsorship inquiries, we'll schedule a call to discuss further." },
                    ].map((item) => (
                      <li key={item.step} className="flex gap-4">
                        <span className="shrink-0 text-xl font-light text-slate-200">{item.step}</span>
                        <p className="text-sm leading-relaxed text-slate-600">{item.text}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-slate-200/80 bg-white p-8">
                  <h3 className="text-lg font-semibold text-slate-900">Common inquiries</h3>
                  <ul className="mt-4 space-y-2">
                    {[
                      { label: "Board membership", href: "/about#board" },
                      { label: "Event sponsorships", href: "/events" },
                      { label: "Conservation programs", href: "/conservation" },
                      { label: "Volunteer opportunities", href: "#" },
                      { label: "Submit a conservation tip", href: "/conservation" },
                    ].map((item) => (
                      <li key={item.label}>
                        <Link
                          href={item.href}
                          className="flex items-center justify-between text-sm text-slate-600 py-1 hover:text-slate-900 transition-colors"
                        >
                          {item.label}
                          <svg className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-slate-200/80 bg-slate-900 p-8 text-white">
                  <h3 className="text-lg font-semibold">Based in Texas</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">
                    The Blue Duck Foundation operates across Texas with a focus on the Central Flyway. We're building from McKinney, TX and expanding statewide.
                  </p>
                  <p className="mt-4 text-sm font-medium text-slate-400">EIN 41-4361489</p>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="overflow-hidden rounded-2xl bg-slate-900 shadow-xl">
              <div className="px-8 py-12 md:px-12 md:py-16">
                <div className="grid gap-8 md:grid-cols-2 md:items-center">
                  <div>
                    <h3 className="text-3xl font-light tracking-tight text-white">Ready to make an impact?</h3>
                    <p className="mt-3 text-lg text-slate-300">
                      Whether you give time, resources, or expertise — every contribution builds the Foundation's capacity to protect Texas wetlands for generations.
                    </p>
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
                    <Link href="/about" className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 font-semibold text-slate-900 transition-colors hover:bg-slate-100">
                      Learn about us
                    </Link>
                    <Link href="/conservation" className="inline-flex items-center justify-center rounded-xl border border-white/30 px-8 py-4 font-semibold text-white transition-colors hover:bg-white/10">
                      Our conservation work
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
