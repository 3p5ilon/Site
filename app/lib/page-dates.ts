import { stat } from "fs/promises";
import { join } from "path";

// Cache to avoid multiple fs calls
const dateCache = new Map<string, Date>();
const PAGE_EXTENSIONS = [".tsx", ".mdx", ".md"];

async function getPageLastModified(pagePath: string): Promise<Date> {
  if (dateCache.has(pagePath)) return dateCache.get(pagePath)!;

  const actualPath = pagePath === "" ? "(home)" : pagePath;

  for (const ext of PAGE_EXTENSIONS) {
    try {
      const filePath = join(process.cwd(), "app", actualPath, `page${ext}`);
      const stats = await stat(filePath);
      dateCache.set(pagePath, stats.mtime);
      return stats.mtime;
    } catch {}
  }

  const currentDate = new Date();
  dateCache.set(pagePath, currentDate);
  return currentDate;
}

// Return lastModified for static pages
export async function getPageDates() {
  const [home, now, projects] = await Promise.all([
    getPageLastModified(""),
    getPageLastModified("now"),
    getPageLastModified("projects"),
  ]);
  return { home, now, projects };
}
