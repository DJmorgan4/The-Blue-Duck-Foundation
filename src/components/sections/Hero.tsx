import Link from "next/link";

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="text-2xl font-bold text-slate-900">{value}</div>
      <div className="mt-1 text-sm text-slate-600">{label}</div>
    </div>
  );
}

function FeatureCard({
  title,
  desc,
}: {
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-lg font-bold text-slate-900">{title}</h3>
      <p className="mt-2 text-slate-700">{desc}</p>
    </div>
  );
}

function ProjectCard({
  title,
  location,
  progress,
  tag,
}: {
  title: string;
  location: string;
  progress: number; // 0-100
  tag: string;
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
            {tag}
          </p>
          <h3 className="mt-1 text-lg font-bold text-slate-900">{title}</h3>
          <p className="mt-1 text-sm text-slate-600">{location}</p>
        </div>
        <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
          {progress}% funded
        </span>
      </div>

      <div className="mt-5 h-3 rounded-full bg-slate-100 overflow-hidden">
        <div
          className="h-3 rounded-full bg-slate-900"
          style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
          aria-hidden="true"
        />
      </div>

      <div className="mt-5 flex gap-3">
        <Link
          href="/contribute"
          className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
        >
          Support this project
        </Link>
        <Link
          href="/conservation"
          className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-900 hover:bg-slate-50"
        >
          Learn more
        </Link>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="bg-white">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-slate-50 to-white" />
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div className="space-y-6">
              <p className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200">
                <span className="inline-block h-2 w-2 rounded-full bg-slate-900" />
                The Blue Duck Foundation
              </p>

              <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                Protect wildlife and restore the places they call home.
              </h1>

              <p className="text-lg leading-relaxed text-slate-700">
                We fund habitat restoration, clean waterways, and community-led
                conservation—focused on measurable outcomes and transparent
                reporting.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/contribute"
                  className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white hover:bg-slate-800"
                >
                  Donate now
                </Link>
                <Link
                  href="/conservation"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-900 hover:bg-slate-50"
                >
                  See our work
                </Link>
                <Link
                  href="/about"
                  className="text-sm font-semibold text-slate-700 hover:text-slate-900"
                >
                  How we operate →
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-3 pt-6">
                <Stat label="Miles of waterways supported" value="120+" />
                <Stat label="Habitat acres restored" value="1,800+" />
                <Stat label="Local partners funded" value="45+" />
              </div>

              <p className="text-xs text-slate-500">
                *Replace these metrics with your real numbers.
              </p>
            </div>

            {/* RIGHT PANEL */}
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    This Month’s Focus
                  </h2>
                  <p className="mt-1 text-slate-700">
                    Habitat restoration + water conservation initiatives.
                  </p>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                  January
                </span>
              </div>

              <div className="mt-6 rounded-2xl bg-slate-50 p-5">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-900">
                    Monthly goal
                  </p>
                  <p className="text-sm font-semibold text-slate-900">
                    $62,000 / $100,000
                  </p>
                </div>
                <div className="mt-3 h-3 rounded-full bg-white overflow-hidden">
                  <div className="h-3 bg-slate-900 w-[62%]" />
                </div>
                <p className="mt-2 text-sm text-slate-600">
                  62% funded — help finish the month strong.
                </p>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <Link
                    href="/contribute"
                    className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
                  >
                    Give today
                  </Link>
                  <Link
                    href="/impact"
                    className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-900 hover:bg-slate-50"
                  >
                    View impact report
                  </Link>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-slate-200 p-5">
                <h3 className="text-sm font-bold text-slate-900">
                  What your gift does
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  <li className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-slate-900" />
                    Funds native plantings and erosion control
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-slate-900" />
                    Supports cleanup days and equipment
                  </li>
                  <li className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-slate-900" />
                    Tracks outcomes with public reporting
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* TRUST BAR */}
          <div className="mt-12 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="grid gap-4 md:grid-cols-3 md:items-center">
              <div className="md:col-span-2">
                <h2 className="text-xl font-bold text-slate-900">
                  Transparent, community-driven conservation.
                </h2>
                <p className="mt-2 text-slate-700">
                  We publish project updates, budget summaries, and outcomes so
                  you can see where donations go.
                </p>
              </div>
              <div className="flex gap-3 md:justify-end">
                <Link
                  href="/financials"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50"
                >
                  Financials
                </Link>
                <Link
                  href="/impact"
                  className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
                >
                  Impact dashboard
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="border-t border-slate-100 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold text-slate-900">
              How we help
            </h2>
            <p className="mt-3 text-slate-700">
              We focus on practical, high-leverage projects with local partners
              and measurable outcomes.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <FeatureCard
              title="Restore habitats"
              desc="Native plantings, wetland recovery, and erosion prevention to rebuild ecosystems."
            />
            <FeatureCard
              title="Protect waterways"
              desc="Cleanups, runoff mitigation, and monitoring to keep water healthy for wildlife and communities."
            />
            <FeatureCard
              title="Fund local partners"
              desc="Grants and supplies for groups doing hands-on conservation where it matters most."
            />
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="border-t border-slate-100 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold text-slate-900">
                Featured projects
              </h2>
              <p className="mt-3 text-slate-700">
                Support a project directly or explore our full conservation
                portfolio.
              </p>
            </div>
            <Link
              href="/conservation"
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50"
            >
              Browse all projects →
            </Link>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <ProjectCard
              tag="Waterways"
              title="Clear Creek Cleanup + Bank Stabilization"
              location="Central Texas"
              progress={62}
            />
            <ProjectCard
              tag="Habitat"
              title="Native Grassland Restoration"
              location="Midwest Prairie Region"
              progress={41}
            />
            <ProjectCard
              tag="Wildlife"
              title="Nesting Habitat Protection"
              location="Gulf Coast"
              progress={78}
            />
          </div>
        </div>
      </section>

      {/* NEWSLETTER / CTA */}
      <section className="border-t border-slate-100 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="grid gap-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:grid-cols-2 md:items-center">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Get monthly updates from the field
              </h2>
              <p className="mt-2 text-slate-700">
                Short project updates, photos, funding progress, and upcoming
                volunteer opportunities.
              </p>
            </div>

            {/* Replace with your actual form integration */}
            <form
              className="flex flex-col gap-3 sm:flex-row"
              onSubmit={(e) => e.preventDefault()}
              aria-label="Newsletter signup"
            >
              <label className="sr-only" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="you@example.com"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400"
                required
              />
              <button
                type="submit"
                className="rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white hover:bg-slate-800"
              >
                Subscribe
              </button>
            </form>
          </div>

          <div className="mt-10 flex flex-col items-start justify-between gap-4 rounded-3xl bg-slate-900 p-8 text-white md:flex-row md:items-center">
            <div>
              <h3 className="text-2xl font-bold">
                Ready to make an impact today?
              </h3>
              <p className="mt-2 text-slate-200">
                Every donation supports real projects with public progress
                updates.
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/contribute"
                className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 font-semibold text-slate-900 hover:bg-slate-100"
              >
                Donate now
              </Link>
              <Link
                href="/volunteer"
                className="inline-flex items-center justify-center rounded-xl border border-white/30 px-6 py-3 font-semibold text-white hover:bg-white/10"
              >
                Volunteer
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
