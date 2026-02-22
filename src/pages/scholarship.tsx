import Link from "next/link";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

function Feather({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 24 48" fill="none" className={className} style={style} xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2 C18 10 22 20 12 46 C2 20 6 10 12 2Z" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.4" />
      <line x1="12" y1="2" x2="12" y2="46" stroke="currentColor" strokeWidth="0.75" opacity="0.5" />
      <line x1="12" y1="12" x2="18" y2="18" stroke="currentColor" strokeWidth="0.5" opacity="0.35" />
      <line x1="12" y1="18" x2="19" y2="24" stroke="currentColor" strokeWidth="0.5" opacity="0.35" />
      <line x1="12" y1="24" x2="18" y2="30" stroke="currentColor" strokeWidth="0.5" opacity="0.35" />
      <line x1="12" y1="30" x2="16" y2="36" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      <line x1="12" y1="12" x2="6" y2="18" stroke="currentColor" strokeWidth="0.5" opacity="0.35" />
      <line x1="12" y1="18" x2="5" y2="24" stroke="currentColor" strokeWidth="0.5" opacity="0.35" />
      <line x1="12" y1="24" x2="6" y2="30" stroke="currentColor" strokeWidth="0.5" opacity="0.35" />
      <line x1="12" y1="30" x2="8" y2="36" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
    </svg>
  );
}

function Stars() {
  const positions = [
    { top: "8%", left: "5%" }, { top: "15%", left: "92%" },
    { top: "25%", left: "2%" }, { top: "32%", left: "88%" },
    { top: "55%", left: "4%" }, { top: "65%", left: "94%" },
    { top: "78%", left: "7%" }, { top: "85%", left: "91%" },
  ];
  return (
    <>
      {positions.map((pos, i) => (
        <div key={i} className="absolute w-1 h-1 rounded-full bg-white/40"
          style={{ top: pos.top, left: pos.left, animation: `twinkle ${2 + i * 0.3}s ease-in-out infinite alternate` }}
        />
      ))}
    </>
  );
}

function ValuePillar({ number, title, desc }: { number: string; title: string; desc: string }) {
  return (
    <div className="group relative">
      <div className="absolute -top-4 -left-2 text-7xl font-serif text-red-600/10 select-none group-hover:text-red-600/20 transition-colors duration-500">{number}</div>
      <div className="relative pt-6 pb-8 border-b border-slate-200 last:border-0">
        <h3 className="text-lg font-semibold tracking-widest uppercase text-red-700">{title}</h3>
        <p className="mt-3 text-slate-600 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

function CriteriaItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-4 py-4 border-b border-slate-100 last:border-0">
      <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full border-2 border-red-600/40 flex items-center justify-center">
        <div className="w-2 h-2 rounded-full bg-red-600" />
      </div>
      <span className="text-slate-600 leading-relaxed">{children}</span>
    </li>
  );
}

function TimelineItem({ year, event }: { year: string; event: string }) {
  return (
    <div className="relative flex gap-6 items-start pb-8 last:pb-0">
      <div className="flex flex-col items-center">
        <div className="w-3 h-3 rounded-full bg-red-600 ring-4 ring-red-100 flex-shrink-0 mt-1" />
        <div className="w-px flex-1 bg-gradient-to-b from-red-300 to-transparent mt-2" />
      </div>
      <div>
        <div className="text-xs font-mono tracking-widest text-red-700 uppercase font-semibold">{year}</div>
        <p className="mt-1 text-slate-600 leading-relaxed">{event}</p>
      </div>
    </div>
  );
}

export default function ScholarshipPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow bg-white">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=DM+Mono:wght@300;400;500&family=Lora:ital,wght@0,400;0,500;1,400&display=swap');
          .font-display { font-family: 'Playfair Display', Georgia, serif; }
          .font-mono-custom { font-family: 'DM Mono', monospace; }
          .font-body-serif { font-family: 'Lora', Georgia, serif; }

          @keyframes twinkle {
            from { opacity: 0.2; transform: scale(0.8); }
            to { opacity: 0.8; transform: scale(1.3); }
          }
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(24px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-up { animation: fadeUp 1s ease forwards; }
          .animate-fade-up-d1 { animation: fadeUp 1s ease 0.2s forwards; opacity: 0; }
          .animate-fade-up-d2 { animation: fadeUp 1s ease 0.4s forwards; opacity: 0; }
          .animate-fade-up-d3 { animation: fadeUp 1s ease 0.6s forwards; opacity: 0; }
          .animate-fade-up-d4 { animation: fadeUp 1s ease 0.8s forwards; opacity: 0; }
          .feather-float { animation: featherFloat 6s ease-in-out infinite; }
          @keyframes featherFloat {
            0%, 100% { transform: translateY(0px) rotate(-5deg); }
            50% { transform: translateY(-12px) rotate(5deg); }
          }
        `}</style>

        {/* ─── HERO ─────────────────────────────────────────────── */}
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden" style={{ background: "linear-gradient(135deg, #7f1d1d 0%, #991b1b 30%, #1e3a8a 70%, #1e40af 100%)" }}>
          {/* Texture overlay */}
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />
          {/* White center glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.08)_0%,transparent_65%)]" />

          <Stars />

          {/* White stripe accent — like jersey stripes */}
          <div className="absolute left-0 top-0 bottom-0 w-2 bg-white/20" />
          <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/20" />

          <Feather className="absolute top-16 left-12 w-8 h-16 text-white feather-float opacity-20" />
          <Feather className="absolute bottom-24 right-16 w-6 h-12 text-white feather-float opacity-15" style={{ animationDelay: "3s" }} />

          <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-4 mb-10 animate-fade-up">
              <div className="h-px w-16 bg-white/40" />
              <span className="font-mono-custom text-white/70 text-xs tracking-[0.4em] uppercase">The Blue Duck Foundation Presents</span>
              <div className="h-px w-16 bg-white/40" />
            </div>

            <div className="animate-fade-up-d1">
              <div className="font-display text-7xl sm:text-8xl lg:text-9xl font-bold text-white tracking-tight leading-none drop-shadow-lg">
                Forever
              </div>
              <div className="font-display text-7xl sm:text-8xl lg:text-9xl font-bold tracking-tight leading-none"
                style={{ WebkitTextStroke: "2px white", color: "transparent", filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.3))" }}>
                44
              </div>
            </div>

            <div className="mt-8 animate-fade-up-d2">
              <p className="font-body-serif text-xl text-white/90 italic">Scholarship Fund</p>
            </div>

            <div className="mt-10 animate-fade-up-d3">
              <div className="inline-block border-2 border-white/40 bg-white/10 backdrop-blur-sm px-8 py-5">
                <p className="font-mono-custom text-white/70 text-xs tracking-[0.4em] uppercase">In Loving Memory of</p>
                <p className="font-display text-3xl text-white mt-2 italic drop-shadow">Kaleb Cory</p>
                <p className="font-mono-custom text-white/60 text-xs tracking-widest mt-2">December 15, 1994 — July 27, 2014</p>
              </div>
            </div>

            <div className="mt-20 animate-fade-up-d4 flex flex-col items-center gap-2">
              <p className="font-mono-custom text-white/40 text-xs tracking-widest uppercase">His story continues</p>
              <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent" />
            </div>
          </div>
        </section>

        {/* ─── MEMORIAL TRIBUTE ─────────────────────────────────── */}
        <section className="bg-white py-28">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-5 gap-16 lg:gap-24 items-start">
              {/* Left: Quote + stats */}
              <div className="lg:col-span-2 lg:sticky lg:top-24">
                <div className="relative">
                  <div className="absolute -top-8 -left-4 font-display text-[120px] leading-none text-red-600/10 select-none">&ldquo;</div>
                  <blockquote className="relative font-display text-2xl text-slate-800 italic leading-relaxed font-light">
                    Legacy is not only something we remember — it is something we continue.
                  </blockquote>
                  <div className="mt-8 h-1 w-16 bg-red-600" />
                  <div className="mt-6 flex items-center gap-3">
                    <Feather className="w-6 h-12 text-red-600/50" />
                    <div>
                      <p className="font-mono-custom text-red-700 text-xs tracking-widest uppercase font-semibold">Forever 44</p>
                      <p className="font-mono-custom text-slate-400 text-xs mt-1">Blue Duck Foundation</p>
                    </div>
                  </div>

                  <div className="mt-12 space-y-6">
                    <div className="border-l-4 border-red-600 pl-5">
                      <div className="font-display text-4xl text-red-700 font-semibold">19</div>
                      <div className="font-mono-custom text-slate-500 text-xs tracking-widest uppercase mt-1">Years of Life</div>
                    </div>
                    <div className="border-l-4 border-blue-800 pl-5">
                      <div className="font-display text-4xl text-blue-900 font-semibold">∞</div>
                      <div className="font-mono-custom text-slate-500 text-xs tracking-widest uppercase mt-1">Years of Legacy</div>
                    </div>
                    <div className="border-l-4 border-red-600 pl-5">
                      <div className="font-display text-4xl text-red-700 font-semibold">44</div>
                      <div className="font-mono-custom text-slate-500 text-xs tracking-widest uppercase mt-1">Forever His Number</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Story */}
              <div className="lg:col-span-3 space-y-8 font-body-serif text-slate-700 text-lg leading-loose font-light">
                <p>There are people who pass through your life and leave behind more than memories — they leave behind a way of seeing the world. Kaleb Cory was that kind of person.</p>
                <p>Born on December 15, 1994, Kaleb lived every day with the qualities that most people only aspire to: <span className="text-red-700 italic font-medium">strength, loyalty, perseverance, and an unbreakable commitment to the people he loved.</span> He was taken from us far too soon on July 27, 2014, at just 19 years old.</p>
                <p>But loss does not get the final word. Those who carry his memory forward — his family, his friends, the people whose lives he quietly shaped — refuse to let the story end there.</p>

                <div className="border-l-4 border-blue-800 pl-8 py-2 my-10 bg-blue-50/50">
                  <p className="font-display text-xl text-slate-800 italic">
                    "Love - Live - Laugh"
                  </p>
                </div>

                <p>Through the Blue Duck Foundation, we honor those taken from us too soon and support the families, siblings, and students who choose to carry their legacy forward.</p>
                <p className="text-red-700 font-display text-xl italic font-medium">
                  Forever 44 lives on through every student who refuses to quit.
                </p>
              </div>
            </div>
          </div>
        </section>


        {/* ─── DIVIDER ──────────────────────────────────────────── */}
        <div className="py-4" style={{ background: "linear-gradient(90deg, #991b1b, #1e3a8a)" }}>
          <div className="mx-auto max-w-6xl px-6">
            <div className="flex items-center gap-6">
              <div className="flex-1 h-px bg-white/20" />
              <Feather className="w-5 h-10 text-white/60" />
              <div className="flex-1 h-px bg-white/20" />
            </div>
          </div>
        </div>

        {/* ─── WHAT 44 MEANS ────────────────────────────────────── */}
        <section className="bg-slate-50 py-28">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="mb-16">
              <p className="font-mono-custom text-red-700 text-xs tracking-[0.4em] uppercase font-semibold mb-4">The Foundation of This Fund</p>
              <h2 className="font-display text-5xl text-slate-900 font-light">
                What <em className="italic text-red-700">44</em> Means
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-x-16 gap-y-4">
              <ValuePillar number="01" title="Strength" desc="The kind of strength that doesn't announce itself — that shows up quietly, steadily, even when it's hardest to find. Kaleb embodied this. Forever 44 carries it forward." />
              <ValuePillar number="02" title="Loyalty" desc="To the people you love, to the values you hold, to the commitments you make. True loyalty is rare. It was one of Kaleb's defining qualities, and the foundation of everything this scholarship stands for." />
              <ValuePillar number="03" title="Perseverance" desc="The refusal to quit when things get hard. Every student who receives this scholarship has demonstrated that they know how to keep going — because that is what Kaleb would have done." />
              <ValuePillar number="04" title="Family & Friendship" desc="The bonds that hold us together across time and loss. We are here to preserve not just the land, but the connections between people — the ones that outlast us all." />
            </div>
          </div>
        </section>

        {/* ─── SCHOLARSHIP DETAILS ─────────────────────────────── */}
        <section className="bg-white py-28">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div>
                <p className="font-mono-custom text-red-700 text-xs tracking-[0.4em] uppercase font-semibold mb-4">The Award</p>
                <h2 className="font-display text-5xl text-slate-900 font-light leading-tight">
                  The Forever 44<br /><em className="italic text-red-700">Scholarship Fund</em>
                </h2>
                <div className="mt-8 font-body-serif text-slate-600 text-lg leading-relaxed space-y-4">
                  <p>Established to honor Kaleb's life and legacy, this scholarship supports graduating seniors who demonstrate resilience, heart, and determination — the same qualities that defined him.</p>
                  <p>Forever 44 represents strength in the face of adversity and the commitment to carry forward the legacy of those we have lost too soon.</p>
                  <p>Through the Blue Duck Foundation, we empower students to pursue higher education and build a future rooted in perseverance, purpose, and family.</p>
                </div>
                <div className="mt-10 flex gap-4">
                  <Link href="/contact" className="inline-flex items-center justify-center rounded-xl bg-red-700 px-8 py-4 font-semibold text-white shadow-sm transition-all hover:bg-red-800">
                    Apply Now
                  </Link>
                  <Link href="/about" className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-8 py-4 font-semibold text-slate-900 transition-all hover:bg-slate-50">
                    About the Foundation
                  </Link>
                </div>
              </div>

              <div>
                <div className="rounded-2xl border border-slate-200/80 bg-slate-50 p-10">
                  <p className="font-mono-custom text-red-700 text-xs tracking-[0.4em] uppercase font-semibold mb-6">Eligibility & Criteria</p>
                  <p className="font-body-serif text-slate-600 text-sm leading-relaxed mb-6">The Forever 44 Scholarship is awarded to students who carry the qualities Kaleb exemplified. Applicants are evaluated on the following criteria:</p>
                  <ul className="space-y-0 divide-y divide-slate-100">
                    <CriteriaItem>Graduating high school senior or current undergraduate student</CriteriaItem>
                    <CriteriaItem>Demonstrated resilience, perseverance, and strength of character</CriteriaItem>
                    <CriteriaItem>Commitment to family, community, and those around them</CriteriaItem>
                    <CriteriaItem>Pursuing higher education with purpose and determination</CriteriaItem>
                    <CriteriaItem>Personal essay reflecting on legacy, loss, or carrying someone else's memory forward</CriteriaItem>
                    <CriteriaItem>One letter of recommendation from a teacher, coach, or mentor</CriteriaItem>
                  </ul>
                  <div className="mt-8 rounded-xl bg-blue-50 border border-blue-200/80 p-5">
                    <p className="font-mono-custom text-blue-800 text-xs tracking-wider uppercase font-semibold mb-2">A Note on Selection</p>
                    <p className="font-body-serif text-slate-600 text-sm leading-relaxed italic">GPA matters less than character. We are looking for students who refuse to quit — who carry others with them as they rise.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── TIMELINE ─────────────────────────────────────────── */}
        <section className="bg-slate-50 py-28 border-t border-slate-100">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16">
              <div>
                <p className="font-mono-custom text-red-700 text-xs tracking-[0.4em] uppercase font-semibold mb-4">The Story</p>
                <h2 className="font-display text-4xl text-slate-900 font-light mb-12">
                  A life remembered,<br /><em className="italic text-red-700">a legacy continued</em>
                </h2>
                <div className="space-y-0">
                  <TimelineItem year="December 15, 1994" event="Kaleb Cory is born. He would grow into someone defined by loyalty, heart, and an unshakable commitment to the people around him." />
                  <TimelineItem year="July 27, 2014" event="Kaleb passes at 19 years old. The loss is immeasurable. But his impact — the way he lived, the way he loved — does not end here." />
                  <TimelineItem year="2025" event="The Blue Duck Foundation is established as a 501(c)(3) nonprofit, with a mission rooted in conservation, community, and carrying legacies forward." />
                  <TimelineItem year="2026" event="The Forever 44 Scholarship Fund is launched in Kaleb's memory — the first of many ways we will honor him and the people he stood for." />
                  <TimelineItem year="Ongoing" event="Every year, students who embody what Kaleb stood for carry his legacy into the future. Forever 44 lives on through every one of them." />
                </div>
              </div>

              {/* The number as art */}
              <div className="flex flex-col items-center justify-center">
                <div className="relative">
                  <div className="font-display text-[200px] leading-none font-bold select-none"
                    style={{ WebkitTextStroke: "2px #991b1b", color: "transparent", opacity: 0.15 }}>
                    44
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <Feather className="w-10 h-20 text-red-700/50 mx-auto feather-float" />
                      <p className="font-mono-custom text-red-700/70 text-xs tracking-[0.4em] uppercase mt-4 font-semibold">Forever</p>
                    </div>
                  </div>
                </div>
                <p className="font-body-serif text-slate-500 text-center italic max-w-xs mt-2 leading-relaxed">
                  "We believe legacy is not only something we remember — it is something we continue."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── HOW TO SUPPORT ───────────────────────────────────── */}
        <section className="bg-white py-28 border-t border-slate-100">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <p className="font-mono-custom text-red-700 text-xs tracking-[0.4em] uppercase font-semibold mb-4">Get Involved</p>
              <h2 className="font-display text-5xl text-slate-900 font-light">
                Help us carry it <em className="italic text-red-700">forward</em>
              </h2>
              <p className="mt-4 font-body-serif text-slate-500 text-lg max-w-xl mx-auto leading-relaxed">
                Whether you knew Kaleb, believe in what this scholarship stands for, or simply want to support a student who refuses to give up — there is a place for you here.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: "Donate", desc: "Every contribution directly funds scholarship awards for students who embody strength, loyalty, and perseverance. No gift is too small.", action: "Make a Contribution", href: "/contact", accent: true },
                { title: "Nominate a Student", desc: "Know someone who carries the qualities Kaleb stood for? Nominate them for the Forever 44 Scholarship.", action: "Submit a Nomination", href: "/contact", accent: false },
                { title: "Spread the Word", desc: "Share this scholarship with your school, community, or network. Help us find the students who deserve to carry this legacy forward.", action: "Share Forever 44", href: "/contact", accent: false },
              ].map((card) => (
                <div key={card.title} className={`group relative rounded-2xl p-8 border transition-all hover:shadow-lg ${card.accent ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200/80 hover:border-slate-300"}`}>
                  <h3 className={`font-display text-2xl font-medium ${card.accent ? "text-white" : "text-slate-900"}`}>{card.title}</h3>
                  <p className={`mt-3 font-body-serif text-sm leading-relaxed ${card.accent ? "text-slate-300" : "text-slate-600"}`}>{card.desc}</p>
                  <Link href={card.href} className={`mt-6 inline-flex items-center gap-2 text-sm font-semibold transition-colors ${card.accent ? "text-red-400 hover:text-red-300" : "text-red-700 hover:text-red-900"}`}>
                    {card.action}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CLOSING CTA ──────────────────────────────────────── */}
        <section className="py-32 border-t border-slate-100" style={{ background: "linear-gradient(135deg, #7f1d1d 0%, #991b1b 40%, #1e3a8a 100%)" }}>
          <div className="mx-auto max-w-4xl px-6 text-center">
            <div className="flex justify-center mb-10">
              <Feather className="w-10 h-20 text-white/40 feather-float" />
            </div>
            <h2 className="font-display text-5xl sm:text-6xl text-white font-light leading-tight drop-shadow">
              Forever 44 lives on through every student who{" "}
              <em className="italic">refuses to quit</em>
            </h2>
            <p className="mt-8 font-body-serif text-white/70 text-lg leading-relaxed max-w-xl mx-auto italic">
              In memory of Kaleb Cory, December 15, 1994 – July 27, 2014.
            </p>
            <div className="mt-4 flex items-center justify-center gap-4">
              <div className="h-px w-24 bg-white/30" />
              <span className="font-mono-custom text-white/40 text-xs tracking-widest">A Blue Duck Foundation Initiative</span>
              <div className="h-px w-24 bg-white/30" />
            </div>
            <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="inline-flex items-center justify-center rounded-xl bg-white px-10 py-4 font-semibold text-slate-900 transition-colors hover:bg-slate-100 shadow-lg">
                Apply for the Scholarship
              </Link>
              <Link href="/about" className="inline-flex items-center justify-center rounded-xl border-2 border-white/30 px-10 py-4 font-semibold text-white transition-colors hover:bg-white/10">
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


