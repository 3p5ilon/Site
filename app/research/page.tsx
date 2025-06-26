import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Research",
  description: "Ideas I explore",
};

export default function Research() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-medium">Research</h1>
      <div className="prose prose-neutral dark:prose-invert">
        <p>Still working on them, gonna take a bit ;)</p>
      </div>
    </section>
  );
}
