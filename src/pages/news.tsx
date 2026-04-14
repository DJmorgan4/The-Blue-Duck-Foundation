import React, { useMemo, useState } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import type { GetStaticProps } from "next";
import { fetchAllConservationNews, type ConservationNewsItem } from "../api/texas";
import { loadFoundationPosts } from "../api/posts";

type NewsProps = {
  items: ConservationNewsItem[];
  generatedAt: string;
};

const CATEGORY_COLORS: Record<string, { color: string; bg: string }> = {
  "Foundation":         { color: "#1e3a8a", bg: "#eff6ff" },
  "Environment":        { color: "#065f46", bg: "#ecfdf5" },
  "Archaeology":        { color: "#92400e", bg: "#fffbeb" },
  "Litigation":         { color: "#991b1b", bg: "#fef2f2" },
  "Land & Conservation":{ color: "#3f6212", bg: "#f7fee7" },
  "Wetlands":           { color: "#0e7490", bg: "#ecfeff" },
  "Wildlife":           { color: "#0f766e", bg: "#f0fdfa" },
  "Clean Water":        { color: "#1d4ed8", bg: "#eff6ff" },
  "Climate & Energy":   { color: "#854d0e", bg: "#fefce8" },
  "Marine":             { color: "#0369a1", bg: "#f0f9ff" },
  "Forests":            { color: "#166534", bg: "#f0fdf4" },
  "Policy":             { color: "#6d28d9", bg: "#f5f3ff" },
  "Indigenous":         { color: "#9d174d", bg: "#fdf2f8" },
};

function getCategoryStyle(cat: string) {
  return CATEGORY_COLORS[cat] || { color: "#475569", bg: "#f8fafc" };
}

const STATUS_LABELS: Record<ConservationNewsItem["status"], string> = {
  watch:      "Monitoring",
  active:     "Active Threat",
  resolved:   "Positive",
  foundation: "Foundation",
};

function formatDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return { month: "—", day: "—", year: "—" };
  return {
    month: d.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
    day: String(d.getDate()),
    year: String(d.getFullYear()),
  };
}

function formatPrettyDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function clampText(text: string, max: number) {
  const clean = (text || "").replace(/\s+/g, " ").trim();
  return clean.length <= max ? clean : clean.slice(0, max - 1).trimEnd() + "…";
}

export const getStaticProps: GetStaticProps<NewsProps> = async () => {
  const [liveItems, foundationPosts] = await Promise.all([
    fetchAllConservationNews({}),
    Promise.resolve(loadFoundationPosts()),
  ]);

  // Foundation posts always go first
  const items = [...foundationPosts, ...liveItems];

  return {
    props: { items, generatedAt: new Date().toISOString() },
    revalidate: 60 * 30,
  };
};

// ─── NEWS CARD ─────────────────────────────────────────────────────────────
function NewsCard({ item }: { item: ConservationNewsItem }) {
  const catStyle = getCategoryStyle(item.category);
  const { month, day, year } = formatDate(item.date);
  const isFoundation = item.isFoundationPost;
  const statusLabel = STATUS_LABELS[item.status];

  const statusStyle =
    item.status === "active"     ? { color: "#991b1b", bg: "#fef2f2" } :
    item.status === "resolved"   ? { color: "#065f46", bg: "#ecfdf5" } :
    item.status === "foundation" ? { color: "#1e3a8a", bg: "#eff6ff" } :
    { color: "#92400e", bg: "#fef3c7" };

  return (
    <article className={`border-t pt-6 pb-5 ${isFoundation ? "border-blue-200" : "border-slate-100"}`}>
      {isFoundation && (
        <div className="text-[10px] tracking-[0.2em] uppercase text-blue-700 font-medium mb-3 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 inline-block" />
          Foundation update
        </div>
      )}
      <div className="grid grid-cols-[48px_1fr] gap-5">
        <div className="flex flex-col items-center pt-0.5">
          <span className="text-[9px] font-medium tracking-[0.15em] text-slate-400">{month}</span>
          <span className="font-['Cormorant_Garamond'] text-2xl font-light text-slate-900 leading-none">{day}</span>
          <span className="text-[9px] text-slate-300">{year}</span>
        </div>

        <div>
          <div className="flex items-center gap-2 flex-wrap mb-2">
            <span className="text-[10px] tracking-[0.1em] uppercase font-medium px-2.5 py-0.5"
              style={{ color: statusStyle.color, background: statusStyle.bg }}>
              {statusLabel}
            </span>
            <span className="text-[10px] tracking-[0.1em] uppercase font-medium px-2.5 py-0.5"
              style={{ color: catStyle.color, background: catStyle.bg }}>
              {item.category}
            </span>
            {item.sourceType && !isFoundation && (
              <span className="ml-auto text-[10px] text-slate-300 uppercase tracking-wider">
                {item.sourceType}
              </span>
            )}
          </div>

          <h2 className="text-base font-medium text-slate-900 leading-snug mb-1">
            {isFoundation ? (
              <span>{item.title}</span>
            ) : (
              <a href={item.link} target="_blank" rel="noreferrer"
                className="hover:text-slate-600 transition-colors">
                {item.title}
              </a>
            )}
          </h2>

          <div className="text-[11px] text-slate-400 mb-2">
            {item.source}{item.agency ? <span> · {item.agency}</span> : null}
          </div>

          <p className="text-sm text-slate-500 font-light leading-relaxed mb-3">
            {clampText(item.summary, 220)}
          </p>

          {item.tags.filter((t) => t !== "foundation" && t !== "primary source").length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {item.tags.filter((t) => t !== "foundation" && t !== "primary source").slice(0, 4).map((t) => (
                <span key={t} className="text-[10px] text-slate-400 tracking-wide">#{t}</span>
              ))}
            </div>
          )}

          {!isFoundation && (
            <a href={item.link} target="_blank" rel="noreferrer"
              className="text-[11px] font-medium tracking-[0.1em] uppercase text-slate-400 hover:text-slate-900 transition-colors">
              Read more →
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

// ─── FILTER PILL ───────────────────────────────────────────────────────────
function FilterPill({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick}
      className={`px-3.5 py-1.5 text-[11px] tracking-[0.08em] uppercase font-medium border transition-all whitespace-nowrap ${
        active ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-400 border-slate-200 hover:border-slate-400 hover:text-slate-700"
      }`}>
      {label}
    </button>
  );
}

// ─── PAGE ──────────────────────────────────────────────────────────────────
export default function NewsPage({ items, generatedAt }: NewsProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState<"All" | ConservationNewsItem["status"]>("All");

  const categories = useMemo(() => {
    const set = new Set<string>(["All"]);
    items.forEach((i) => set.add(i.category));
    return Array.from(set).sort((a, b) => a === "All" ? -1 : b === "All" ? 1 : a.localeCompare(b));
  }, [items]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((i) => {
      const matchesQuery = !q ||
        i.title.toLowerCase().includes(q) ||
        (i.summary || "").toLowerCase().includes(q) ||
        i.source.toLowerCase().includes(q) ||
        i.tags.some((t) => t.includes(q));
      return matchesQuery &&
        (category === "All" || i.category === category) &&
        (status === "All" || i.status === status);
    });
  }, [items, query, category, status]);

  const activeCount    = items.filter((i) => i.status === "active").length;
  const foundationCount = items.filter((i) => i.isFoundationPost).length;
  const hasFilters     = query || category !== "All" || status !== "All";

  return (
    <div className="min-h-screen flex flex-col bg-white font-['Jost',sans-serif]">
      <Header />

      <main className="flex-grow">

        {/* Active threat banner */}
        {activeCount > 0 && (
          <div className="bg-red-50 border-b border-red-100 px-6 py-3 flex items-center gap-3">
            <span className="relative flex h-2 w-2 flex-shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
            </span>
            <span className="text-[11px] font-medium tracking-[0.08em] uppercase text-red-700">
              {activeCount} Active Threat{activeCount !== 1 ? "s" : ""}
            </span>
          </div>
        )}

        {/* ── HERO ──────────────────────────────────────────────────────── */}
        <section className="border-b border-slate-100">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid lg:grid-cols-[55fr_45fr] min-h-[340px]">

              <div className="py-16 lg:py-24 lg:pr-16 lg:border-r border-slate-100 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-6 h-px bg-slate-300" />
                    <span className="text-[10px] tracking-[0.2em] uppercase text-slate-400 font-medium">
                      Live feed · Updated every 30 minutes
                    </span>
                  </div>
                  <h1 className="font-['Cormorant_Garamond'] text-6xl lg:text-7xl font-light leading-[1.04] tracking-tight text-slate-900 mb-6">
                    Conservation<br /><em className="italic">Watch.</em>
                  </h1>
                  <p className="text-[15px] leading-[1.9] text-slate-500 font-light max-w-md">
                    Environmental news, archaeological discoveries, land deals, legal rulings, policy updates, and Foundation announcements — curated for the work we do.
                  </p>
                </div>
                <p className="text-[11px] text-slate-300 font-light mt-6">
                  Last updated: {formatPrettyDate(generatedAt)}
                </p>
              </div>

              <div className="hidden lg:grid grid-cols-2 border border-slate-100 bg-white self-center my-24 ml-16">
                {[
                  { val: foundationCount, label: "Foundation posts", color: "#1e3a8a" },
                  { val: activeCount,     label: "Active threats",   color: "#991b1b" },
                  { val: items.filter((i) => i.status === "resolved").length, label: "Positive outcomes", color: "#065f46" },
                  { val: items.length,    label: "Total stories",    color: "#0f172a" },
                ].map((s, i) => (
                  <div key={i} className="p-6 border-b border-r border-slate-100 last:border-r-0 [&:nth-child(2)]:border-r-0 [&:nth-child(3)]:border-b-0 [&:nth-child(4)]:border-b-0">
                    <div className="font-['Cormorant_Garamond'] text-4xl font-light mb-1" style={{ color: s.color }}>
                      {s.val}
                    </div>
                    <div className="text-[10px] tracking-[0.1em] uppercase text-slate-400 font-medium">{s.label}</div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* ── CONTENT ───────────────────────────────────────────────────── */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">

          {/* Filters */}
          <div className="flex flex-col gap-4 mb-10 pb-8 border-b border-slate-100">
            <div className="relative">
              <input value={query} onChange={(e) => setQuery(e.target.value)}
                placeholder="Search — archaeology, land deal, EPA, wetlands, court ruling…"
                className="w-full border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-300 focus:border-slate-400 focus:outline-none"
              />
              {query && (
                <button onClick={() => setQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-600 text-lg">×</button>
              )}
            </div>

            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-[10px] tracking-[0.15em] uppercase text-slate-300 font-medium mr-1">Status</span>
              {(["All", "active", "watch", "resolved", "foundation"] as const).map((s) => (
                <FilterPill key={s} label={s === "All" ? "All" : STATUS_LABELS[s as ConservationNewsItem["status"]] || "All"}
                  active={status === s} onClick={() => setStatus(s as any)} />
              ))}
            </div>

            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-[10px] tracking-[0.15em] uppercase text-slate-300 font-medium mr-1">Topic</span>
              {categories.map((c) => (
                <FilterPill key={c} label={c} active={category === c} onClick={() => setCategory(c)} />
              ))}
            </div>

            <div className="flex items-center gap-4">
              <span className="text-[11px] text-slate-400 font-light">{filtered.length} / {items.length} stories</span>
              {hasFilters && (
                <button onClick={() => { setQuery(""); setCategory("All"); setStatus("All"); }}
                  className="text-[11px] tracking-[0.08em] uppercase font-medium text-slate-400 hover:text-slate-900 transition-colors">
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Results */}
          {filtered.length === 0 ? (
            <div className="border border-dashed border-slate-200 p-16 text-center col-span-2">
              <h3 className="font-['Cormorant_Garamond'] text-2xl font-light text-slate-900 mb-2">No stories found</h3>
              <p className="text-sm text-slate-400 font-light">Try broadening your search</p>
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-x-16">
              {filtered.map((item) => <NewsCard key={item.id} item={item} />)}
            </div>
          )}

          {/* Sources */}
          <div className="mt-16 border-t border-slate-100 pt-12">
            <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-24">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-5 h-px bg-slate-300" />
                  <span className="text-[10px] tracking-[0.2em] uppercase text-slate-400 font-medium">Sources</span>
                </div>
                <h2 className="font-['Cormorant_Garamond'] text-3xl font-light text-slate-900 leading-tight">
                  Where we<br />get our news
                </h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-x-10">
                {[
                  { title: "The Guardian Environment", desc: "Leading global environmental journalism." },
                  { title: "Yale Environment 360", desc: "Analysis and reporting on environmental issues." },
                  { title: "Inside Climate News", desc: "Pulitzer Prize-winning climate journalism." },
                  { title: "High Country News", desc: "Western US land, water, and communities." },
                  { title: "Archaeology Magazine", desc: "Latest discoveries and excavations worldwide." },
                  { title: "Mongabay", desc: "Tropical forests, wildlife, and conservation." },
                  { title: "EPA & US Fish & Wildlife", desc: "Official agency news and announcements." },
                  { title: "Federal Register & CourtListener", desc: "Rules, regulations, and legal rulings." },
                ].map((s, i) => (
                  <div key={i} className="border-t border-slate-100 py-4">
                    <div className="font-medium text-sm text-slate-900 mb-0.5">{s.title}</div>
                    <p className="text-[12px] text-slate-400 font-light">{s.desc}</p>
                  </div>
                ))}
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
                <a href="/support"
                  className="text-[11px] font-medium tracking-[0.14em] uppercase bg-white text-slate-900 px-8 py-4 hover:bg-slate-100 transition-colors text-center">
                  Support us
                </a>
                <a href="/about"
                  className="text-[11px] font-medium tracking-[0.14em] uppercase border border-slate-700 text-white px-8 py-4 hover:border-slate-500 transition-colors text-center">
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
