import Link from "next/link";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

// ─── EVENT CARD ────────────────────────────────────────────────────────────
function EventCard({
  title,
  description,
  highlights,
  ctaLabel,
}: {
  title: string;
  description: string;
  highlights: string[];
  ctaLabel: string;
}) {
  return (
    <div className="border-t border-slate-100 pt-8">
      <div className="flex items-start justify-between gap-4 mb-4">
        <h3 className="font-['Cormorant_Garamond'] text-2xl font-light text-slate-900">
          {title}
        </h3>
        <span className="text-[10px] tracking-[0.15em] uppercase font-medium text-slate-400 flex-shrink-0 mt-1">
          TBD
        </span>
      </div>
      <p className="text-sm leading-relaxed text-slate-500 font-light mb-5">
        {description}
      </p>
      <ul className="space-y-2 mb-6">
        {highlights.map((item) => (
          <li key={item} className="flex items-start gap-3 text-sm text-slate-500 font-light">
            <span className="mt-2 w-1 h-1 rounded-full bg-slate-300 flex-shrink-0" />
            {item}
          </li>
        ))}
      </ul>
      <Link
        href="/contact"
        className="text-[11px] font-medium tracking-[0.12em] uppercase text-slate-500 hover:text-slate-900 transition-colors inline-flex items-center gap-2"
      >
        {ctaLabel} →
      </Link>
    </div>
  );
}

// ─── QUARTER ROW ───────────────────────────────────────────────────────────
function QuarterRow({
  period,
  title,
  items,
  highlight,
}: {
  period: string;
  title: string;
  items: string[];
  highlight?: boolean;
}) {
  return (
    <div className={`border-t pt-6 pb-4 ${highlight ? "border-slate-900" : "border-slate-100"}`}>
      <div className="flex items-baseline justify-between mb-3">
        <span className={`font-['Cormorant_Garamond'] text-xl font-light ${highlight ? "text-slate-900" : "text-slate-700"}`}>
          {period}
        </span>
        {highlight && (
          <span className="text-[10px] tracking-[0.15em] uppercase font-medium text-slate-900">
            Peak season
          </span>
        )}
      </div>
      <div className="text-[11px] tracking-[0.08em] uppercase text-slate-400 font-medium mb-3">
        {title}
      </div>
      <ul className="space-y-1.5">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-sm text-slate-500 font-light">
            <span className="mt-2 w-1 h-1 rounded-full bg-slate-300 flex-shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── PAGE ──────────────────────────────────────────────────────────────────
export default function EventsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow bg-white font-['Jost',sans-serif]">

        {/* ── HERO ──────────────────────────────────────────────────────── */}
        <section className="border-b border-slate-100">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-[55fr_45fr] min-h-[360px]">

              <div className="py-20 lg:py-28 lg:pr-16 lg:border-r border-slate-100 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-10">
                  <div className="w-6 h-px bg-slate-300" />
                  <span className="text-[10px] tracking-[0.2em] uppercase text-slate-400 font-medium">
                    2026 Event Season
                  </span>
                </div>
                <h1 className="font-['Cormorant_Garamond'] text-6xl lg:text-7xl font-light leading-[1.04] tracking-tight text-slate-900 mb-8">
                  Gather.<br />
                  <em className="italic">Give back.</em>
                </h1>
                <p className="text-[15px] leading-[1.9] text-slate-500 font-light max-w-md">
                  Every event we host funds the programs and people that matter — locally and around the world. Come for the community, stay for the mission.
                </p>
              </div>

              <div className="hidden lg:flex flex-col justify-center py-28 pl-16">
                {[
                  "The Blue Duck Banquet",
                  "Blue Duck Golf Tournament",
                  "Clay Shooting Classic",
                  "Nature & Wildlife Photography Competition",
                ].map((item, i) => (
                  <div key={i} className="flex items-baseline justify-between py-4 border-b border-slate-100 first:border-t">
                    <span className="font-['Cormorant_Garamond'] text-[19px] font-light text-slate-700">
                      {item}
                    </span>
                    <span className="text-[10px] tracking-[0.15em] text-slate-300 font-medium ml-4 flex-shrink-0">
                      TBD
                    </span>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* ── SIGNATURE EVENTS ──────────────────────────────────────────── */}
        <section className="border-b border-slate-100">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-24">
            <div className="grid lg:grid-cols-[1fr_3fr] gap-16 lg:gap-24">

              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-5 h-px bg-slate-300" />
                  <span className="text-[10px] tracking-[0.2em] uppercase text-slate-400 font-medium">
                    Signature events
                  </span>
                </div>
                <h2 className="font-['Cormorant_Garamond'] text-4xl font-light text-slate-900 leading-tight">
                  Annual<br />flagship events
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-slate-400 font-light">
                  High-impact fundraising, community engagement, and shared purpose. Dates to be announced — contact us to become a founding sponsor.
                </p>
                <div className="mt-8">
                  <Link
                    href="/contact"
                    className="text-[11px] font-medium tracking-[0.14em] uppercase bg-slate-900 text-white px-7 py-3.5 hover:bg-slate-700 transition-colors inline-flex"
                  >
                    Become a sponsor
                  </Link>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-x-12 gap-y-0">
                <EventCard
                  title="The Blue Duck Banquet"
                  description="An elevated evening celebrating conservation, community, and the mission behind The Blue Duck Foundation. A night of impact, storytelling, and shared commitment to the work ahead."
                  highlights={[
                    "Formal dinner & program",
                    "Silent and live auction",
                    "Conservation impact showcase",
                    "Sponsor recognition ceremony",
                  ]}
                  ctaLabel="Become a sponsor"
                />
                <EventCard
                  title="Blue Duck Golf Tournament"
                  description="A competitive fundraising tournament bringing together supporters, sponsors, and community leaders for a high-energy day on the course with real purpose behind every round."
                  highlights={[
                    "Tournament competition",
                    "Team and individual awards",
                    "Sponsor recognition",
                    "Proceeds fund conservation and humanitarian programs",
                  ]}
                  ctaLabel="Register interest"
                />
                <EventCard
                  title="Clay Shooting Classic"
                  description="A classic outdoor fundraiser rooted in camaraderie, friendly competition, and the conservation values that define who we are. Open to all — from first-timers to seasoned shooters."
                  highlights={[
                    "Clay shooting competition",
                    "Food and refreshments",
                    "Awards and raffle",
                    "Open to all skill levels",
                  ]}
                  ctaLabel="Register interest"
                />
                <EventCard
                  title="Nature & Wildlife Photography Competition"
                  description="A worldwide competition celebrating the natural world — wildlife, landscapes, ecosystems, and the communities that depend on them. Winners featured in the Foundation's annual calendar and digital publications."
                  highlights={[
                    "Open to amateurs and professionals globally",
                    "Public voting and judges' selection",
                    "Winners featured in Annual Calendar",
                    "Proceeds support global conservation programs",
                  ]}
                  ctaLabel="Learn more"
                />
              </div>

            </div>
          </div>
        </section>

        {/* ── YEAR-ROUND CALENDAR ───────────────────────────────────────── */}
        <section className="border-b border-slate-100 bg-slate-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-24">
            <div className="grid lg:grid-cols-[1fr_3fr] gap-16 lg:gap-24">

              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-5 h-px bg-slate-300" />
                  <span className="text-[10px] tracking-[0.2em] uppercase text-slate-400 font-medium">
                    Year-round
                  </span>
                </div>
                <h2 className="font-['Cormorant_Garamond'] text-4xl font-light text-slate-900 leading-tight">
                  The full<br />calendar
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-slate-400 font-light">
                  Conservation work doesn't stop between major events. Community programs, research partnerships, and engagement initiatives run all year.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10">
                <QuarterRow
                  period="January – March"
                  title="Community Outreach & Service"
                  items={[
                    "Volunteer field days",
                    "Partnered charity and community support",
                    "Conservation service projects",
                    "Research partnership development",
                  ]}
                />
                <QuarterRow
                  period="April – June"
                  title="Spring Fundraising & Engagement"
                  items={[
                    "Small-scale fundraising events",
                    "Community meet-ups and networking",
                    "Photography competition opens",
                    "Program partnership announcements",
                  ]}
                />
                <QuarterRow
                  period="July – August"
                  title="Summer Community & Education"
                  items={[
                    "Youth and family-friendly events",
                    "Public education and outreach programs",
                    "Photography competition public voting",
                    "Field research and monitoring deployments",
                  ]}
                />
                <QuarterRow
                  period="September"
                  title="Major Event Month"
                  highlight
                  items={[
                    "Blue Duck Golf Tournament",
                    "Clay Shooting Classic",
                    "Fall fundraising campaign launch",
                  ]}
                />
                <QuarterRow
                  period="October"
                  title="Celebration & Recognition"
                  highlight
                  items={[
                    "The Blue Duck Banquet",
                    "Photography Calendar winners announced",
                    "Annual Calendar pre-orders and sales",
                    "Partner and sponsor recognition",
                  ]}
                />
                <QuarterRow
                  period="November – December"
                  title="Giving Season & Annual Impact"
                  items={[
                    "Year-end giving campaign",
                    "Community service initiatives",
                    "Annual conservation impact report",
                    "Strategic planning for the year ahead",
                  ]}
                />
              </div>

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
                      Stay connected
                    </span>
                  </div>
                  <h3 className="font-['Cormorant_Garamond'] text-4xl font-light text-white mb-4 leading-tight">
                    Be first to<br /><em className="italic">know.</em>
                  </h3>
                  <p className="text-[15px] leading-relaxed text-slate-400 font-light">
                    Get updates on upcoming events, volunteer opportunities, and ways to support our growing global mission.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 lg:justify-end">
                  <Link
                    href="/contact"
                    className="text-[11px] font-medium tracking-[0.14em] uppercase bg-white text-slate-900 px-8 py-4 hover:bg-slate-100 transition-colors text-center"
                  >
                    Get event updates
                  </Link>
                  <Link
                    href="/contact"
                    className="text-[11px] font-medium tracking-[0.14em] uppercase border border-slate-700 text-white px-8 py-4 hover:border-slate-500 transition-colors text-center"
                  >
                    Volunteer sign-up
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
