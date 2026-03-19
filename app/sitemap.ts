import { MetadataRoute } from "next";
import { getBlogPosts } from "./lib/posts";
import { baseUrl } from "./lib/metadata";
import { getPageDates } from "./lib/page-dates";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const dates = await getPageDates();
  const pages = ["", "/blog", "/now", "/projects", "/research"];

  const routes = pages.map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: (dates[page.replace("/", "") || "home"] || new Date())
      .toISOString()
      .split("T")[0],
  }));

  const blogPosts = getBlogPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.metadata.publishedAt)
      .toISOString()
      .split("T")[0],
  }));

  return [...routes, ...blogPosts];
}
