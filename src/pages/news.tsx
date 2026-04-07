import React, { useMemo, useState } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import type { GetStaticProps } from "next";
import {
  fetchAllConservationNews,
  type ConservationNewsItem,
  type FetchAllOptions,
} from "../api/texas";

type NewsProps = {
  items: ConservationNewsItem[];
  generatedAt: string;
  warnings: string[];
};

const STATUS_CONFIG: Record<
  ConservationNewsItem["status"],
  { label: string; color: string; bg: string }
> = {
  watch:    { label: "Monitoring",    color: "#92400e", bg: "#fef3c7" },
  active:   { label: "Active Threat", color: "#991b1b", bg: "#fef2f2" },
  resolved: { label: "Resolved",      color: "#065f46", bg: "#ecfdf5" },
};

const CATEGORY_COLORS: Record<string, { color: string; bg: string }> = {
  Wetlands:      { color: "#0e7490", bg: "#ecfeff" },
  Wildlife:      { color: "#0f766e", bg: "#f0fdfa" },
  "Clean Water": { color: "#1d4ed8", bg: "#eff6ff" },
  Litigation:    { color: "#c2410c", bg: "#fff7ed" },
  Legislation:   { color: "#6d28d9", bg: "#f5f3ff" },
  "Land Use":    { color: "#3f6212", bg: "#f7fee7" },
  Archaeology:   { color: "#92400e", bg: "#fffbeb" },
  Humanitarian:  { color: "#9d174d", bg: "#fdf2f8" },
  Energy:        { color: "#854d0e", bg: "#fefce8" },
};

function getCategoryStyle(cat: string) {
  return CATEGORY_COLORS[cat] || { color: "#475569", bg: "#f8fafc" };
}

function formatDate(iso: string): { month: string; day: string; year: string } {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return { month: "—", day: "—", year: "—" };
  return {
    month: d.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
    day: String(d.getDate()),
    year: String(d.getFullYear()),
  };
}

function formatPrettyDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function clampText(text: string, maxChars: number): string {
  if (!text) return "";
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= maxChars) return clean;
  return clean.slice(0, maxChars - 1).trimEnd() + "…";
}

export const getStaticProps: GetStaticProps<NewsProps> = async () => {
  const warnings: string[] = [];
  const options: FetchAllOptions = {
    regulationsApiKey: process.env.REGULATIONS_GOV_API_KEY,
    openStatesApiKey: process.env.OPENSTATES_API_KEY,
  };
  if (!options.regulationsApiKey) warnings.push("Regulations.gov key not set (REGULATIONS_GOV_API_KEY).");
  if (!options.openStatesApiKey) warnings.push("OpenStates key not set (OPENSTATES_API_KEY).");
  const items = await fetchAllConservationNews(options);
  return {
    props: { items, generatedAt: new Date().toISOString(), warnings },
    revalidate: 60 * 30,
  };
};

// ─── NEWS CARD ─────────────────────────────────────────────────────────────
function NewsCard({ item }: { item: ConservationNewsItem }) {
  const status = STATUS_CONFIG[item.status];
  const catStyle = getCategoryStyle(item.category);
  const { month, day, year } = formatDate(item.date);

  return (
    <article className="border-t border-slate-100 pt-6 pb-4">
      <div className="grid grid-cols-[48px_1fr] gap-5">

        <div className="flex flex-col items-center pt-0.5">
          <span className="text-[9px] font-medium tracking-[0.15em] text-slate-400">{month}</span>
          <span className="font-['Cormorant_Garamond'] text-2xl font-light text-slate-900 leading-none">{day}</span>
          <span className="text-[9px] text-slate-300">{year}</span>
        </div>

        <div>
          <div className="flex items-center gap-2 flex-wrap mb-2">
            <span
              className="text-[10px] tracking-[0.1em] uppercase font-medium px-2.5 py-0.5"
              style={{ color: status.color, background: status.bg }}
            >
              {status.label}
            </span>
            <span
              className="text-[10px] tracking-[0.1em] uppercase font-medium px-2.5 py-0.5"
              style={{ color: catStyle.color, background: catStyle.bg }}
            >
              {item.category}
            </span>
            {item.sourceType && (
              <span className="ml-auto text-[10px] text-slate-300 uppercase tracking-wider">
                {item.sourceType}
              </span>
            )}
          </div>

          <h2 className="text-base font-medium text-slate-900 leading-snug mb-1">
            <a href={item.link} target="_blank" rel="noreferrer" className="hover:text-slate-600 transition-colors">
              {item.title}
            </a>
          </h2>

          <div className="text-[11px] text-slate-400 mb-3">
            {item.source}{item.agency ? <span> · {item.agency}</span> : null}
          </div>

          <p className="text-sm text-slate-500 font-light leading-relaxed mb-3">
            {clampText(item.summary || "View the source for full details.", 240)}
          </p>

          {item.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {item.tags.slice(0, 4).map((t) => (
                <span key={t} className="text-[10px] text-slate-400 tracking-wide">
                  #{t}
                </span>
              ))}
            </div>
          )}

          <a
            href={item.link}
            target="_blank"
            rel="noreferrer"
            className="text-[11px] font-medium tracking-[0.1em] uppercase text-slate-400 hover:text-slate-900 transition-colors inline-flex items-center gap-2"
          >
            View primary source →
          </a>
        </div>
      </div>
    </article>
  );
}

// ─── FILTER PILL ───────────────────────────────────────────────────────────
function FilterPill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-3.5 py-1.5 text-[11px] tracking-[0.08em] uppercase font-medium border transition-all whitespace-nowrap ${
        active
          ? "bg-slate-900 text-white border-slate-900"
          : "bg-white text-slate-400 border-slate-200 hover:border-slate-400 hover:text-slate-700"
      }`}
    >
      {label}
    </button>
  );
}

// ─── PAGE ──────────────────────────────────────────────────────────────────
export default function NewsPage({ items, generatedAt, warnings }: NewsProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");
  const [status, setStatus] = useState<"All" | ConservationNewsItem["status"]>("All");
  const [source, setSource] = useState<string>("All");

  const categories = useMemo(() => {
    const set = new Set<string>(["All"]);
    items.forEach((i) => set.add(i.category));
    return Array.from(set).sort((a, b) => a === "All" ? -1 : b === "All" ? 1 : a.localeCompare(b));
  }, [items]);

  const sources = useMemo(() => {
    const set = new Set<string>(["All"]);
    items.forEach((i) => set.add(i.source));
    return Array.from(set).sort((a, b) => a === "All" ? -1 : b === "All" ? 1 : a.localeCompare(b));
  }, [items]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((i) => {
      const matchesQuery = !q || i.title.toLowerCase().includes(q) || (i.summary || "").toLowerCase().includes(q) || (i.agency || "").toLowerCase().includes(q);
      return matchesQuery && (category === "All" || i.category === category) && (status === "All" || i.status === status) && (source === "All" || i.source === source);
    });
  }, [items, query, category, status, source]);

  const activeCount   = items.filter((i) => i.status === "active").length;
  const watchCount    = items.filter((i) => i.status === "watch").length;
  const resolvedCount = items.filter((i) => i.status === "resolved").length;
  const hasFilters    = query || category !== "All" || status !== "All" || source !== "All";

  return (
    <div className="min-h-screen flex flex-col bg-white font-['Jost',sans-serif]">
      <Header />

      <main className="flex-grow">

        {/* ── ACTIVE THREAT BANNER ──────────────────────────────────────── */}
        {activeCount > 0 && (
          <div className="bg-red-50 border-b border-red-100 px-6 py-3 flex items-center gap-3">
            <span className="relative flex h-2 w-2 flex-shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
            </span>
            <span className="text-[11px] font-medium tracking-[0.08em] uppercase text-red-700">
              {activeCount} Active Threat{activeCount !== 1 ? "s" : ""}
            </span>
            <span className="text-red-300">—</span>
            <span className="text-[11px] text-red-500 truncate">
              {items.filter((i) => i.status === "active").map((i) => i.title).join("  ·  ")}
            </span>
          </div>
        )}

        {/* ── HERO ──────────────────────────────────────────────────────── */}
        <section className="border-b border-slate-100">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-[55fr_45fr] min-h-[380px]">

              <div className="py-20 lg:py-24 lg:pr-16 lg:border-r border-slate-100 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-10">
                    <div className="w-6 h-px bg-slate-300" />
                    <span className="text-[10px] tracking-[0.2em] uppercase text-slate-400 font-medium">
                      Updated every 30 minutes · Live feed
                    </span>
                  </div>
                  <h1 className="font-['Cormorant_Garamond'] text-6xl lg:text-7xl font-light leading-[1.04] tracking-tight text-slate-900 mb-8">
                    Conservation<br /><em className="italic">Watch.</em>
                  </h1>
                  <p className="text-[15px] leading-[1.9] text-slate-500 font-light max-w-md">
                    Authoritative tracking of environmental policy, litigation, land rights, freshwater issues, and conservation threats — sourced directly from government records, court filings, and primary sources. No opinion, no noise.
                  </p>
                </div>
                <p className="text-[11px] text-slate-300 font-light mt-8">
                  Last updated: {formatPrettyDate(generatedAt)}
                </p>
              </div>

              <div className="hidden lg:flex flex-col justify-center py-24 pl-16">
                <div className="grid grid-cols-2 border border-slate-100 bg-white">
                  {[
                    { val: activeCount,   label: "Active threats",  color: "#991b1b" },
                    { val: watchCount,    label: "Under watch",     color: "#92400e" },
                    { val: resolvedCount, label: "Resolved",        color: "#065f46" },
                    { val: items.length,  label: "Total items",     color: "#0f172a" },
                  ].map((s, i) => (
                    <div
                      key={i}
                      className="p-6 border-b border-r border-slate-100 last:border-r-0 [&:nth-child(2)]:border-r-0 [&:nth-child(3)]:border-b-0 [&:nth-child(4)]:border-b-0"
                    >
                      <div
                        className="font-['Cormorant_Garamond'] text-4xl font-light mb-1"
                        style={{ color: s.color }}
                      >
                        {s.val}
                      </div>
                      <div className="text-[10px] tracking-[0.1em] uppercase text-slate-400 font-medium">
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── MAIN CONTENT ──────────────────────────────────────────────── */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-14">

          {/* API warnings */}
          {warnings.length > 0 && (
            <div className="mb-10 border border-amber-200 bg-amber-50 p-5">
              <div className="text-[11px] tracking-[0.1em] uppercase font-medium text-amber-800 mb-2">
                Optional data sources not connected
              </div>
              <ul className="text-sm text-amber-700 space-y-1 font-light">
                {warnings.map((w) => <li key={w}>· {w}</li>)}
              </ul>
              <div className="mt-2 text-[11px] text-amber-600">
                Set keys in <code className="bg-amber-100 px-1">.env.local</code> to unlock all sources.
              </div>
            </div>
          )}

          {/* Controls */}
          <div className="flex flex-col gap-4 mb-12 pb-10 border-b border-slate-100">
            <div className="relative">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search issues, agencies, regulations… (e.g. WOTUS, Clean Water Act, ESA)"
                className="w-full border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-300 focus:border-slate-400 focus:outline-none"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-600 transition-colors text-lg"
                >
                  ×
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-[10px] tracking-[0.15em] uppercase text-slate-300 font-medium mr-1">Status</span>
              {(["All", "active", "watch", "resolved"] as const).map((s) => (
                <FilterPill
                  key={s}
                  label={s === "All" ? "All" : STATUS_CONFIG[s].label}
                  active={status === s}
                  onClick={() => setStatus(s)}
                />
              ))}
              <span className="w-px h-4 bg-slate-100 mx-2" />
              <span className="text-[10px] tracking-[0.15em] uppercase text-slate-300 font-medium mr-1">Category</span>
              {categories.map((c) => (
                <FilterPill key={c} label={c} active={category === c} onClick={() => setCategory(c)} />
              ))}
            </div>

            <div className="flex items-center gap-4 flex-wrap">
              <select
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className="border border-slate-200 bg-white px-3 py-1.5 text-[11px] text-slate-600 tracking-[0.04em] focus:outline-none focus:border-slate-400"
              >
                {sources.map((s) => <option value={s} key={s}>{s === "All" ? "All sources" : s}</option>)}
              </select>
              <span className="text-[11px] text-slate-400 font-light">
                {filtered.length} / {items.length} items
              </span>
              {hasFilters && (
                <button
                  onClick={() => { setQuery(""); setCategory("All"); setStatus("All"); setSource("All"); }}
                  className="text-[11px] tracking-[0.08em] uppercase font-medium text-slate-400 hover:text-slate-900 transition-colors"
                >
                  Clear filters
                </button>
              )}
            </div>
          </div>

          {/* Results */}
          <div className="grid lg:grid-cols-2 gap-x-16">
            {filtered.length === 0 ? (
              <div className="col-span-2 border border-dashed border-slate-200 p-16 text-center">
                <h3 className="font-['Cormorant_Garamond'] text-2xl font-light text-slate-900 mb-2">
                  No matching issues found
                </h3>
                <p className="text-sm text-slate-400 font-light">
                  Try broadening your search — e.g. "wetlands", "freshwater", "ESA", "Clean Water Act"
                </p>
              </div>
            ) : (
              filtered.map((item) => <NewsCard key={item.id} item={item} />)
            )}
          </div>

          {/* How We Publish */}
          <div className="mt-16 border-t border-slate-100 pt-14">
            <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-24">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-5 h-px bg-slate-300" />
                  <span className="text-[10px] tracking-[0.2em] uppercase text-slate-400 font-medium">
                    Editorial standards
                  </span>
                </div>
                <h2 className="font-['Cormorant_Garamond'] text-3xl font-light text-slate-900 leading-tight">
                  How we<br />publish
                </h2>
              </div>
              <div>
                <p className="text-[15px] leading-[1.9] text-slate-500 font-light mb-8">
                  The Blue Duck Foundation prioritizes government records, court documents, and verified primary sources. For third-party media, we publish headlines, brief excerpts, and direct links only. No copy-paste. No misrepresentation. Full transparency, always.
                </p>
                <div className="grid sm:grid-cols-3 gap-x-10">
                  {[
                    { title: "Issue Briefs", desc: "150–400 word summaries with full citation links." },
                    { title: "Primary Source Cards", desc: "Key excerpts + Foundation analysis + attribution." },
                    { title: "Weekly Digest", desc: '"What changed / What to watch" each week.' },
                  ].map((item, i) => (
                    <div key={i} className="border-t border-slate-100 pt-5">
                      <div className="font-['Cormorant_Garamond'] text-lg font-light text-slate-900 mb-1">
                        {item.title}
                      </div>
                      <p className="text-sm text-slate-500 font-light leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 bg-slate-900 px-10 py-12 lg:px-14 lg:py-14">
            <div className="grid lg:grid-cols-2 gap-8 lg:items-center">
              <div>
                <h3 className="font-['Cormorant_Garamond'] text-3xl font-light text-white mb-2 leading-tight">
                  Support the work<br /><em className="italic">behind the watch.</em>
                </h3>
                <p className="text-[11px] tracking-[0.06em] text-slate-600 mt-3">
                  501(c)(3) · EIN 41-4361489 · All donations tax-deductible
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 lg:justify-end">
                <a
                  href="/contact"
                  className="text-[11px] font-medium tracking-[0.14em] uppercase bg-white text-slate-900 px-8 py-4 hover:bg-slate-100 transition-colors text-center"
                >
                  Get involved
                </a>
                <a
                  href="/about"
                  className="text-[11px] font-medium tracking-[0.14em] uppercase border border-slate-700 text-white px-8 py-4 hover:border-slate-500 transition-colors text-center"
                >
                  Our mission
                </a>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
