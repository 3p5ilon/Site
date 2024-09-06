import Image from "next/image";
import { socialLinks } from "./config";

export default function Page() {
  return (
    <section>
      <a href={socialLinks.twitter} target="_blank">
        <Image
          src="/profile.png"
          alt="Profile photo"
          className="rounded-full bg-gray-100 block lg:mt-5 mt-0 lg:mb-5 mb-10 mx-auto sm:float-right sm:ml-5 sm:mb-5 grayscale hover:grayscale-0"
          unoptimized
          width={160}
          height={160}
          priority
        />
      </a>
      <h1 className="mb-8 text-2xl font-medium tracking-tighter">
        I work with models!
      </h1>
      <div className="prose prose-neutral dark:prose-invert">
        <p>
          Hi! I usually go by Sirius on the Internet, though my real name is
          Akshat. I'm an 18 year old AI researcher, entrepreneur, and developer
          deeply passionate about generative AI.
        </p>
        <p>
          My interests extend to robotics, hardware, blockchain, nuclear fusion,
          open-source (primarily AI), and open research.
        </p>
        <p>
          I’m the founder and CEO of{" "}
          <a href="https://mithrilai.xyz/" target="_blank">
            Mithril AI
          </a>
          , an open-source AI R&D company dedicated to enhancing the training,
          fine-tuning, and inference capabilities of pre-trained large language
          models, while also releasing the datasets used in their training.
        </p>
        <p>
          I’m also the founder of{" "}
          <a href="https://www.opendeeplearning.xyz/" target="_blank">
            OpenDeepLearning
          </a>
          , a non-profit open-source AI + education community where I teach
          machine learning and mathematics.
        </p>
        <p>
          Beyond tech, I’m an avid reader (50 pages/day) with a diverse taste in
          books, including science, sci-fi, philosophy, psychology, history,
          classics, and biographies. Explore my bookshelf on{" "}
          <a href="https://www.goodreads.com/akshattalapa" target="_blank">
            Goodreads
          </a>
          .
        </p>
        <p>
          If you're interested in collaborating on generative AI (or not), just
          DM me on{" "}
          <a href="https://x.com/1tssirius" target="_blank">
            Twitter
          </a>
          . I'm always open to new ideas and projects!
        </p>
      </div>
    </section>
  );
}
