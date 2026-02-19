import Link from "next/link";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

function FightCard({
  title,
  location,
  parties,
  atStake,
  status,
}: {
  title: string;
  location: string;
  parties: string;
  atStake: string;
  status: "ongoing" | "resolved" | "critical";
}) {
  const statusConfig = {
    ongoing: { label: "Ongoing", classes: "bg-yellow-100 text-yellow-800" },
    resolved: { label: "Resolved", classes: "bg-emerald-100 text-emerald-800" },
    critical: { label: "Critical", classes: "bg-red-100 text-red-800" },
  };

  return (
    <div className="group relative rounded-2xl border border-slate-200/80 bg-white p-6 transition-all hover:border-slate-300 hover:shadow-lg">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${statusConfig[status].classes}`}>
          {statusConfig[status].label}
        </span>
      </div>
      <dl className="mt-4 space-y-2">
        <div className="flex gap-2 text-sm">
          <dt className="font-medium text-slate-500 shrink-0">Location</dt>
          <dd className="text-slate-700">{location}</dd>
        </div>
        <div className="flex gap-2 text-sm">
          <dt className="font-medium text-slate-500 shrink-0">Parties</dt>
          <dd className="text-slate-700">{parties}</dd>
        </div>
        <div className="flex gap-2 text-sm">
          <dt className="font-medium text-slate-500 shrink-0">At Stake</dt>
          <dd className="text-slate-700">{atStake}</dd>
        </div>
      </dl>
    </div>
  );
}

function NewsBrief({
  title,
  what,
  why,
  take,
  status,
  sources,
}: {
  title: string;
  what: string;
  why: string;
  take: string;
  status: string;
  sources: { label: string; href: string }[];
}) {
  return (
    <article className="pb-12 mb-12 border-b border-slate-200 last:border-b-0 last:mb-0 last:pb-0">
      <h3 className="text-2xl font-semibold text-slate-900">{title}</h3>

      <div className="mt-6 space-y-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-slate-400 mb-2">What's happening</p>
          <p className="leading-relaxed text-slate-700">{what}</p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-slate-400 mb-2">Why it matters</p>
          <p className="leading-relaxed text-slate-700">{why}</p>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-5">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-2">Blue Duck Take</p>
        <p className="text-sm leading-relaxed text-slate-700">{take}</p>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-4">
        <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-800">
          {status}
        </span>
        <span className="text-sm text-slate-500">
          Sources:{" "}
          {sources.map((s, i) => (
            <span key={s.label}>
              <a href={s.href} className="text-slate-700 underline underline-offset-2 hover:text-slate-900">
                {s.label}
              </a>
              {i < sources.length - 1 && <span className="mx-1 text-slate-300">·</span>}
            </span>
          ))}
        </span>
      </div>
    </article>
  );
}

export default function Conservation() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow bg-white">
        {/* HERO */}
        <section className="relative overflow-hidden border-b border-slate-100">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#f1f5f9_0%,_transparent_50%)]" />
          </div>
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
            <div className="max-w-3xl">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm font-medium text-slate-700 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-slate-900 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-slate-900"></span>
                </span>
                Continuously updated
              </div>
              <h1 className="mt-8 text-5xl font-light tracking-tight text-slate-900 sm:text-6xl">
                Texas Conservation Watch
              </h1>
              <p className="mt-6 text-xl leading-relaxed text-slate-600">
                Tracking the policies, legal battles, and land-use decisions shaping Texas wildlife, water, and public access — so our community stays informed and engaged.
              </p>
            </div>
          </div>
        </section>

        {/* CATEGORY NAV */}
        <section className="sticky top-0 z-10 border-b border-slate-200 bg-white shadow-sm">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <nav className="flex gap-1 overflow-x-auto py-1" aria-label="Conservation categories">
              {[
                { label: "Waterfowl & Wetlands", href: "#waterfowl" },
                { label: "Public Hunting & Access", href: "#hunting" },
                { label: "Parks, Refuges & Lands", href: "#lands" },
                { label: "Endangered Species", href: "#species" },
                { label: "Courts & Policy", href: "#policy" },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="whitespace-nowrap rounded-lg px-4 py-3 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </section>

        {/* ACTIVE FIGHTS */}
        <section className="border-b border-slate-100 bg-slate-50" id="waterfowl">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <div className="max-w-2xl">
                <h2 className="text-4xl font-light tracking-tight text-slate-900">Active Conservation Fights</h2>
                <p className="mt-3 text-lg text-slate-600">
                  Current legal, regulatory, and legislative battles affecting Texas conservation and habitat.
                </p>
              </div>
              <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 hover:text-slate-700">
                Submit a tip
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2">
              <FightCard
                title="Wetlands Protection After Sackett v. EPA"
                location="Texas Coast & Inland Prairies"
                parties="Developers vs. Conservation Groups"
                atStake="Seasonal wetlands critical to teal and pintail habitat"
                status="ongoing"
              />
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-6">
                <h3 className="text-lg font-semibold text-slate-900">Know something happening locally?</h3>
                <p className="mt-2 text-sm text-slate-600">
                  Help us track conservation issues affecting Texas waterfowl and habitat. We rely on landowners, hunters, and community members to stay ahead of emerging threats.
                </p>
                <Link href="/contact" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-900 hover:text-slate-700">
                  Submit a tip
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* NEWS BRIEFS */}
        <section className="border-b border-slate-100 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="grid gap-16 lg:grid-cols-[1fr_320px]">
              <div>
                <h2 className="text-4xl font-light tracking-tight text-slate-900">Recent Updates</h2>
                <p className="mt-3 text-lg text-slate-600">
                  In-depth coverage of the issues shaping Texas waterfowl, habitat, and conservation policy.
                </p>

                <div className="mt-12">
                  <NewsBrief
                    title="Texas Blue-Winged Teal Season Adjustments"
                    what="Texas wildlife managers are monitoring blue-winged teal populations following surveys showing breeding population trends tied to habitat conditions and drought patterns across the Central Flyway."
                    why="Texas sits at the center of the Central Flyway. Habitat stress — especially wetland loss and drought — affects migration success statewide and can directly influence season lengths and bag limits for hunters."
                    take="Teal populations are early indicators of wetland health. Protecting seasonal wetlands and playas during peak migration is critical for maintaining huntable populations and long-term flyway integrity."
                    status="Ongoing"
                    sources={[
                      { label: "TPWD", href: "https://tpwd.texas.gov" },
                      { label: "USFWS", href: "https://www.fws.gov" },
                    ]}
                  />

                  <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
                    <p className="text-slate-600">Additional conservation updates coming soon.</p>
                    <Link
                      href="#subscribe"
                      className="mt-4 inline-flex items-center justify-center rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
                    >
                      Get monthly updates
                    </Link>
                  </div>
                </div>
              </div>

              {/* SIDEBAR */}
              <aside className="space-y-6">
                <div className="rounded-2xl border border-slate-200/80 bg-slate-50 p-6">
                  <h3 className="text-base font-semibold text-slate-900">Dealing with wetlands permitting?</h3>
                  <p className="mt-2 text-sm text-slate-600">
                    We're listening to landowners navigating conservation regulations. Your experience shapes our advocacy.
                  </p>
                  <Link href="/contact" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-900 hover:text-slate-700">
                    Share your story
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>

                <div className="rounded-2xl border border-slate-200/80 bg-white p-6">
                  <h3 className="text-base font-semibold text-slate-900">Watch categories</h3>
                  <ul className="mt-4 space-y-2">
                    {["Waterfowl & Wetlands", "Public Hunting & Access", "Parks, Refuges & Lands", "Endangered Species", "Courts & Policy"].map((cat) => (
                      <li key={cat}>
                        <a href={`#${cat.toLowerCase().replace(/[^a-z]/g, "-")}`} className="flex items-center justify-between text-sm text-slate-600 hover:text-slate-900">
                          {cat}
                          <svg className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* NEWSLETTER CTA */}
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="overflow-hidden rounded-2xl bg-slate-900 shadow-xl">
              <div className="px-8 py-12 md:px-12 md:py-16">
                <div className="grid gap-8 md:grid-cols-2 md:items-center">
                  <div>
                    <h3 className="text-3xl font-light tracking-tight text-white">Texas Waterfowl & Habitat Brief</h3>
                    <p className="mt-3 text-lg text-slate-300">
                      Monthly roundup of policy developments, habitat trends, and upcoming decisions affecting Texas waterfowl — delivered directly to your inbox.
                    </p>
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 font-semibold text-slate-900 transition-colors hover:bg-slate-100"
                    >
                      Subscribe to monthly brief
                    </Link>
                    <Link
                      href="#archive"
                      className="inline-flex items-center justify-center rounded-xl border border-white/30 px-8 py-4 font-semibold text-white transition-colors hover:bg-white/10"
                    >
                      View archive
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
