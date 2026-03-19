import { stat } from "fs/promises";
import { join } from "path";

const PAGE_EXTENSIONS = [".tsx", ".mdx", ".md"];

async function getPageLastModified(pagePath: string): Promise<Date> {
  const actualPath = pagePath === "" ? "" : pagePath;
  
  for (const ext of PAGE_EXTENSIONS) {
    try {
      const filePath = join(process.cwd(), "app", actualPath, `page${ext}`);
      const stats = await stat(filePath);
      return stats.mtime;
    } catch {
      continue;
    }
  }
  
  // Fallback if no file found
  return new Date();
}

// Return lastModified for static pages
export async function getPageDates() {
  const pages = ["", "blog", "now", "projects", "research"];
  const dates = await Promise.all(pages.map(getPageLastModified));
  
  return Object.fromEntries(
    pages.map((p, i) => [p || "home", dates[i]])
  ) as Record<string, Date>;
}
