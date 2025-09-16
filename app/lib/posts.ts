import fs from "fs";
import path from "path";

interface Metadata {
  title: string;
  publishedAt?: string;
  summary?: string;
  tags?: string;
  image?: string;
}

interface Post {
  metadata: Metadata & { publishedAt: string };
  slug: string;
  content: string;
}

function parseFrontmatter(fileContent: string): {
  metadata: Metadata;
  content: string;
} {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  const match = frontmatterRegex.exec(fileContent);

  if (!match) {
    throw new Error("Invalid frontmatter");
  }

  const frontMatterBlock = match[1];
  const content = fileContent.replace(frontmatterRegex, "").trim();
  const frontMatterLines = frontMatterBlock.trim().split("\n");
  const metadata: Partial<Metadata> = {};

  frontMatterLines.forEach((line) => {
    const [key, ...valueArr] = line.split(": ");
    let value = valueArr.join(": ").trim();
    value = value.replace(/^['"](.*)['"]$/, "$1");
    metadata[key.trim() as keyof Metadata] = value;
  });

  return { metadata: metadata as Metadata, content };
}

function getPostFiles(dir: string): string[] {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readPost(filePath: string): {
  metadata: Metadata;
  content: string;
  stats: fs.Stats;
} {
  const rawContent = fs.readFileSync(filePath, "utf-8");
  const stats = fs.statSync(filePath);
  const { metadata, content } = parseFrontmatter(rawContent);

  return { metadata, content, stats };
}

export function getBlogPosts(): Post[] {
  const postsDirectory = path.join(process.cwd(), "content");
  const postFiles = getPostFiles(postsDirectory);

  return postFiles
    .map((file) => {
      const filePath = path.join(postsDirectory, file);
      const { metadata, content, stats } = readPost(filePath);
      const slug = path.basename(file, path.extname(file));

      return {
        metadata: {
          ...metadata,
          publishedAt: metadata.publishedAt || stats.mtime.toISOString(),
        },
        slug,
        content,
      };
    })
    .sort(
      (a, b) =>
        new Date(b.metadata.publishedAt).getTime() -
        new Date(a.metadata.publishedAt).getTime()
    );
}

export function formatDate(date: string, includeRelative = false): string {
  const now = new Date();
  const target = new Date(date);
  const diffTime = now.getTime() - target.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  let relative = "";
  if (diffDays === 0) {
    relative = "Today";
  } else if (diffDays === 1) {
    relative = "Yesterday";
  } else if (diffDays < 7) {
    relative = `${diffDays}d ago`;
  } else if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    relative = `${weeks}w ago`;
  } else if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    relative = `${months}mo ago`;
  } else {
    const years = Math.floor(diffDays / 365);
    relative = `${years}y ago`;
  }

  const formatted = target.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

  return includeRelative ? `${formatted} (${relative})` : formatted;
}
