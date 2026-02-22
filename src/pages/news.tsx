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

// ─── Status Config ──────────────────────────────────────────────────────────
const STATUS_CONFIG: Record<
  ConservationNewsItem["status"],
  { label: string; dot: string; pill: string }
> = {
  watch: {
    label: "Monitoring",
    dot: "bg-amber-400",
    pill: "bg-amber-50 text-amber-700 border border-amber-200",
  },
  active: {
    label: "Active Threat",
    dot: "bg-red-500 animate-pulse",
    pill: "bg-red-50 text-red-700 border border-red-200",
  },
  resolved: {
    label: "Resolved",
    dot: "bg-emerald-500",
    pill: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  },
};

const CATEGORY_ACCENT: Record<string, string> = {
  Wetlands:      "bg-cyan-50 text-cyan-700 border-cyan-200",
  Wildlife:      "bg-teal-50 text-teal-700 border-teal-200",
  "Clean Water": "bg-blue-50 text-blue-700 border-blue-200",
  Litigation:    "bg-orange-50 text-orange-700 border-orange-200",
  Legislation:   "bg-violet-50 text-violet-700 border-violet-200",
  "Land Use":    "bg-lime-50 text-lime-700 border-lime-200",
  Archaeology:   "bg-amber-50 text-amber-700 border-amber-200",
  Humanitarian:  "bg-rose-50 text-rose-700 border-rose-200",
  Energy:        "bg-yellow-50 text-yellow-700 border-yellow-200",
};

function getCategoryStyle(cat: string): string {
  return CATEGORY_ACCENT[cat] || "bg-slate-100 text-slate-600 border-slate-200";
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

// ─── getStaticProps ─────────────────────────────────────────────────────────
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

// ─── Stat Card ──────────────────────────────────────────────────────────────
function StatCard({ value, label, color }: { value: number; label: string; color: string }) {
  return (
    <div className="text-center">
      <div className={`text-3xl font-light tracking-tight ${color}`}>{value}</div>
      <div className="mt-1 text-xs font-medium text-slate-500 uppercase tracking-wider">{label}</div>
    </div>
  );
}

// ─── News Card ──────────────────────────────────────────────────────────────
function NewsCard({ item }: { item: ConservationNewsItem }) {
  const status = STATUS_CONFIG[item.status];
  const { month, day, year } = formatDate(item.date);

  return (
    <article className="group relative flex flex-col rounded-2xl border border-slate-200/80 bg-white transition-all hover:border-slate-300 hover:shadow-lg overflow-hidden">
      <div className={`h-0.5 w-full ${
        item.status === "active" ? "bg-red-500" :
        item.status === "watch" ? "bg-amber-400" : "bg-emerald-500"
      }`} />

      <div className="flex gap-5 p-5 pb-0">
        <div className="flex flex-col items-center min-w-[42px] pt-0.5 flex-shrink-0">
          <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">{month}</span>
          <span className="text-2xl font-light leading-none text-slate-900">{day}</span>
          <span className="text-[10px] text-slate-400">{year}</span>
        </div>

        <div className="w-px bg-slate-100 self-stretch" />

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-2">
            <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold border ${status.pill}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
              {status.label}
            </span>
            <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${getCategoryStyle(item.category)}`}>
              {item.category}
            </span>
            {item.sourceType && (
              <span className="ml-auto text-[10px] text-slate-400 uppercase tracking-wider">{item.sourceType}</span>
            )}
          </div>

          <h2 className="text-base font-semibold leading-snug text-slate-900 group-hover:text-slate-700 transition-colors mb-1">
            <a href={item.link} target="_blank" rel="noreferrer">{item.title}</a>
          </h2>

          <div className="text-[11px] text-slate-400 mb-3">
            {item.source}{item.agency ? <span> · {item.agency}</span> : null}
          </div>
        </div>
      </div>

      <div className="px-5 pb-5 mt-2">
        <div className="ml-[55px]">
          <p className="text-sm text-slate-600 leading-relaxed">
            {clampText(item.summary || "View the source for full details.", 240)}
          </p>

          {item.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {item.tags.slice(0, 4).map((t) => (
                <span key={t} className="rounded-md bg-slate-100 border border-slate-200 px-2 py-0.5 text-[10px] text-slate-500 tracking-wide">
                  #{t}
                </span>
              ))}
            </div>
          )}

          <div className="mt-4">
            <a
              href={item.link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-900 hover:text-slate-600 transition-colors"
            >
              View primary source
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

// ─── Filter Pill ────────────────────────────────────────────────────────────
function FilterPill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-3.5 py-1.5 text-xs font-semibold border transition-all whitespace-nowrap ${
        active
          ? "bg-slate-900 text-white border-slate-900"
          : "bg-white text-slate-500 border-slate-200 hover:border-slate-400 hover:text-slate-700"
      }`}
    >
      {label}
    </button>
  );
}

// ─── Page ───────────────────────────────────────────────────────────────────
export default function News({ items, generatedAt, warnings }: NewsProps) {
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

  const activeCount  = items.filter((i) => i.status === "active").length;
  const watchCount   = items.filter((i) => i.status === "watch").length;
  const resolvedCount = items.filter((i) => i.status === "resolved").length;
  const hasFilters   = query || category !== "All" || status !== "All" || source !== "All";

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-grow">

        {/* Active threat banner */}
        {activeCount > 0 && (
          <div className="bg-red-50 border-b border-red-100 px-4 py-2.5 flex items-center gap-3 text-sm">
            <span className="relative flex h-2 w-2 flex-shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
            </span>
            <span className="font-semibold text-red-700">{activeCount} Active Threat{activeCount !== 1 ? "s" : ""}</span>
            <span className="text-red-400">—</span>
            <span className="text-red-600 truncate">
              {items.filter((i) => i.status === "active").map((i) => i.title).join("  ·  ")}
            </span>
          </div>
        )}

        {/* HERO */}
        <section className="relative overflow-hidden border-b border-slate-100">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_#f1f5f9_0%,_transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_#f8fafc_0%,_transparent_50%)]" />
          </div>
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
            <div className="max-w-3xl">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm font-medium text-slate-700 shadow-sm mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                Updated every 30 minutes · Live Feed
              </div>

              <h1 className="text-5xl font-light tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
                Conservation Watch
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-slate-600 max-w-2xl">
                Authoritative tracking of environmental policy, litigation, land rights, freshwater issues, and conservation threats — sourced directly from government records, court filings, and primary sources. No opinion, no noise.
              </p>

              <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-8 border-t border-slate-200 pt-8">
                <StatCard value={activeCount}   label="Active Threats"  color="text-red-600" />
                <StatCard value={watchCount}    label="Under Watch"     color="text-amber-600" />
                <StatCard value={resolvedCount} label="Resolved"        color="text-emerald-600" />
                <StatCard value={items.length}  label="Total Items"     color="text-slate-900" />
              </div>

              <p className="mt-4 text-xs text-slate-400">
                Last updated: {formatPrettyDate(generatedAt)}
              </p>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">

          {/* API warnings */}
          {warnings.length > 0 && (
            <div className="mb-8 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm">
              <div className="font-semibold text-amber-800 mb-1 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
                Optional data sources not connected
              </div>
              <ul className="text-amber-700 space-y-1 pl-1">
                {warnings.map((w) => <li key={w}>· {w}</li>)}
              </ul>
              <div className="mt-2 text-amber-600 text-xs">
                Set keys in <code className="bg-amber-100 px-1 rounded">.env.local</code> to unlock all sources.
              </div>
            </div>
          )}

          {/* Controls */}
          <div className="flex flex-col gap-4 mb-10">
            <div className="relative">
              <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search issues, agencies, regulations… (e.g. WOTUS, Clean Water Act, ESA, freshwater)"
                className="w-full rounded-xl border border-slate-300 bg-white pl-10 pr-10 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400/20"
              />
              {query && (
                <button onClick={() => setQuery("")} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors text-lg leading-none">
                  ×
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider mr-1">Status:</span>
              {(["All", "active", "watch", "resolved"] as const).map((s) => (
                <FilterPill
                  key={s}
                  label={s === "All" ? "All" : STATUS_CONFIG[s].label}
                  active={status === s}
                  onClick={() => setStatus(s)}
                />
              ))}
              <span className="w-px h-4 bg-slate-200 mx-2" />
              <span className="text-xs font-medium text-slate-400 uppercase tracking-wider mr-1">Category:</span>
              {categories.map((c) => (
                <FilterPill key={c} label={c} active={category === c} onClick={() => setCategory(c)} />
              ))}
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <div className="relative">
                <select
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  className="rounded-lg border border-slate-300 bg-white pl-3 pr-8 py-1.5 text-xs text-slate-700 appearance-none cursor-pointer focus:outline-none focus:border-slate-400"
                >
                  {sources.map((s) => <option value={s} key={s}>{s === "All" ? "All Sources" : s}</option>)}
                </select>
                <svg className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              <span className="text-xs text-slate-400">{filtered.length} / {items.length} items</span>

              {hasFilters && (
                <button
                  onClick={() => { setQuery(""); setCategory("All"); setStatus("All"); setSource("All"); }}
                  className="text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors underline underline-offset-2"
                >
                  Clear filters
                </button>
              )}
            </div>
          </div>

          {/* Results */}
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-slate-200/80 bg-slate-50 p-16 text-center">
              <div className="text-4xl mb-4">🌍</div>
              <div className="text-slate-700 font-semibold mb-1">No matching issues found</div>
              <div className="text-sm text-slate-500">Try broadening your search — e.g. "wetlands", "freshwater", "ESA", "Clean Water Act", "archaeology"</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filtered.map((item) => <NewsCard key={item.id} item={item} />)}
            </div>
          )}

          {/* How We Publish */}
          <section className="mt-16 rounded-2xl border border-slate-200/80 bg-slate-50 p-8">
            <div className="flex items-start gap-6">
              <div className="rounded-xl bg-white border border-slate-200 p-3 flex-shrink-0 shadow-sm">
                <svg className="w-6 h-6 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">How We Publish</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  The Blue Duck Foundation prioritizes government records, court documents, and verified primary sources — the safest, most citable references. For third-party media, we publish headlines, brief excerpts, and direct links only. No copy-paste. No misrepresentation. Full transparency, always.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { title: "Issue Briefs", desc: "150–400 word summaries with full citation links", icon: "📋" },
                    { title: "Primary Source Cards", desc: "Key excerpts + Foundation analysis + attribution", icon: "🔍" },
                    { title: "Weekly Digest", desc: '"What changed / What to watch" each week', icon: "📬" },
                  ].map((item) => (
                    <div key={item.title} className="rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm">
                      <div className="text-2xl mb-2">{item.icon}</div>
                      <div className="text-sm font-semibold text-slate-900 mb-1">{item.title}</div>
                      <div className="text-xs text-slate-500 leading-relaxed">{item.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="mt-6">
            <div className="overflow-hidden rounded-2xl bg-slate-900 shadow-xl">
              <div className="px-8 py-10 md:px-12">
                <div className="grid gap-6 md:grid-cols-2 md:items-center">
                  <div>
                    <h3 className="text-2xl font-light tracking-tight text-white">Support the work behind the watch.</h3>
                    <p className="mt-2 text-slate-400 text-sm">The Blue Duck Foundation · 501(c)(3) · EIN 41-4361489 · All donations are tax-deductible</p>
                  </div>
                  <div className="flex gap-3 md:justify-end">
                    <a href="/contact" className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-100">
                      Get Involved
                    </a>
                    <a href="/about" className="inline-flex items-center justify-center rounded-xl border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10">
                      Our Mission
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
