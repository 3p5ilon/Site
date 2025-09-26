import { Feed } from "feed";
import { NextResponse } from "next/server";
import { getBlogPosts } from "app/lib/posts";
import { baseUrl } from "app/lib/metadata";

const validFormats = ["rss.xml", "atom.xml", "feed.json"] as const;
type FeedFormat = (typeof validFormats)[number];

export async function generateStaticParams() {
  return validFormats.map((format) => ({ format }));
}

export async function GET(
  _: Request,
  ctx: { params: Promise<{ format: FeedFormat }> }
) {
  const { format } = await ctx.params;

  if (!validFormats.includes(format)) {
    return NextResponse.json(
      { error: "Unsupported feed format" },
      { status: 404 }
    );
  }

  const feed = new Feed({
    title: "Ɛpsilon",
    description: "AI researcher, entrepreneur, and developer.",
    id: `${baseUrl}/`,
    link: `${baseUrl}/`,
    language: "en",
    image: `${baseUrl}/banner.png`,
    favicon: `${baseUrl}/favicon.ico`,
    copyright: `© ${new Date().getFullYear()} Ɛpsilon`,
    updated: new Date(),
    generator: "Ɛpsilon Feeds",
    feedLinks: {
      rss: `${baseUrl}/rss.xml`,
      atom: `${baseUrl}/atom.xml`,
      json: `${baseUrl}/feed.json`,
    },
    author: {
      name: "Ɛpsilon",
      link: baseUrl,
    },
  });

  const allPosts = await getBlogPosts();
  allPosts.forEach((post) => {
    const postUrl = `${baseUrl}/blog/${post.slug}`;
    const categories = post.metadata.tags
      ? post.metadata.tags.split(",").map((tag) => tag.trim())
      : [];

    feed.addItem({
      title: post.metadata.title,
      id: postUrl,
      link: postUrl,
      description: post.metadata.summary,
      // content: post.metadata.content,
      // author: [{ name: "Ɛpsilon", link: baseUrl, email: "info@example.com" }],
      category: categories.map((tag) => ({
        name: tag,
        term: tag,
      })),
      date: new Date(post.metadata.publishedAt),
      image: post.metadata.image
        ? `${baseUrl}/${post.metadata.image}`
        : undefined,
    });
  });

  const responseMap: Record<FeedFormat, { content: string; type: string }> = {
    "rss.xml": {
      content: feed.rss2(),
      type: "application/rss+xml; charset=utf-8",
    },
    "atom.xml": {
      content: feed.atom1(),
      type: "application/atom+xml; charset=utf-8",
    },
    "feed.json": {
      content: feed.json1(),
      type: "application/feed+json; charset=utf-8",
    },
  };

  const { content, type } = responseMap[format];

  return new NextResponse(content, {
    headers: { "Content-Type": type },
  });
}
