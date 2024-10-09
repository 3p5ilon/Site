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
      <h1 className="mb-8 text-2xl font-medium tracking-tight">
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
          mixed reality, open-source, and open research.
        </p>
        <p>
          I'm the founder and CEO of{" "}
          <a href="http://mithrilai.xyz/" target="_blank">
            Mithril AI
          </a>
          , an open-source AI R&D company dedicated to democratizing AI. Our
          goal is to be the 'Linux of AI' by making everything from model
          weights to data pipelines completely open and accessible to everyone.
        </p>
        <p>
          I also founded{" "}
          <a href="https://www.opendeeplearning.xyz/" target="_blank">
            OpenDeepLearning
          </a>
          , a nonprofit offering free AI education for all, and{" "}
          <a href="https://hack2tfuture.github.io/" target="_blank">
            Hackspace
          </a>
          , a club for hackers building cool projects together.
        </p>
        <p>
          Beyond tech, I’m into music, creating AI-gen tracks with my band,{" "}
          <a href="https://oneringband.netlify.app/" target="_blank">
            One Ring
          </a>
          , and I also enjoy reading books in different genres (explore my
          bookshelf on{" "}
          <a href="https://www.goodreads.com/akshattalapa" target="_blank">
            Goodreads
          </a>
          !).
        </p>
        <p>Some things I believe:</p>
        <ul>
          <li>
            Anyone can learn anything online and achieve their goals if they're
            truly passionate about it.
          </li>
          <li>
            The{" "}
            <a
              href="https://en.wikipedia.org/wiki/Effective_accelerationism"
              target="_blank"
            >
              e/acc
            </a>{" "}
            techno-optimist philosophy is the way forward. We should speed up
            technological progress, especially in developing AGI.
          </li>
          <li>
            Open source and open research are crucial. I believe AGI should be
            open source for everyone's benefit.
          </li>
          <li>AGI is more likely to help humans than harm them.</li>
          <li>
            We need more nuclear fusion plants for clean, sustainable energy.
            Fusion could meet our growing energy needs for building AGI.
          </li>
        </ul>
        <p>
          If you're interested in collaborating on generative AI (or not), just
          DM me on{" "}
          <a href={socialLinks.twitter} target="_blank">
            Twitter
          </a>
          . I'm always open to new ideas and projects!
        </p>
      </div>
    </section>
  );
}
