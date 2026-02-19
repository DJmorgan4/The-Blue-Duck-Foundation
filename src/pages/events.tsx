import Link from "next/link";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

function EventCard({
  title,
  date,
  description,
  highlights,
  status,
  ctaLabel,
}: {
  title: string;
  date: string;
  description: string;
  highlights: string[];
  status: "coming-soon" | "open" | "active";
  ctaLabel: string;
}) {
  const statusConfig = {
    "coming-soon": { label: "Coming Soon", classes: "bg-yellow-100 text-yellow-800" },
    open: { label: "Registration Open", classes: "bg-emerald-100 text-emerald-800" },
    active: { label: "Active", classes: "bg-blue-100 text-blue-800" },
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white transition-all hover:border-slate-300 hover:shadow-lg">
      <div className="aspect-[16/7] bg-gradient-to-br from-slate-100 to-slate-200" />
      <div className="p-8">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
          <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${statusConfig[status].classes}`}>
            {statusConfig[status].label}
          </span>
        </div>
        <p className="mt-1 text-sm font-medium text-slate-500">{date}</p>
        <p className="mt-4 leading-relaxed text-slate-600">{description}</p>
        <ul className="mt-5 space-y-2">
          {highlights.map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm text-slate-700">
              <svg className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
              </svg>
              {item}
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <Link
            href="/contact"
            className="inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}

function QuarterRow({
  period,
  label,
  title,
  items,
  highlight,
}: {
  period: string;
  label: string;
  title: string;
  items: string[];
  highlight?: boolean;
}) {
  return (
    <div className={`rounded-2xl border p-6 transition-all hover:shadow-md ${highlight ? "border-slate-300 bg-white shadow-sm" : "border-slate-200/80 bg-white"}`}>
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-lg font-semibold text-slate-900">{period}</h3>
        {highlight && (
          <span className="inline-flex w-fit rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
            Peak Season
          </span>
        )}
        {!highlight && <span className="text-xs font-medium text-slate-400">{label}</span>}
      </div>
      <h4 className="mt-3 text-base font-semibold text-slate-700">{title}</h4>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-sm text-slate-600">
            <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Events() {
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
                2026 Event Season
              </div>
              <h1 className="mt-8 text-5xl font-light tracking-tight text-slate-900 sm:text-6xl">
                Events & Community Programs
              </h1>
              <p className="mt-6 text-xl leading-relaxed text-slate-600">
                Building community through conservation, competition, and celebration. Every event funds the habitat work that matters.
              </p>
            </div>
          </div>
        </section>

        {/* SIGNATURE EVENTS */}
        <section className="border-b border-slate-100 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-4xl font-light tracking-tight text-slate-900">Signature Events</h2>
              <p className="mt-4 text-lg text-slate-600">
                Annual flagship events that bring together supporters, sponsors, and conservation leaders for high-impact fundraising and community engagement.
              </p>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-2">
              <EventCard
                title="The Blue Duck Banquet"
                date="October 2026"
                status="coming-soon"
                description="An elevated evening celebrating conservation, community, and the mission behind The Blue Duck Foundation. An annual tradition in the making."
                highlights={["Formal dinner & program", "Silent and live auction", "Conservation impact showcase", "Sponsor recognition ceremony"]}
                ctaLabel="Become a Sponsor"
              />
              <EventCard
                title="Blue Duck Gold Tournament"
                date="September 2026"
                status="coming-soon"
                description="A competitive fundraising tournament bringing together supporters, sponsors, and community leaders for a high-energy day with purpose."
                highlights={["Tournament competition", "Team and individual awards", "Sponsor recognition", "Proceeds fund habitat restoration"]}
                ctaLabel="Register Interest"
              />
              <EventCard
                title="Blue Duck Clay Shooting Classic"
                date="September – October 2026 (Date TBD)"
                status="coming-soon"
                description="A classic outdoor fundraiser rooted in camaraderie, friendly competition, and the conservation values that define who we are."
                highlights={["Clay shooting competition", "Food and refreshments", "Awards and raffle", "Open to all skill levels"]}
                ctaLabel="Register Interest"
              />
              <EventCard
                title="Annual Wildlife Photography Calendar Competition"
                date="Submissions: Spring – Summer · Winners: Fall"
                status="coming-soon"
                description="A nationwide photography competition celebrating animals, nature, and the bond between people and the wild. Winners featured in The Blue Duck Foundation's annual calendar."
                highlights={["Open to amateurs and professionals", "Public voting and judges' selection", "Winners featured in Annual Calendar", "Proceeds support conservation programs"]}
                ctaLabel="Learn More"
              />
            </div>
          </div>
        </section>

        {/* YEAR-ROUND CALENDAR */}
        <section className="border-b border-slate-100 bg-slate-50">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-4xl font-light tracking-tight text-slate-900">Year-Round Calendar</h2>
              <p className="mt-4 text-lg text-slate-600">
                Conservation work doesn't stop between major events. Our community programs and engagement initiatives run year-round across Texas.
              </p>
            </div>

            <div className="mt-16 grid gap-4 md:grid-cols-2">
              <QuarterRow
                period="January – March"
                label="Q1"
                title="Community Outreach & Service"
                items={["Volunteer days", "Partnered charity support", "Local conservation service projects"]}
              />
              <QuarterRow
                period="April – June"
                label="Q2"
                title="Spring Fundraising & Outreach"
                items={["Small-scale fundraising events", "Community meet-ups", "Photography contest submissions open"]}
              />
              <QuarterRow
                period="July – August"
                label="Q3"
                title="Summer Community Engagement"
                items={["Youth and family-friendly events", "Outreach programs", "Calendar competition public voting"]}
              />
              <QuarterRow
                period="September"
                label=""
                title="Major Event Month"
                items={["Blue Duck Gold Tournament", "Clay Shooting Classic", "Fall fundraising campaign launch"]}
                highlight
              />
              <QuarterRow
                period="October"
                label=""
                title="Celebration & Awards"
                items={["The Blue Duck Banquet", "Photography Calendar winners announced", "Annual Calendar pre-orders and sales"]}
                highlight
              />
              <QuarterRow
                period="November – December"
                label="Q4"
                title="Giving Season & Impact"
                items={["Year-end giving campaign", "Community service initiatives", "Annual conservation impact report"]}
              />
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
                    <h3 className="text-3xl font-light tracking-tight text-white">Stay Connected</h3>
                    <p className="mt-3 text-lg text-slate-300">
                      Get updates on upcoming events, volunteer opportunities, and ways to support our mission across Texas.
                    </p>
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 font-semibold text-slate-900 transition-colors hover:bg-slate-100"
                    >
                      Get event updates
                    </Link>
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center rounded-xl border border-white/30 px-8 py-4 font-semibold text-white transition-colors hover:bg-white/10"
                    >
                      Volunteer sign-up
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
