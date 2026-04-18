export interface ConservationNewsItem {
  id: string;
  title: string;
  url: string;
  source: string;
  sourceType?: string;
  date: string;
  category: string;
  status: "watch" | "active" | "resolved" | "foundation";
  tags: string[];
  excerpt?: string;
  summary?: string;
  slug?: string;
  isFoundationPost?: boolean;
  link?: string;
}

export async function fetchAllConservationNews(
  _params: Record<string, unknown>
): Promise<ConservationNewsItem[]> {
  try {
    const res = await fetch(
      "https://theblueduck.org/api/texas",
      { next: { revalidate: 1800 } } as RequestInit
    );
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}
