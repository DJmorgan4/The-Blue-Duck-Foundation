import Head from "next/head";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// ─── HIDDEN TRIDENT MARK ──────────────────────────────────────────────────
function TridentMark({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 56" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <line x1="20" y1="56" x2="20" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="12" y1="52" x2="28" y2="52" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M20 18 L20 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M20 22 Q14 18 10 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M20 22 Q26 18 30 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <path d="M10 8 L8 3 L12 6 L11 1" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M20 4 L18 0 L21 3 L20 -1" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M30 8 L28 3 L32 6 L31 1" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-3xl font-light tracking-tight text-slate-900">{value}</div>
      <div className="mt-1.5 text-sm font-medium text-slate-500">{label}</div>
    </div>
  );
}

function PillarSection({
  number, label, title, description, items, href, cta, accent,
}: {
  number: string; label: string; title: string; description: string;
  items: string[]; href: string; cta: string; accent: "sage" | "earth" | "water";
}) {
  const accentMap = {
    sage:  { bg: "bg-emerald-50", border: "border-emerald-200", tag: "bg-emerald-100 text-emerald-800", num: "text-emerald-200" },
    earth: { bg: "bg-amber-50",   border: "border-amber-200",   tag: "bg-amber-100 text-amber-800",     num: "text-amber-200"   },
    water: { bg: "bg-sky-50",     border: "border-sky-200",     tag: "bg-sky-100 text-sky-800",         num: "text-sky-200"     },
  };
  const a = accentMap[accent];
  return (
    <section className={`border-b border-slate-100 ${a.bg}`}>
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-20 items-start">
          <div className="lg:pt-2">
            <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${a.tag}`}>{label}</span>
            <div className={`mt-4 text-8xl font-light leading-none ${a.num} select-none`}>{number}</div>
          </div>
          <div>
            <h2 className="text-4xl font-light tracking-tight text-slate-900 sm:text-5xl">{title}</h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-600 max-w-2xl">{description}</p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {items.map((item) => (
                <li key={item} className={`flex items-start gap-3 rounded-xl border ${a.border} bg-white/70 px-4 py-3 text-sm text-slate-700`}>
                  <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Link href={href} className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-700">
                {cta}
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustIndicator({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 text-sm text-slate-600">
      <svg className="h-5 w-5 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
      </svg>
      {children}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Head>
        <title>The Blue Duck Foundation — Stewardship Without Borders</title>
        <meta name="description" content="A Texas-born, globally-minded 501(c)(3) nonprofit dedicated to environmental conservation, scientific research, cultural preservation, and humanitarian support — wherever the work is needed most." />
        <meta property="og:title" content="The Blue Duck Foundation" />
        <meta property="og:description" content="Protecting the natural world and the communities that depend on it — transparently, scientifically, and without borders." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <div className="flex min-h-screen flex-col">
        <Header />

        <main className="flex-1 bg-white">

          {/* HERO */}
          <section className="relative overflow-hidden border-b border-slate-100">
            <div className="absolute inset-0 -z-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#f1f5f9_0%,_transparent_55%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_#f8fafc_0%,_transparent_55%)]" />
            </div>

            <div className="absolute top-6 right-8 text-slate-900/[0.04] hover:text-slate-900/[0.08] transition-colors duration-700 pointer-events-none select-none">
              <TridentMark className="w-8 h-11" />
            </div>

            <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
              <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
                <div className="flex flex-col justify-center">
                  <div className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm font-medium text-slate-700 shadow-sm">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                    </span>
                    501(c)(3) Nonprofit · EIN 41-4361489
                  </div>

                  <h1 className="mt-8 text-5xl font-light tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
                    Stewardship without borders
                  </h1>

                  <p className="mt-6 text-lg leading-relaxed text-slate-600">
                    The Blue Duck Foundation is a Texas-born, globally-minded 501(c)(3) nonprofit dedicated to environmental conservation, scientific research, cultural preservation, and humanitarian support — wherever the work is needed most.
                  </p>

                  <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                    <Link href="/about" className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-8 py-4 font-semibold text-white shadow-sm transition-all hover:bg-slate-800 hover:shadow-md">
                      Our mission
                    </Link>
                    <Link href="/conservation" className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-8 py-4 font-semibold text-slate-900 transition-all hover:bg-slate-50">
                      Our programs
                    </Link>
                  </div>

                  <div className="mt-12 grid grid-cols-3 gap-8 border-t border-slate-200 pt-8">
                    <Stat label="Legal status" value="Active" />
                    <Stat label="Founded" value="2026" />
                    <Stat label="Scope" value="Global" />
                  </div>

                  <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
                    <TrustIndicator>Federally recognized 501(c)(3)</TrustIndicator>
                    <TrustIndicator>Fully transparent operations</TrustIndicator>
                    <TrustIndicator>Science-driven approach</TrustIndicator>
                  </div>
                </div>

                {/* Right panel */}
                <div className="flex flex-col gap-6">
                  <div className="rounded-2xl border border-slate-200/80 bg-white p-8 shadow-sm">
                    <div className="flex items-start justify-between">
                      <div>
                        <h2 className="text-xl font-semibold text-slate-900">Foundation Development</h2>
                        <p className="mt-1 text-slate-600">Building the structure for lasting global impact</p>
                      </div>
                      <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-800">Active</span>
                    </div>
                    <div className="mt-8 space-y-6">
                      <div className="rounded-xl bg-slate-50 p-5">
                        <h3 className="text-sm font-semibold text-slate-900">2026 priorities</h3>
                        <ul className="mt-3 space-y-2.5">
                          {[
                            "501(c)(3) status confirmed — EIN 41-4361489",
                            "Certificate of Amendment filed — expanded global mission",
                            "Board of Directors being established",
                            "Building conservation and research partnerships",
                            "Deploying IoT environmental monitoring systems",
                            "Launching inaugural programs and fundraising",
                          ].map((item) => (
                            <li key={item} className="flex gap-3 text-sm text-slate-700">
                              <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                              </svg>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <Link href="/about" className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800">
                          Learn more
                        </Link>
                        <Link href="/contact" className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-50">
                          Get involved
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-slate-200/80 bg-slate-900 p-8 text-white">
                    <h3 className="text-lg font-semibold">Built on transparency</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-300">
                      From day one, we're committed to detailed reporting, clear financial accountability, and measurable outcomes. Every initiative includes public progress updates and third-party verification — no exceptions.
                    </p>
                    <Link href="/about" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-slate-200">
                      Our approach
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* THREE PILLARS */}
          <PillarSection
            number="01"
            label="Environment & Natural Resources"
            accent="sage"
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

          <PillarSection
            number="02"
            label="Archaeological & Historical"
            accent="earth"
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
          />

          <PillarSection
            number="03"
            label="Mission to Help"
            accent="water"
            title="Clean water. Direct assistance. Open pathways."
            description="Where environmental protection and human dignity intersect, we show up. Clean water access, safety equipment, humanitarian aid, and transparent funding pathways for forward-thinking work in conservation, renewables, and community resilience — especially in underserved and resource-dependent regions."
            items={[
              "International freshwater access initiatives",
              "Safety equipment and field training",
              "Humanitarian environmental assistance",
              "Support for communities in resource-dependent regions",
              "Transparent pathways for renewable energy research",
              "Grants to organizations doing work that's been gatekept",
            ]}
            href="/conservation#humanitarian"
            cta="Humanitarian programs"
          />

          {/* CTA */}
          <section className="bg-white">
            <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
              <div className="rounded-2xl border border-slate-200/80 bg-white p-8 shadow-sm md:p-12 mb-12">
                <div className="grid gap-8 md:grid-cols-2 md:items-center">
                  <div>
                    <h2 className="text-3xl font-light tracking-tight text-slate-900">Follow our progress</h2>
                    <p className="mt-3 text-slate-600">Stay informed as we launch programs, announce partnerships, and grow our global network.</p>
                  </div>
                  <form className="flex flex-col gap-3 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
                    <label className="sr-only" htmlFor="email">Email address</label>
                    <input
                      id="email" type="email" inputMode="email" autoComplete="email"
                      placeholder="your.email@example.com" required
                      className="flex-1 rounded-xl border border-slate-300 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400/20"
                    />
                    <button type="submit" className="rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white transition-colors hover:bg-slate-800">
                      Subscribe
                    </button>
                  </form>
                </div>
              </div>

              <div className="overflow-hidden rounded-2xl bg-slate-900 shadow-xl">
                <div className="px-8 py-12 md:px-12 md:py-16">
                  <div className="grid gap-8 md:grid-cols-2 md:items-center">
                    <div>
                      <h3 className="text-3xl font-light tracking-tight text-white">Help us build something meaningful</h3>
                      <p className="mt-3 text-lg text-slate-300">
                        The Blue Duck Foundation creates transparent, compliant pathways for people who want to support forward-thinking conservation, research, and community work — globally.
                      </p>
                      <div className="mt-6 flex flex-wrap gap-4">
                        {["Transparent from day one", "Science-backed approach", "No gatekeeping"].map((item) => (
                          <div key={item} className="flex items-center gap-2 text-sm text-slate-300">
                            <svg className="h-5 w-5 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                            </svg>
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
                      <Link href="/contact" className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 font-semibold text-slate-900 transition-colors hover:bg-slate-100">
                        Get involved
                      </Link>
                      <Link href="/about" className="inline-flex items-center justify-center rounded-xl border border-white/30 px-8 py-4 font-semibold text-white transition-colors hover:bg-white/10">
                        Our story
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
    </>
  );
}
