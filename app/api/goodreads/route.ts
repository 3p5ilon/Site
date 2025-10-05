import { NextResponse } from "next/server";
import Parser from "rss-parser";

type Book = {
  title: string;
  author?: string;
  authorUrl?: string;
  link: string;
  image: string | null;
} | null;

const parser = new Parser();
const TTL = 1800; // cache TTL in seconds (30 min)
let cache: { book: Book; ts: number } | null = null;

function extractImageFromHtml(html?: string) {
  if (!html) return null;
  const m = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return m ? m[1] : null;
}

function upscaleGoodreadsImage(url: string | null): string | null {
  if (!url) return url;
  return url.replace(/\._S[XY]\d+_.*?(?=\.[a-z]{3,4}$)/i, "");
}

async function fetchAuthorFromBookPage(
  bookUrl: string
): Promise<{ author?: string; authorUrl?: string }> {
  try {
    const html = await fetch(bookUrl).then((r) => r.text());
    const match = html.match(
      /<a[^>]*class="authorName"[^>]*href="([^"]+)"[^>]*>.*?<span[^>]*itemprop="name"[^>]*>([^<]+)<\/span>/i
    );
    if (match) {
      const authorUrl = `${match[1]}`;
      const author = match[2].trim();
      return { author, authorUrl };
    }
    return {};
  } catch {
    return {};
  }
}

export async function GET() {
  try {
    if (cache && (Date.now() - cache.ts) / 1000 < TTL) {
      return NextResponse.json(cache.book);
    }

    const feedUrl = process.env.GOODREADS_RSS_URL;
    if (!feedUrl) {
      return NextResponse.json(
        { error: "Missing GOODREADS_RSS_URL env" },
        { status: 400 }
      );
    }

    const feed = await parser.parseURL(feedUrl);
    if (!feed.items || feed.items.length === 0) {
      cache = { book: null, ts: Date.now() };
      return NextResponse.json(null);
    }

    const item: any = feed.items[0];

    // image
    let image: string | null =
      item.enclosure?.url ||
      extractImageFromHtml(
        item.content || item.contentSnippet || item.description
      );

    // basic author fallback
    let author = item.creator || item.author || "";
    if (!author) {
      const byMatch = String(item.content || item.description || "").match(
        /by\s*([^<\n]+)/i
      );
      if (byMatch) author = byMatch[1].trim();
    }

    // fetch exact author URL from Goodreads page
    let authorUrl: string | undefined;
    if (item.link) {
      const result = await fetchAuthorFromBookPage(item.link);
      author = result.author || author;
      authorUrl = result.authorUrl;
    }

    const book: Book = {
      title: item.title || "",
      author,
      authorUrl,
      link: item.link || "",
      image: upscaleGoodreadsImage(image),
    };

    cache = { book, ts: Date.now() };
    return NextResponse.json(book);
  } catch (err) {
    console.error("Goodreads API error:", err);
    if (cache) return NextResponse.json(cache.book);
    return NextResponse.json(
      { error: "Failed to fetch Goodreads feed" },
      { status: 500 }
    );
  }
}
