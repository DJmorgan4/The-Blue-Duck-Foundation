import Link from "next/link";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

// ─── VALUE CARD ────────────────────────────────────────────────────────────
function ValueCard({
  title,
  desc,
  number,
}: {
  title: string;
  desc: string;
  number: string;
}) {
  return (
    <div className="border-t border-slate-200 pt-8">
      <div className="text-[10px] font-medium tracking-[0.2em] text-slate-400 uppercase mb-6">
        {number}
      </div>
      <h3 className="font-['Cormorant_Garamond'] text-4xl font-light tracking-tight text-slate-900 mb-4">
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-slate-500 font-light">{desc}</p>
    </div>
  );
}

// ─── BOARD MEMBER ──────────────────────────────────────────────────────────
function BoardMember({
  name,
  role,
  empty,
}: {
  name?: string;
  role?: string;
  empty?: boolean;
}) {
  if (empty) {
    return (
      <div className="border border-dashed border-slate-200 p-8 flex flex-col justify-between min-h-[200px]">
        <div className="text-[10px] tracking-[0.2em] uppercase text-slate-300 font-medium">
          Seat available
        </div>
        <div>
          <p className="text-sm text-slate-400 font-light mb-3">
            Board position open
          </p>
          <Link
            href="/contact"
            className="text-[11px] font-medium tracking-[0.1em] uppercase text-slate-500 hover:text-slate-900 transition-colors inline-flex items-center gap-2"
          >
            Express interest
            <span>→</span>
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="border border-slate-200 p-8 flex flex-col justify-between min-h-[200px] bg-white">
      <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white text-sm font-medium">
        {name?.charAt(0)}
      </div>
      <div>
        <p className="font-['Cormorant_Garamond'] text-xl font-light text-slate-900">
          {name}
        </p>
        <p className="text-[11px] tracking-[0.08em] uppercase text-slate-400 font-medium mt-1">
          {role}
        </p>
      </div>
    </div>
  );
}

// ─── GOAL ITEM ─────────────────────────────────────────────────────────────
function GoalItem({
  number,
  title,
  desc,
}: {
  number: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="grid grid-cols-[40px_1fr] gap-6 border-t border-slate-200 pt-6">
      <div className="text-[10px] tracking-[0.15em] text-slate-300 font-medium pt-1">
        {number}
      </div>
      <div>
        <h4 className="font-['Cormorant_Garamond'] text-xl font-light text-slate-900 mb-2">
          {title}
        </h4>
        <p className="text-sm leading-relaxed text-slate-500 font-light">{desc}</p>
      </div>
    </div>
  );
}

// ─── PROGRAM AREA ──────────────────────────────────────────────────────────
function ProgramArea({ label, desc }: { label: string; desc: string }) {
  return (
    <div className="border-t border-slate-100 pt-5 pb-2">
      <h3 className="text-sm font-medium text-slate-900 mb-1.5">{label}</h3>
      <p className="text-sm leading-relaxed text-slate-500 font-light">{desc}</p>
    </div>
  );
}

// ─── PAGE ──────────────────────────────────────────────────────────────────
export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow bg-white font-['Jost',sans-serif]">

        {/* ── HERO ──────────────────────────────────────────────────────── */}
        <section className="border-b border-slate-100">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-[55fr_45fr] min-h-[520px]">

              <div className="py-20 lg:py-28 lg:pr-16 lg:border-r border-slate-100 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-10">
                    <div className="w-6 h-px bg-slate-300" />
                    <span className="text-[10px] tracking-[0.2em] uppercase text-slate-400 font-medium">
                      501(c)(3) · EIN 41-4361489 · Est. 2026
                    </span>
                  </div>

                  <h1 className="font-['Cormorant_Garamond'] text-6xl lg:text-7xl font-light leading-[1.04] tracking-tight text-slate-900 mb-8">
                    Built from<br />
                    <em className="italic">curiosity.</em><br />
                    Driven by<br />
                    purpose.
                  </h1>

                  <p className="text-[15px] leading-[1.9] text-slate-500 font-light max-w-md mb-10">
                    The Blue Duck Foundation was built by people who explore the world and want to help it. A federally recognized public charity funding conservation, science, cultural preservation, and humanitarian work — wherever the need exists.
                  </p>

                  <div className="flex items-center gap-4">
                    <Link
                      href="/conservation"
                      className="text-[11px] font-medium tracking-[0.14em] uppercase bg-slate-900 text-white px-7 py-3.5 hover:bg-slate-700 transition-colors"
                    >
                      Our programs
                    </Link>
                    <Link
                      href="/contact"
                      className="text-[11px] font-medium tracking-[0.14em] uppercase text-slate-500 border border-slate-200 px-7 py-3.5 hover:border-slate-400 transition-colors"
                    >
                      Get involved
                    </Link>
                  </div>
                </div>
              </div>

              <div className="hidden lg:flex flex-col justify-between py-28 pl-16">
                <div className="space-y-0">
                  {[
                    { num: "01", label: "Environment & Ecosystems" },
                    { num: "02", label: "Scientific Research" },
                    { num: "03", label: "Cultural & Archaeological" },
                    { num: "04", label: "Humanitarian Stewardship" },
                  ].map((item) => (
                    <div
                      key={item.num}
                      className="flex items-baseline justify-between py-4 border-b border-slate-100 first:border-t"
                    >
                      <span className="font-['Cormorant_Garamond'] text-[22px] font-light text-slate-800">
                        {item.label}
                      </span>
                      <span className="text-[10px] tracking-[0.15em] text-slate-300 font-medium ml-4">
                        {item.num}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 border border-slate-100">
                  {[
                    { val: "501(c)(3)", lbl: "Federal exemption" },
                    { val: "Feb 2026",  lbl: "Effective date" },
                    { val: "Public",    lbl: "Charity class" },
                    { val: "41-4361489", lbl: "EIN" },
                  ].map((s, i) => (
                    <div
                      key={i}
                      className="p-5 border-b border-r border-slate-100 last:border-r-0 [&:nth-child(2)]:border-r-0 [&:nth-child(3)]:border-b-0 [&:nth-child(4)]:border-b-0"
                    >
                      <div className="font-['Cormorant_Garamond'] text-[20px] font-light text-slate-900 mb-0.5">
                        {s.val}
                      </div>
                      <div className="text-[10px] tracking-[0.08em] uppercase text-slate-400">
                        {s.lbl}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── TRUST STRIP ───────────────────────────────────────────────── */}
        <div className="border-b border-slate-100 bg-slate-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex flex-wrap items-center divide-x divide-slate-200">
              {[
                "Contributions deductible under IRC Section 170",
                "Publicly supported · IRC 170(b)(1)(A)(vi)",
                "Annual 990 filing · Full financial transparency",
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-6 py-3.5 first:pl-0 text-[11px] text-slate-400"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── VALUES ────────────────────────────────────────────────────── */}
        <section className="border-b border-slate-100">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-24">
            <div className="grid lg:grid-cols-[1fr_3fr] gap-16 lg:gap-24">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-5 h-px bg-slate-300" />
                  <span className="text-[10px] tracking-[0.2em] uppercase text-slate-400 font-medium">
                    Our values
                  </span>
                </div>
                <h2 className="font-['Cormorant_Garamond'] text-4xl font-light text-slate-900 leading-tight">
                  What we<br />stand for
                </h2>
              </div>
              <div className="grid sm:grid-cols-3 gap-10">
                <ValueCard
                  number="01"
                  title="Honesty"
                  desc="We say what we mean, report what we find, and account for every dollar — publicly, without exception. No spin, no varnish."
                />
                <ValueCard
                  number="02"
                  title="Respect"
                  desc="For the land, for communities, for the science, and for the people doing the work. Every decision starts here."
                />
                <div className="border-t border-dashed border-slate-200 pt-8">
                  <div className="text-[10px] font-medium tracking-[0.2em] text-slate-400 uppercase mb-6">
                    03
                  </div>
                  <h3 className="font-['Cormorant_Garamond'] text-4xl font-light tracking-tight text-slate-900 mb-4">
                    Do What's Right
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-500 font-light">
                    When the path is unclear, we return to purpose. We act with integrity — for the land, for the people, and for those who come after us.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── MISSION & GOALS ───────────────────────────────────────────── */}
        <section className="border-b border-slate-100 bg-slate-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-24">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">

              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-5 h-px bg-slate-300" />
                  <span className="text-[10px] tracking-[0.2em] uppercase text-slate-400 font-medium">
                    Mission
                  </span>
                </div>
                <h2 className="font-['Cormorant_Garamond'] text-4xl font-light text-slate-900 mb-8">
                  Why we exist
                </h2>
                <div className="space-y-5 text-[15px] leading-[1.9] text-slate-500 font-light">
                  <p>
                    The Blue Duck Foundation exists to close the gap between environmental science and real-world action — and between forward-thinking work and the funding it needs to happen.
                  </p>
                  <p>
                    We are rooted in Texas. But our work doesn't stop at state lines or national borders. Ecosystems don't. Neither do we.
                  </p>
                  <p>
                    We create transparent, fully compliant pathways for individuals and organizations to support meaningful work — monitoring technology, archaeological preservation, freshwater access, renewable energy research. Work that too often goes unfunded because the infrastructure to support it hasn't existed.
                  </p>
                  <p className="font-medium text-slate-700">
                    We're building that infrastructure now.
                  </p>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-5 h-px bg-slate-300" />
                  <span className="text-[10px] tracking-[0.2em] uppercase text-slate-400 font-medium">
                    Strategic goals
                  </span>
                </div>
                <h2 className="font-['Cormorant_Garamond'] text-4xl font-light text-slate-900 mb-8">
                  Where we're headed
                </h2>
                <div className="space-y-6">
                  <GoalItem
                    number="01"
                    title="Build global conservation capacity"
                    desc="Establish partnerships and funding streams for high-priority ecosystems — wetlands, waterways, forests, coastal regions — wherever the need is greatest."
                  />
                  <GoalItem
                    number="02"
                    title="Advance environmental science"
                    desc="Deploy IoT monitoring systems and research tools that give land managers and scientists real-time intelligence and measurable outcomes."
                  />
                  <GoalItem
                    number="03"
                    title="Preserve cultural and natural heritage"
                    desc="Fund archaeological documentation, indigenous history research, and geological heritage protection domestically and internationally."
                  />
                  <GoalItem
                    number="04"
                    title="Open the pathways"
                    desc="Transparent, compliant channels for donors and partners to support conservation, renewables, and humanitarian environmental aid — no gatekeeping."
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── PROGRAM AREAS ─────────────────────────────────────────────── */}
        <section className="border-b border-slate-100">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-24">
            <div className="grid lg:grid-cols-[1fr_3fr] gap-16 lg:gap-24">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-5 h-px bg-slate-300" />
                  <span className="text-[10px] tracking-[0.2em] uppercase text-slate-400 font-medium">
                    Programs
                  </span>
                </div>
                <h2 className="font-['Cormorant_Garamond'] text-4xl font-light text-slate-900 leading-tight mb-4">
                  Areas<br />of work
                </h2>
                <p className="text-sm leading-relaxed text-slate-400 font-light">
                  Grounded in our IRS purpose statement — charitable, scientific, educational, environmental, humanitarian, and cultural preservation work under Section 501(c)(3).
                </p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8">
                <ProgramArea label="Global Environmental Stewardship" desc="Ecosystems worldwide — wetlands, waterways, forests, coastal, marine, and more." />
                <ProgramArea label="Wildlife & Biodiversity Protection" desc="Conservation, habitat restoration, ecological monitoring, and anti-poaching support." />
                <ProgramArea label="Water & Freshwater Resources" desc="Watershed protection, water quality, and humanitarian freshwater access internationally." />
                <ProgramArea label="Geological & Earth Sciences" desc="Research, documentation, and public education on geological and earth system science." />
                <ProgramArea label="Environmental Monitoring Technology" desc="IoT sensors, data systems, and scientific tools for transparent, accountable conservation." />
                <ProgramArea label="Archaeological & Cultural Heritage" desc="Site documentation, indigenous history, and protection of historically significant landscapes." />
                <ProgramArea label="Natural Resource Region Support" desc="Charitable assistance to communities in resource-dependent or environmentally impacted areas." />
                <ProgramArea label="Renewable Energy & Research" desc="Advancing forward-thinking research and development in energy, science, and sustainability." />
                <ProgramArea label="Education & Public Outreach" desc="Digital platforms, public programs, and content connecting people to conservation science." />
              </div>
            </div>
          </div>
        </section>

        {/* ── BOARD ─────────────────────────────────────────────────────── */}
        <section className="border-b border-slate-100 bg-slate-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-24">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-5 h-px bg-slate-300" />
                  <span className="text-[10px] tracking-[0.2em] uppercase text-slate-400 font-medium">
                    Leadership
                  </span>
                </div>
                <h2 className="font-['Cormorant_Garamond'] text-4xl font-light text-slate-900">
                  Board of Directors
                </h2>
                <p className="mt-2 text-sm text-slate-400 font-light">
                  Building an organization that outlasts all of us.
                </p>
              </div>
              <Link
                href="/contact"
                className="text-[11px] font-medium tracking-[0.12em] uppercase text-slate-500 hover:text-slate-900 transition-colors inline-flex items-center gap-2 self-start sm:self-auto"
              >
                Join the board →
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <BoardMember name="DJ Morgan" role="Executive Director & Founder" />
              <BoardMember name="Cameron Francis" role="Board Member" />
              <BoardMember name="Jeramiah Sullivan" role="Board Member" />
              <BoardMember empty />
              <BoardMember empty />
            </div>

            <div className="mt-10 border border-slate-200 bg-white p-8 lg:p-10">
              <div className="grid lg:grid-cols-2 gap-8 lg:items-center">
                <div>
                  <h3 className="font-['Cormorant_Garamond'] text-2xl font-light text-slate-900 mb-2">
                    Interested in serving on the board?
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-500 font-light">
                    We're seeking professionals in conservation, law, finance, environmental science, archaeology, or international development who believe in transparent, accountable stewardship.
                  </p>
                </div>
                <div className="lg:flex lg:justify-end">
                  <Link
                    href="/contact"
                    className="text-[11px] font-medium tracking-[0.14em] uppercase bg-slate-900 text-white px-7 py-3.5 hover:bg-slate-700 transition-colors inline-flex"
                  >
                    Express interest
                  </Link>
                </div>
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
                      Get involved
                    </span>
                  </div>
                  <h3 className="font-['Cormorant_Garamond'] text-4xl font-light text-white mb-4 leading-tight">
                    This is just<br /><em className="italic">the beginning.</em>
                  </h3>
                  <p className="text-[15px] leading-relaxed text-slate-400 font-light">
                    The Blue Duck Foundation is actively building programs, partnerships, and global capacity. Get involved as a founding supporter, advisor, or partner.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 lg:justify-end">
                  <Link
                    href="/conservation"
                    className="text-[11px] font-medium tracking-[0.14em] uppercase bg-white text-slate-900 px-8 py-4 hover:bg-slate-100 transition-colors text-center"
                  >
                    Explore programs
                  </Link>
                  <Link
                    href="/contact"
                    className="text-[11px] font-medium tracking-[0.14em] uppercase border border-slate-700 text-white px-8 py-4 hover:border-slate-500 transition-colors text-center"
                  >
                    Contact us
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
