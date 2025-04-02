export interface Project {
  title: string;
  year: number;
  description: string;
  url: string;
}

export const projects: Project[] = [
  {
    title: "Suno Labs",
    year: 2025,
    description: "AI-powered audiobooks app",
    url: "https://github.com/sunolabs",
  },
  {
    title: "Indic Accelerationism",
    year: 2024,
    description: "A movement to fast-track India’s rise",
    url: "https://inacc.vercel.app/",
  },
  {
    title: "Mithril AI",
    year: 2024,
    description: "Open science AI resarch lab",
    url: "https://github.com/mithrilai",
  },
  {
    title: "OpenDeepLearning",
    year: 2023,
    description: "Open source AI education initiative",
    url: "https://opendeeplearning.xyz/",
  },
];
