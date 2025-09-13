import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Now",
  description: "What I’m doing right now",
};

export default function Now() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold">What I’m doing right now</h1>
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
      </div>
    </section>
  );
}
