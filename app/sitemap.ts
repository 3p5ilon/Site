import { MetadataRoute } from "next";
import { getBlogPosts } from "./lib/posts";
import { baseUrl } from "./lib/metadata";

const BaseUrl = baseUrl.endsWith("/")
  ? baseUrl
  : `${baseUrl}/`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let blogs = getBlogPosts().map((post) => ({
    url: `${BaseUrl}blog/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));

  let routes = ["home", "now", "blog", "projects"].map((route) => ({
    url: `${BaseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...blogs];
}
