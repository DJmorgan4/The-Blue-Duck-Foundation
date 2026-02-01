/**
 * Texas Conservation Watch API Integration
 *
 * Pages Router–safe, TypeScript-safe fetch helpers for:
 * - Federal Register (no key)
 * - CourtListener (no key, rate-limited)
 * - Regulations.gov (API key optional)
 * - OpenStates (API key optional)
 *
 * IMPORTANT:
 * - Do not expose API keys to the client. Use getStaticProps/getServerSideProps.
 */

export type ConservationStatus = "watch" | "active" | "resolved";

export type ConservationNewsItem = {
  id: string;
  title: string;
  date: string; // ISO string
  category: string;
  source: string;
  sourceType?: "court" | "rulemaking" | "agency" | "legislature" | "media";
  status: ConservationStatus;
  summary: string;
  link: string;
  agency?: string;
  tags: string[];
};

export type FetchAllOptions = {
  regulationsApiKey?: string;
  openStatesApiKey?: string;
  // You can expand later: query terms, max items, etc.
};

type FetchJsonOptions = {
  timeoutMs?: number;
  headers?: Record<string, string>;
};

async function fetchJson<T>(url: string, opts: FetchJsonOptions = {}): Promise<T> {
  const controller = new AbortController();
  const timeoutMs = opts.timeoutMs ?? 20000;
  const t = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        ...(opts.headers || {}),
      },
      signal: controller.signal,
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`HTTP ${res.status} for ${url}${text ? ` :: ${text.slice(0, 200)}` : ""}`);
    }

    return (await res.json()) as T;
  } finally {
    clearTimeout(t);
  }
}

// ============================================================================
// FEDERAL REGISTER API
// ============================================================================

export interface FederalRegisterDocument {
  title: string;
  publication_date: string; // YYYY-MM-DD
  html_url: string;
  pdf_url?: string;
  agencies: Array<{ name: string }>;
  abstract?: string;
  document_number: string;
}

export interface FederalRegisterResponse {
  results: FederalRegisterDocument[];
  count: number;
}

/**
 * Docs: https://www.federalregister.gov/developers/documentation/api/v1
 */
export async function fetchFederalRegister(
  searchTerm: string = "Texas wetlands",
  perPage: number = 20
): Promise<FederalRegisterDocument[]> {
  const params = new URLSearchParams({
    "conditions[term]": searchTerm,
    order: "newest",
    per_page: String(perPage),
  });

  // Specify fields to keep payload smaller & stable
  [
    "title",
    "publication_date",
    "html_url",
    "pdf_url",
    "agencies",
    "abstract",
    "document_number",
  ].forEach((f) => params.append("fields[]", f));

  const url = `https://www.federalregister.gov/api/v1/documents.json?${params.toString()}`;

  try {
    const data = await fetchJson<FederalRegisterResponse>(url, { timeoutMs: 20000 });
    return Array.isArray(data.results) ? data.results : [];
  } catch (e) {
    console.error("Error fetching Federal Register:", e);
    return [];
  }
}

// ============================================================================
// REGULATIONS.GOV API
// ============================================================================

export interface RegulationsDocument {
  id: string;
  attributes: {
    title?: string;
    postedDate?: string; // ISO
    documentType?: string;
    agencyId?: string;
    objectId?: string;
    docketId?: string;
  };
  links?: {
    self?: string;
  };
}

export interface RegulationsResponse {
  data: RegulationsDocument[];
  meta?: {
    totalElements?: number;
  };
}

/**
 * Docs: https://open.gsa.gov/api/regulationsgov/
 * Requires API key (optional for your site if you skip this source).
 */
export async function fetchRegulationsDocs(
  searchTerm: string,
  apiKey: string,
  pageSize: number = 20
): Promise<RegulationsDocument[]> {
  const params = new URLSearchParams({
    "filter[searchTerm]": searchTerm,
    "page[size]": String(pageSize),
    api_key: apiKey,
  });

  const url = `https://api.regulations.gov/v4/documents?${params.toString()}`;

  try {
    const data = await fetchJson<RegulationsResponse>(url, { timeoutMs: 20000 });
    return Array.isArray(data.data) ? data.data : [];
  } catch (e) {
    console.error("Error fetching Regulations.gov:", e);
    return [];
  }
}

// ============================================================================
// COURTLISTENER API
// ============================================================================

export interface CourtListenerResult {
  // CourtListener’s search API can vary by type; keep fields flexible but usable.
  caseName?: string;
  dateFiled?: string; // ISO-ish
  court?: string;
  absolute_url?: string;
  snippet?: string;
  // Some results come back with different fields:
  case_name?: string;
  date_filed?: string;
  court_id?: string;
  absoluteUrl?: string;
  // generic:
  id?: number | string;
}

export interface CourtListenerResponse {
  results: CourtListenerResult[];
  count: number;
}

/**
 * Docs: https://www.courtlistener.com/api/rest-info/
 * Free but rate-limited. Be respectful.
 */
export async function fetchCourtCases(
  searchQuery: string = "Texas wetlands",
  pageSize: number = 20
): Promise<CourtListenerResult[]> {
  const params = new URLSearchParams({
    q: searchQuery,
    order_by: "dateFiled desc",
    type: "o",
    page_size: String(pageSize),
  });

  const url = `https://www.courtlistener.com/api/rest/v3/search/?${params.toString()}`;

  try {
    const data = await fetchJson<CourtListenerResponse>(url, {
      timeoutMs: 25000,
      headers: {
        "User-Agent": "BlueDuckFoundation/1.0 (contact: admin@theblueduck.org)",
      },
    });
    return Array.isArray(data.results) ? data.results : [];
  } catch (e) {
    console.error("Error fetching CourtListener:", e);
    return [];
  }
}

// ============================================================================
// OPENSTATES API
// ============================================================================

export interface OpenStatesBill {
  id: string;
  title: string;
  identifier: string;
  created_at?: string;
  updated_at?: string;
  classification?: string[];
  subject?: string[];
  openstates_url?: string;
}

export interface OpenStatesResponse {
  results: OpenStatesBill[];
  pagination?: {
    total_items?: number;
  };
}

/**
 * Docs: https://docs.openstates.org/api-v3/
 * Requires API key (optional for your site if you skip this source).
 */
export async function fetchTexasBills(
  searchQuery: string,
  apiKey: string,
  pageSize: number = 20
): Promise<OpenStatesBill[]> {
  const params = new URLSearchParams({
    jurisdiction: "Texas",
    q: searchQuery,
    per_page: String(pageSize),
  });

  const url = `https://v3.openstates.org/bills?${params.toString()}`;

  try {
    const data = await fetchJson<OpenStatesResponse>(url, {
      timeoutMs: 20000,
      headers: {
        "X-API-KEY": apiKey,
      },
    });
    return Array.isArray(data.results) ? data.results : [];
  } catch (e) {
    console.error("Error fetching OpenStates:", e);
    return [];
  }
}

// ============================================================================
// NORMALIZATION HELPERS
// ============================================================================

function safeIso(dateLike: string | undefined | null): string | null {
  if (!dateLike) return null;
  const d = new Date(dateLike);
  if (Number.isNaN(d.getTime())) return null;
  return d.toISOString();
}

function makeId(prefix: string, unique: string): string {
  return `${prefix}:${unique}`;
}

function categorizeFromText(text: string): { category: string; tags: string[] } {
  const t = (text || "").toLowerCase();

  const tags: string[] = [];
  if (t.includes("wetland")) tags.push("wetlands");
  if (t.includes("waterfowl") || t.includes("duck") || t.includes("goose")) tags.push("waterfowl");
  if (t.includes("endangered species") || t.includes("esa")) tags.push("ESA");
  if (t.includes("clean water act") || t.includes("cwa")) tags.push("Clean Water Act");
  if (t.includes("public land") || t.includes("blm") || t.includes("forest service")) tags.push("public land");
  if (t.includes("hunting")) tags.push("hunting regs");

  let category = "Policy";
  if (tags.includes("wetlands")) category = "Wetlands";
  else if (tags.includes("waterfowl")) category = "Waterfowl";
  else if (tags.includes("ESA")) category = "Endangered Species";
  else if (tags.includes("public land")) category = "Public Land";

  return { category, tags };
}

// ============================================================================
// COMBINED FETCH (For News Page)
// ============================================================================

export async function fetchAllConservationNews(
  options: FetchAllOptions = {}
): Promise<ConservationNewsItem[]> {
  const items: ConservationNewsItem[] = [];

  // ---- Federal Register (always on)
  const federalDocs = await fetchFederalRegister("Texas wetlands OR waterfowl OR endangered species OR Clean Water Act", 25);

  federalDocs.slice(0, 12).forEach((doc) => {
    const iso = safeIso(doc.publication_date) ?? new Date().toISOString();
    const { category, tags } = categorizeFromText(doc.title);

    items.push({
      id: makeId("federalregister", doc.document_number || doc.html_url),
      title: doc.title,
      date: iso,
      category,
      source: "Federal Register",
      sourceType: "rulemaking",
      status: "watch",
      summary: doc.abstract || "Primary source document (rule/notice). Open the source for full details.",
      link: doc.html_url || doc.pdf_url || "",
      agency: (doc.agencies || []).map((a) => a.name).filter(Boolean).join(", "),
      tags: ["primary source", ...tags],
    });
  });

  // ---- CourtListener (always on)
  const courtResults = await fetchCourtCases("Texas (wetlands OR waterfowl OR \"Clean Water Act\" OR \"Endangered Species Act\")", 20);

  courtResults.slice(0, 8).forEach((r, idx) => {
    const name = r.caseName || r.case_name || "Court filing";
    const date = safeIso(r.dateFiled || r.date_filed) ?? null;
    const absolute = r.absolute_url || r.absoluteUrl || "";
    const link = absolute ? `https://www.courtlistener.com${absolute}` : "https://www.courtlistener.com/";

    const { category, tags } = categorizeFromText(name);

    items.push({
      id: makeId("courtlistener", String(r.id ?? absolute ?? idx)),
      title: name,
      date: date ?? new Date().toISOString(),
      category: category === "Policy" ? "Courts" : category,
      source: "CourtListener",
      sourceType: "court",
      status: "active",
      summary: (r.snippet || "Primary source: court docket/opinion search result. Open the source for context.").trim(),
      link,
      agency: r.court || r.court_id,
      tags: ["primary source", "litigation", ...tags],
    });
  });

  // ---- Regulations.gov (optional)
  if (options.regulationsApiKey) {
    const regs = await fetchRegulationsDocs(
      "Texas wetlands OR waterfowl OR Endangered Species Act OR Clean Water Act",
      options.regulationsApiKey,
      20
    );

    regs.slice(0, 8).forEach((d) => {
      const title = d.attributes?.title || "Regulations.gov document";
      const iso = safeIso(d.attributes?.postedDate) ?? new Date().toISOString();
      const { category, tags } = categorizeFromText(title);

      items.push({
        id: makeId("regulationsgov", d.id),
        title,
        date: iso,
        category,
        source: "Regulations.gov",
        sourceType: "rulemaking",
        status: "watch",
        summary: "Rulemaking docket/document metadata. Open the source for full text and supporting materials.",
        link: `https://www.regulations.gov/document/${encodeURIComponent(d.id)}`,
        agency: d.attributes?.agencyId,
        tags: ["primary source", "docket", ...tags],
      });
    });
  }

  // ---- OpenStates (optional)
  if (options.openStatesApiKey) {
    const bills = await fetchTexasBills("wetlands OR waterfowl OR wildlife OR hunting OR conservation", options.openStatesApiKey, 20);

    bills.slice(0, 8).forEach((b) => {
      const iso = safeIso(b.updated_at || b.created_at) ?? new Date().toISOString();
      const { category, tags } = categorizeFromText(b.title);

      items.push({
        id: makeId("openstates", b.id),
        title: `${b.identifier}: ${b.title}`,
        date: iso,
        category: category === "Policy" ? "Legislature" : category,
        source: "OpenStates",
        sourceType: "legislature",
        status: "watch",
        summary: "Texas bill tracker metadata. Open the source for actions, sponsors, and status.",
        link: b.openstates_url || `https://openstates.org/`,
        agency: "Texas Legislature",
        tags: ["legislation", ...tags],
      });
    });
  }

  // Sort newest first (ISO safe)
  items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Defensive filter: remove any empty links
  return items.filter((i) => typeof i.link === "string" && i.link.length > 0);
}

