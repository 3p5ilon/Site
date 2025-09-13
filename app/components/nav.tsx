import Link from "next/link";
// import { ThemeSwitch } from "./theme-switch";

const navItems = {
  "/": {
    name: "home",
  },
  "/now": {
    name: "now",
  },
  "/blog": {
    name: "blog",
  },
  "/projects": {
    name: "projects",
  },
};

export function Navbar() {
  return (
    <nav className="lg:mb-18 mb-12">
      <div className="flex flex-col md:flex-row md:items-center">
        <div className="flex flex-row gap-4 mt-6 md:mt-0 items-center">
          {Object.entries(navItems).map(([path, { name }]) => (
            <Link
              key={path}
              href={path}
              className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative"
            >
              {name}
            </Link>
          ))}
          {/* <ThemeSwitch /> */}
        </div>
      </div>
    </nav>
  );
}
