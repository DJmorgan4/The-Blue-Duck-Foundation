import type { ReactNode } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

function CriteriaItem({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-start gap-4 border-b border-slate-100 py-4 last:border-0">
      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-700" />
      <span className="text-sm font-light leading-relaxed text-slate-600">
        {children}
      </span>
    </li>
  );
}

function TimelineItem({
  year,
  event,
}: {
  year: string;
  event: string;
}) {
  return (
    <div className="grid gap-3 border-t border-slate-100 py-6 first:border-t-0 sm:grid-cols-[170px_1fr] sm:gap-8">
      <div className="pt-0.5 text-[11px] font-medium uppercase tracking-[0.12em] text-red-700">
        {year}
      </div>

      <p className="text-sm font-light leading-relaxed text-slate-600">
        {event}
      </p>
    </div>
  );
}

function ValuePillar({
  number,
  title,
  desc,
}: {
  number: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="border-t border-slate-200 pb-4 pt-6">
      <div className="mb-3 text-[10px] font-medium uppercase tracking-[0.2em] text-slate-300">
        {number}
      </div>

      <h3 className="mb-3 font-['Cormorant_Garamond'] text-2xl font-light italic text-red-800">
        {title}
      </h3>

      <p className="text-sm font-light leading-relaxed text-slate-500">
        {desc}
      </p>
    </div>
  );
}

export default function ScholarshipPage() {
  return (
    <>
      <Head>
        <title>
          Forever 44 Scholarship Fund — The Blue Duck Foundation
        </title>

        <meta
          name="description"
          content="The Forever 44 Scholarship Fund honors the memory of Kaleb Cory and supports students who demonstrate resilience, character, and determination."
        />
      </Head>

      <div className="flex min-h-screen flex-col">
        <Header />

        <main className="flex-grow bg-white font-['Jost',sans-serif]">
          {/* MEMORIAL OPENING */}
          <section className="border-b border-slate-100 bg-white">
            <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
              <div className="mb-14 max-w-4xl">
                <div className="mb-5 flex items-center gap-3">
                  <div className="h-px w-6 bg-red-700" />

                  <span className="text-[10px] font-medium uppercase tracking-[0.24em] text-red-700">
                    Forever 44 Scholarship Fund
                  </span>
                </div>

                <h1 className="font-['Cormorant_Garamond'] text-5xl font-light leading-tight text-slate-900 sm:text-6xl lg:text-7xl">
                  Honoring the life and legacy
                  <br />
                  <em className="italic text-red-800">of Kaleb Cory</em>
                </h1>
              </div>

              <div className="grid items-start gap-14 lg:grid-cols-[340px_1fr] lg:gap-20">
                <div className="mx-auto w-full max-w-[320px] lg:mx-0">
                  <div className="overflow-hidden border border-slate-200 bg-slate-100 shadow-lg">
                    <Image
                      src="/images/kaleb-cory.png"
                      alt="Kaleb Cory kneeling on the football field beside his helmet"
                      width={760}
                      height={822}
                      sizes="(max-width: 1024px) 320px, 340px"
                      className="h-auto w-full object-cover"
                      priority
                    />

                    <div className="border-t-4 border-red-800 bg-slate-950 px-6 py-5">
                      <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-red-300">
                        Forever 44
                      </p>

                      <p className="mt-2 font-['Cormorant_Garamond'] text-3xl font-light text-white">
                        Kaleb Cory
                      </p>

                      <p className="mt-2 text-[10px] uppercase tracking-[0.14em] text-slate-400">
                        December 15, 1994 — July 27, 2014
                      </p>
                    </div>
                  </div>

                  <div className="mt-7 grid grid-cols-3 gap-3 border-t border-slate-200 pt-6">
                    <div>
                      <p className="font-['Cormorant_Garamond'] text-3xl font-light text-red-800">
                        19
                      </p>

                      <p className="mt-1 text-[9px] uppercase tracking-[0.12em] text-slate-400">
                        Years of life
                      </p>
                    </div>

                    <div>
                      <p className="font-['Cormorant_Garamond'] text-3xl font-light text-blue-900">
                        44
                      </p>

                      <p className="mt-1 text-[9px] uppercase tracking-[0.12em] text-slate-400">
                        His number
                      </p>
                    </div>

                    <div>
                      <p className="font-['Cormorant_Garamond'] text-3xl font-light text-red-800">
                        ∞
                      </p>

                      <p className="mt-1 text-[9px] uppercase tracking-[0.12em] text-slate-400">
                        His legacy
                      </p>
                    </div>
                  </div>
                </div>

                <div className="max-w-3xl">
                  <div className="mb-7 flex items-center gap-3">
                    <div className="h-px w-6 bg-red-700" />

                    <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-red-700">
                      In loving memory
                    </span>
                  </div>

                  <h2 className="font-['Cormorant_Garamond'] text-4xl font-light leading-tight text-slate-900 sm:text-5xl">
                    Remembering Kaleb Cory
                  </h2>

                  <div className="mt-9 space-y-6 text-[15px] font-light leading-[1.95] text-slate-500">
                    <p>
                      There are people who pass through your life and leave
                      behind more than memories — they leave a lasting impact
                      on the people who knew and loved them. Kaleb Cory was one
                      of those people.
                    </p>

                    <p>
                      Born on December 15, 1994, Kaleb lived with strength,
                      loyalty, perseverance, and a deep commitment to the
                      people he loved. He was taken from his family and friends
                      far too soon on July 27, 2014, at only 19 years old.
                    </p>

                    <p>
                      The Forever 44 Scholarship Fund was created so that
                      Kaleb&apos;s memory can continue through opportunities
                      given to students who demonstrate resilience, character,
                      determination, and care for the people around them.
                    </p>

                    <p>
                      Through the Blue Duck Foundation, this scholarship honors
                      Kaleb&apos;s life while helping young people move forward
                      with purpose and the support they need to pursue their
                      education.
                    </p>
                  </div>

                  <div className="mt-10 border-l-2 border-blue-900 py-2 pl-7">
                    <p className="font-['Cormorant_Garamond'] text-2xl font-light italic leading-relaxed text-red-800">
                      Forever 44 lives on through every student who carries his
                      memory forward.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div
            className="h-1"
            style={{
              background: "linear-gradient(90deg, #991b1b, #1e3a8a)",
            }}
          />

          {/* WHAT 44 MEANS */}
          <section className="border-b border-slate-100 bg-slate-50">
            <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
              <div className="grid gap-16 lg:grid-cols-[1fr_3fr] lg:gap-24">
                <div>
                  <div className="mb-6 flex items-center gap-3">
                    <div className="h-px w-5 bg-red-700" />

                    <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-red-700">
                      The foundation of this fund
                    </span>
                  </div>

                  <h2 className="font-['Cormorant_Garamond'] text-4xl font-light leading-tight text-slate-900">
                    What <em className="italic text-red-700">44</em>
                    <br />
                    means
                  </h2>
                </div>

                <div className="grid gap-x-12 sm:grid-cols-2">
                  <ValuePillar
                    number="01"
                    title="Strength"
                    desc="The strength to keep moving forward through hardship and uncertainty."
                  />

                  <ValuePillar
                    number="02"
                    title="Loyalty"
                    desc="A commitment to family, friends, community, and the people who depend on us."
                  />

                  <ValuePillar
                    number="03"
                    title="Perseverance"
                    desc="The determination to continue working toward a better future when the path is difficult."
                  />

                  <ValuePillar
                    number="04"
                    title="Family & Friendship"
                    desc="The relationships that support us, shape us, and carry a person's memory forward."
                  />
                </div>
              </div>
            </div>
          </section>

          {/* SCHOLARSHIP DETAILS */}
          <section className="border-b border-slate-100">
            <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
              <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
                <div>
                  <div className="mb-6 flex items-center gap-3">
                    <div className="h-px w-5 bg-red-700" />

                    <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-red-700">
                      The award
                    </span>
                  </div>

                  <h2 className="mb-8 font-['Cormorant_Garamond'] text-4xl font-light leading-tight text-slate-900">
                    The Forever 44
                    <br />
                    <em className="italic text-red-700">
                      Scholarship Fund
                    </em>
                  </h2>

                  <div className="mb-10 space-y-5 text-[15px] font-light leading-[1.9] text-slate-500">
                    <p>
                      Established to honor Kaleb&apos;s life and memory, the
                      scholarship supports students who demonstrate
                      resilience, heart, character, and determination.
                    </p>

                    <p>
                      Forever 44 represents strength in the face of adversity
                      and a commitment to carrying forward the memory of
                      someone taken far too soon.
                    </p>

                    <p>
                      Through the Blue Duck Foundation, students receive support
                      as they pursue higher education and build futures rooted
                      in purpose, perseverance, and community.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-4">
                    <Link
                      href="/contact"
                      className="inline-flex bg-red-700 px-7 py-3.5 text-[11px] font-medium uppercase tracking-[0.14em] text-white transition-colors hover:bg-red-800"
                    >
                      Apply now
                    </Link>

                    <Link
                      href="/donate"
                      className="inline-flex bg-blue-900 px-7 py-3.5 text-[11px] font-medium uppercase tracking-[0.14em] text-white transition-colors hover:bg-blue-950"
                    >
                      Fund a scholarship
                    </Link>

                    <Link
                      href="/about"
                      className="inline-flex border border-slate-200 px-7 py-3.5 text-[11px] font-medium uppercase tracking-[0.14em] text-slate-700 transition-colors hover:border-slate-400"
                    >
                      About the Foundation
                    </Link>
                  </div>
                </div>

                <div className="border border-slate-100 bg-slate-50 p-7 sm:p-10">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="h-px w-5 bg-red-700" />

                    <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-red-700">
                      Eligibility &amp; criteria
                    </span>
                  </div>

                  <p className="mb-6 text-sm font-light leading-relaxed text-slate-500">
                    Applicants are evaluated on the following:
                  </p>

                  <ul>
                    <CriteriaItem>
                      Graduating high school senior or current undergraduate
                      student
                    </CriteriaItem>

                    <CriteriaItem>
                      Demonstrated resilience, perseverance, and strength of
                      character
                    </CriteriaItem>

                    <CriteriaItem>
                      Commitment to family, community, and the people around
                      them
                    </CriteriaItem>

                    <CriteriaItem>
                      Pursuing higher education with purpose and determination
                    </CriteriaItem>

                    <CriteriaItem>
                      Personal essay reflecting on legacy, loss, resilience, or
                      carrying someone&apos;s memory forward
                    </CriteriaItem>

                    <CriteriaItem>
                      One letter of recommendation from a teacher, coach, or
                      mentor
                    </CriteriaItem>
                  </ul>

                  <div className="mt-8 border-l-2 border-blue-800 py-1 pl-5">
                    <p className="mb-1 text-[10px] font-medium uppercase tracking-[0.15em] text-blue-800">
                      A note on selection
                    </p>

                    <p className="text-sm font-light italic leading-relaxed text-slate-500">
                      Selection considers the whole person, including
                      character, perseverance, purpose, and care for others.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* TIMELINE */}
          <section className="border-b border-slate-100 bg-slate-50">
            <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
              <div className="grid gap-16 lg:grid-cols-[1fr_2fr] lg:gap-24">
                <div>
                  <div className="mb-6 flex items-center gap-3">
                    <div className="h-px w-5 bg-red-700" />

                    <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-red-700">
                      The story
                    </span>
                  </div>

                  <h2 className="font-['Cormorant_Garamond'] text-4xl font-light leading-tight text-slate-900">
                    A life remembered,
                    <br />
                    <em className="italic text-red-700">
                      a legacy continued
                    </em>
                  </h2>

                  <div className="mt-12 text-center lg:mt-16">
                    <div
                      className="select-none font-['Cormorant_Garamond'] text-[120px] font-light leading-none sm:text-[140px]"
                      style={{
                        WebkitTextStroke: "1px #991b1b",
                        color: "transparent",
                        opacity: 0.12,
                      }}
                    >
                      44
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <TimelineItem
                    year="December 15, 1994"
                    event="Kaleb Cory is born."
                  />

                  <TimelineItem
                    year="July 27, 2014"
                    event="Kaleb passes away at 19 years old. His memory remains with his family, friends, and community."
                  />

                  <TimelineItem
                    year="2026"
                    event="The Blue Duck Foundation establishes the Forever 44 Scholarship Fund in Kaleb's memory."
                  />

                  <TimelineItem
                    year="Ongoing"
                    event="Students supported by the scholarship carry Kaleb's memory forward as they pursue their education and serve their communities."
                  />
                </div>
              </div>
            </div>
          </section>

          {/* SUPPORT */}
          <section className="border-b border-slate-100">
            <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
              <div className="grid gap-16 lg:grid-cols-[1fr_3fr] lg:gap-24">
                <div>
                  <div className="mb-6 flex items-center gap-3">
                    <div className="h-px w-5 bg-red-700" />

                    <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-red-700">
                      Get involved
                    </span>
                  </div>

                  <h2 className="font-['Cormorant_Garamond'] text-4xl font-light leading-tight text-slate-900">
                    Help us carry it
                    <br />
                    <em className="italic text-red-700">forward</em>
                  </h2>

                  <p className="mt-4 text-sm font-light leading-relaxed text-slate-400">
                    Support the scholarship, nominate a deserving student, or
                    help share the opportunity with schools and communities.
                  </p>
                </div>

                <div className="grid gap-px bg-slate-100 sm:grid-cols-3">
                  <div className="flex flex-col justify-between bg-slate-900 p-8">
                    <div>
                      <h3 className="mb-3 font-['Cormorant_Garamond'] text-2xl font-light text-white">
                        Donate
                      </h3>

                      <p className="mb-6 text-sm font-light leading-relaxed text-slate-400">
                        Contributions help fund scholarship awards for
                        deserving students.
                      </p>
                    </div>

                    <Link
                      href="/donate"
                      className="text-[11px] font-medium uppercase tracking-[0.12em] text-red-400 transition-colors hover:text-red-300"
                    >
                      Make a contribution →
                    </Link>
                  </div>

                  <div className="flex flex-col justify-between bg-white p-8">
                    <div>
                      <h3 className="mb-3 font-['Cormorant_Garamond'] text-2xl font-light text-slate-900">
                        Nominate a student
                      </h3>

                      <p className="mb-6 text-sm font-light leading-relaxed text-slate-500">
                        Tell us about a student whose character and
                        determination deserve recognition.
                      </p>
                    </div>

                    <Link
                      href="/contact"
                      className="text-[11px] font-medium uppercase tracking-[0.12em] text-red-700 transition-colors hover:text-red-900"
                    >
                      Submit a nomination →
                    </Link>
                  </div>

                  <div className="flex flex-col justify-between bg-white p-8">
                    <div>
                      <h3 className="mb-3 font-['Cormorant_Garamond'] text-2xl font-light text-slate-900">
                        Spread the word
                      </h3>

                      <p className="mb-6 text-sm font-light leading-relaxed text-slate-500">
                        Share the scholarship with schools, families, and
                        communities.
                      </p>
                    </div>

                    <Link
                      href="/contact"
                      className="text-[11px] font-medium uppercase tracking-[0.12em] text-red-700 transition-colors hover:text-red-900"
                    >
                      Contact the Foundation →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CLOSING CTA */}
          <section className="bg-slate-950 py-24 sm:py-28">
            <div className="mx-auto max-w-4xl px-6 text-center">
              <p className="mb-5 text-[10px] font-medium uppercase tracking-[0.25em] text-red-300">
                Forever 44 Scholarship Fund
              </p>

              <h2 className="mb-6 font-['Cormorant_Garamond'] text-4xl font-light leading-tight text-white sm:text-6xl">
                Carrying Kaleb&apos;s memory
                <br />
                <em className="italic">into the future</em>
              </h2>

              <p className="mb-12 font-['Cormorant_Garamond'] text-xl italic text-slate-400">
                In memory of Kaleb Cory — December 15, 1994 – July 27, 2014
              </p>

              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Link
                  href="/contact"
                  className="bg-white px-10 py-4 text-[11px] font-medium uppercase tracking-[0.14em] text-slate-900 transition-colors hover:bg-slate-100"
                >
                  Apply for the scholarship
                </Link>

                <Link
                  href="/donate"
                  className="border border-white/40 px-10 py-4 text-[11px] font-medium uppercase tracking-[0.14em] text-white transition-colors hover:bg-white/10"
                >
                  Fund a scholarship
                </Link>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
