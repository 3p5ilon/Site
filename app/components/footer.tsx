export function Footer() {
  const links = [
    { name: "twitter", url: "https://x.com/3p5ilon" },
    { name: "github", url: "https://github.com/3p5ilon" },
    // { name: "linkedin", url: "https://www.linkedin.com/in/akshattalapa/" },
    // { name: 'goodreads', url: 'https://www.goodreads.com/akshattalapa' },
    { name: "email", url: "mailto:hi3psilon@gmail.com" },
    { name: "rss", url: "/feed" },
  ];

  return (
    <footer className="sm:mt-16 mt-16">
      <div className="flex flex-col md:flex-row md:items-center">
        <div className="flex flex-row gap-4 items-center">
          {links.map((link) => (
            <a
              key={link.url}
              href={link.url}
              className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative"
              rel="noopener noreferrer"
              target="_blank"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
      <p className="mt-10 text-neutral-600 dark:text-neutral-400 text-[15px]">
        © {new Date().getFullYear()} Ɛpsilon
      </p>
    </footer>
  );
}
