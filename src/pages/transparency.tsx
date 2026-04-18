import Head from "next/head";
import Link from "next/link";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

export default function TransparencyPage() {
  return (
    <>
      <Head>
        <title>Transparency & Governance — The Blue Duck Foundation</title>
        <meta name="description" content="Full transparency from The Blue Duck Foundation. IRS determination, EIN, governance, financial roadmap, and public accountability." />
      </Head>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow bg-white font-['Jost',sans-serif]">

          {/* HERO */}
          <section className="border-b border-slate-100">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="grid lg:grid-cols-[55fr_45fr] min-h-[380px]">
                <div className="py-20 lg:py-28 lg:pr-16 lg:border-r border-slate-100 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-10">
                    <div className="w-6 h-px bg-slate-300" />
                    <span className="text-[10px] tracking-[0.2em] uppercase text-slate-400 font-medium">
                      Accountability
                    </span>
                  </div>
                  <h1 className="font-['Cormorant_Garamond'] text-6xl lg:text-7xl font-light leading-[1.04] tracking-tight text-slate-900 mb-8">
                    Transparent<br />
                    <em className="italic">from day one.</em>
                  </h1>
                  <p className="text-[15px] leading-[1.9] text-slate-500 font-light max-w-md">
                    We are an early-stage organization. This page documents exactly where we are, what we've established, and what's coming. No varnish.
                  </p>
                </div>
                <div className="hidden lg:flex flex-col justify-center py-28 pl-16">
                  <div className="space-y-0">
                    {[
                      { label: "501(c)(3) Confirmed", status: true },
                      { label: "EIN Issued", status: true },
                      { label: "IRS Determination Received", status: true },
                      { label: "Texas Incorporation", status: true },
                      { label: "First 990 Due", status: false, note: "2027" },
                      { label: "Independent Audit", status: false, note: "Year 2" },
                      { label: "Published Impact Report", status: false, note: "Q4 2026" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between py-3.5 border-b border-slate-100 first:border-t">
                        <div className="flex items-center gap-3">
                          <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${item.status ? "bg-emerald-500" : "bg-slate-200"}`} />
                          <span className="text-sm text-slate-600 font-light">{item.label}</span>
                        </div>
                        {item.note && <span className="text-[11px] text-slate-400">{item.note}</span>}
                        {item.status && <span className="text-[11px] text-emerald-600 font-medium">Done</span>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* IRS DETERMINATION */}
          <section className="border-b border-slate-100 bg-slate-50">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-24">
              <div className="grid lg:grid-cols-[1fr_2fr] gap-16 lg:gap-24">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-5 h-px bg-slate-300" />
                    <span className="text-[10px] tracking-[0.2em] uppercase text-slate-400 font-medium">Federal recognition</span>
                  </div>
                  <h2 className="font-['Cormorant_Garamond'] text-4xl font-light text-slate-900 leading-tight">
                    IRS<br />Determination
                  </h2>
                  <p className="mt-4 text-sm text-slate-400 font-light leading-relaxed">
                    Issued by the Department of the Treasury Internal Revenue Service, Tax Exempt and Government Entities division. Letter 947 (Rev. 2-2020).
                  </p>
                </div>
                <div>
                  <div className="border border-slate-200 bg-white p-10">
                    <div className="flex items-center gap-3 mb-8">
                      <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-[10px] tracking-[0.15em] uppercase text-emerald-600 font-medium">Confirmed exempt</div>
                        <div className="text-sm text-slate-700 font-light">IRC Section 501(c)(3)</div>
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-0">
                      {[
                        ["Organization", "The Blue Duck Foundation"],
                        ["Employer ID (EIN)", "41-4361489"],
                        ["Effective date", "February 18, 2026"],
                        ["IRS letter date", "March 25, 2026"],
                        ["Public charity status", "170(b)(1)(A)(vi)"],
                        ["Accounting period", "December 31"],
                        ["990 filing required", "Yes — annually"],
                        ["Contribution deductibility", "Yes"],
                        ["Addendum", "No"],
                        ["IRS contact", "Ms. Stinson · 877-829-5500"],
                        ["IRS ID number", "3913317"],
                        ["Address on file", "1203 S College Street, McKinney TX 75069"],
                      ].map(([label, value], i) => (
                        <div key={i} className="flex flex-col py-3 border-b border-slate-100 pr-6">
                          <span className="text-[10px] tracking-[0.12em] uppercase text-slate-400 mb-1">{label}</span>
                          <span className="text-sm text-slate-700 font-light">{value}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-8 bg-slate-50 border border-slate-100 p-6">
                      <p className="text-[13px] text-slate-500 font-light leading-relaxed italic">
                        "We're pleased to tell you we determined you're exempt from federal income tax under Internal Revenue Code (IRC) Section 501(c)(3). Donors can deduct contributions they make to you under IRC Section 170."
                      </p>
                      <p className="text-[11px] text-slate-400 mt-3">— Stephen A. Martin, Director, Exempt Organizations Rulings and Agreements, IRS</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* WHERE WE ARE */}
          <section className="border-b border-slate-100">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-24">
              <div className="grid lg:grid-cols-[1fr_2fr] gap-16 lg:gap-24">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-5 h-px bg-slate-300" />
                    <span className="text-[10px] tracking-[0.2em] uppercase text-slate-400 font-medium">Honest assessment</span>
                  </div>
                  <h2 className="font-['Cormorant_Garamond'] text-4xl font-light text-slate-900 leading-tight">
                    Where we<br />are right now
                  </h2>
                </div>
                <div>
                  <p className="text-[15px] leading-[1.9] text-slate-500 font-light mb-10">
                    The Blue Duck Foundation launched in early 2026. We are an early-stage organization with federal recognition, a working donation and membership system, and programs in active development. We believe in saying exactly where we are rather than overstating our maturity.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-0">
                    {[
                      { label: "Established", status: "✓", desc: "Texas incorporation, IRS 501(c)(3) determination, EIN issued" },
                      { label: "Donation infrastructure", status: "✓", desc: "Stripe-powered, IRS-compliant receipts, live at theblueduck.org/donate" },
                      { label: "Membership system", status: "✓", desc: "Four tiers (Playa, Marsh, Flyway, Sentinel), monthly and annual recurring" },
                      { label: "Forever 44 Scholarship", status: "✓", desc: "Established and accepting applications through theblueduck.org/scholarship" },
                      { label: "Conservation Watch", status: "✓", desc: "Live news feed, updated every 30 minutes from major conservation sources" },
                      { label: "Board of Directors", status: "Active", desc: "DJ Morgan (Exec. Director), Cameron Francis, Jeramiah Sullivan — 2 seats open" },
                      { label: "First 990 filing", status: "2027", desc: "First full accounting year ends December 31, 2026. 990 due by May 2027." },
                      { label: "Published financial reports", status: "Q4 2026", desc: "First annual impact report planned for Q4 2026 covering launch year activity" },
                      { label: "Independent audit", status: "Year 2", desc: "Planned for the second full operating year as the Foundation scales" },
                      { label: "Active field programs", status: "In dev", desc: "Conservation and research partnerships in active development" },
                    ].map((item, i) => (
                      <div key={i} className="border-t border-slate-100 py-5 pr-8">
                        <div className="flex items-start justify-between gap-4 mb-1">
                          <span className="text-sm font-medium text-slate-900">{item.label}</span>
                          <span className={`text-[10px] font-medium flex-shrink-0 ${
                            item.status === "✓" ? "text-emerald-600" :
                            item.status === "Active" ? "text-blue-600" : "text-slate-400"
                          }`}>{item.status}</span>
                        </div>
                        <p className="text-[13px] text-slate-500 font-light leading-relaxed">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FINANCIAL COMMITMENT */}
          <section className="border-b border-slate-100 bg-slate-50">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-24">
              <div className="grid lg:grid-cols-[1fr_3fr] gap-16 lg:gap-24">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-5 h-px bg-slate-300" />
                    <span className="text-[10px] tracking-[0.2em] uppercase text-slate-400 font-medium">Commitments</span>
                  </div>
                  <h2 className="font-['Cormorant_Garamond'] text-4xl font-light text-slate-900 leading-tight">
                    Our financial<br />commitments
                  </h2>
                </div>
                <div className="grid sm:grid-cols-2 gap-x-12">
                  {[
                    { num: "01", title: "Annual 990 filing", desc: "We will file Form 990 annually with the IRS as required. The 990 is a public document — we will link it here when filed." },
                    { num: "02", title: "Annual impact report", desc: "Every year we will publish a plain-language report showing what money came in, where it went, and what it accomplished." },
                    { num: "03", title: "Project-level budgets", desc: "Every funded program will have a public budget showing how money was allocated and spent." },
                    { num: "04", title: "Independent audit", desc: "As the Foundation scales, we are committed to third-party financial audits and will publish the results." },
                    { num: "05", title: "Open IRS filings", desc: "All IRS correspondence and governing documents will be accessible. The determination letter is on file and available on request." },
                    { num: "06", title: "Public board disclosure", desc: "All board members and advisors are publicly named. Board meeting decisions affecting programs or finances will be summarized annually." },
                  ].map((item, i) => (
                    <div key={i} className="border-t border-slate-200 pt-6 pb-4">
                      <div className="text-[10px] tracking-[0.2em] uppercase text-slate-300 font-medium mb-3">{item.num}</div>
                      <h3 className="font-['Cormorant_Garamond'] text-xl font-light text-slate-900 mb-2">{item.title}</h3>
                      <p className="text-sm text-slate-500 font-light leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* GOVERNANCE */}
          <section className="border-b border-slate-100">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-24">
              <div className="grid lg:grid-cols-[1fr_2fr] gap-16 lg:gap-24">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-5 h-px bg-slate-300" />
                    <span className="text-[10px] tracking-[0.2em] uppercase text-slate-400 font-medium">Governance</span>
                  </div>
                  <h2 className="font-['Cormorant_Garamond'] text-4xl font-light text-slate-900 leading-tight">
                    Governing<br />documents
                  </h2>
                </div>
                <div>
                  <p className="text-[15px] leading-[1.9] text-slate-500 font-light mb-10">
                    The Blue Duck Foundation operates under Articles of Incorporation filed with the Texas Secretary of State (File #806451017) and IRS-approved bylaws. These documents govern the Foundation's operations, board structure, and financial controls.
                  </p>
                  <div className="space-y-0">
                    {[
                      { label: "Texas SOS File #", value: "806451017" },
                      { label: "Entity type", value: "Texas Nonprofit Corporation" },
                      { label: "IRS classification", value: "501(c)(3) Public Charity — IRC 170(b)(1)(A)(vi)" },
                      { label: "Accounting year end", value: "December 31" },
                      { label: "Governing documents", value: "Available on request — email info@theblueduck.org" },
                      { label: "IRS determination letter", value: "On file — issued March 25, 2026, effective February 18, 2026" },
                    ].map(({label, value}, i) => (
                      <div key={i} className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-8 py-4 border-b border-slate-100">
                        <span className="text-[11px] tracking-[0.1em] uppercase text-slate-400 sm:w-48 flex-shrink-0">{label}</span>
                        <span className="text-sm text-slate-600 font-light">{value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-10 bg-slate-900 p-8">
                    <p className="text-sm text-slate-300 font-light leading-relaxed mb-4">
                      To request governing documents, financial records, or the IRS determination letter, contact us directly. We respond to all document requests within 5 business days.
                    </p>
                    <a href="mailto:info@theblueduck.org" className="text-[11px] font-medium tracking-[0.14em] uppercase text-white border border-slate-700 px-6 py-3 hover:border-slate-500 transition-colors inline-flex">
                      Request documents →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section>
            <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20 lg:py-24">
              <div className="grid lg:grid-cols-2 gap-10 items-center">
                <div>
                  <h2 className="font-['Cormorant_Garamond'] text-4xl font-light text-slate-900 mb-4">
                    Questions about our<br /><em className="italic">governance or financials?</em>
                  </h2>
                  <p className="text-[15px] text-slate-500 font-light leading-relaxed">
                    We welcome questions from donors, partners, journalists, and the public. Transparency is the foundation — not a feature.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 lg:justify-end">
                  <Link href="/contact" className="text-[11px] font-medium tracking-[0.14em] uppercase bg-slate-900 text-white px-8 py-4 hover:bg-slate-700 transition-colors text-center">
                    Contact us
                  </Link>
                  <Link href="/about" className="text-[11px] font-medium tracking-[0.14em] uppercase border border-slate-200 text-slate-700 px-8 py-4 hover:border-slate-400 transition-colors text-center">
                    About the Foundation
                  </Link>
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
