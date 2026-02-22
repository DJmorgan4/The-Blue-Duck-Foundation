import React from 'react';
import Link from 'next/link';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

function ContributionOption({
  icon,
  title,
  description,
  cta,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  cta: string;
  href: string;
}) {
  return (
    <div className="group relative">
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-slate-100 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="relative rounded-2xl border border-slate-200/80 bg-white p-8 transition-all group-hover:border-slate-300">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-slate-900 text-white">
          {icon}
        </div>
        <h3 className="mt-6 text-xl font-semibold text-slate-900">{title}</h3>
        <p className="mt-3 leading-relaxed text-slate-600">{description}</p>
        <Link
          href={href}
          className="mt-6 inline-flex items-center gap-2 font-semibold text-slate-900 hover:text-slate-700"
        >
          {cta}
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

function ImpactLevel({
  level,
  amount,
  description,
  benefits,
}: {
  level: string;
  amount: string;
  description: string;
  benefits: string[];
}) {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-8 hover:border-slate-300 transition-all">
      <div className="flex items-baseline justify-between">
        <h3 className="text-2xl font-semibold text-slate-900">{level}</h3>
        <span className="text-3xl font-light text-slate-900">{amount}</span>
      </div>
      <p className="mt-4 text-slate-600">{description}</p>
      <ul className="mt-6 space-y-3">
        {benefits.map((benefit, index) => (
          <li key={index} className="flex items-start gap-3 text-sm text-slate-700">
            <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
            </svg>
            {benefit}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Contribute() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* HERO */}
        <section className="bg-gradient-to-b from-slate-50 to-white border-b border-slate-100 py-20 px-4">
          <div className="mx-auto max-w-4xl">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm font-medium text-slate-700 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
              </span>
              EIN 41-4361489 · 501(c)(3) Nonprofit
            </div>
            <h1 className="mt-8 text-5xl font-light tracking-tight text-slate-900 sm:text-6xl">
              Support work that matters
            </h1>
            <p className="mt-6 text-xl leading-relaxed text-slate-600 max-w-3xl">
              The Blue Duck Foundation creates transparent, fully compliant pathways for individuals and organizations to support conservation, scientific research, environmental technology, cultural preservation, and humanitarian work — globally.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-slate-600 max-w-3xl">
              Good work has always existed. What's been missing is the infrastructure to support it responsibly. We're building that now.
            </p>
          </div>
        </section>

        {/* FOUNDATION STATUS */}
        <section className="py-12 px-4 bg-blue-50 border-b border-blue-100">
          <div className="mx-auto max-w-4xl">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  Foundation Status — February 2026
                </h3>
                <p className="text-slate-700 leading-relaxed">
                  The Blue Duck Foundation is legally recognized by the State of Texas (filed February 18, 2026) and is currently completing federal 501(c)(3) tax-exempt status with the IRS. Direct tax-deductible donations will open once federal approval is confirmed. In the meantime, there are several meaningful ways to get involved as a founding supporter.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* WAYS TO CONTRIBUTE */}
        <section className="py-20 px-4 bg-white border-b border-slate-100">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-2xl mb-12">
              <h2 className="text-4xl font-light tracking-tight text-slate-900">Ways to support our mission</h2>
              <p className="mt-4 text-lg text-slate-600">
                Whether you're a researcher, a donor, a professional with relevant expertise, or simply someone who believes in this work — there's a place for you here.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <ContributionOption
                icon={
                  <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                }
                title="Founding supporter"
                description="Register your intent to support and be first notified when donation capabilities launch. Help shape our programs and priorities from the very beginning."
                cta="Register interest"
                href="#founding-supporter"
              />

              <ContributionOption
                icon={
                  <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                }
                title="Skills & expertise"
                description="Contribute your background in conservation, renewable energy, law, finance, environmental science, technology, or community organizing to build real capacity."
                cta="Volunteer sign-up"
                href="#volunteer"
              />

              <ContributionOption
                icon={
                  <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                }
                title="Research partnership"
                description="Working on conservation science, environmental monitoring, renewable energy, archaeology, or humanitarian environmental work? Let's explore how we can support each other."
                cta="Explore partnerships"
                href="#partnership"
              />

              <ContributionOption
                icon={
                  <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                }
                title="Introduce us"
                description="Know a conservationist, researcher, community leader, or organization doing important work that could benefit from a transparent support pathway? Make the introduction."
                cta="Connect us"
                href="#connect"
              />

              <ContributionOption
                icon={
                  <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                }
                title="Advisory & strategy"
                description="Help us build the right programs, reach the right communities, and structure support effectively. We're early — your input at this stage carries real weight."
                cta="Offer guidance"
                href="#advisory"
              />

              <ContributionOption
                icon={
                  <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                }
                title="Stay informed"
                description="Subscribe to updates on our programs, partnerships, and opportunities as we grow. Know what we're doing, where we're going, and how to get involved when the time is right."
                cta="Subscribe now"
                href="#updates"
              />
            </div>
          </div>
        </section>

        {/* GIVING LEVELS */}
        <section className="py-20 px-4 bg-slate-50 border-b border-slate-100">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-3xl mb-12">
              <h2 className="text-4xl font-light tracking-tight text-slate-900">Planned giving levels</h2>
              <p className="mt-4 text-lg text-slate-600">
                Once 501(c)(3) federal status is confirmed, these giving levels will fund specific programs, field research, and community initiatives across our global program areas.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <ImpactLevel
                level="Supporter"
                amount="$25+"
                description="Fund essential operations, outreach, and public education programs"
                benefits={[
                  "Quarterly updates on foundation progress",
                  "Annual impact report",
                  "Supporter recognition",
                ]}
              />
              <ImpactLevel
                level="Conservator"
                amount="$100+"
                description="Direct support for field programs, monitoring, and research partnerships"
                benefits={[
                  "All Supporter benefits",
                  "Behind-the-scenes field and program updates",
                  "Invitation to annual supporter events",
                ]}
              />
              <ImpactLevel
                level="Steward"
                amount="$500+"
                description="Fund meaningful conservation initiatives and international partnerships"
                benefits={[
                  "All Conservator benefits",
                  "Exclusive project briefings and reports",
                  "Recognition on website and in reports",
                  "Input on program priorities",
                ]}
              />
              <ImpactLevel
                level="Guardian"
                amount="$1,000+"
                description="Major support for long-term programs and global conservation capacity"
                benefits={[
                  "All Steward benefits",
                  "Annual meeting with foundation leadership",
                  "Site visit and field program opportunities",
                  "Strategic planning input",
                ]}
              />
            </div>

            <div className="mt-10 rounded-2xl border border-slate-200/80 bg-white p-8">
              <div className="grid gap-6 md:grid-cols-2 md:items-center">
                <div>
                  <h3 className="text-xl font-semibold text-slate-900">Larger gifts & institutional support</h3>
                  <p className="mt-2 text-slate-600">
                    For major gifts, research grants, corporate partnerships, or international collaboration, we'd like to speak directly. Every significant partnership is built on personal conversation and mutual trust.
                  </p>
                </div>
                <div className="md:text-right">
                  <Link href="/contact" className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800">
                    Contact us directly
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TRANSPARENCY */}
        <section className="py-20 px-4 bg-white border-b border-slate-100">
          <div className="mx-auto max-w-4xl">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 md:p-12">
              <h2 className="text-3xl font-light tracking-tight text-slate-900 mb-4">
                Our commitment to transparency
              </h2>
              <p className="text-slate-700 leading-relaxed mb-6">
                Transparency isn't a feature of The Blue Duck Foundation — it's the foundation itself. Every dollar raised, every program funded, and every outcome achieved will be publicly documented. We build systems for accountability from day one because we believe the people who support this work deserve to see exactly what it does.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  "Detailed financial reports published quarterly",
                  "Project-specific budgets and expenditure tracking",
                  "Third-party verification of program outcomes",
                  "Annual independent financial audit",
                  "Public disclosure of all board members and advisors",
                  "Open access to IRS filings and governing documents",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3 text-sm text-slate-700">
                    <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                    </svg>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT / INTEREST FORM */}
        <section className="py-20 px-4 bg-slate-900 text-white">
          <div className="mx-auto max-w-3xl">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-light tracking-tight mb-4">
                Get involved from the beginning
              </h2>
              <p className="text-lg text-slate-300">
                Whether you're a future donor, a potential partner, a researcher looking for a pathway, or simply want to follow our progress — we'd like to hear from you.
              </p>
            </div>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder:text-slate-500 focus:border-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-600/50"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder:text-slate-500 focus:border-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-600/50"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="interest" className="block text-sm font-medium text-slate-300 mb-2">
                  How would you like to get involved?
                </label>
                <select
                  id="interest"
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white focus:border-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-600/50"
                >
                  <option value="">Select an option</option>
                  <option value="founding-supporter">Founding supporter (future donation)</option>
                  <option value="research-partner">Research or program partnership</option>
                  <option value="volunteer">Volunteer my skills or time</option>
                  <option value="introduce">Introduce someone doing important work</option>
                  <option value="advisory">Advisory or strategic input</option>
                  <option value="major-gift">Major gift or institutional support</option>
                  <option value="updates">Stay informed</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                  Message <span className="text-slate-500">(optional)</span>
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder:text-slate-500 focus:border-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-600/50"
                  placeholder="Tell us about your interest, your work, or how you'd like to connect..."
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-white px-8 py-4 font-semibold text-slate-900 transition-colors hover:bg-slate-100"
              >
                Submit
              </button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
