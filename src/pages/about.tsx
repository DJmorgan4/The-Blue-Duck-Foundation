import Link from "next/link";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

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
    <div className="group relative">
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-slate-100 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="relative rounded-2xl border border-slate-200/80 bg-white p-8 transition-all group-hover:border-slate-300">
        <div className="text-xs font-semibold tracking-widest text-slate-400 uppercase">{number}</div>
        <h3 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900">{title}</h3>
        <div className="mt-2 h-px w-12 bg-slate-900" />
        <p className="mt-4 leading-relaxed text-slate-600">{desc}</p>
      </div>
    </div>
  );
}

function BoardMember({ name, role, empty }: { name?: string; role?: string; empty?: boolean }) {
  if (empty) {
    return (
      <div className="group relative rounded-2xl border border-dashed border-slate-300 bg-slate-50/50 p-8 transition-all hover:border-slate-400">
        <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-dashed border-slate-300 bg-white">
          <svg className="h-6 w-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </div>
        <p className="mt-5 text-base font-semibold text-slate-400">Seat Available</p>
        <p className="mt-1 text-sm text-slate-400">Board position open</p>
        <Link href="/contact" className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 transition-colors hover:text-slate-900">
          Express interest
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    );
  }
  return (
    <div className="group relative">
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-slate-100 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="relative rounded-2xl border border-slate-200/80 bg-white p-8 transition-all group-hover:border-slate-300">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-900 text-xl font-semibold text-white">
          {name?.charAt(0)}
        </div>
        <p className="mt-5 text-lg font-semibold text-slate-900">{name}</p>
        <p className="mt-1 text-sm font-medium text-slate-500">{role}</p>
      </div>
    </div>
  );
}

function GoalItem({ number, title, desc }: { number: string; title: string; desc: string }) {
  return (
    <div className="flex gap-6">
      <div className="flex-shrink-0 text-4xl font-light tracking-tight text-slate-200">{number}</div>
      <div className="border-t border-slate-200 pt-4">
        <h4 className="text-lg font-semibold text-slate-900">{title}</h4>
        <p className="mt-2 leading-relaxed text-slate-600">{desc}</p>
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow bg-white">
        {/* HERO */}
        <section className="relative overflow-hidden border-b border-slate-100">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#f1f5f9_0%,_transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_#f8fafc_0%,_transparent_50%)]" />
          </div>
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
            <div className="max-w-4xl">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm font-medium text-slate-700 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                </span>
                EIN 41-4361489 · 501(c)(3) Nonprofit
              </div>

              <h1 className="mt-8 text-5xl font-light tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
                About the Foundation
              </h1>

              <div className="mt-10 rounded-2xl border border-slate-200/80 bg-slate-900 px-10 py-8">
                <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Our Mission</p>
                <p className="mt-4 text-2xl font-light leading-snug tracking-tight text-white sm:text-3xl">
                  To protect, restore, and champion the natural world and the communities that depend on it — transparently, scientifically, and without borders.
                </p>
              </div>

              <p className="mt-8 max-w-3xl text-lg leading-relaxed text-slate-600">
                Born in Texas and built for the world, The Blue Duck Foundation brings together conservation science, environmental technology, cultural preservation, and humanitarian support into a single, fully accountable organization. We go where the work is needed — and we show our work every step of the way.
              </p>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Link href="/conservation" className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-8 py-4 font-semibold text-white shadow-sm transition-all hover:bg-slate-800 hover:shadow-md">
                  Our programs
                </Link>
                <Link href="/contact" className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-8 py-4 font-semibold text-slate-900 transition-all hover:bg-slate-50">
                  Get involved
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* VALUES */}
        <section className="border-b border-slate-100 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-4xl font-light tracking-tight text-slate-900">What we stand for</h2>
              <p className="mt-4 text-lg text-slate-600">
                Four words guide every decision we make, every partnership we form, and every community we serve.
              </p>
            </div>
            <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <ValueCard number="01" title="Integrity" desc="Complete financial transparency and scientific honesty. Every dollar tracked, every data point accountable — publicly, always." />
              <ValueCard number="02" title="Respect" desc="For the land, for wildlife, for indigenous communities, for workers, and for every person whose livelihood is tied to the natural world." />
              <ValueCard number="03" title="Restore" desc="We don't just protect what remains — we actively work to bring back ecosystems, waterways, habitats, and communities that have been left behind." />
              <ValueCard number="04" title="Advance" desc="Meaningful conservation requires innovation. We build new tools, new partnerships, and open pathways for research and support that have historically been out of reach." />
            </div>
          </div>
        </section>

        {/* MISSION & GOALS */}
        <section className="border-b border-slate-100 bg-slate-50">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
              <div>
                <h2 className="text-4xl font-light tracking-tight text-slate-900">Our mission in depth</h2>
                <p className="mt-6 text-lg leading-relaxed text-slate-600">
                  The Blue Duck Foundation exists to close the gap between environmental science and real-world action — and between forward-thinking work and the people and funding needed to support it.
                </p>
                <p className="mt-4 leading-relaxed text-slate-600">
                  We are rooted in Texas and proud of it. But our Certificate of Formation now reflects what we've always believed: that conservation, research, cultural preservation, and humanitarian support don't stop at state lines or national borders. Ecosystems don't. Neither do we.
                </p>
                <p className="mt-4 leading-relaxed text-slate-600">
                  We create safe, compliant, and transparent pathways for individuals, communities, and organizations to support meaningful work — environmental monitoring technology, archaeological preservation, freshwater access, renewable energy research, and more. Work that too often goes unfunded because the infrastructure to support it hasn't existed.
                </p>
                <p className="mt-4 leading-relaxed text-slate-600">
                  We're building that infrastructure now.
                </p>
              </div>
              <div>
                <h2 className="text-4xl font-light tracking-tight text-slate-900">Strategic goals</h2>
                <div className="mt-8 space-y-8">
                  <GoalItem number="01" title="Build global conservation capacity" desc="Establish partnerships, easements, and funding streams for high-priority ecosystems — wetlands, waterways, forests, coastal regions, and beyond — wherever the need is greatest." />
                  <GoalItem number="02" title="Advance environmental science and technology" desc="Deploy IoT monitoring systems, data platforms, and research tools that give land managers, scientists, and communities real-time intelligence and measurable outcomes." />
                  <GoalItem number="03" title="Preserve cultural and natural heritage" desc="Fund and conduct archaeological documentation, indigenous history research, and geological heritage protection domestically and internationally." />
                  <GoalItem number="04" title="Create open pathways for support" desc="Provide transparent, fully compliant channels for donors and partners to support forward-thinking work in renewables, conservation, and humanitarian environmental aid — no gatekeeping." />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* PROGRAM AREAS */}
        <section className="border-b border-slate-100 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-light tracking-tight text-slate-900">Our program areas</h2>
            <p className="mt-4 max-w-3xl text-lg text-slate-600">
              Each program area is grounded in our Certificate of Formation and IRS purpose statement — charitable, scientific, educational, environmental, humanitarian, and cultural preservation work, all in furtherance of Section 501(c)(3).
            </p>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { label: "Global Environmental Stewardship", desc: "Ecosystems worldwide — wetlands, waterways, forests, coastal, marine, and more." },
                { label: "Wildlife & Biodiversity Protection", desc: "Conservation, habitat restoration, ecological monitoring, and anti-poaching support." },
                { label: "Water & Freshwater Resources", desc: "Watershed protection, water quality, and humanitarian freshwater access internationally." },
                { label: "Geological & Earth Sciences", desc: "Research, documentation, and public education on geological and earth system science." },
                { label: "Environmental Monitoring Technology", desc: "IoT sensors, data systems, and scientific tools for transparent, accountable conservation." },
                { label: "Archaeological & Cultural Heritage", desc: "Site documentation, indigenous history, and protection of historically significant landscapes." },
                { label: "Natural Resource Region Support", desc: "Charitable assistance to communities in resource-dependent or environmentally impacted areas." },
                { label: "Renewable Energy & Research Support", desc: "Advancing forward-thinking research and development in energy, science, and sustainability." },
                { label: "Education & Public Outreach", desc: "Digital platforms, public programs, and content connecting people to conservation science." },
              ].map((area) => (
                <div key={area.label} className="rounded-xl border border-slate-200/80 bg-slate-50 p-6">
                  <h3 className="font-semibold text-slate-900">{area.label}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{area.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BOARD */}
        <section className="border-b border-slate-100 bg-slate-50">
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <div className="max-w-2xl">
                <h2 className="text-4xl font-light tracking-tight text-slate-900">Board of Directors</h2>
                <p className="mt-3 text-lg text-slate-600">Experienced leaders committed to building an organization that outlasts all of us.</p>
              </div>
              <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 hover:text-slate-700">
                Join the board
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
              <BoardMember name="DJ Morgan" role="Executive Director & Founder" />
              <BoardMember name="Cameron Francis" role="Board Member" />
              <BoardMember name="Jeramiah Sullivan" role="Board Member" />
              <BoardMember empty />
              <BoardMember empty />
            </div>
            <div className="mt-12 rounded-2xl border border-slate-200/80 bg-white p-8">
              <div className="grid gap-8 md:grid-cols-2 md:items-center">
                <div>
                  <h3 className="text-xl font-semibold text-slate-900">Interested in serving on the board?</h3>
                  <p className="mt-2 text-slate-600">
                    We're seeking experienced professionals in conservation, renewable energy, law, finance, environmental science, archaeology, or international development who believe in transparent, accountable stewardship.
                  </p>
                </div>
                <div className="flex gap-4 md:justify-end">
                  <Link href="/contact" className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800">
                    Express interest
                  </Link>
                </div>
              </div>
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
                    <h3 className="text-3xl font-light tracking-tight text-white">This is just the beginning</h3>
                    <p className="mt-3 text-lg text-slate-300">
                      The Blue Duck Foundation is actively building its programs, partnerships, and global capacity. Follow our progress or get involved as a founding supporter.
                    </p>
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
                    <Link href="/conservation" className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 font-semibold text-slate-900 transition-colors hover:bg-slate-100">
                      Explore programs
                    </Link>
                    <Link href="/contact" className="inline-flex items-center justify-center rounded-xl border border-white/30 px-8 py-4 font-semibold text-white transition-colors hover:bg-white/10">
                      Contact us
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
