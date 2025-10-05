import { NextResponse } from "next/server";
import Parser from "rss-parser";

type Movie = {
  title: string;
  link: string;
  image: string | null;
  rating: string | null;
  watchedDate: string;
};

const parser = new Parser();
const TTL = 1800; // 30 minutes
let cache: { movies: Movie[]; ts: number } | null = null;

function extractImageFromHtml(html?: string | null) {
  if (!html) return null;
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match ? match[1] : null;
}

export async function GET() {
  try {
    if (cache && Date.now() - cache.ts < TTL * 1000) {
      return NextResponse.json({ movies: cache.movies });
    }

    const rssUrl = process.env.LETTERBOXD_RSS_URL;
    if (!rssUrl)
      return NextResponse.json({ error: "Missing LETTERBOXD_RSS_URL" }, { status: 500 });

    const feed = await parser.parseURL(rssUrl);
    if (!feed.items?.length) return NextResponse.json({ movies: [] });

    const movies: Movie[] = feed.items.slice(0, 5).map((item: any) => {
      const rawTitle = item.title ?? "";
      const parts = rawTitle.split(" - ");
      let title = parts[0].trim();
      const rating = parts.length > 1 && parts[1].includes("★") ? parts[1].trim() : null;
      const image = extractImageFromHtml(item.content || item.description);
      const watchedDate =
        item.isoDate || item.pubDate || new Date().toISOString();

      return {
        title,
        link: item.link ?? "",
        image,
        rating,
        watchedDate: new Date(watchedDate).toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }),
      };
    });

    cache = { movies, ts: Date.now() };
    return NextResponse.json({ movies });
  } catch (err) {
    console.error("Letterboxd API error:", err);
    return NextResponse.json({ movies: [] }, { status: 500 });
  }
}
