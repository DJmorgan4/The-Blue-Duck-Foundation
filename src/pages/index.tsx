import Head from "next/head";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// ─── PILLAR ROW ────────────────────────────────────────────────────────────
function PillarRow({
  number,
  label,
  title,
  description,
  items,
  href,
  cta,
  dark,
}: {
  number: string;
  label: string;
  title: string;
  description: string;
  items: string[];
  href: string;
  cta: string;
  dark?: boolean;
}) {
  return (
    <section className={`border-b border-slate-100 ${dark ? "bg-slate-50" : "bg-white"}`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-24">
        <div className="grid lg:grid-cols-[1fr_3fr] gap-12 lg:gap-24">

          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-5 h-px bg-slate-300" />
              <span className="text-[10px] tracking-[0.2em] uppercase text-slate-400 font-medium">
                {number}
              </span>
            </div>
            <span className="text-[10px] tracking-[0.15em] uppercase font-medium text-slate-400 border border-slate-200 px-3 py-1.5 inline-block mb-4">
              {label}
            </span>
            <h2 className="font-['Cormorant_Garamond'] text-4xl font-light text-slate-900 leading-tight">
              {title}
            </h2>
          </div>

          <div>
            <p className="text-[15px] leading-[1.9] text-slate-500 font-light mb-8 max-w-2xl">
              {description}
            </p>
            <div className="grid sm:grid-cols-2 gap-x-10 mb-8">
              {items.map((item) => (
                <div key={item} className="flex items-start gap-3 py-3 border-b border-slate-100">
                  <span className="mt-2 w-1 h-1 rounded-full bg-slate-300 flex-shrink-0" />
                  <span className="text-sm text-slate-600 font-light">{item}</span>
                </div>
              ))}
            </div>
            <Link
              href={href}
              className="text-[11px] font-medium tracking-[0.14em] uppercase text-slate-500 hover:text-slate-900 transition-colors inline-flex items-center gap-2"
            >
              {cta} →
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}

// ─── PAGE ──────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      <Head>
        <title>The Blue Duck Foundation — Explore the World. Help It.</title>
        <meta name="description" content="A Texas-born, globally-minded 501(c)(3) nonprofit dedicated to environmental conservation, scientific research, cultural preservation, and humanitarian support — wherever the work is needed most." />
        <meta property="og:title" content="The Blue Duck Foundation" />
        <meta property="og:description" content="Protecting the natural world and the communities that depend on it — transparently, scientifically, and without borders." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <div className="flex min-h-screen flex-col">
        <Header />

        <main className="flex-1 bg-white font-['Jost',sans-serif]">

          {/* ── HERO ────────────────────────────────────────────────────── */}
          <section className="border-b border-slate-100">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="grid lg:grid-cols-[55fr_45fr] min-h-[520px]">

                <div className="py-20 lg:py-28 lg:pr-16 lg:border-r border-slate-100 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-10">
                      <div className="w-6 h-px bg-slate-300" />
                      <span className="text-[10px] tracking-[0.2em] uppercase text-slate-400 font-medium">
                        501(c)(3) Public Charity · EIN 41-4361489 · Texas
                      </span>
                    </div>

                    <h1 className="font-['Cormorant_Garamond'] text-6xl lg:text-7xl font-light leading-[1.04] tracking-tight text-slate-900 mb-8">
                      Explore<br />
                      the world.<br />
                      <em className="italic">Help it.</em>
                    </h1>

                    <p className="text-[15px] leading-[1.9] text-slate-500 font-light max-w-md mb-10">
                      The Blue Duck Foundation funds conservation, environmental science, cultural preservation, and humanitarian work — wherever it's needed. We show up, we document, and we act.
                    </p>

                    <div className="flex items-center gap-4">
                      <Link
                        href="/about"
                        className="text-[11px] font-medium tracking-[0.14em] uppercase bg-slate-900 text-white px-7 py-3.5 hover:bg-slate-700 transition-colors"
                      >
                        Our mission
                      </Link>
                      <Link
                        href="/conservation"
                        className="text-[11px] font-medium tracking-[0.14em] uppercase text-slate-500 border border-slate-200 px-7 py-3.5 hover:border-slate-400 transition-colors"
                      >
                        See the work →
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
                      <div key={item.num} className="flex items-baseline justify-between py-4 border-b border-slate-100 first:border-t">
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
                        <div className="font-['Cormorant_Garamond'] text-[19px] font-light text-slate-900 mb-0.5">
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

          {/* ── TRUST STRIP ───────────────────────────────────────────────*/}
          <div className="border-b border-slate-100 bg-slate-50">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="flex flex-wrap items-center divide-x divide-slate-200">
                {[
                  "Contributions deductible under IRC Section 170",
                  "Publicly supported · IRC 170(b)(1)(A)(vi)",
                  "Annual 990 filing · Full financial transparency",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 px-6 py-3.5 first:pl-0 text-[11px] text-slate-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── THREE PILLARS ─────────────────────────────────────────────*/}
          <PillarRow
            number="01"
            label="Environment & Natural Resources"
            title="Protecting the natural world — everywhere"
            description="From Texas wetlands to global ecosystems, we conserve and restore the environments that sustain all life. Wetlands, waterways, forests, coastal regions, freshwater systems, and biodiversity — supported by science, monitored by technology, and sustained by transparent partnerships."
            items={[
              "Ecosystem & habitat conservation worldwide",
              "Wildlife and biodiversity protection",
              "Freshwater access and watershed restoration",
              "IoT environmental monitoring technology",
              "Renewable energy and sustainable resource research",
              "Natural resource community support",
            ]}
            href="/conservation#conservation"
            cta="Conservation programs"
          />

          <PillarRow
            number="02"
            label="Archaeological & Historical"
            title="Preserving the record of humanity"
            description="Archaeological sites, indigenous histories, geological heritage, and culturally significant landscapes belong to all of us — and too many are disappearing. We fund documentation, protection, and public access to the human record, domestically and internationally."
            items={[
              "Archaeological site documentation & 3D mapping",
              "Indigenous history research and partnerships",
              "Cultural heritage landscape protection",
              "Geological heritage preservation",
              "Academic and field research grants",
              "Digital preservation and public platforms",
            ]}
            href="/conservation#heritage"
            cta="Heritage programs"
            dark
          />

          <PillarRow
            number="03"
            label="Mission to Help"
            title="Clean water. Direct assistance. Open pathways."
            description="Where environmental protection and human dignity intersect, we show up. Clean water access, safety equipment, humanitarian aid, and transparent funding pathways for forward-thinking work in conservation, renewables, and community resilience."
            items={[
              "International freshwater access initiatives",
              "Safety equipment and field training",
              "Humanitarian environmental assistance",
              "Support for resource-dependent region communities",
              "Transparent pathways for renewable energy research",
              "Grants to organizations doing work that's been gatekept",
            ]}
            href="/conservation#humanitarian"
            cta="Humanitarian programs"
          />

          {/* ── CTA ───────────────────────────────────────────────────────*/}
          <section>
            <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-24">

              <div className="border border-slate-100 p-8 lg:p-12 mb-6">
                <div className="grid lg:grid-cols-2 gap-8 lg:items-center">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-5 h-px bg-slate-300" />
                      <span className="text-[10px] tracking-[0.2em] uppercase text-slate-400 font-medium">
                        Stay informed
                      </span>
                    </div>
                    <h2 className="font-['Cormorant_Garamond'] text-3xl font-light text-slate-900 mb-2">
                      Follow our progress
                    </h2>
                    <p className="text-sm text-slate-500 font-light">
                      Stay informed as we launch programs, announce partnerships, and grow our global network.
                    </p>
                  </div>
                  <form className="flex gap-3" onSubmit={(e) => e.preventDefault()}>
                    <label className="sr-only" htmlFor="email">Email address</label>
                    <input
                      id="email" type="email" inputMode="email" autoComplete="email"
                      placeholder="your@email.com" required
                      className="flex-1 border border-slate-200 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-300 focus:border-slate-400 focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="text-[11px] font-medium tracking-[0.12em] uppercase bg-slate-900 text-white px-6 py-3 hover:bg-slate-700 transition-colors flex-shrink-0"
                    >
                      Subscribe
                    </button>
                  </form>
                </div>
              </div>

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
                      Help us build<br /><em className="italic">something meaningful.</em>
                    </h3>
                    <p className="text-[15px] leading-relaxed text-slate-400 font-light mb-6">
                      The Blue Duck Foundation creates transparent, compliant pathways for people who want to support forward-thinking conservation, research, and community work — globally.
                    </p>
                    <div className="flex flex-wrap gap-6">
                      {["Transparent from day one", "Science-backed approach", "No gatekeeping"].map((item) => (
                        <div key={item} className="flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-slate-600 flex-shrink-0" />
                          <span className="text-[13px] text-slate-400 font-light">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 lg:justify-end">
                    <Link
                      href="/contact"
                      className="text-[11px] font-medium tracking-[0.14em] uppercase bg-white text-slate-900 px-8 py-4 hover:bg-slate-100 transition-colors text-center"
                    >
                      Get involved
                    </Link>
                    <Link
                      href="/about"
                      className="text-[11px] font-medium tracking-[0.14em] uppercase border border-slate-700 text-white px-8 py-4 hover:border-slate-500 transition-colors text-center"
                    >
                      Our story
                    </Link>
                  </div>
                </div>
              </div>

            </div>
          </section>

        </main>

        <Footer />
      </div>
    </>
  );
}
