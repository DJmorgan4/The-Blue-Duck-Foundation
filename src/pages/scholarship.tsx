import Link from "next/link";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

// ─── CRITERIA ITEM ─────────────────────────────────────────────────────────
function CriteriaItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-4 py-4 border-b border-slate-100 last:border-0">
      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-red-700 flex-shrink-0" />
      <span className="text-sm text-slate-600 font-light leading-relaxed">{children}</span>
    </li>
  );
}

// ─── TIMELINE ITEM ─────────────────────────────────────────────────────────
function TimelineItem({ year, event }: { year: string; event: string }) {
  return (
    <div className="grid grid-cols-[1fr_2fr] gap-8 border-t border-slate-100 py-6 first:border-t-0">
      <div className="text-[11px] tracking-[0.12em] uppercase text-red-700 font-medium pt-0.5">
        {year}
      </div>
      <p className="text-sm text-slate-600 font-light leading-relaxed">{event}</p>
    </div>
  );
}

// ─── VALUE PILLAR ──────────────────────────────────────────────────────────
function ValuePillar({ number, title, desc }: { number: string; title: string; desc: string }) {
  return (
    <div className="border-t border-slate-200 pt-6 pb-4">
      <div className="text-[10px] tracking-[0.2em] uppercase text-slate-300 font-medium mb-3">
        {number}
      </div>
      <h3 className="font-['Cormorant_Garamond'] text-2xl font-light text-red-800 mb-3 italic">
        {title}
      </h3>
      <p className="text-sm text-slate-500 font-light leading-relaxed">{desc}</p>
    </div>
  );
}

// ─── PAGE ──────────────────────────────────────────────────────────────────
export default function ScholarshipPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow bg-white font-['Jost',sans-serif]">

        {/* ── HERO ──────────────────────────────────────────────────────── */}
        <section
          className="relative min-h-[90vh] flex flex-col items-center justify-center border-b border-slate-100"
          style={{ background: "linear-gradient(150deg, #7f1d1d 0%, #991b1b 35%, #1e3a8a 75%, #1e40af 100%)" }}
        >
          <div className="absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")` }}
          />

          <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
            <div className="flex items-center justify-center gap-4 mb-12">
              <div className="h-px w-12 bg-white/30" />
              <span className="text-[10px] tracking-[0.3em] uppercase text-white/50 font-medium">
                The Blue Duck Foundation
              </span>
              <div className="h-px w-12 bg-white/30" />
            </div>

            <div className="font-['Cormorant_Garamond'] font-light text-white leading-none mb-2">
              <div className="text-8xl sm:text-9xl lg:text-[160px] tracking-tight">
                Forever
              </div>
              <div
                className="text-8xl sm:text-9xl lg:text-[160px] tracking-tight"
                style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.7)", color: "transparent" }}
              >
                44
              </div>
            </div>

            <p className="font-['Cormorant_Garamond'] text-xl text-white/70 italic mt-6 mb-12">
              Scholarship Fund
            </p>

            <div className="border border-white/20 bg-white/8 px-8 py-6 inline-block backdrop-blur-sm">
              <p className="text-[10px] tracking-[0.25em] uppercase text-white/50 mb-2">
                In loving memory of
              </p>
              <p className="font-['Cormorant_Garamond'] text-3xl text-white italic">
                Kaleb Cory
              </p>
              <p className="text-[10px] tracking-[0.2em] text-white/40 mt-2">
                December 15, 1994 — July 27, 2014
              </p>
            </div>
          </div>

          <div className="absolute bottom-10 flex flex-col items-center gap-2">
            <p className="text-[10px] tracking-[0.25em] uppercase text-white/30">His story continues</p>
            <div className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent" />
          </div>
        </section>

        {/* ── MEMORIAL TRIBUTE ──────────────────────────────────────────── */}
        <section className="border-b border-slate-100">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-28">
            <div className="grid lg:grid-cols-[1fr_2fr] gap-16 lg:gap-24">

              <div className="lg:sticky lg:top-24 self-start">
                <blockquote className="font-['Cormorant_Garamond'] text-2xl text-slate-800 italic font-light leading-relaxed mb-8">
                  Legacy is not only something we remember — it is something we continue.
                </blockquote>
                <div className="w-12 h-px bg-red-700 mb-8" />

                <div className="space-y-5">
                  {[
                    { val: "19", label: "Years of life", color: "#991b1b" },
                    { val: "∞",  label: "Years of legacy", color: "#1e3a8a" },
                    { val: "44", label: "Forever his number", color: "#991b1b" },
                  ].map((s, i) => (
                    <div key={i} className="flex items-baseline gap-5 border-t border-slate-100 pt-4">
                      <span
                        className="font-['Cormorant_Garamond'] text-4xl font-light w-12 flex-shrink-0"
                        style={{ color: s.color }}
                      >
                        {s.val}
                      </span>
                      <span className="text-[10px] tracking-[0.15em] uppercase text-slate-400 font-medium">
                        {s.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6 text-[15px] leading-[1.95] text-slate-500 font-light">
                <p>
                  There are people who pass through your life and leave behind more than memories — they leave behind a way of seeing the world. Kaleb Cory was that kind of person.
                </p>
                <p>
                  Born on December 15, 1994, Kaleb lived every day with the qualities that most people only aspire to: strength, loyalty, perseverance, and an unbreakable commitment to the people he loved. He was taken from us far too soon on July 27, 2014, at just 19 years old.
                </p>
                <p>
                  But loss does not get the final word. Those who carry his memory forward — his family, his friends, the people whose lives he quietly shaped — refuse to let the story end there.
                </p>

                <div className="border-l-2 border-blue-800 pl-8 py-2 my-8">
                  <p className="font-['Cormorant_Garamond'] text-xl text-slate-700 italic">
                    "Love — Live — Laugh"
                  </p>
                </div>

                <p>
                  Through the Blue Duck Foundation, we honor those taken from us too soon and support the families, siblings, and students who choose to carry their legacy forward.
                </p>
                <p className="font-['Cormorant_Garamond'] text-2xl text-red-800 italic font-light">
                  Forever 44 lives on through every student who refuses to quit.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* ── RED/NAVY DIVIDER ──────────────────────────────────────────── */}
        <div className="h-1" style={{ background: "linear-gradient(90deg, #991b1b, #1e3a8a)" }} />

        {/* ── WHAT 44 MEANS ─────────────────────────────────────────────── */}
        <section className="border-b border-slate-100 bg-slate-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-24">
            <div className="grid lg:grid-cols-[1fr_3fr] gap-16 lg:gap-24">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-5 h-px bg-red-700" />
                  <span className="text-[10px] tracking-[0.2em] uppercase text-red-700 font-medium">
                    The foundation of this fund
                  </span>
                </div>
                <h2 className="font-['Cormorant_Garamond'] text-4xl font-light text-slate-900 leading-tight">
                  What <em className="italic text-red-700">44</em><br />means
                </h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-x-12">
                <ValuePillar
                  number="01"
                  title="Strength"
                  desc="The kind of strength that doesn't announce itself — that shows up quietly, steadily, even when it's hardest to find. Kaleb embodied this. Forever 44 carries it forward."
                />
                <ValuePillar
                  number="02"
                  title="Loyalty"
                  desc="To the people you love, to the values you hold, to the commitments you make. True loyalty is rare. It was one of Kaleb's defining qualities, and the foundation of everything this scholarship stands for."
                />
                <ValuePillar
                  number="03"
                  title="Perseverance"
                  desc="The refusal to quit when things get hard. Every student who receives this scholarship has demonstrated that they know how to keep going — because that is what Kaleb would have done."
                />
                <ValuePillar
                  number="04"
                  title="Family & Friendship"
                  desc="The bonds that hold us together across time and loss. We are here to preserve not just the land, but the connections between people — the ones that outlast us all."
                />
              </div>
            </div>
          </div>
        </section>

        {/* ── SCHOLARSHIP DETAILS ───────────────────────────────────────── */}
        <section className="border-b border-slate-100">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-24">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">

              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-5 h-px bg-red-700" />
                  <span className="text-[10px] tracking-[0.2em] uppercase text-red-700 font-medium">
                    The award
                  </span>
                </div>
                <h2 className="font-['Cormorant_Garamond'] text-4xl font-light text-slate-900 leading-tight mb-8">
                  The Forever 44<br /><em className="italic text-red-700">Scholarship Fund</em>
                </h2>
                <div className="space-y-5 text-[15px] leading-[1.9] text-slate-500 font-light mb-10">
                  <p>
                    Established to honor Kaleb's life and legacy, this scholarship supports graduating seniors who demonstrate resilience, heart, and determination — the same qualities that defined him.
                  </p>
                  <p>
                    Forever 44 represents strength in the face of adversity and the commitment to carry forward the legacy of those we have lost too soon.
                  </p>
                  <p>
                    Through the Blue Duck Foundation, we empower students to pursue higher education and build a future rooted in perseverance, purpose, and family.
                  </p>
                </div>
                <div className="flex gap-4">
                  <Link
                    href="/contact"
                    className="text-[11px] font-medium tracking-[0.14em] uppercase bg-red-700 text-white px-7 py-3.5 hover:bg-red-800 transition-colors inline-flex"
                  >
                    Apply now
                  </Link>
                  <Link
                    href="/about"
                    className="text-[11px] font-medium tracking-[0.14em] uppercase border border-slate-200 text-slate-700 px-7 py-3.5 hover:border-slate-400 transition-colors inline-flex"
                  >
                    About the Foundation
                  </Link>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-100 p-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-5 h-px bg-red-700" />
                  <span className="text-[10px] tracking-[0.2em] uppercase text-red-700 font-medium">
                    Eligibility & criteria
                  </span>
                </div>
                <p className="text-sm text-slate-500 font-light leading-relaxed mb-6">
                  The Forever 44 Scholarship is awarded to students who carry the qualities Kaleb exemplified. Applicants are evaluated on the following:
                </p>
                <ul className="space-y-0">
                  <CriteriaItem>Graduating high school senior or current undergraduate student</CriteriaItem>
                  <CriteriaItem>Demonstrated resilience, perseverance, and strength of character</CriteriaItem>
                  <CriteriaItem>Commitment to family, community, and those around them</CriteriaItem>
                  <CriteriaItem>Pursuing higher education with purpose and determination</CriteriaItem>
                  <CriteriaItem>Personal essay reflecting on legacy, loss, or carrying someone else's memory forward</CriteriaItem>
                  <CriteriaItem>One letter of recommendation from a teacher, coach, or mentor</CriteriaItem>
                </ul>
                <div className="mt-8 border-l-2 border-blue-800 pl-5 py-1">
                  <p className="text-[10px] tracking-[0.15em] uppercase text-blue-800 font-medium mb-1">
                    A note on selection
                  </p>
                  <p className="text-sm text-slate-500 font-light leading-relaxed italic">
                    GPA matters less than character. We are looking for students who refuse to quit — who carry others with them as they rise.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── TIMELINE ──────────────────────────────────────────────────── */}
        <section className="border-b border-slate-100 bg-slate-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-24">
            <div className="grid lg:grid-cols-[1fr_2fr] gap-16 lg:gap-24">

              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-5 h-px bg-red-700" />
                  <span className="text-[10px] tracking-[0.2em] uppercase text-red-700 font-medium">
                    The story
                  </span>
                </div>
                <h2 className="font-['Cormorant_Garamond'] text-4xl font-light text-slate-900 leading-tight">
                  A life remembered,<br />
                  <em className="italic text-red-700">a legacy continued</em>
                </h2>

                <div className="mt-16 text-center">
                  <div
                    className="font-['Cormorant_Garamond'] text-[140px] leading-none font-light select-none"
                    style={{ WebkitTextStroke: "1px #991b1b", color: "transparent", opacity: 0.12 }}
                  >
                    44
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <TimelineItem
                  year="December 15, 1994"
                  event="Kaleb Cory is born. He would grow into someone defined by loyalty, heart, and an unshakable commitment to the people around him."
                />
                <TimelineItem
                  year="July 27, 2014"
                  event="Kaleb passes at 19 years old. The loss is immeasurable. But his impact — the way he lived, the way he loved — does not end here."
                />
                <TimelineItem
                  year="2025"
                  event="The Blue Duck Foundation is established as a 501(c)(3) nonprofit, with a mission rooted in conservation, community, and carrying legacies forward."
                />
                <TimelineItem
                  year="2026"
                  event="The Forever 44 Scholarship Fund is launched in Kaleb's memory — the first of many ways we will honor him and the people he stood for."
                />
                <TimelineItem
                  year="Ongoing"
                  event="Every year, students who embody what Kaleb stood for carry his legacy into the future. Forever 44 lives on through every one of them."
                />
              </div>

            </div>
          </div>
        </section>

        {/* ── HOW TO SUPPORT ────────────────────────────────────────────── */}
        <section className="border-b border-slate-100">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-24">
            <div className="grid lg:grid-cols-[1fr_3fr] gap-16 lg:gap-24">

              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-5 h-px bg-red-700" />
                  <span className="text-[10px] tracking-[0.2em] uppercase text-red-700 font-medium">
                    Get involved
                  </span>
                </div>
                <h2 className="font-['Cormorant_Garamond'] text-4xl font-light text-slate-900 leading-tight">
                  Help us carry it<br />
                  <em className="italic text-red-700">forward</em>
                </h2>
                <p className="mt-4 text-sm text-slate-400 font-light leading-relaxed">
                  Whether you knew Kaleb, believe in what this scholarship stands for, or simply want to support a student who refuses to give up — there is a place for you here.
                </p>
              </div>

              <div className="grid sm:grid-cols-3 gap-px bg-slate-100">
                {[
                  {
                    title: "Donate",
                    desc: "Every contribution directly funds scholarship awards for students who embody strength, loyalty, and perseverance. No gift is too small.",
                    cta: "Make a contribution",
                    dark: true,
                  },
                  {
                    title: "Nominate a student",
                    desc: "Know someone who carries the qualities Kaleb stood for? Nominate them for the Forever 44 Scholarship.",
                    cta: "Submit a nomination",
                    dark: false,
                  },
                  {
                    title: "Spread the word",
                    desc: "Share this scholarship with your school, community, or network. Help us find the students who deserve to carry this legacy forward.",
                    cta: "Share Forever 44",
                    dark: false,
                  },
                ].map((card, i) => (
                  <div
                    key={i}
                    className={`p-8 flex flex-col justify-between ${card.dark ? "bg-slate-900" : "bg-white"}`}
                  >
                    <div>
                      <h3 className={`font-['Cormorant_Garamond'] text-2xl font-light mb-3 ${card.dark ? "text-white" : "text-slate-900"}`}>
                        {card.title}
                      </h3>
                      <p className={`text-sm font-light leading-relaxed mb-6 ${card.dark ? "text-slate-400" : "text-slate-500"}`}>
                        {card.desc}
                      </p>
                    </div>
                    <Link
                      href="/contact"
                      className={`text-[11px] font-medium tracking-[0.12em] uppercase transition-colors ${card.dark ? "text-red-400 hover:text-red-300" : "text-red-700 hover:text-red-900"}`}
                    >
                      {card.cta} →
                    </Link>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* ── CLOSING CTA ───────────────────────────────────────────────── */}
        <section
          className="py-28"
          style={{ background: "linear-gradient(150deg, #7f1d1d 0%, #991b1b 40%, #1e3a8a 100%)" }}
        >
          <div className="mx-auto max-w-4xl px-6 text-center">
            <h2 className="font-['Cormorant_Garamond'] text-5xl sm:text-6xl text-white font-light leading-tight mb-6">
              Forever 44 lives on through<br />
              every student who{" "}
              <em className="italic">refuses to quit</em>
            </h2>
            <p className="font-['Cormorant_Garamond'] text-white/60 text-xl italic mb-4">
              In memory of Kaleb Cory — December 15, 1994 – July 27, 2014
            </p>
            <div className="flex items-center justify-center gap-4 mb-12">
              <div className="h-px w-16 bg-white/20" />
              <span className="text-[10px] tracking-[0.25em] uppercase text-white/30">
                A Blue Duck Foundation Initiative
              </span>
              <div className="h-px w-16 bg-white/20" />
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="text-[11px] font-medium tracking-[0.14em] uppercase bg-white text-slate-900 px-10 py-4 hover:bg-slate-100 transition-colors"
              >
                Apply for the scholarship
              </Link>
              <Link
                href="/about"
                className="text-[11px] font-medium tracking-[0.14em] uppercase border border-white/30 text-white px-10 py-4 hover:bg-white/10 transition-colors"
              >
                About the Foundation
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
