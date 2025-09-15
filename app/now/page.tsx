import type { Metadata } from "next";
import NowPlaying from "../components/spotify";
import NowReading from "../components/goodreads";
import { formatDate } from "app/lib/posts";

export const metadata: Metadata = {
  title: "Now",
  description: "What I'm doing right now",
};

export default function Now() {
  return (
    <section>
      <h1 className="font-semibold text-2xl">What I'm doing now</h1>
      <div className="flex justify-between items-center mt-3 mb-8 text-sm">
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Last updated Aug 09, 2025
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
        <div className="mb-8">
          <NowPlaying />
        </div>

        <div className="mb-8">
          <NowReading />
        </div>
      </div>
    </section>
  );
}
