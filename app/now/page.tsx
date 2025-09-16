import type { Metadata } from "next";
import { stat } from "fs/promises";
import { join } from "path";
import NowPlaying from "../components/spotify";
import NowReading from "../components/goodreads";
import { formatDate } from "../lib/posts";

export const metadata: Metadata = {
  title: "Now",
  description: "What I'm doing right now",
};

async function getPageLastModified(): Promise<string> {
  const filePath = join(process.cwd(), "app/now/page.tsx");
  const stats = await stat(filePath);
  return formatDate(stats.mtime.toISOString());
}

export default async function Now() {
  const lastUpdated = await getPageLastModified();

  return (
    <section>
      <h1 className="font-semibold text-2xl">What I'm doing now</h1>
      <div className="flex justify-between items-center mt-3 mb-8 text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Last updated {lastUpdated}
        </p>
      </div>
      <div className="prose prose-neutral dark:prose-invert">
        <p>
          Here I keep an up-to-date list of the things I'm focusing on and what
          I'm doing. Inspired by{" "}
          <a
            href="https://nownownow.com/about"
            target="_blank"
            rel="noopener noreferrer"
          >
            nownownow.com
          </a>
          .
        </p>
        <NowPlaying />
        <h3>Currently reading</h3>
        <NowReading />
      </div>
    </section>
  );
}