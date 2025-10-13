import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";
import rehypeShiki from "@shikijs/rehype";
import { transformerNotationHighlight } from "@shikijs/transformers";

import { Tweet } from "./tweet";
import { Caption } from "./caption";
import { YouTube } from "./youtube";
import { ImageGrid } from "./image-grid";
import { FootNotes, Ref, FootNote } from "./footnotes";

import "katex/dist/katex.min.css";

// Utility Functions

function slugify(str) {
  return str
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/&/g, "-and-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}

function createHeading(level) {
  const Heading = ({ children }) => {
    let slug = slugify(children);
    return React.createElement(
      `h${level}`,
      { id: slug },
      [
        React.createElement("a", {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: "anchor",
        }),
      ],
      children
    );
  };

  Heading.displayName = `Heading${level}`;
  return Heading;
}

// Custom MDX Components

function CustomLink(props) {
  let href = props.href;

  if (href.startsWith("/")) {
    return (
      <Link href={href} {...props} className="link">
        {props.children}
      </Link>
    );
  }

  if (href.startsWith("#")) {
    return <a {...props} className="link" />;
  }

  return (
    <a target="_blank" rel="noopener noreferrer" className="link" {...props} />
  );
}

function CustomImage(props) {
  return (
    <div className="my-6 image">
      <Image
        alt={props.alt || ""}
        width={props.width || 800} // Use prop or default
        height={props.height || 600} // Use prop or default
        {...props}
        className="w-full h-auto rounded-lg"
      />
    </div>
  );
}

function Callout(props) {
  return (
    <div className="px-5 my-6 bg-[#F1F1F1] dark:bg-[#1F1F1F] rounded-lg text-sm flex items-center">
      <div className="flex items-center w-4 mr-4">{props.emoji}</div>
      <div className="w-full callout leading-relaxed">{props.children}</div>
    </div>
  );
}

let components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  Image: CustomImage,
  ImageGrid,
  a: CustomLink,
  Tweet,
  Caption,
  YouTube,
  Callout,
  FootNotes,
  Ref,
  FootNote,
};

export function CustomMDX(props) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkMath],
          rehypePlugins: [
            [
              rehypeShiki,
              {
                themes: {
                  light: "github-light",
                  dark: "github-dark",
                },
                defaultColor: false,
                cssVariablePrefix: "--shiki-",
                transformers: [transformerNotationHighlight()],
              },
            ],
            rehypeKatex,
          ],
        },
      }}
    />
  );
}
