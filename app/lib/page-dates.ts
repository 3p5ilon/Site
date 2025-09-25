import { stat } from "fs/promises";
import { join } from "path";

const PAGE_EXTENSIONS = [".tsx", ".mdx", ".md"];

async function getPageLastModified(pagePath: string): Promise<Date> {
  const actualPath = pagePath === "" ? "(home)" : pagePath;
  
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
  const [home, now, projects] = await Promise.all([
    getPageLastModified(""),
    getPageLastModified("now"), 
    getPageLastModified("projects"),
  ]);
  
  return { home, now, projects };
}