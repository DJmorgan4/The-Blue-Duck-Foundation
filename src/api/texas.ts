export interface ConservationNewsItem {
  id: string;
  title: string;
  url?: string;
  link?: string;
  source: string;
  sourceType?: string;
  date: string;
  category: string;
  status: "watch" | "active" | "resolved" | "foundation";
  tags: string[];
  excerpt?: string;
  summary: string;
  slug?: string;
  isFoundationPost?: boolean;
  agency?: string;
}

export async function fetchAllConservationNews(
  _params: Record<string, unknown>
): Promise<ConservationNewsItem[]> {
  const feeds = [
    { url: "https://www.theguardian.com/environment/rss", source: "The Guardian" },
    { url: "https://e360.yale.edu/feed", source: "Yale Environment 360" },
    { url: "https://insideclimatenews.org/feed/", source: "Inside Climate News" },
    { url: "https://news.mongabay.com/feed/", source: "Mongabay" },
    { url: "https://www.archaeology.org/feed", source: "Archaeology Magazine" },
    { url: "https://www.audubon.org/rss.xml", source: "Audubon Society" },
  ];

  const results: ConservationNewsItem[] = [];

  await Promise.allSettled(
    feeds.map(async (feed) => {
      try {
        const res = await fetch(
          `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feed.url)}&count=10`,
          { next: { revalidate: 1800 } } as RequestInit
        );
        if (!res.ok) return;
        const data = await res.json();
        if (!data.items) return;

        for (const item of data.items) {
          const title: string = item.title || "";
          const url: string = item.link || item.url || "";
          const date: string = item.pubDate
            ? new Date(item.pubDate).toISOString()
            : new Date().toISOString();

          const titleLower = title.toLowerCase();
          let category = "Environment";
          if (titleLower.includes("archaeolog") || titleLower.includes("ancient") || titleLower.includes("fossil")) category = "Archaeology";
          else if (titleLower.includes("water") || titleLower.includes("freshwater") || titleLower.includes("aquifer")) category = "Clean Water";
          else if (titleLower.includes("climate") || titleLower.includes("solar") || titleLower.includes("energy")) category = "Climate & Energy";
          else if (titleLower.includes("wildlife") || titleLower.includes("species") || titleLower.includes("bird")) category = "Wildlife";
          else if (titleLower.includes("policy") || titleLower.includes("law") || titleLower.includes("regulation")) category = "Policy";
          else if (titleLower.includes("lawsuit") || titleLower.includes("court") || titleLower.includes("sue")) category = "Litigation";
          else if (titleLower.includes("land") || titleLower.includes("forest") || titleLower.includes("habitat")) category = "Land & Conservation";

          let status: ConservationNewsItem["status"] = "watch";
          if (titleLower.includes("lawsuit") || titleLower.includes("court") || titleLower.includes("threat") || titleLower.includes("crisis")) {
            status = "active";
          } else if (titleLower.includes("protect") || titleLower.includes("restore") || titleLower.includes("success") || titleLower.includes("recover")) {
            status = "resolved";
          }

          const excerpt = (item.description || item.content || "")
            .replace(/<[^>]+>/g, "")
            .replace(/&[^;]+;/g, " ")
            .slice(0, 240)
            .trim();

          results.push({
            id: `feed:${feed.source}:${url.slice(-20)}`,
            title,
            url,
            link: url,
            source: feed.source,
            sourceType: "media",
            date,
            category,
            status,
            tags: [category.toLowerCase().replace(/\s+/g, "-"), "media"],
            excerpt,
            summary: excerpt,
          });
        }
      } catch {
        // Silent fail
      }
    })
  );

  return results.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
