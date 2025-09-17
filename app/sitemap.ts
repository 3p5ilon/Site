import { MetadataRoute } from "next";
import { getBlogPosts } from "./lib/posts";
import { baseUrl } from "./lib/metadata";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = getBlogPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.metadata.publishedAt),
    // changeFrequency: 'monthly' as const,
    // priority: 0.8,
  }));

  const staticRoutes = [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/now`, lastModified: new Date() },
    { url: `${baseUrl}/blog`, lastModified: new Date() },
    { url: `${baseUrl}/projects`, lastModified: new Date() },
  ].map(route => ({
    ...route,
    // changeFrequency: 'weekly' as const,
    // priority: 1.0,
  }));

  return [...staticRoutes, ...posts];
}