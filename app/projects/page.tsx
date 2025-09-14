import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "I love to build!",
};

export default function Projects() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold">Projects</h1>
      <div className="prose prose-neutral dark:prose-invert">
        <p>I love to build!</p>
      </div>
    </section>
  );
}
