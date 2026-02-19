import React, { useMemo, useState, useEffect } from "react";
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

// ─── Status Config ────────────────────────────────────────────────────────────
const STATUS_CONFIG: Record<
  ConservationNewsItem["status"],
  { label: string; dot: string; pill: string }
> = {
  watch: {
    label: "Monitoring",
    dot: "bg-amber-400",
    pill: "bg-amber-400/10 text-amber-300 border border-amber-400/30",
  },
  active: {
    label: "Active Threat",
    dot: "bg-red-500 animate-pulse",
    pill: "bg-red-500/10 text-red-400 border border-red-500/30",
  },
  resolved: {
    label: "Resolved",
    dot: "bg-emerald-500",
    pill: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30",
  },
};

// ─── Category Colors ──────────────────────────────────────────────────────────
const CATEGORY_ACCENT: Record<string, string> = {
  Wetlands: "text-cyan-400 border-cyan-400/30 bg-cyan-400/8",
  Waterfowl: "text-teal-400 border-teal-400/30 bg-teal-400/8",
  "Clean Water": "text-blue-400 border-blue-400/30 bg-blue-400/8",
  Litigation: "text-orange-400 border-orange-400/30 bg-orange-400/8",
  Legislation: "text-violet-400 border-violet-400/30 bg-violet-400/8",
  "Land Use": "text-lime-400 border-lime-400/30 bg-lime-400/8",
};

function getCategoryStyle(cat: string): string {
  return (
    CATEGORY_ACCENT[cat] ||
    "text-slate-300 border-slate-500/30 bg-slate-500/10"
  );
}

// ─── Utilities ────────────────────────────────────────────────────────────────
function formatDate(iso: string): { month: string; day: string; year: string } {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime()))
    return { month: "—", day: "—", year: "—" };
  return {
    month: d.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
    day: String(d.getDate()),
    year: String(d.getFullYear()),
  };
}

function formatPrettyDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function clampText(text: string, maxChars: number): string {
  if (!text) return "";
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= maxChars) return clean;
  return clean.slice(0, maxChars - 1).trimEnd() + "…";
}

// ─── getStaticProps ───────────────────────────────────────────────────────────
export const getStaticProps: GetStaticProps<NewsProps> = async () => {
  const warnings: string[] = [];
  const options: FetchAllOptions = {
    regulationsApiKey: process.env.REGULATIONS_GOV_API_KEY,
    openStatesApiKey: process.env.OPENSTATES_API_KEY,
  };
  if (!options.regulationsApiKey)
    warnings.push("Regulations.gov key not set (REGULATIONS_GOV_API_KEY).");
  if (!options.openStatesApiKey)
    warnings.push("OpenStates key not set (OPENSTATES_API_KEY).");
  const items = await fetchAllConservationNews(options);
  return {
    props: { items, generatedAt: new Date().toISOString(), warnings },
    revalidate: 60 * 30,
  };
};

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({
  value,
  label,
  accent,
}: {
  value: number;
  label: string;
  accent: string;
}) {
  return (
    <div className="flex flex-col gap-1 px-6 py-4 rounded-xl border border-white/8 bg-white/3 backdrop-blur-sm">
      <span className={`text-3xl font-black tracking-tight ${accent}`}>
        {value}
      </span>
      <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
        {label}
      </span>
    </div>
  );
}

// ─── News Card ────────────────────────────────────────────────────────────────
function NewsCard({ item }: { item: ConservationNewsItem }) {
  const status = STATUS_CONFIG[item.status];
  const { month, day, year } = formatDate(item.date);

  return (
    <article className="group relative flex flex-col rounded-2xl border border-white/8 bg-gradient-to-b from-white/4 to-transparent hover:from-white/7 hover:border-white/15 transition-all duration-300 overflow-hidden">
      {/* Top accent line based on status */}
      <div
        className={`absolute top-0 left-0 right-0 h-0.5 ${
          item.status === "active"
            ? "bg-gradient-to-r from-red-500 to-red-400"
            : item.status === "watch"
            ? "bg-gradient-to-r from-amber-500 to-amber-300"
            : "bg-gradient-to-r from-emerald-600 to-emerald-400"
        }`}
      />

      <div className="flex gap-5 p-5 pb-0">
        {/* Date column */}
        <div className="flex flex-col items-center min-w-[42px] pt-0.5">
          <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase">
            {month}
          </span>
          <span className="text-2xl font-black leading-none text-white">
            {day}
          </span>
          <span className="text-[10px] text-slate-500">{year}</span>
        </div>

        {/* Divider */}
        <div className="w-px bg-white/8 self-stretch" />

        {/* Main content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-2">
            {/* Status pill */}
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-bold tracking-wide ${status.pill}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
              {status.label}
            </span>

            {/* Category */}
            <span
              className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold tracking-wide ${getCategoryStyle(
                item.category
              )}`}
            >
              {item.category}
            </span>

            {item.sourceType && (
              <span className="ml-auto text-[10px] text-slate-500 uppercase tracking-wider">
                {item.sourceType}
              </span>
            )}
          </div>

          <h2 className="text-base font-bold leading-snug text-white/90 group-hover:text-white transition-colors mb-1">
            <a href={item.link} target="_blank" rel="noreferrer">
              {item.title}
            </a>
          </h2>

          <div className="text-[11px] text-slate-500 mb-3">
            {item.source}
            {item.agency ? <span> · {item.agency}</span> : null}
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="px-5 pb-4 mt-2">
        <div className="ml-[55px]">
          <p className="text-sm text-slate-400 leading-relaxed">
            {clampText(item.summary || "View the source for full details.", 240)}
          </p>

          {/* Tags */}
          {item.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {item.tags.slice(0, 4).map((t) => (
                <span
                  key={t}
                  className="rounded-md bg-white/5 border border-white/8 px-2 py-0.5 text-[10px] text-slate-400 tracking-wide"
                >
                  #{t}
                </span>
              ))}
            </div>
          )}

          {/* Footer link */}
          <div className="mt-4 flex items-center justify-between">
            <a
              href={item.link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-400 hover:text-teal-300 transition-colors group/link"
            >
              View primary source
              <svg
                className="w-3 h-3 translate-x-0 group-hover/link:translate-x-0.5 transition-transform"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

// ─── Filter Pill ──────────────────────────────────────────────────────────────
function FilterPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-wide border transition-all duration-200 whitespace-nowrap ${
        active
          ? "bg-teal-400 text-slate-900 border-teal-400"
          : "bg-transparent text-slate-400 border-white/10 hover:border-white/25 hover:text-slate-200"
      }`}
    >
      {label}
    </button>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function News({ items, generatedAt, warnings }: NewsProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");
  const [status, setStatus] = useState<"All" | ConservationNewsItem["status"]>("All");
  const [source, setSource] = useState<string>("All");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const categories = useMemo(() => {
    const set = new Set<string>(["All"]);
    items.forEach((i) => set.add(i.category));
    return Array.from(set).sort((a, b) =>
      a === "All" ? -1 : b === "All" ? 1 : a.localeCompare(b)
    );
  }, [items]);

  const sources = useMemo(() => {
    const set = new Set<string>(["All"]);
    items.forEach((i) => set.add(i.source));
    return Array.from(set).sort((a, b) =>
      a === "All" ? -1 : b === "All" ? 1 : a.localeCompare(b)
    );
  }, [items]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((i) => {
      const matchesQuery =
        !q ||
        i.title.toLowerCase().includes(q) ||
        (i.summary || "").toLowerCase().includes(q) ||
        (i.agency || "").toLowerCase().includes(q);
      return (
        matchesQuery &&
        (category === "All" || i.category === category) &&
        (status === "All" || i.status === status) &&
        (source === "All" || i.source === source)
      );
    });
  }, [items, query, category, status, source]);

  // Stats
  const activeCount = items.filter((i) => i.status === "active").length;
  const watchCount = items.filter((i) => i.status === "watch").length;
  const resolvedCount = items.filter((i) => i.status === "resolved").length;

  return (
    <>
      {/* ── Global Styles ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');

        :root {
          --bg-base: #0a0f0d;
          --bg-card: rgba(255,255,255,0.03);
          --accent-teal: #2dd4bf;
          --accent-amber: #fbbf24;
          --text-primary: #f1f5f2;
          --text-muted: #94a3a0;
          --border: rgba(255,255,255,0.07);
          --font-display: 'Playfair Display', Georgia, serif;
          --font-body: 'DM Sans', system-ui, sans-serif;
          --font-mono: 'DM Mono', monospace;
        }

        .conservation-page {
          background-color: var(--bg-base);
          background-image:
            radial-gradient(ellipse 80% 50% at 50% -10%, rgba(45,212,191,0.06) 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 80% 80%, rgba(16,78,65,0.08) 0%, transparent 50%);
          min-height: 100vh;
          font-family: var(--font-body);
          color: var(--text-primary);
        }

        .hero-title {
          font-family: var(--font-display);
          font-weight: 900;
          line-height: 1;
          letter-spacing: -0.03em;
        }

        .tag-line {
          font-family: var(--font-mono);
          font-size: 11px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }

        .search-input {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          color: #f1f5f2;
          font-family: var(--font-body);
          transition: border-color 0.2s, background 0.2s;
        }
        .search-input::placeholder { color: rgba(148,163,160,0.5); }
        .search-input:focus {
          outline: none;
          border-color: rgba(45,212,191,0.5);
          background: rgba(255,255,255,0.06);
          box-shadow: 0 0 0 3px rgba(45,212,191,0.08);
        }

        .select-field {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          color: #f1f5f2;
          font-family: var(--font-body);
          appearance: none;
          cursor: pointer;
        }
        .select-field:focus {
          outline: none;
          border-color: rgba(45,212,191,0.4);
        }
        .select-field option { background: #0f1f1a; }

        .divider-rule {
          border: none;
          height: 1px;
          background: linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent);
        }

        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .card-appear {
          animation: fadeSlideUp 0.4s ease both;
        }

        .watermark-duck {
          position: absolute;
          right: -40px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 260px;
          line-height: 1;
          opacity: 0.025;
          pointer-events: none;
          user-select: none;
          filter: blur(1px);
        }

        .ticker-bar {
          background: linear-gradient(90deg, rgba(45,212,191,0.08), rgba(45,212,191,0.04), rgba(45,212,191,0.08));
          border-top: 1px solid rgba(45,212,191,0.12);
          border-bottom: 1px solid rgba(45,212,191,0.12);
        }

        .issue-type-badge {
          font-family: var(--font-mono);
        }

        .live-dot::before {
          content: '';
          display: inline-block;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #ef4444;
          margin-right: 6px;
          animation: pulse-red 1.5s infinite;
        }
        @keyframes pulse-red {
          0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(239,68,68,0.4); }
          50% { opacity: 0.8; box-shadow: 0 0 0 5px rgba(239,68,68,0); }
        }
      `}</style>

      <div className="conservation-page">
        <Header />

        {/* ── Alert Ticker (active threats) ── */}
        {activeCount > 0 && (
          <div className="ticker-bar px-4 py-2 flex items-center gap-3 text-xs overflow-hidden">
            <span className="live-dot shrink-0 font-bold text-red-400 tracking-wider uppercase">
              {activeCount} Active Threat{activeCount !== 1 ? "s" : ""}
            </span>
            <span className="text-slate-500">—</span>
            <span className="text-slate-400 truncate">
              {items
                .filter((i) => i.status === "active")
                .map((i) => i.title)
                .join("  ·  ")}
            </span>
          </div>
        )}

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

          {/* ── Hero ── */}
          <section className="relative mb-12 overflow-hidden">
            <div className="watermark-duck">🦆</div>

            <div className="relative">
              <div className="tag-line text-teal-400 mb-4">
                The Blue Duck Foundation · Conservation Intelligence
              </div>

              <h1 className="hero-title text-white mb-4" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
                Texas Conservation
                <br />
                <span style={{ color: "var(--accent-teal)" }}>Watch</span>
              </h1>

              <p className="max-w-2xl text-lg text-slate-400 leading-relaxed mb-8" style={{ fontWeight: 300 }}>
                Authoritative tracking of wetland rules, litigation, land fights, and
                waterfowl policy — sourced directly from government records and court
                filings. No opinion, no noise. Just what matters for Texas wetlands.
              </p>

              {/* Stats row */}
              <div className="flex flex-wrap gap-3 mb-2">
                <StatCard value={activeCount} label="Active Threats" accent="text-red-400" />
                <StatCard value={watchCount} label="Under Watch" accent="text-amber-400" />
                <StatCard value={resolvedCount} label="Resolved" accent="text-emerald-400" />
                <StatCard value={items.length} label="Total Items" accent="text-slate-300" />
              </div>

              <div
                className="mt-4 text-xs text-slate-600"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                LAST UPDATED:{" "}
                <span className="text-slate-500">{formatPrettyDate(generatedAt)}</span>
                {" "}· REFRESHES EVERY 30 MIN VIA ISR
              </div>
            </div>
          </section>

          <hr className="divider-rule mb-10" />

          {/* ── API warnings ── */}
          {warnings.length > 0 && (
            <div className="mb-6 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 text-sm">
              <div className="font-semibold text-amber-400 mb-1 flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
                Optional data sources not connected
              </div>
              <ul className="text-amber-300/70 space-y-1 pl-1">
                {warnings.map((w) => <li key={w}>· {w}</li>)}
              </ul>
              <div className="mt-2 text-amber-300/50 text-xs">
                Set keys in <code className="bg-amber-500/10 px-1 rounded">.env.local</code> to unlock all sources.
              </div>
            </div>
          )}

          {/* ── Controls ── */}
          <div className="flex flex-col gap-4 mb-8">
            {/* Search */}
            <div className="relative">
              <svg
                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search issues, agencies, regulations… (e.g. WOTUS, Clean Water Act, USFWS)"
                className="search-input w-full rounded-xl pl-10 pr-4 py-3 text-sm"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Filter pills row */}
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-[11px] uppercase tracking-wider text-slate-600 mr-1">
                Status:
              </span>
              {(["All", "active", "watch", "resolved"] as const).map((s) => (
                <FilterPill
                  key={s}
                  label={s === "All" ? "All" : STATUS_CONFIG[s].label}
                  active={status === s}
                  onClick={() => setStatus(s)}
                />
              ))}

              <span className="w-px h-4 bg-white/10 mx-2" />

              <span className="text-[11px] uppercase tracking-wider text-slate-600 mr-1">
                Category:
              </span>
              {categories.map((c) => (
                <FilterPill
                  key={c}
                  label={c}
                  active={category === c}
                  onClick={() => setCategory(c)}
                />
              ))}
            </div>

            {/* Source selector + result count */}
            <div className="flex items-center gap-3 flex-wrap">
              <div className="relative">
                <select
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  className="select-field rounded-lg pl-3 pr-8 py-1.5 text-xs"
                >
                  {sources.map((s) => (
                    <option value={s} key={s}>
                      {s === "All" ? "All Sources" : s}
                    </option>
                  ))}
                </select>
                <svg className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-500 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              <span
                className="text-xs text-slate-500"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {filtered.length} / {items.length} items
              </span>

              {(query || category !== "All" || status !== "All" || source !== "All") && (
                <button
                  onClick={() => {
                    setQuery("");
                    setCategory("All");
                    setStatus("All");
                    setSource("All");
                  }}
                  className="text-xs text-teal-400 hover:text-teal-300 transition-colors underline underline-offset-2"
                >
                  Clear all filters
                </button>
              )}
            </div>
          </div>

          {/* ── Results ── */}
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-white/8 p-16 text-center">
              <div className="text-4xl mb-4 opacity-30">🌾</div>
              <div className="text-slate-400 font-medium mb-1">No matching issues found</div>
              <div className="text-sm text-slate-600">
                Try broadening your search — e.g., "wetlands", "waterfowl", "ESA", "Clean Water Act"
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filtered.map((item, idx) => (
                <div
                  key={item.id}
                  className="card-appear"
                  style={{ animationDelay: `${Math.min(idx * 40, 400)}ms` }}
                >
                  <NewsCard item={item} />
                </div>
              ))}
            </div>
          )}

          {/* ── Publishing Guide ── */}
          <section className="mt-16 rounded-2xl border border-teal-500/15 bg-gradient-to-br from-teal-500/5 to-transparent p-8">
            <div className="flex items-start gap-4">
              <div className="rounded-xl bg-teal-500/10 p-3 shrink-0">
                <svg className="w-6 h-6 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
                </svg>
              </div>
              <div>
                <h3
                  className="text-xl font-bold text-white mb-1"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  How We Publish
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  The Blue Duck Foundation prioritizes government records and court documents — the safest, most citable
                  primary sources. For third-party media, we publish headlines, brief excerpts, and direct links only.
                  No copy-paste. No misrepresentation.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    {
                      title: "Issue Briefs",
                      desc: "150–400 word summaries with full citation links",
                      icon: "📋",
                    },
                    {
                      title: "Primary Source Cards",
                      desc: "Key excerpts + Foundation analysis + attribution",
                      icon: "🔍",
                    },
                    {
                      title: "Weekly Digest",
                      desc: '"What changed / What to watch" each week',
                      icon: "📬",
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="rounded-xl border border-white/8 bg-white/3 p-4"
                    >
                      <div className="text-2xl mb-2">{item.icon}</div>
                      <div className="text-sm font-semibold text-white mb-1">
                        {item.title}
                      </div>
                      <div className="text-xs text-slate-500">{item.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ── Foundation CTA ── */}
          <section className="mt-8 rounded-2xl border border-white/8 bg-gradient-to-r from-white/3 to-transparent p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="tag-line text-teal-400 mb-2">
                The Blue Duck Foundation · 501(c)(3)
              </div>
              <h3
                className="text-2xl font-bold text-white"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Help protect Texas wetlands.
              </h3>
              <p className="text-slate-400 text-sm mt-1">
                EIN 41-4361489 · Donations are tax-deductible
              </p>
            </div>
            <div className="flex gap-3 shrink-0">
              <a
                href="/donate"
                className="rounded-xl bg-teal-400 text-slate-900 px-6 py-3 text-sm font-bold hover:bg-teal-300 transition-colors"
              >
                Donate
              </a>
              <a
                href="/about"
                className="rounded-xl border border-white/12 text-white px-6 py-3 text-sm font-semibold hover:bg-white/5 transition-colors"
              >
                Our Mission
              </a>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
