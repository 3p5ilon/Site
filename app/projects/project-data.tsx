export interface Project {
  title: string;
  year: number;
  description: string;
  url: string;
}

export const projects: Project[] = [
  {
    title: "Mithril AI",
    year: 2023,
    description:
      "an open-source AI R&D company dedicated to enhancing the training, fine-tuning, and inference capabilities of pre-trained large language models, while also releasing the datasets used in their training.",
    url: "https://mithrilai.xyz/",
  },
  {
    title: "OpenDeepLearning",
    year: 2023,
    description:
      "a non-profit open-source AI + education community where I teach machine learning and mathematics.",
    url: "https://www.opendeeplearning.xyz/",
  },
];
