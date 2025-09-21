import Link from "next/link";
import type { Metadata } from "next";

interface Project {
  title: string;
  year: number;
  description: string;
  url: string;
}

const projects: Project[] = [
  {
    title: "Feedster",
    year: 2025,
    description: "All your feeds in one place",
    url: "https://github.com/3p5ilon/feedster",
  },
  {
    title: "Vani",
    year: 2025,
    description: "AI powered audiobooks app",
    url: "https://github.com/getvani",
  },
  {
    title: "Indus Labs",
    year: 2024,
    description: "Understand India through data",
    url: "https://inacc.vercel.app/",
  },
  {
    title: "One Ring",
    year: 2024,
    description: "AI generated music videos",
    url: "https://oneringband.netlify.app/",
  },
  {
    title: "Mithril AI",
    year: 2024,
    description: "Open science AI resarch lab",
    url: "https://github.com/mithrilai",
  },
  {
    title: "AIcademy",
    year: 2023,
    description: "Open source AI education org",
    url: "https://github.com/aicademyorg",
  },
  {
    title: "Saregama",
    year: 2023,
    description: "Indian classical music archive",
    url: "https://opensangeet.netlify.app/docs/svara",
  },
  {
    title: "Middle-earth",
    year: 2023,
    description: "Where teens build cool things!",
    url: "https://hack2tfuture.github.io/",
  },
  {
    title: "Nextfolio",
    year: 2023,
    description: "Nextjs portfolio template",
    url: "https://nextfolio-template.vercel.app/",
  },
];

export const metadata: Metadata = {
  title: "Projects",
  description: "I love to build!",
};

export default function Projects() {
  return (
    <section>
      <h1 className="mb-8.5 text-2xl font-semibold">Projects</h1>
      <div>
        {projects.map((project) => (
          <Link
            key={project.title}
            className="flex flex-col space-y-1 mb-4"
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="w-full flex flex-col md:flex-row md:items-baseline md:gap-2">
              <p className="text-neutral-900 dark:text-neutral-100">
                {project.title}
              </p>
              <span className="hidden md:inline text-neutral-500"> - </span>
              <p className="text-neutral-600 dark:text-neutral-400">
                {project.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
