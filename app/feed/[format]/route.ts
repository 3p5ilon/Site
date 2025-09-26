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

  const BaseUrl = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;

  const feed = new Feed({
    title: "Ɛpsilon",
    description: "AI researcher, entrepreneur, and developer.",
    id: BaseUrl,
    link: BaseUrl,
    language: "en",
    image: `${BaseUrl}banner.png`,
    favicon: `${BaseUrl}favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}, Ɛpsilon`,
    updated: new Date(),
    generator: "Ɛpsilon Feeds",
    feedLinks: {
      rss: `${BaseUrl}rss.xml`,
      atom: `${BaseUrl}atom.xml`,
      json: `${BaseUrl}feed.json`,
    },
    author: {
      name: "Ɛpsilon",
      link: BaseUrl,
    },
  });

  const allPosts = await getBlogPosts();
  allPosts.forEach((post) => {
    const postUrl = `${BaseUrl}blog/${post.slug}`;
    const categories = post.metadata.tags
      ? post.metadata.tags.split(",").map((tag) => tag.trim())
      : [];

    feed.addItem({
      title: post.metadata.title,
      id: postUrl,
      link: postUrl,
      description: post.metadata.summary,
      // content: post.metadata.content,
      // author: [{ name: "Ɛpsilon", link: BaseUrl, email: "info@example.com" }],
      category: categories.map((tag) => ({ name: tag })),
      date: new Date(post.metadata.publishedAt),
      image: post.metadata.image
        ? `${BaseUrl}${post.metadata.image}`
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
