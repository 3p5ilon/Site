import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Research",
  description: "My Research",
};

export default function Research() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-medium">Research</h1>
      <div className="prose prose-neutral dark:prose-invert">
        <p>
          My primary research focus is to enhancing the training, fine-tuning,
          and inference capabilities of pre-trained large language models, while
          also releasing the datasets used in their training.
        </p>
        <p>
          You can explore my work on{" "}
          <a href="https://huggingface.co/imsirius" target="_blank">
            Hugging Face
          </a>
          .
        </p>
      </div>
    </section>
  );
}
