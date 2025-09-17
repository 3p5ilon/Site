import { MetadataRoute } from "next";
import { getBlogPosts } from "./lib/posts";
import { baseUrl } from "./lib/metadata";
import { getPageDates } from "./lib/page-dates";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = getBlogPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.metadata.publishedAt),
  }));

  const { home, now, projects } = await getPageDates();

  // /blog lastModified = latest blog post date
  const latestBlog = new Date(Math.max(...posts.map((p) => +p.lastModified)));

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: home },
    { url: `${baseUrl}/now`, lastModified: now },
    { url: `${baseUrl}/projects`, lastModified: projects },
    { url: `${baseUrl}/blog`, lastModified: latestBlog },
  ];

  return [...staticRoutes, ...posts];
}
