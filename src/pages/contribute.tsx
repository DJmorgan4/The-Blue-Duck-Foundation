import React from 'react';
import Link from 'next/link';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

// ─── CONTRIBUTION OPTION ───────────────────────────────────────────────────
function ContributionOption({
  number,
  title,
  description,
  cta,
  href,
}: {
  number: string;
  title: string;
  description: string;
  cta: string;
  href: string;
}) {
  return (
    <div className="border-t border-slate-100 pt-6 pb-2 group">
      <div className="text-[10px] tracking-[0.2em] uppercase text-slate-300 font-medium mb-4">
        {number}
      </div>
      <h3 className="font-['Cormorant_Garamond'] text-2xl font-light text-slate-900 mb-3">
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-slate-500 font-light mb-5">
        {description}
      </p>
      <Link
        href={href}
        className="text-[11px] font-medium tracking-[0.12em] uppercase text-slate-500 hover:text-slate-900 transition-colors inline-flex items-center gap-2"
      >
        {cta} →
      </Link>
    </div>
  );
}

// ─── GIVING TIER ───────────────────────────────────────────────────────────
function GivingTier({
  level,
  amount,
  description,
  benefits,
  featured,
}: {
  level: string;
  amount: string;
  description: string;
  benefits: string[];
  featured?: boolean;
}) {
  return (
    <div className={`p-8 border flex flex-col justify-between ${featured ? 'border-slate-900 bg-slate-900' : 'border-slate-100 bg-white'}`}>
      <div>
        <div className="flex items-baseline justify-between mb-6">
          <div>
            <div className={`text-[10px] tracking-[0.2em] uppercase font-medium mb-2 ${featured ? 'text-slate-500' : 'text-slate-300'}`}>
              {level}
            </div>
            <div className={`font-['Cormorant_Garamond'] text-4xl font-light ${featured ? 'text-white' : 'text-slate-900'}`}>
              {amount}
            </div>
          </div>
        </div>
        <p className={`text-sm leading-relaxed font-light mb-6 ${featured ? 'text-slate-400' : 'text-slate-500'}`}>
          {description}
        </p>
        <ul className="space-y-2.5">
          {benefits.map((b, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className={`mt-1.5 w-1 h-1 rounded-full flex-shrink-0 ${featured ? 'bg-slate-500' : 'bg-slate-300'}`} />
              <span className={`text-[13px] font-light leading-relaxed ${featured ? 'text-slate-300' : 'text-slate-600'}`}>{b}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-8">
        <Link
          href="/contact"
          className={`text-[11px] font-medium tracking-[0.14em] uppercase px-6 py-3 inline-flex transition-colors ${
            featured
              ? 'bg-white text-slate-900 hover:bg-slate-100'
              : 'border border-slate-200 text-slate-700 hover:border-slate-400'
          }`}
        >
          Get started
        </Link>
      </div>
    </div>
  );
}

// ─── PAGE ──────────────────────────────────────────────────────────────────
export default function ContributePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow bg-white font-['Jost',sans-serif]">

        {/* ── HERO ──────────────────────────────────────────────────────── */}
        <section className="border-b border-slate-100">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-[55fr_45fr] min-h-[440px]">

              <div className="py-20 lg:py-28 lg:pr-16 lg:border-r border-slate-100 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-10">
                    <div className="w-6 h-px bg-slate-300" />
                    <span className="text-[10px] tracking-[0.2em] uppercase text-slate-400 font-medium">
                      501(c)(3) Confirmed · EIN 41-4361489
                    </span>
                  </div>

                  <h1 className="font-['Cormorant_Garamond'] text-6xl lg:text-7xl font-light leading-[1.04] tracking-tight text-slate-900 mb-8">
                    Support work<br />
                    that <em className="italic">endures.</em>
                  </h1>

                  <p className="text-[15px] leading-[1.9] text-slate-500 font-light max-w-md mb-4">
                    Your contribution to The Blue Duck Foundation is fully tax-deductible. We create transparent, compliant pathways to fund conservation, environmental science, cultural preservation, and humanitarian work — globally.
                  </p>
                  <p className="text-[15px] leading-[1.9] text-slate-500 font-light max-w-md">
                    Good work has always existed. What's been missing is the infrastructure to support it. We're building that now.
                  </p>
                </div>
              </div>

              <div className="hidden lg:flex flex-col justify-center py-28 pl-16">
                <div className="space-y-0">
                  {[
                    "Tax-deductible donations open",
                    "Contributions deductible under IRC §170",
                    "Publicly supported charity",
                    "Annual 990 filing · Full transparency",
                    "No private foundation restrictions",
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 py-3.5 border-b border-slate-100 first:border-t">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                      <span className="text-sm text-slate-600 font-light">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── WAYS TO SUPPORT ───────────────────────────────────────────── */}
        <section className="border-b border-slate-100">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-24">
            <div className="grid lg:grid-cols-[1fr_3fr] gap-16 lg:gap-24">

              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-5 h-px bg-slate-300" />
                  <span className="text-[10px] tracking-[0.2em] uppercase text-slate-400 font-medium">
                    Get involved
                  </span>
                </div>
                <h2 className="font-['Cormorant_Garamond'] text-4xl font-light text-slate-900 leading-tight">
                  Ways to<br />support
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-slate-400 font-light">
                  Whether you're a donor, researcher, professional, or simply someone who believes in this work — there's a place for you.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10">
                <ContributionOption
                  number="01"
                  title="Make a donation"
                  description="Your gift is fully tax-deductible. Every dollar funds conservation, science, cultural preservation, or humanitarian work in the field."
                  cta="Donate now"
                  href="/contact"
                />
                <ContributionOption
                  number="02"
                  title="Skills & expertise"
                  description="Contribute your background in conservation, law, finance, science, technology, or community organizing to build real capacity."
                  cta="Volunteer"
                  href="/contact"
                />
                <ContributionOption
                  number="03"
                  title="Research partnership"
                  description="Working on conservation science, environmental monitoring, archaeology, or humanitarian work? Let's explore how we can support each other."
                  cta="Explore partnerships"
                  href="/contact"
                />
                <ContributionOption
                  number="04"
                  title="Make an introduction"
                  description="Know someone doing important work that could benefit from a transparent support pathway? Make the introduction."
                  cta="Connect us"
                  href="/contact"
                />
                <ContributionOption
                  number="05"
                  title="Advisory & strategy"
                  description="Help us build the right programs and reach the right communities. We're early — your input carries real weight."
                  cta="Offer guidance"
                  href="/contact"
                />
                <ContributionOption
                  number="06"
                  title="Stay informed"
                  description="Subscribe to updates on programs, partnerships, and opportunities as we grow. Know what we're doing and where we're going."
                  cta="Subscribe"
                  href="/contact"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── GIVING LEVELS ─────────────────────────────────────────────── */}
        <section className="border-b border-slate-100 bg-slate-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-24">
            <div className="mb-14">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-5 h-px bg-slate-300" />
                <span className="text-[10px] tracking-[0.2em] uppercase text-slate-400 font-medium">
                  Giving levels
                </span>
              </div>
              <h2 className="font-['Cormorant_Garamond'] text-4xl font-light text-slate-900 mb-3">
                Find your level
              </h2>
              <p className="text-sm leading-relaxed text-slate-400 font-light max-w-xl">
                Every gift funds specific programs, field research, and community initiatives. All contributions are fully tax-deductible under IRC Section 170.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-200">
              <GivingTier
                level="Supporter"
                amount="$25+"
                description="Fund essential operations, outreach, and public education programs."
                benefits={[
                  "Quarterly foundation updates",
                  "Annual impact report",
                  "Supporter recognition",
                ]}
              />
              <GivingTier
                level="Conservator"
                amount="$100+"
                description="Direct support for field programs, monitoring, and research partnerships."
                benefits={[
                  "All Supporter benefits",
                  "Behind-the-scenes field updates",
                  "Invitation to annual events",
                ]}
              />
              <GivingTier
                level="Steward"
                amount="$500+"
                description="Fund meaningful conservation initiatives and international partnerships."
                featured
                benefits={[
                  "All Conservator benefits",
                  "Exclusive project briefings",
                  "Website & report recognition",
                  "Input on program priorities",
                ]}
              />
              <GivingTier
                level="Guardian"
                amount="$1,000+"
                description="Major support for long-term programs and global conservation capacity."
                benefits={[
                  "All Steward benefits",
                  "Annual meeting with leadership",
                  "Field program site visits",
                  "Strategic planning input",
                ]}
              />
            </div>

            <div className="mt-px bg-white border border-slate-100 p-8 lg:p-10">
              <div className="grid lg:grid-cols-2 gap-8 lg:items-center">
                <div>
                  <h3 className="font-['Cormorant_Garamond'] text-2xl font-light text-slate-900 mb-2">
                    Larger gifts & institutional support
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-500 font-light">
                    For major gifts, research grants, corporate partnerships, or international collaboration — every significant partnership is built on personal conversation and mutual trust.
                  </p>
                </div>
                <div className="lg:flex lg:justify-end">
                  <Link
                    href="/contact"
                    className="text-[11px] font-medium tracking-[0.14em] uppercase bg-slate-900 text-white px-7 py-3.5 hover:bg-slate-700 transition-colors inline-flex"
                  >
                    Contact us directly
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── TRANSPARENCY ──────────────────────────────────────────────── */}
        <section className="border-b border-slate-100">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-24">
            <div className="grid lg:grid-cols-[1fr_2fr] gap-16 lg:gap-24">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-5 h-px bg-slate-300" />
                  <span className="text-[10px] tracking-[0.2em] uppercase text-slate-400 font-medium">
                    Accountability
                  </span>
                </div>
                <h2 className="font-['Cormorant_Garamond'] text-4xl font-light text-slate-900 leading-tight">
                  Our commitment<br />to transparency
                </h2>
              </div>
              <div>
                <p className="text-[15px] leading-[1.9] text-slate-500 font-light mb-10">
                  Transparency isn't a feature of The Blue Duck Foundation — it's the foundation itself. Every dollar raised, every program funded, and every outcome achieved will be publicly documented. We build accountability systems from day one because the people who support this work deserve to see exactly what it does.
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

        {/* ── CONTACT FORM ──────────────────────────────────────────────── */}
        <section className="bg-slate-900">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-24">
            <div className="grid lg:grid-cols-[1fr_2fr] gap-16 lg:gap-24">

              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-5 h-px bg-slate-700" />
                  <span className="text-[10px] tracking-[0.2em] uppercase text-slate-500 font-medium">
                    Connect
                  </span>
                </div>
                <h2 className="font-['Cormorant_Garamond'] text-4xl font-light text-white leading-tight mb-6">
                  Get involved<br /><em className="italic">from the start.</em>
                </h2>
                <p className="text-[15px] leading-[1.9] text-slate-400 font-light">
                  Whether you're a future donor, potential partner, researcher, or simply want to follow our progress — we'd like to hear from you.
                </p>
              </div>

              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-[11px] tracking-[0.1em] uppercase text-slate-500 font-medium mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full border border-slate-700 bg-slate-800 px-4 py-3 text-white text-sm placeholder:text-slate-600 focus:border-slate-500 focus:outline-none"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-[11px] tracking-[0.1em] uppercase text-slate-500 font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full border border-slate-700 bg-slate-800 px-4 py-3 text-white text-sm placeholder:text-slate-600 focus:border-slate-500 focus:outline-none"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="interest" className="block text-[11px] tracking-[0.1em] uppercase text-slate-500 font-medium mb-2">
                    How would you like to get involved?
                  </label>
                  <select
                    id="interest"
                    className="w-full border border-slate-700 bg-slate-800 px-4 py-3 text-white text-sm focus:border-slate-500 focus:outline-none"
                  >
                    <option value="">Select an option</option>
                    <option value="donate">Make a donation</option>
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
                  <label htmlFor="message" className="block text-[11px] tracking-[0.1em] uppercase text-slate-500 font-medium mb-2">
                    Message <span className="text-slate-600 normal-case tracking-normal">(optional)</span>
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full border border-slate-700 bg-slate-800 px-4 py-3 text-white text-sm placeholder:text-slate-600 focus:border-slate-500 focus:outline-none"
                    placeholder="Tell us about your interest, your work, or how you'd like to connect..."
                  />
                </div>

                <button
                  type="submit"
                  className="text-[11px] font-medium tracking-[0.14em] uppercase bg-white text-slate-900 px-8 py-4 hover:bg-slate-100 transition-colors w-full"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
