"use client";
import { useEffect, useState } from "react";

type Book = {
  title: string;
  author?: string;
  authorUrl?: string;
  link: string;
  image: string | null;
} | null;

export default function Reading() {
  const [book, setBook] = useState<Book>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function fetchBook() {
      try {
        const res = await fetch("/api/goodreads");
        if (!res.ok) {
          console.error("Goodreads API returned", res.status);
          return;
        }
        const data = await res.json();
        if (mounted) setBook(data);
      } catch (err) {
        console.error("Failed to fetch /api/goodreads", err);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchBook();
    const interval = setInterval(fetchBook, 600_000); // refresh every 10 min
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  if (loading) {
    return (
      <div className="bg-[#F1F1F1] dark:bg-[#1F1F1F] rounded-2xl min-h-[7rem] sm:min-h-[7.75rem] animate-pulse" />
    );
  }

  // Fallback if API fails
  if (!book) {
    return (
      <div className="bg-[#F1F1F1] dark:bg-[#1F1F1F] rounded-2xl min-h-[7rem] sm:min-h-[7.75rem] flex items-center justify-center text-neutral-500 dark:text-neutral-400 text-sm">
        Failed to load Goodreads data
      </div>
    );
  }

  return (
    <div className="block w-full max-w-3xl rounded-2xl overflow-hidden relative">
      <div className="bg-[#F1F1F1] dark:bg-[#1F1F1F] transition-colors rounded-2xl">
        <div className="relative flex items-start w-full p-2 sm:p-2.5">
          {/* Book image */}
          <a
            href={book.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mr-3 sm:mr-4 flex-shrink-0"
          >
            <img
              src={book.image ?? "/book-placeholder.png"}
              alt={book.title}
              className="w-16 h-24 sm:w-18 sm:h-26 rounded-md object-cover object-center shadow-sm mt-[1px]"
              loading="eager"
            />
          </a>

          {/* Book info */}
          <div className="flex-1 min-w-0 pr-8 sm:pr-10 flex flex-col justify-start mt-1 sm:mt-1.5 gap-1 sm:gap-1.5 leading-4 sm:leading-5 [&_*]:leading-inherit">
            {/* Book title */}
            <div className="text-sm sm:text-base font-semibold leading-tight">
              <a
                href={book.link}
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline hover:underline text-sm sm:text-base font-semibold"
              >
                {book.title}
              </a>
            </div>

            {/* Author */}
            {book.author && (
              <div className="text-xs sm:text-sm font-medium text-neutral-600 dark:text-neutral-400">
                by{" "}
                {book.authorUrl ? (
                  <a
                    href={book.authorUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline no-underline hover:underline text-neutral-600 dark:text-neutral-400"
                  >
                    {book.author}
                  </a>
                ) : (
                  book.author
                )}
              </div>
            )}
          </div>

          {/* Goodreads logo */}
          <a
            href={book.link}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#E9E2D7] flex items-center justify-center shadow-sm transition-colors duration-300"
          >
            <svg
              role="img"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#1E1816]"
              fill="currentColor"
            >
              <title>Goodreads</title>
              <path d="M17.346.026c.422-.083.859.037 1.179.325.346.284.55.705.557 1.153-.023.457-.247.88-.612 1.156l-2.182 1.748a.601.601 0 0 0-.255.43.52.52 0 0 0 .11.424 5.886 5.886 0 0 1 .832 6.58c-1.394 2.79-4.503 3.99-7.501 2.927a.792.792 0 0 0-.499-.01c-.224.07-.303.18-.453.383l-.014.02-.941 1.254s-.792.985.457.935c3.027-.119 3.817-.119 5.439-.01 2.641.18 3.806 1.903 3.806 3.275 0 1.623-1.036 3.383-3.809 3.383a117.46 117.46 0 0 0-5.517-.03c-.31.005-.597.013-.835.02-.228.006-.41.011-.52.011-.712 0-1.648-.186-1.66-1.068-.008-.729.624-1.12 1.11-1.172.43-.045.815.007 1.24.064.252.034.518.07.815.088.185.011.366.025.552.038.53.038 1.102.08 1.926.087.427.005.759.01 1.025.015.695.012.941.016 1.28-.015 1.248-.112 1.832-.61 1.832-1.376 0-.805-.584-1.264-1.698-1.414-1.564-.213-2.33-.163-3.72-.074a87.66 87.66 0 0 1-1.669.095c-.608.029-2.449.026-2.682-1.492-.053-.416-.073-1.116.807-2.325l.75-1.003c.36-.49.582-.898.053-1.559 0 0-.39-.468-.52-.638-1.215-1.587-1.512-4.08-.448-6.114 1.577-3.011 5.4-4.26 8.37-2.581.253.143.438.203.655.163.201-.032.27-.167.363-.344.02-.04.042-.082.067-.126.004-.01.241-.465.535-1.028l.734-1.41a1.493 1.493 0 0 1 1.041-.785ZM9.193 13.243c1.854.903 3.912.208 5.254-2.47 1.352-2.699.827-5.11-1.041-6.023C10.918 3.537 8.81 5.831 8.017 7.41c-1.355 2.698-.717 4.886 1.147 5.818Z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
