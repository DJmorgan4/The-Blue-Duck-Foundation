/**
 * Conservation Watch — RSS Feed Aggregator + Foundation Posts
 *
 * Sources (no API keys required):
 * - The Guardian Environment
 * - Yale Environment 360
 * - Inside Climate News
 * - High Country News
 * - EPA News Releases
 * - USFWS News
 * - Federal Register (key rules only)
 * - CourtListener (major cases)
 * - Archaeology Magazine
 * - Land Trust Alliance
 * - The Archaeological Institute of America
 */

export type ConservationStatus = "watch" | "active" | "resolved" | "foundation";

export type ConservationNewsItem = {
  id: string;
  title: string;
  date: string;
  category: string;
  source: string;
  sourceType?: "court" | "rulemaking" | "agency" | "legislature" | "media" | "foundation";
  status: ConservationStatus;
  summary: string;
  link: string;
  agency?: string;
  tags: string[];
  isFoundationPost?: boolean;
};

export type FetchAllOptions = {
  regulationsApiKey?: string;
  openStatesApiKey?: string;
};

type FetchJsonOptions = {
  timeoutMs?: number;
  headers?: Record<string, string>;
};

async function fetchJson<T>(url: string, opts: FetchJsonOptions = {}): Promise<T> {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), opts.timeoutMs ?? 20000);
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: { Accept: "application/json", ...(opts.headers || {}) },
      signal: controller.signal,
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return (await res.json()) as T;
  } finally {
    clearTimeout(t);
  }
}

async function fetchXml(url: string, timeoutMs = 15000): Promise<string> {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent": "BlueDuckFoundation/1.0 (https://theblueduck.org)",
        Accept: "application/rss+xml, application/xml, text/xml",
      },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.text();
  } finally {
    clearTimeout(t);
  }
}

// ─── Simple XML parser for RSS ─────────────────────────────────────────────
function extractTagContent(xml: string, tag: string): string {
  const patterns = [
    new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>`, "i"),
    new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i"),
  ];
  for (const pattern of patterns) {
    const m = xml.match(pattern);
    if (m?.[1]) return m[1].trim();
  }
  return "";
}

function parseRssItems(xml: string, maxItems = 8): Array<{ title: string; link: string; pubDate: string; description: string }> {
  const itemPattern = /<item[\s>]([\s\S]*?)<\/item>/gi;
  const items: Array<{ title: string; link: string; pubDate: string; description: string }> = [];
  let match;
  while ((match = itemPattern.exec(xml)) !== null && items.length < maxItems) {
    const block = match[1];
    const title = extractTagContent(block, "title").replace(/<[^>]+>/g, "").trim();
    const link = extractTagContent(block, "link") || extractTagContent(block, "guid");
    const pubDate = extractTagContent(block, "pubDate") || extractTagContent(block, "dc:date") || "";
    const description = extractTagContent(block, "description")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 300);
    if (title && link) items.push({ title, link, pubDate, description });
  }
  return items;
}

function safeIso(dateLike: string | undefined | null): string | null {
  if (!dateLike) return null;
  const d = new Date(dateLike);
  if (Number.isNaN(d.getTime())) return null;
  return d.toISOString();
}

function makeId(prefix: string, unique: string): string {
  return `${prefix}:${Buffer.from(unique).toString("base64").slice(0, 24)}`;
}

function categorizeFromText(text: string): { category: string; tags: string[] } {
  const t = (text || "").toLowerCase();
  const tags: string[] = [];

  if (t.includes("wetland")) tags.push("wetlands");
  if (t.includes("clean water") || t.includes("cwa")) tags.push("clean water");
  if (t.includes("endangered") || t.includes("esa") || t.includes("species")) tags.push("wildlife");
  if (t.includes("freshwater") || t.includes("aquifer") || t.includes("watershed") || t.includes("river") || t.includes("lake")) tags.push("freshwater");
  if (t.includes("public land") || t.includes("blm") || t.includes("forest") || t.includes("national park") || t.includes("land deal") || t.includes("easement") || t.includes("conserved")) tags.push("land");
  if (t.includes("wildlife") || t.includes("habitat") || t.includes("migration") || t.includes("bird") || t.includes("mammal") || t.includes("fish")) tags.push("wildlife");
  if (t.includes("solar") || t.includes("wind") || t.includes("renewable") || t.includes("climate") || t.includes("carbon") || t.includes("emission")) tags.push("climate & energy");
  if (t.includes("archaeolog") || t.includes("excavat") || t.includes("artifact") || t.includes("ancient") || t.includes("prehistoric") || t.includes("fossil") || t.includes("heritage") || t.includes("historic")) tags.push("archaeology");
  if (t.includes("indigenous") || t.includes("tribal") || t.includes("native") || t.includes("treaty")) tags.push("indigenous");
  if (t.includes("lawsuit") || t.includes("court") || t.includes("ruling") || t.includes("judge") || t.includes("legal") || t.includes("litigation")) tags.push("litigation");
  if (t.includes("regulation") || t.includes("epa") || t.includes("rule") || t.includes("policy") || t.includes("legislation") || t.includes("congress") || t.includes("senate")) tags.push("policy");
  if (t.includes("ocean") || t.includes("marine") || t.includes("coral") || t.includes("coast") || t.includes("sea")) tags.push("marine");
  if (t.includes("forest") || t.includes("deforest") || t.includes("tree") || t.includes("timber")) tags.push("forests");

  let category = "Environment";
  if (tags.includes("archaeology") || tags.includes("indigenous")) category = "Archaeology";
  else if (tags.includes("litigation")) category = "Litigation";
  else if (tags.includes("land")) category = "Land & Conservation";
  else if (tags.includes("wetlands")) category = "Wetlands";
  else if (tags.includes("wildlife")) category = "Wildlife";
  else if (tags.includes("freshwater")) category = "Clean Water";
  else if (tags.includes("marine")) category = "Marine";
  else if (tags.includes("climate & energy")) category = "Climate & Energy";
  else if (tags.includes("forests")) category = "Forests";
  else if (tags.includes("policy")) category = "Policy";

  return { category, tags };
}

// ─── RSS FEED DEFINITIONS ──────────────────────────────────────────────────
const RSS_FEEDS = [
  {
    url: "https://www.theguardian.com/environment/rss",
    source: "The Guardian",
    defaultCategory: "Environment",
    maxItems: 8,
  },
  {
    url: "https://e360.yale.edu/feed",
    source: "Yale Environment 360",
    defaultCategory: "Environment",
    maxItems: 5,
  },
  {
    url: "https://insideclimatenews.org/feed/",
    source: "Inside Climate News",
    defaultCategory: "Climate & Energy",
    maxItems: 5,
  },
  {
    url: "https://www.hcn.org/rss.xml",
    source: "High Country News",
    defaultCategory: "Land & Conservation",
    maxItems: 5,
  },
  {
    url: "https://www.archaeology.org/feed",
    source: "Archaeology Magazine",
    defaultCategory: "Archaeology",
    maxItems: 5,
  },
  {
    url: "https://www.epa.gov/rss/epa-news.xml",
    source: "EPA",
    defaultCategory: "Policy",
    maxItems: 5,
  },
  {
    url: "https://www.fws.gov/rss/news",
    source: "US Fish & Wildlife",
    defaultCategory: "Wildlife",
    maxItems: 5,
  },
  {
    url: "https://landtrustalliance.org/feed",
    source: "Land Trust Alliance",
    defaultCategory: "Land & Conservation",
    maxItems: 4,
  },
  {
    url: "https://news.mongabay.com/feed/",
    source: "Mongabay",
    defaultCategory: "Environment",
    maxItems: 6,
  },
  {
    url: "https://www.audubon.org/rss.xml",
    source: "Audubon Society",
    defaultCategory: "Wildlife",
    maxItems: 4,
  },
];

// ─── FETCH RSS FEEDS ───────────────────────────────────────────────────────
async function fetchRssFeeds(): Promise<ConservationNewsItem[]> {
  const items: ConservationNewsItem[] = [];

  const results = await Promise.allSettled(
    RSS_FEEDS.map(async (feed) => {
      try {
        const xml = await fetchXml(feed.url, 12000);
        const parsed = parseRssItems(xml, feed.maxItems);
        return { feed, parsed };
      } catch (e) {
        console.error(`RSS fetch failed for ${feed.source}:`, e);
        return { feed, parsed: [] };
      }
    })
  );

  for (const result of results) {
    if (result.status !== "fulfilled") continue;
    const { feed, parsed } = result.value;

    for (const item of parsed) {
      const { category, tags } = categorizeFromText(`${item.title} ${item.description}`);
      const iso = safeIso(item.pubDate) ?? new Date().toISOString();

      // Determine status based on content
      let status: ConservationStatus = "watch";
      const tl = item.title.toLowerCase();
      if (tl.includes("threat") || tl.includes("emergency") || tl.includes("crisis") || tl.includes("destroy") || tl.includes("loss") || tl.includes("extinction")) {
        status = "active";
      } else if (tl.includes("protect") || tl.includes("conserved") || tl.includes("restored") || tl.includes("recovered") || tl.includes("victory") || tl.includes("saved")) {
        status = "resolved";
      }

      items.push({
        id: makeId(feed.source.toLowerCase().replace(/\s/g, "-"), item.link),
        title: item.title,
        date: iso,
        category: category !== "Environment" ? category : feed.defaultCategory,
        source: feed.source,
        sourceType: "media",
        status,
        summary: item.description || "Read the full story at the source.",
        link: item.link,
        tags,
      });
    }
  }

  return items;
}

// ─── FEDERAL REGISTER ─────────────────────────────────────────────────────
interface FederalRegisterDocument {
  title: string;
  publication_date: string;
  html_url: string;
  pdf_url?: string;
  agencies: Array<{ name: string }>;
  abstract?: string;
  document_number: string;
}

async function fetchFederalRegister(): Promise<ConservationNewsItem[]> {
  const params = new URLSearchParams({
    "conditions[term]": "wetlands OR \"endangered species\" OR \"Clean Water Act\" OR archaeological OR \"land conservation\" OR \"national park\" OR wilderness",
    order: "newest",
    per_page: "10",
  });
  ["title","publication_date","html_url","agencies","abstract","document_number"].forEach((f) => params.append("fields[]", f));

  try {
    const data = await fetchJson<{ results: FederalRegisterDocument[] }>(
      `https://www.federalregister.gov/api/v1/documents.json?${params.toString()}`,
      { timeoutMs: 15000 }
    );
    return (data.results || []).slice(0, 8).map((doc) => {
      const { category, tags } = categorizeFromText(doc.title);
      return {
        id: makeId("federal-register", doc.document_number),
        title: doc.title,
        date: safeIso(doc.publication_date) ?? new Date().toISOString(),
        category: category !== "Environment" ? category : "Policy",
        source: "Federal Register",
        sourceType: "rulemaking" as const,
        status: "watch" as const,
        summary: doc.abstract || "Federal rulemaking document. Open the source for full text.",
        link: doc.html_url,
        agency: (doc.agencies || []).map((a) => a.name).join(", "),
        tags: ["federal", "rulemaking", ...tags],
      };
    });
  } catch (e) {
    console.error("Federal Register fetch failed:", e);
    return [];
  }
}

// ─── COURTLISTENER ────────────────────────────────────────────────────────
interface CourtListenerResult {
  caseName?: string; case_name?: string;
  dateFiled?: string; date_filed?: string;
  court?: string; court_id?: string;
  absolute_url?: string; absoluteUrl?: string;
  snippet?: string;
  id?: number | string;
}

async function fetchCourtCases(): Promise<ConservationNewsItem[]> {
  const params = new URLSearchParams({
    q: "wetlands OR \"Clean Water Act\" OR \"Endangered Species Act\" OR \"national park\" OR archaeological OR \"land rights\" OR indigenous",
    order_by: "dateFiled desc",
    type: "o",
    page_size: "6",
  });

  try {
    const data = await fetchJson<{ results: CourtListenerResult[] }>(
      `https://www.courtlistener.com/api/rest/v3/search/?${params.toString()}`,
      { timeoutMs: 20000, headers: { "User-Agent": "BlueDuckFoundation/1.0 (info@theblueduck.org)" } }
    );
    return (data.results || []).slice(0, 6).map((r, idx) => {
      const name = r.caseName || r.case_name || "Court filing";
      const absolute = r.absolute_url || r.absoluteUrl || "";
      const { category, tags } = categorizeFromText(name);
      return {
        id: makeId("court", String(r.id ?? absolute ?? idx)),
        title: name,
        date: safeIso(r.dateFiled || r.date_filed) ?? new Date().toISOString(),
        category: "Litigation",
        source: "CourtListener",
        sourceType: "court" as const,
        status: "active" as const,
        summary: r.snippet || "Court filing. Open the source for full case details.",
        link: absolute ? `https://www.courtlistener.com${absolute}` : "https://www.courtlistener.com/",
        agency: r.court || r.court_id,
        tags: ["litigation", "court", ...tags],
      };
    });
  } catch (e) {
    console.error("CourtListener fetch failed:", e);
    return [];
  }
}

// ─── COMBINED FETCH ────────────────────────────────────────────────────────
export async function fetchAllConservationNews(
  options: FetchAllOptions = {}
): Promise<ConservationNewsItem[]> {
  const [rssItems, federalItems, courtItems] = await Promise.all([
    fetchRssFeeds(),
    fetchFederalRegister(),
    fetchCourtCases(),
  ]);

  const all = [...rssItems, ...federalItems, ...courtItems];

  // Deduplicate by title similarity
  const seen = new Set<string>();
  const deduped = all.filter((item) => {
    const key = item.title.toLowerCase().slice(0, 60);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  // Sort newest first
  deduped.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return deduped.filter((i) => i.link && i.title);
}
