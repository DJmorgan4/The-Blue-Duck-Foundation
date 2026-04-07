import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Link from 'next/link';

const products = [
  {
    category: "Apparel",
    items: [
      {
        name: "Foundation Golf Polo",
        desc: "Performance polo bearing the Blue Duck Foundation mark. Built for the course, worn with purpose.",
      },
      {
        name: "Field Exploration Shirt",
        desc: "Lightweight, durable, and designed for fieldwork. Vented, sun-protective, and built to last.",
      },
      {
        name: "Sentinel Member Jacket",
        desc: "Exclusive to Sentinel-level members. A heavyweight commemorative piece for founding patrons.",
      },
    ],
  },
  {
    category: "Headwear",
    items: [
      {
        name: "Foundation Trucker Hat",
        desc: "Classic silhouette with the Foundation emblem. Worn in the field, at the range, anywhere.",
      },
      {
        name: "Flyway Member Hat",
        desc: "Exclusive to Flyway-level members and above. Structured, embroidered, and built to last.",
      },
    ],
  },
  {
    category: "Exploration Gear",
    items: [
      {
        name: "Field Pack",
        desc: "A durable carry-all built for conservation fieldwork — rugged, organized, and built for the long haul.",
      },
      {
        name: "Foundation Water Bottle",
        desc: "Double-wall insulated. Because clean water is the mission, not just the branding.",
      },
      {
        name: "Exploration Notebook",
        desc: "Waterproof-covered field journal. Document what you find — wherever you go.",
      },
    ],
  },
  {
    category: "Publications",
    items: [
      {
        name: "Annual Conservation Calendar",
        desc: "Featuring winners of the Nature & Wildlife Photography Competition. A year of the natural world, curated.",
      },
      {
        name: "Annual Impact Report",
        desc: "Full printed accounting of programs, expenditures, and outcomes. Transparency in hand.",
      },
    ],
  },
  {
    category: "Patches & Insignia",
    items: [
      {
        name: "Flyway Member Patch",
        desc: "Exclusive embroidered patch for Flyway members and above. Wear the mission.",
      },
      {
        name: "Foundation Decal Set",
        desc: "Durable exterior-grade decals. For the truck, the gear, the places you go.",
      },
    ],
  },
];

export default function ProductsPage() {
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
                    Foundation store
                  </span>
                </div>
                <h1 className="font-['Cormorant_Garamond'] text-6xl lg:text-7xl font-light leading-[1.04] tracking-tight text-slate-900 mb-8">
                  Wear the<br />
                  <em className="italic">mission.</em>
                </h1>
                <p className="text-[15px] leading-[1.9] text-slate-500 font-light max-w-md">
                  Foundation merchandise, exploration gear, and member exclusives — all coming soon. Proceeds support conservation, scholarship, and humanitarian programs worldwide.
                </p>
              </div>

              <div className="hidden lg:flex flex-col justify-center py-28 pl-16">
                <div className="space-y-0">
                  {products.map((cat, i) => (
                    <div key={i} className="flex items-baseline justify-between py-4 border-b border-slate-100 first:border-t">
                      <span className="font-['Cormorant_Garamond'] text-[20px] font-light text-slate-800">
                        {cat.category}
                      </span>
                      <span className="text-[10px] tracking-[0.15em] text-slate-300 font-medium ml-4">
                        {cat.items.length} {cat.items.length === 1 ? "item" : "items"}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 text-[11px] tracking-[0.08em] text-slate-400 font-light">
                  All purchases support Foundation programs
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── COMING SOON BANNER ────────────────────────────────────────── */}
        <div className="border-b border-slate-100 bg-slate-50">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-between gap-4 py-4">
              <div className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                <span className="text-[11px] text-slate-500 tracking-[0.03em]">
                  Store opening soon — register your interest to be notified at launch
                </span>
              </div>
              <Link
                href="/contact"
                className="text-[11px] font-medium tracking-[0.12em] uppercase text-slate-500 hover:text-slate-900 transition-colors"
              >
                Notify me →
              </Link>
            </div>
          </div>
        </div>

        {/* ── PRODUCT CATALOG ───────────────────────────────────────────── */}
        {products.map((cat, ci) => (
          <section
            key={ci}
            className={`border-b border-slate-100 ${ci % 2 === 1 ? "bg-slate-50" : "bg-white"}`}
          >
            <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 lg:py-20">
              <div className="grid lg:grid-cols-[1fr_3fr] gap-12 lg:gap-24">

                <div className="flex flex-col justify-start">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-5 h-px bg-slate-300" />
                    <span className="text-[10px] tracking-[0.2em] uppercase text-slate-400 font-medium">
                      {String(ci + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h2 className="font-['Cormorant_Garamond'] text-3xl font-light text-slate-900">
                    {cat.category}
                  </h2>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10">
                  {cat.items.map((item, ii) => (
                    <div key={ii} className="border-t border-slate-100 pt-6 pb-4">
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <h3 className="font-['Cormorant_Garamond'] text-xl font-light text-slate-900">
                          {item.name}
                        </h3>
                        <span className="text-[9px] tracking-[0.15em] uppercase font-medium text-amber-600 bg-amber-50 px-2 py-1 flex-shrink-0 mt-0.5">
                          Soon
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed text-slate-500 font-light mb-4">
                        {item.desc}
                      </p>
                      <Link
                        href="/contact"
                        className="text-[11px] font-medium tracking-[0.1em] uppercase text-slate-400 hover:text-slate-900 transition-colors"
                      >
                        Notify me →
                      </Link>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          </section>
        ))}

        {/* ── MEMBER EXCLUSIVES CALLOUT ─────────────────────────────────── */}
        <section className="border-b border-slate-100">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 lg:py-20">
            <div className="grid lg:grid-cols-2 gap-12 lg:items-center">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-5 h-px bg-slate-300" />
                  <span className="text-[10px] tracking-[0.2em] uppercase text-slate-400 font-medium">
                    Member exclusives
                  </span>
                </div>
                <h2 className="font-['Cormorant_Garamond'] text-4xl font-light text-slate-900 mb-4 leading-tight">
                  Some gear is earned,<br /><em className="italic">not bought.</em>
                </h2>
                <p className="text-[15px] leading-[1.9] text-slate-500 font-light max-w-md">
                  Flyway and Sentinel members receive exclusive gear — the patch, the hat, the jacket — as part of their membership. These items are not available for general purchase.
                </p>
              </div>
              <div className="flex flex-col gap-0">
                {[
                  { tier: "Flyway", items: "Exclusive patch & hat" },
                  { tier: "Sentinel", items: "Member jacket · Founding patron plaque" },
                ].map((row, i) => (
                  <div key={i} className="flex items-baseline justify-between py-5 border-b border-slate-100 first:border-t">
                    <div>
                      <span className="font-['Cormorant_Garamond'] text-xl font-light text-slate-900 mr-3">
                        {row.tier}
                      </span>
                      <span className="text-[10px] tracking-[0.1em] uppercase text-slate-300 font-medium">
                        member exclusive
                      </span>
                    </div>
                    <span className="text-sm text-slate-500 font-light">{row.items}</span>
                  </div>
                ))}
                <div className="pt-6">
                  <Link
                    href="/membership"
                    className="text-[11px] font-medium tracking-[0.14em] uppercase border border-slate-200 text-slate-700 px-7 py-3.5 hover:border-slate-400 transition-colors inline-flex"
                  >
                    View membership tiers →
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
                      Get notified
                    </span>
                  </div>
                  <h3 className="font-['Cormorant_Garamond'] text-4xl font-light text-white mb-4 leading-tight">
                    Store launching<br /><em className="italic">soon.</em>
                  </h3>
                  <p className="text-[15px] leading-relaxed text-slate-400 font-light">
                    Be the first to know when products are available. Every purchase supports conservation, scholarship, and humanitarian programs worldwide.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 lg:justify-end">
                  <Link
                    href="/contact"
                    className="text-[11px] font-medium tracking-[0.14em] uppercase bg-white text-slate-900 px-8 py-4 hover:bg-slate-100 transition-colors text-center"
                  >
                    Notify me at launch
                  </Link>
                  <Link
                    href="/membership"
                    className="text-[11px] font-medium tracking-[0.14em] uppercase border border-slate-700 text-white px-8 py-4 hover:border-slate-500 transition-colors text-center"
                  >
                    Become a member
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
