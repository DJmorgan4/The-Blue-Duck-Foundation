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
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-slate-50 to-white py-16 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-5xl font-light tracking-tight text-slate-900 mb-6">
              Build conservation that lasts
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
              Support the development of The Blue Duck Foundation and help establish 
              science-backed conservation programs across Texas and the Central Flyway.
            </p>
          </div>
        </section>

        {/* Foundation Status Notice */}
        <section className="py-12 px-4 bg-blue-50 border-y border-blue-100">
          <div className="container mx-auto max-w-4xl">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  Foundation Development Phase
                </h3>
                <p className="text-slate-700 leading-relaxed">
                  The Blue Duck Foundation is currently completing 501(c)(3) filing and establishing 
                  foundational infrastructure. Direct donations will be accepted once our tax-exempt 
                  status is approved. In the meantime, there are several ways to support our mission 
                  and get involved as a founding contributor.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Ways to Contribute */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
              Ways to support our mission
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <ContributionOption
                icon={
                  <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                }
                title="Founding supporter interest"
                description="Join our list of founding supporters and be notified when donation capabilities launch. Help shape our programs from the beginning."
                cta="Register interest"
                href="#founding-supporter"
              />

              <ContributionOption
                icon={
                  <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                }
                title="Volunteer & expertise"
                description="Contribute your skills in conservation, legal, finance, marketing, or community outreach to help build foundation capacity."
                cta="Volunteer sign-up"
                href="#volunteer"
              />

              <ContributionOption
                icon={
                  <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                }
                title="Partnership & collaboration"
                description="Connect us with conservation organizations, landowners, or community groups aligned with our mission in Texas and beyond."
                cta="Explore partnerships"
                href="#partnership"
              />

              <ContributionOption
                icon={
                  <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                }
                title="Spread the word"
                description="Share our mission with your network, follow our progress on social media, and help build awareness for Texas conservation."
                cta="Follow our story"
                href="#social"
              />

              <ContributionOption
                icon={
                  <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                }
                title="Advisory & guidance"
                description="Provide strategic input on conservation approaches, nonprofit governance, or regional priorities as we establish programs."
                cta="Offer expertise"
                href="#advisory"
              />

              <ContributionOption
                icon={
                  <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                }
                title="Stay informed"
                description="Subscribe to updates on foundation development, conservation initiatives, and opportunities to contribute as we grow."
                cta="Subscribe now"
                href="#updates"
              />
            </div>
          </div>
        </section>

        {/* Future Giving Levels */}
        <section className="py-16 px-4 bg-slate-50">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Planned contribution levels
              </h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                Once 501(c)(3) status is approved, these giving levels will support specific 
                conservation outcomes and foundation operations.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <ImpactLevel
                level="Supporter"
                amount="$25+"
                description="Help fund essential operations and community outreach"
                benefits={[
                  "Quarterly email updates",
                  "Annual impact report",
                  "Supporter recognition"
                ]}
              />

              <ImpactLevel
                level="Conservator"
                amount="$100+"
                description="Direct support for habitat monitoring and field programs"
                benefits={[
                  "All Supporter benefits",
                  "Behind-the-scenes field updates",
                  "Invitation to annual events"
                ]}
              />

              <ImpactLevel
                level="Steward"
                amount="$500+"
                description="Fund significant conservation initiatives and partnerships"
                benefits={[
                  "All Conservator benefits",
                  "Exclusive project briefings",
                  "Recognition on website",
                  "Input on priority projects"
                ]}
              />

              <ImpactLevel
                level="Guardian"
                amount="$1,000+"
                description="Major support for long-term habitat protection"
                benefits={[
                  "All Steward benefits",
                  "Annual meeting with leadership",
                  "Site visit opportunities",
                  "Strategic planning input"
                ]}
              />
            </div>
          </div>
        </section>

        {/* Transparency Commitment */}
        <section className="py-16 px-4 bg-white">
          <div className="container mx-auto max-w-4xl">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 md:p-12">
              <h2 className="text-2xl font-semibold text-slate-900 mb-4">
                Our commitment to transparency
              </h2>
              <div className="space-y-4 text-slate-700 leading-relaxed">
                <p>
                  Every dollar contributed to The Blue Duck Foundation will be tracked and reported 
                  with complete transparency. We're building systems from day one to ensure:
                </p>
                <ul className="space-y-2 ml-6">
                  <li className="flex items-start gap-3">
                    <svg className="mt-1 h-5 w-5 flex-shrink-0 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                    </svg>
                    Detailed financial reports published quarterly
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="mt-1 h-5 w-5 flex-shrink-0 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                    </svg>
                    Project-specific budgets and expenditure tracking
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="mt-1 h-5 w-5 flex-shrink-0 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                    </svg>
                    Third-party verification of conservation outcomes
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="mt-1 h-5 w-5 flex-shrink-0 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                    </svg>
                    Annual independent financial audit
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="mt-1 h-5 w-5 flex-shrink-0 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                    </svg>
                    Public disclosure of all board members and advisors
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Contact/Interest Form Section */}
        <section className="py-16 px-4 bg-slate-900 text-white">
          <div className="container mx-auto max-w-3xl">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-light tracking-tight mb-4">
                Get involved from the beginning
              </h2>
              <p className="text-lg text-slate-300">
                Whether you want to be notified when donations open, volunteer your expertise, 
                or explore partnerships—we'd love to hear from you.
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
                  How would you like to contribute?
                </label>
                <select
                  id="interest"
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white focus:border-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-600/50"
                >
                  <option value="">Select an option</option>
                  <option value="founding-supporter">Founding supporter (future donation)</option>
                  <option value="volunteer">Volunteer my skills/time</option>
                  <option value="partnership">Explore partnership opportunities</option>
                  <option value="advisory">Provide advisory/strategic input</option>
                  <option value="updates">Just stay informed</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
                  Message (optional)
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white placeholder:text-slate-500 focus:border-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-600/50"
                  placeholder="Tell us about your interest or how you'd like to help..."
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
