import { NextResponse } from "next/server";
import Parser from "rss-parser";

type Book = {
  title: string;
  author: string;
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
  // remove Goodreads low-res suffixes like ._SY75_ or ._SX50_
  return url.replace(/\._S[XY]\d+_.*?(?=\.[a-z]{3,4}$)/i, "");
}

export async function GET() {
  try {
    // return cached if fresh
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

    // image: try enclosure -> description/content -> fallback null
    let image: string | null = null;
    if (item.enclosure?.url) image = item.enclosure.url;
    if (!image)
      image = extractImageFromHtml(
        item.content || item.contentSnippet || item.description
      );

    // author
    let author = item.creator || item.author || "";
    const content = String(item.content || item.description || "");
    const byMatch = content.match(/by\s*([^<\n]+)/i);
    if (!author && byMatch) {
      author = byMatch[1].trim();
    }

    // Fallback: Google Books if author missing
    if (!author && (item.title || "")) {
      try {
        const q = encodeURIComponent(String(item.title));
        const gb = await fetch(
          `https://www.googleapis.com/books/v1/volumes?q=intitle:${q}&maxResults=1`
        ).then((r) => r.json());
        const volume = gb?.items?.[0]?.volumeInfo;
        const gbAuthor = volume?.authors?.[0];
        if (gbAuthor) {
          author = gbAuthor;
        }
      } catch (e) {
        // ignore fallback failures
      }
    }

    const book = {
      title: item.title || "",
      author,
      link: item.link || "",
      image: upscaleGoodreadsImage(image),
    };

    cache = { book, ts: Date.now() };
    return NextResponse.json(book);
  } catch (err) {
    console.error("Goodreads API error:", err);
    // on error, return cached if available
    if (cache) return NextResponse.json(cache.book);
    return NextResponse.json(
      { error: "Failed to fetch Goodreads feed" },
      { status: 500 }
    );
  }
}
