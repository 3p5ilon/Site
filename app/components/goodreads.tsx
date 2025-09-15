"use client";
import { useEffect, useState } from "react";
import { FaGoodreadsG } from "react-icons/fa";

type Book = {
  title: string;
  author: string;
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
    const interval = setInterval(fetchBook, 600_000); // refresh every 10 min
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  const derivedAuthor =
    book?.author && book.author.trim().length > 0
      ? book.author
      : book?.title?.match(/by\s+([^–|-]+)/i)?.[1]?.trim() || "";

  return (
    <div className="block w-full max-w-3xl rounded-2xl overflow-hidden relative">
      <div className="bg-[#F1F1F1] dark:bg-[#1F1F1F] transition-colors rounded-2xl min-h-[5.5rem] sm:min-h-[7.75rem]">
        {loading || !book ? (
          <div className="w-full h-full flex items-center justify-center"></div>
        ) : (
          <a
            href={book.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full h-full no-underline"
          >
            <div className="relative flex items-start w-full p-2 sm:p-2.5 min-h-[5.5rem]">
              <div className="mr-3 sm:mr-4 flex-shrink-0">
                <img
                  src={book.image ?? "/book-placeholder.png"}
                  alt={book.title}
                  className="w-12 h-18 sm:w-18 sm:h-26 rounded-md object-cover shadow-sm"
                  loading="eager"
                />
              </div>
              <div className="flex-1 min-w-0 pr-10 flex flex-col justify-start self-start mt-0 sm:mt-1.5">
                <div className="text-[14px] sm:text-base font-semibold leading-5.5 break-words hyphens-auto">
                  {book.title}
                </div>
                {derivedAuthor && (
                  <div className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1 sm:mt-1.5 break-words">
                    by {derivedAuthor}
                  </div>
                )}
              </div>
              <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-[#e9e5cd] flex items-center justify-center shadow-sm flex-shrink-0">
                <span className="sr-only">Goodreads</span>
                <FaGoodreadsG className="w-4 h-4 text-[#382110]" />
              </div>
            </div>
          </a>
        )}
      </div>
    </div>
  );
}
