export const FootNotes = ({ children }) => (
  <div className="before:w-32 before:m-auto before:content-[''] before:border-t before:border-gray-300 dark:before:border-neutral-600 before:block before:my-8">
    {children}
  </div>
);

export const Ref = ({ id }) => (
  <a
    href={`#f${id}`}
    id={`s${id}`}
    className="relative transition-all text-xs top-[-5px] no-underline hover:text-neutral-600 dark:hover:text-neutral-300"
  >
    [{id}]
  </a>
);

export const FootNote = ({ id, children }) => (
  <p>
    {id}. {children}
    <a
      href={`#s${id}`}
      id={`f${id}`}
      className="no-underline hover:underline ml-1 relative hover:text-neutral-600 dark:hover:text-neutral-300 underline-offset-2 decoration-1 decoration-neutral-600 dark:decoration-neutral-300"
    >
      <span style={{ fontFamily: "Arial, sans-serif" }}>{"\u21A9"}</span>
    </a>
  </p>
);
