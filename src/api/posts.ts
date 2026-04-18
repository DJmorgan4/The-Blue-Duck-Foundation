/**
 * Foundation Posts Loader
 *
 * Reads markdown files from /src/posts/ directory.
 * Each file has YAML frontmatter with: title, date, category, summary, tags
 *
 * To add a new post:
 * 1. Create a new .md file in src/posts/
 * 2. Use the format: YYYY-MM-DD-slug.md
 * 3. Add frontmatter at the top (see example post)
 * 4. Push to GitHub — it will appear at the top of the news feed
 */

import fs from "fs";
import path from "path";

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
  summary?: string;
  slug?: string;
  isFoundationPost?: boolean;
}

function parseFrontmatter(content: string): { data: Record<string, any>; body: string } {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { data: {}, body: content };

  const data: Record<string, any> = {};
  const yamlLines = match[1].split("\n");
  for (const line of yamlLines) {
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    let value: any = line.slice(colonIdx + 1).trim();

    if (value.startsWith("[") && value.endsWith("]")) {
      value = value
        .slice(1, -1)
        .split(",")
        .map((v: string) => v.trim().replace(/^["']|["']$/g, ""));
    } else if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    data[key] = value;
  }

  return { data, body: match[2].trim() };
}

export function loadFoundationPosts(): ConservationNewsItem[] {
  const postsDir = path.join(process.cwd(), "src", "posts");

  if (!fs.existsSync(postsDir)) return [];

  const files = fs.readdirSync(postsDir)
    .filter((f) => f.endsWith(".md"))
    .sort()
    .reverse();

  const posts: ConservationNewsItem[] = [];

  for (const file of files) {
    try {
      const content = fs.readFileSync(path.join(postsDir, file), "utf-8");
      const { data, body } = parseFrontmatter(content);

      if (!data.title || !data.date) continue;

      const summary = data.summary || body.slice(0, 240).replace(/\n/g, " ") + "…";
      const tags = Array.isArray(data.tags) ? data.tags : [];

      posts.push({
        id: `foundation:${file.replace(".md", "")}`,
        title: data.title,
        date: new Date(data.date).toISOString(),
        category: data.category || "Foundation",
        source: "The Blue Duck Foundation",
        sourceType: "foundation",
        status: "foundation",
        summary,
        link: "#",
        tags: ["foundation", ...tags],
        isFoundationPost: true,
      });
    } catch (e) {
      console.error(`Failed to load post ${file}:`, e);
    }
  }

  return posts;
}
