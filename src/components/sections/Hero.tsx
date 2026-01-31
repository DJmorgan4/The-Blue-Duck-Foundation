import Link from "next/link";
import Image from "next/image";

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="group">
      <div className="text-3xl font-light tracking-tight text-slate-900">{value}</div>
      <div className="mt-1.5 text-sm font-medium text-slate-600">{label}</div>
    </div>
  );
}

function FeatureCard({
  title,
  desc,
  icon,
}: {
  title: string;
  desc: string;
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
        <p className="mt-2 leading-relaxed text-slate-600">{desc}</p>
      </div>
    </div>
  );
}

function ProjectCard({
  title,
  location,
  progress,
  tag,
  raised,
  goal,
}: {
  title: string;
  location: string;
  progress: number;
  tag: string;
  raised: string;
  goal: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white transition-all hover:border-slate-300 hover:shadow-lg">
      {/* Hero Image Placeholder */}
      <div className="aspect-[16/9] bg-gradient-to-br from-slate-100 to-slate-200" />
      
      <div className="p-6">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">
            {tag}
          </span>
          <span className="text-xs text-slate-500">{location}</span>
        </div>

        <h3 className="mt-3 text-xl font-semibold text-slate-900 group-hover:text-slate-700">
          {title}
        </h3>

        <div className="mt-5">
          <div className="flex items-baseline justify-between">
            <span className="text-sm font-medium text-slate-900">${raised} raised</span>
            <span className="text-sm text-slate-600">of ${goal}</span>
          </div>
          <div className="mt-2 h-1.5 rounded-full bg-slate-100">
            <div
              className="h-1.5 rounded-full bg-slate-900 transition-all"
              style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-slate-600">{progress}% funded</p>
        </div>

        <div className="mt-6 flex gap-3">
          <Link
            href="/contribute"
            className="flex-1 rounded-xl bg-slate-900 px-4 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-slate-800"
          >
            Support
          </Link>
          <Link
            href="/conservation"
            className="flex-1 rounded-xl border border-slate-300 px-4 py-2.5 text-center text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-50"
          >
            Learn more
          </Link>
        </div>
      </div>
    </div>
  );
}

function TrustIndicator({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 text-sm text-slate-600">
      <svg className="h-5 w-5 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
      </svg>
      {children}
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="bg-white">
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-slate-100">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#f1f5f9_0%,_transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_#f8fafc_0%,_transparent_50%)]" />
        </div>

        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col justify-center">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm font-medium text-slate-700 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-slate-900 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-slate-900"></span>
                </span>
                Active conservation projects across 12 states
              </div>

              <h1 className="mt-8 text-5xl font-light tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
                Restoring wild places for future generations
              </h1>

              <p className="mt-6 text-lg leading-relaxed text-slate-600">
                The Blue Duck Foundation funds science-backed habitat restoration, waterway protection, 
                and community conservation—with transparent reporting and measurable ecological impact.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Link
                  href="/contribute"
                  className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-8 py-4 font-semibold text-white shadow-sm transition-all hover:bg-slate-800 hover:shadow-md"
                >
                  Make a donation
                </Link>
                <Link
                  href="/conservation"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-8 py-4 font-semibold text-slate-900 transition-all hover:bg-slate-50"
                >
                  View our work
                </Link>
              </div>

              <div className="mt-12 grid grid-cols-3 gap-8 border-t border-slate-200 pt-8">
                <Stat label="Waterway miles protected" value="240+" />
                <Stat label="Acres restored" value="3,200+" />
                <Stat label="Community partners" value="67" />
              </div>

              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
                <TrustIndicator>501(c)(3) nonprofit</TrustIndicator>
                <TrustIndicator>Quarterly impact reports</TrustIndicator>
                <TrustIndicator>GuideStar verified</TrustIndicator>
              </div>
            </div>

            {/* RIGHT PANEL */}
            <div className="flex flex-col gap-6">
              <div className="rounded-2xl border border-slate-200/80 bg-white p-8 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-slate-900">
                      January 2026 Focus
                    </h2>
                    <p className="mt-1 text-slate-600">
                      Critical wetland restoration and riparian buffer projects
                    </p>
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                    Active
                  </span>
                </div>

                <div className="mt-8 space-y-6">
                  <div>
                    <div className="flex items-baseline justify-between">
                      <span className="text-sm font-medium text-slate-900">Monthly funding goal</span>
                      <span className="text-2xl font-light text-slate-900">$100,000</span>
                    </div>
                    <div className="mt-3 h-2 rounded-full bg-slate-100">
                      <div className="h-2 rounded-full bg-slate-900" style={{ width: '62%' }} />
                    </div>
                    <div className="mt-2 flex justify-between text-sm">
                      <span className="font-medium text-slate-900">$62,000 raised</span>
                      <span className="text-slate-600">62%</span>
                    </div>
                  </div>

                  <div className="rounded-xl bg-slate-50 p-5">
                    <h3 className="text-sm font-semibold text-slate-900">Your impact this month</h3>
                    <ul className="mt-3 space-y-2.5">
                      <li className="flex gap-3 text-sm text-slate-700">
                        <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                        </svg>
                        Native vegetation plantings and erosion control infrastructure
                      </li>
                      <li className="flex gap-3 text-sm text-slate-700">
                        <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                        </svg>
                        Water quality monitoring equipment and testing protocols
                      </li>
                      <li className="flex gap-3 text-sm text-slate-700">
                        <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                        </svg>
                        Community engagement events and volunteer coordination
                      </li>
                    </ul>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <Link
                      href="/contribute"
                      className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
                    >
                      Contribute
                    </Link>
                    <Link
                      href="/impact"
                      className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-50"
                    >
                      Impact dashboard
                    </Link>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200/80 bg-slate-900 p-8 text-white">
                <h3 className="text-lg font-semibold">Transparency commitment</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  Every project includes detailed budget breakdowns, quarterly progress reports, 
                  and third-party ecological assessments available to all stakeholders.
                </p>
                <Link
                  href="/financials"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-slate-200"
                >
                  View financial reports
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* APPROACH */}
      <section className="border-b border-slate-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-4xl font-light tracking-tight text-slate-900">
              Science-driven conservation
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              We partner with ecological experts, local communities, and land management agencies 
              to deploy high-impact conservation strategies with documented outcomes.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            <FeatureCard
              title="Habitat restoration"
              desc="Evidence-based native ecosystem recovery including wetlands, prairies, and riparian corridors using regionally appropriate species and proven methodologies."
              icon={
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            />
            <FeatureCard
              title="Waterway protection"
              desc="Comprehensive watershed management through pollution reduction, streambank stabilization, and continuous water quality monitoring with IoT sensor networks."
              icon={
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              }
            />
            <FeatureCard
              title="Community partnerships"
              desc="Direct funding and technical support for grassroots conservation groups, indigenous land stewards, and municipal environmental programs delivering measurable results."
              icon={
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              }
            />
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="border-b border-slate-100 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-light tracking-tight text-slate-900">
                Active projects
              </h2>
              <p className="mt-3 text-lg text-slate-600">
                Support critical conservation initiatives with transparent funding and regular progress updates.
              </p>
            </div>
            <Link
              href="/conservation"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 hover:text-slate-700"
            >
              View all projects
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <ProjectCard
              tag="Waterways"
              title="Clear Creek Watershed Restoration"
              location="Central Texas"
              progress={62}
              raised="62,000"
              goal="100,000"
            />
            <ProjectCard
              tag="Habitat"
              title="Tallgrass Prairie Recovery Initiative"
              location="Kansas-Nebraska Border"
              progress={41}
              raised="41,000"
              goal="100,000"
            />
            <ProjectCard
              tag="Wildlife"
              title="Coastal Wetland Nesting Sanctuary"
              location="Upper Texas Coast"
              progress={78}
              raised="78,000"
              goal="100,000"
            />
          </div>

          <div className="mt-12 rounded-2xl border border-slate-200/80 bg-white p-8">
            <div className="grid gap-8 md:grid-cols-2 md:items-center">
              <div>
                <h3 className="text-2xl font-semibold text-slate-900">
                  Project accountability standards
                </h3>
                <p className="mt-3 text-slate-600">
                  Every funded initiative includes baseline assessments, milestone tracking, 
                  post-completion monitoring, and independent verification of ecological outcomes.
                </p>
              </div>
              <div className="flex gap-4 md:justify-end">
                <Link
                  href="/methodology"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-50"
                >
                  Our methodology
                </Link>
                <Link
                  href="/impact"
                  className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
                >
                  Impact metrics
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEWSLETTER + CTA */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-slate-200/80 bg-white p-8 shadow-sm md:p-12">
            <div className="grid gap-8 md:grid-cols-2 md:items-center">
              <div>
                <h2 className="text-3xl font-light tracking-tight text-slate-900">
                  Field updates delivered monthly
                </h2>
                <p className="mt-3 text-slate-600">
                  Receive project progress reports, scientific findings, funding milestones, 
                  and volunteer opportunities directly from our conservation teams.
                </p>
              </div>

              <form
                className="flex flex-col gap-3 sm:flex-row"
                onSubmit={(e) => e.preventDefault()}
                aria-label="Newsletter signup"
              >
                <label className="sr-only" htmlFor="email">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="your.email@example.com"
                  className="flex-1 rounded-xl border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400/20"
                  required
                />
                <button
                  type="submit"
                  className="rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white transition-colors hover:bg-slate-800"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          <div className="mt-12 overflow-hidden rounded-2xl bg-slate-900 shadow-xl">
            <div className="px-8 py-12 md:px-12 md:py-16">
              <div className="grid gap-8 md:grid-cols-2 md:items-center">
                <div>
                  <h3 className="text-3xl font-light tracking-tight text-white">
                    Fund conservation that matters
                  </h3>
                  <p className="mt-3 text-lg text-slate-300">
                    Every contribution supports science-backed projects with transparent reporting 
                    and measurable ecological outcomes.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-4">
                    <div className="flex items-center gap-2 text-sm text-slate-300">
                      <svg className="h-5 w-5 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                      </svg>
                      Tax-deductible
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-300">
                      <svg className="h-5 w-5 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                      </svg>
                      Secure processing
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-300">
                      <svg className="h-5 w-5 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                      </svg>
                      Monthly or one-time
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
                  <Link
                    href="/contribute"
                    className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 font-semibold text-slate-900 transition-colors hover:bg-slate-100"
                  >
                    Make a donation
                  </Link>
                  <Link
                    href="/volunteer"
                    className="inline-flex items-center justify-center rounded-xl border border-white/30 px-8 py-4 font-semibold text-white transition-colors hover:bg-white/10"
                  >
                    Volunteer with us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}