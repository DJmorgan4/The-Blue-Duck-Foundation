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
  generatedAt: string; // ISO
  warnings: string[];
};

const STATUS_STYLES: Record<ConservationNewsItem["status"], string> = {
  watch: "bg-yellow-100 text-yellow-900 border-yellow-200",
  active: "bg-red-100 text-red-900 border-red-200",
  resolved: "bg-green-100 text-green-900 border-green-200",
};

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

  // OPTIONAL keys (server-side only). Do NOT hardcode keys in client code.
  const options: FetchAllOptions = {
    regulationsApiKey: process.env.REGULATIONS_GOV_API_KEY,
    openStatesApiKey: process.env.OPENSTATES_API_KEY,
  };

  if (!options.regulationsApiKey) warnings.push("Regulations.gov key not set (REGULATIONS_GOV_API_KEY).");
  if (!options.openStatesApiKey) warnings.push("OpenStates key not set (OPENSTATES_API_KEY).");

  const items = await fetchAllConservationNews(options);

  return {
    props: {
      items,
      generatedAt: new Date().toISOString(),
      warnings,
    },
    // Rebuild this page periodically (ISR)
    revalidate: 60 * 30, // 30 minutes
  };
};

export default function News({ items, generatedAt, warnings }: NewsProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("All");
  const [status, setStatus] = useState<"All" | ConservationNewsItem["status"]>("All");
  const [source, setSource] = useState<string>("All");

  const categories = useMemo(() => {
    const set = new Set<string>(["All"]);
    items.forEach((i) => set.add(i.category));
    return Array.from(set).sort((a, b) => (a === "All" ? -1 : b === "All" ? 1 : a.localeCompare(b)));
  }, [items]);

  const sources = useMemo(() => {
    const set = new Set<string>(["All"]);
    items.forEach((i) => set.add(i.source));
    return Array.from(set).sort((a, b) => (a === "All" ? -1 : b === "All" ? 1 : a.localeCompare(b)));
  }, [items]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return items.filter((i) => {
      const matchesQuery =
        !q ||
        i.title.toLowerCase().includes(q) ||
        (i.summary || "").toLowerCase().includes(q) ||
        (i.agency || "").toLowerCase().includes(q);

      const matchesCategory = category === "All" || i.category === category;
      const matchesStatus = status === "All" || i.status === status;
      const matchesSource = source === "All" || i.source === source;

      return matchesQuery && matchesCategory && matchesStatus && matchesSource;
    });
  }, [items, query, category, status, source]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-bold">Texas Conservation Watch</h1>
            <p className="text-gray-600 max-w-3xl">
              A practical, low-risk way to track “real issues” — rules, lawsuits, land fights, waterfowl & wetlands actions —
              by prioritizing primary sources (government + courts) and publishing summaries with links.
            </p>

            <div className="text-sm text-gray-500">
              Updated: <span className="font-medium">{formatPrettyDate(generatedAt)}</span> • Showing{" "}
              <span className="font-medium">{filtered.length}</span> of{" "}
              <span className="font-medium">{items.length}</span> items
            </div>

            {warnings.length > 0 && (
              <div className="mt-2 rounded-lg border border-yellow-200 bg-yellow-50 p-3 text-sm text-yellow-900">
                <div className="font-semibold mb-1">Optional API keys not configured</div>
                <ul className="list-disc pl-5">
                  {warnings.map((w) => (
                    <li key={w}>{w}</li>
                  ))}
                </ul>
                <div className="mt-2 text-yellow-900/80">
                  Page still works — you’ll just see fewer items. Set keys in <code className="px-1">.env.local</code>.
                </div>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Try: wetlands, waterfowl, Clean Water Act, ESA, USFWS, EPA…"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 bg-white"
              >
                {categories.map((c) => (
                  <option value={c} key={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
              <select
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 bg-white"
              >
                {sources.map((s) => (
                  <option value={s} key={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 bg-white"
              >
                <option value="All">All</option>
                <option value="watch">watch</option>
                <option value="active">active</option>
                <option value="resolved">resolved</option>
              </select>
            </div>

            <div className="md:col-span-3 flex items-end">
              <button
                onClick={() => {
                  setQuery("");
                  setCategory("All");
                  setStatus("All");
                  setSource("All");
                }}
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm hover:bg-gray-50"
              >
                Reset filters
              </button>
            </div>
          </div>

          {/* Results */}
          {filtered.length === 0 ? (
            <div className="rounded-xl border border-gray-200 p-8 text-center text-gray-600">
              No matches. Try a broader search term (e.g., “wetlands”, “waterfowl”, “ESA”, “Clean Water Act”).
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filtered.map((item) => (
                <article key={item.id} className="rounded-xl border border-gray-200 p-5 hover:shadow-sm transition-shadow">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-sm text-gray-500">
                        {formatPrettyDate(item.date)} • {item.source}
                        {item.agency ? <span> • {item.agency}</span> : null}
                      </div>

                      <h2 className="mt-1 text-lg font-semibold leading-snug">
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:underline"
                        >
                          {item.title}
                        </a>
                      </h2>
                    </div>

                    <span
                      className={`shrink-0 rounded-full border px-2 py-1 text-xs font-semibold ${STATUS_STYLES[item.status]}`}
                      title="Internal tracking status"
                    >
                      {item.status}
                    </span>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700">{item.category}</span>
                    {item.tags.slice(0, 3).map((t) => (
                      <span key={t} className="rounded-full bg-gray-50 border border-gray-200 px-2 py-1 text-xs text-gray-700">
                        {t}
                      </span>
                    ))}
                  </div>

                  <p className="mt-3 text-sm text-gray-700">
                    {clampText(item.summary || "View the source for details.", 260)}
                  </p>

                  <div className="mt-4 flex items-center justify-between">
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm font-medium hover:underline"
                    >
                      Open source →
                    </a>

                    {item.sourceType ? (
                      <span className="text-xs text-gray-500">{item.sourceType}</span>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Publishing model */}
          <section className="rounded-xl border border-gray-200 p-6">
            <h3 className="text-xl font-semibold">Safe publishing model</h3>
            <div className="mt-2 text-gray-700 space-y-2">
              <p>
                Primary sources (government + courts) are the safest to quote and summarize. For media outlets, don’t copy/paste —
                publish a headline, a tiny excerpt, and your own brief + link.
              </p>
              <ul className="list-disc pl-5 text-sm text-gray-700">
                <li><span className="font-medium">Issue Briefs:</span> your 150–400 word summaries + links</li>
                <li><span className="font-medium">Primary Source Cards:</span> key excerpt(s) + your analysis + citation link</li>
                <li><span className="font-medium">Digest:</span> weekly “what changed / what to watch”</li>
              </ul>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

