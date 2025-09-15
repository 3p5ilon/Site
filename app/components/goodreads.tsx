"use client";

import { useEffect, useState } from "react";
import { FaGoodreadsG } from "react-icons/fa";

type Book = {
  title: string;
  author: string;
  authorLink?: string;
  link: string;
  image: string | null;
} | null;

export default function NowReading() {
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
    // no aggressive polling needed for books – fetch once or maybe every few minutes
    const interval = setInterval(fetchBook, 60_000); // refresh every 60s (optional)
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  if (loading) return null;
  if (!book) return null;

  // Derive author if API didn't provide it
  const derivedAuthor =
    book.author && book.author.trim().length > 0
      ? book.author
      : book.title.match(/by\s+([^–|-]+)/i)?.[1]?.trim() || "";

  return (
    <a
      href={book.link}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full max-w-3xl rounded-2xl overflow-hidden relative no-underline"
    >
      <div className="bg-[#F7F7F7] dark:bg-[#171717] border border-gray-300 dark:border-[#262626] transition-colors rounded-2xl">
        <div className="relative flex items-start w-full p-3">
          <div className="mr-3 sm:mr-4">
            <img
              src={book.image ?? "/book-placeholder.png"}
              alt={book.title}
              className="w-12 h-16 sm:w-16 sm:h-24 rounded-md object-cover shadow-sm"
              loading="eager"
            />
          </div>
          <div className="flex-1 min-w-0 flex flex-col justify-start self-start mt-2">
            <div className="truncate font-semibold tracking-tight text-[18px] sm:text-[20px] leading-none">
              {book.title}
            </div>
            {derivedAuthor && (
              <div className="truncate text-sm text-neutral-600 dark:text-neutral-400 mt-2">
                by {derivedAuthor}
              </div>
            )}
          </div>
          <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-[#e9e5cd] flex items-center justify-center shadow-sm">
            <span className="sr-only">Goodreads</span>
            <FaGoodreadsG className="w-4 h-4 text-[#382110]" />
          </div>
        </div>
      </div>
    </a>
  );
}
