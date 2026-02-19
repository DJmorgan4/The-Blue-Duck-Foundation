import Link from "next/link";

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="group">
      <div className="text-3xl font-light tracking-tight text-slate-900">{value}</div>
      <div className="mt-1.5 text-sm font-medium text-slate-500">{label}</div>
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

function InitiativeCard({
  title,
  location,
  tag,
}: {
  title: string;
  location: string;
  tag: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white transition-all hover:border-slate-300 hover:shadow-lg">
      <div className="aspect-[16/9] bg-gradient-to-br from-slate-100 to-slate-200" />
      <div className="p-6">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">
            {tag}
          </span>
          <span className="text-xs text-slate-500">{location}</span>
        </div>
        <h3 className="mt-3 text-xl font-semibold text-slate-900 group-hover:text-slate-700">{title}</h3>
        <p className="mt-3 text-sm text-slate-600">Strategic conservation initiative in development</p>
        <div className="mt-6 flex gap-3">
          <Link href="/conservation" className="flex-1 rounded-xl bg-slate-900 px-4 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-slate-800">
            Learn more
          </Link>
          <Link href="/contact" className="flex-1 rounded-xl border border-slate-300 px-4 py-2.5 text-center text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-50">
            Get involved
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
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                </span>
                501(c)(3) Nonprofit · EIN 41-4361489
              </div>

              <h1 className="mt-8 text-5xl font-light tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
                Protecting Texas wetlands and wildlife for future generations
              </h1>

              <p className="mt-6 text-lg leading-relaxed text-slate-600">
                The Blue Duck Foundation is a Texas-based 501(c)(3) nonprofit building a science-backed approach to habitat conservation, waterway protection, and community engagement across the Central Flyway.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-8 py-4 font-semibold text-white shadow-sm transition-all hover:bg-slate-800 hover:shadow-md"
                >
                  Our mission
                </Link>
                <Link
                  href="/conservation"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-8 py-4 font-semibold text-slate-900 transition-all hover:bg-slate-50"
                >
                  Conservation focus
                </Link>
              </div>

              <div className="mt-12 grid grid-cols-3 gap-8 border-t border-slate-200 pt-8">
                <Stat label="Legal status" value="Active" />
                <Stat label="Launch year" value="2026" />
                <Stat label="Primary region" value="Texas" />
              </div>

              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
                <TrustIndicator>Federally recognized 501(c)(3)</TrustIndicator>
                <TrustIndicator>Transparency first</TrustIndicator>
                <TrustIndicator>Community driven</TrustIndicator>
              </div>
            </div>

            {/* RIGHT PANEL */}
            <div className="flex flex-col gap-6">
              <div className="rounded-2xl border border-slate-200/80 bg-white p-8 shadow-sm">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-slate-900">Foundation Development</h2>
                    <p className="mt-1 text-slate-600">Building the structure for long-term conservation impact</p>
                  </div>
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-800">
                    Active
                  </span>
                </div>

                <div className="mt-8 space-y-6">
                  <div className="rounded-xl bg-slate-50 p-5">
                    <h3 className="text-sm font-semibold text-slate-900">2026 priorities</h3>
                    <ul className="mt-3 space-y-2.5">
                      {[
                        "501(c)(3) status confirmed — EIN 41-4361489",
                        "Board of Directors established",
                        "Building conservation partnerships across Texas",
                        "Deploying IoT environmental monitoring systems",
                        "Launching inaugural fundraising events",
                      ].map((item) => (
                        <li key={item} className="flex gap-3 text-sm text-slate-700">
                          <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                          </svg>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <Link href="/about" className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800">
                      Learn more
                    </Link>
                    <Link href="/contact" className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-50">
                      Get involved
                    </Link>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200/80 bg-slate-900 p-8 text-white">
                <h3 className="text-lg font-semibold">Built on transparency</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">
                  From day one, we're committed to detailed reporting, clear financial accountability, and measurable conservation outcomes. Every initiative includes public progress updates and third-party verification.
                </p>
                <Link href="/about" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-slate-200">
                  Our approach
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
            <h2 className="text-4xl font-light tracking-tight text-slate-900">Science-driven conservation</h2>
            <p className="mt-4 text-lg text-slate-600">
              We build partnerships with ecological experts, wildlife agencies, and conservation organizations to develop high-impact strategies with documented outcomes.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            <FeatureCard
              title="Wetland conservation"
              desc="Protecting and restoring seasonal wetlands, playas, and coastal marshes critical to migratory waterfowl and shorebirds across the Central Flyway."
              icon={
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            />
            <FeatureCard
              title="Wildlife habitat support"
              desc="Supporting native grasslands, riparian corridors, and agricultural conservation practices that benefit game and non-game species throughout Texas."
              icon={
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              }
            />
            <FeatureCard
              title="Community engagement"
              desc="Building networks of hunters, landowners, conservationists, and outdoor enthusiasts committed to ethical stewardship and sustainable practices."
              icon={
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              }
            />
          </div>
        </div>
      </section>

      {/* CONSERVATION INITIATIVES */}
      <section className="border-b border-slate-100 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-light tracking-tight text-slate-900">Conservation priorities</h2>
              <p className="mt-3 text-lg text-slate-600">
                Strategic initiatives in development as we build foundation capacity and partnerships.
              </p>
            </div>
            <Link href="/conservation" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 hover:text-slate-700">
              View conservation focus
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <InitiativeCard tag="Wetlands" title="Texas Playa Lakes Conservation" location="Texas Panhandle" />
            <InitiativeCard tag="Habitat" title="Coastal Marsh Protection" location="Upper Texas Coast" />
            <InitiativeCard tag="Community" title="Hunter Education & Mentorship" location="Statewide Texas" />
          </div>

          <div className="mt-12 rounded-2xl border border-slate-200/80 bg-white p-8">
            <div className="grid gap-8 md:grid-cols-2 md:items-center">
              <div>
                <h3 className="text-2xl font-semibold text-slate-900">Accountability from the start</h3>
                <p className="mt-3 text-slate-600">
                  Every initiative includes clear objectives, baseline assessments, milestone tracking, and public reporting on outcomes and expenditures.
                </p>
              </div>
              <div className="flex gap-4 md:justify-end">
                <Link href="/about" className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-50">
                  Our standards
                </Link>
                <Link href="/conservation" className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800">
                  Conservation watch
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
                <h2 className="text-3xl font-light tracking-tight text-slate-900">Follow our progress</h2>
                <p className="mt-3 text-slate-600">
                  Stay informed as we build programs and launch conservation initiatives across Texas.
                </p>
              </div>
              <form className="flex flex-col gap-3 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
                <label className="sr-only" htmlFor="email">Email address</label>
                <input
                  id="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="your.email@example.com"
                  className="flex-1 rounded-xl border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400/20"
                  required
                />
                <button type="submit" className="rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white transition-colors hover:bg-slate-800">
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          <div className="mt-12 overflow-hidden rounded-2xl bg-slate-900 shadow-xl">
            <div className="px-8 py-12 md:px-12 md:py-16">
              <div className="grid gap-8 md:grid-cols-2 md:items-center">
                <div>
                  <h3 className="text-3xl font-light tracking-tight text-white">Help us build something real</h3>
                  <p className="mt-3 text-lg text-slate-300">
                    The Blue Duck Foundation is building the infrastructure for long-term conservation impact. Get involved as a founding supporter, advisor, or community partner.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-4">
                    {["Transparent from day one", "Science-backed approach", "Community driven"].map((item) => (
                      <div key={item} className="flex items-center gap-2 text-sm text-slate-300">
                        <svg className="h-5 w-5 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                        </svg>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
                  <Link href="/contact" className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 font-semibold text-slate-900 transition-colors hover:bg-slate-100">
                    Get involved
                  </Link>
                  <Link href="/about" className="inline-flex items-center justify-center rounded-xl border border-white/30 px-8 py-4 font-semibold text-white transition-colors hover:bg-white/10">
                    Our story
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
