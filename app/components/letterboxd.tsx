"use client";

import { useEffect, useState } from "react";
import { LiaStarSolid, LiaStarHalfSolid } from "react-icons/lia";

type Movie = {
  title: string;
  link: string;
  image?: string | null;
  rating?: string | null;
  watchedDate?: string;
};

export default function Watching() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function fetchMovies() {
      try {
        const res = await fetch("/api/letterboxd");
        const data = await res.json();
        if (mounted) setMovies(data.movies || []);
      } catch (err) {
        console.error("Letterboxd fetch failed:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchMovies();
    const interval = setInterval(fetchMovies, 600_000); // refresh every 10 min
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

  if (!movies.length) {
    return (
      <div className="bg-[#F1F1F1] dark:bg-[#1F1F1F] rounded-2xl min-h-[7rem] sm:min-h-[7.75rem] flex items-center justify-center text-neutral-500 dark:text-neutral-400 text-sm">
        Failed to load Letterboxd data
      </div>
    );
  }

  const movie = movies[0];

  const match = movie.title.match(/^(.*?)(?:, (\d{4}))?$/);
  const movieTitle = match?.[1]?.trim() || movie.title;
  const movieYear = match?.[2] || "";

  const ratingString = movie.rating || "";
  const fullStars = (ratingString.match(/★/g) || []).length;
  const hasHalfStar = ratingString.includes("½");

  const formattedDate = movie.watchedDate
    ? new Date(movie.watchedDate).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "";

  return (
    <div className="block w-full max-w-3xl rounded-2xl overflow-hidden relative">
      <div className="bg-[#F1F1F1] dark:bg-[#1F1F1F] rounded-2xl transition-colors min-h-[7rem] sm:min-h-[7.75rem]">
        <div className="relative flex items-start w-full p-2 sm:p-2.5">
          {/* Poster */}
          <a
            href={movie.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mr-3 sm:mr-4 flex-shrink-0"
          >
            <img
              src={movie.image ?? "/movie-placeholder.png"}
              alt={movie.title}
              className="w-16 h-24 sm:w-18 sm:h-26 rounded-md object-cover shadow-sm"
            />
          </a>

          <div className="flex-1 min-w-0 pr-8 sm:pr-10 flex flex-col justify-start mt-1 sm:mt-1.5 gap-1 sm:gap-1.5 leading-4 sm:leading-5 [&_*]:leading-inherit">
            {/* Title + year */}
            <div className="text-sm sm:text-base font-semibold leading-tight">
              <a
                href={movie.link}
                target="_blank"
                rel="noopener noreferrer"
                className="no-underline hover:underline text-sm sm:text-base font-semibold"
              >
                {movieTitle}
              </a>{" "}
              {movieYear && (
                <span className="ml-1 text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-medium">
                  {movieYear}
                </span>
              )}
            </div>

            {/* Rating */}
            {movie.rating && (
              <div className="flex items-center text-neutral-600 dark:text-neutral-400">
                {Array.from({ length: fullStars }).map((_, i) => (
                  <LiaStarSolid key={i} size={14} />
                ))}
                {hasHalfStar && <LiaStarHalfSolid size={14} />}
              </div>
            )}

            {/* Date */}
            {formattedDate && (
              <div className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-medium mt-1">
                {formattedDate}
              </div>
            )}
          </div>

          {/* Letterboxd icon */}
          <a
            href={movie.link}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#202830] dark:bg-[#ffffff] flex items-center justify-center shadow-sm"
          >
            <svg
              role="img"
              viewBox="0 0 500 500"
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 sm:w-6 sm:h-6"
            >
              <title>Letterboxd</title>
              <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <g transform="translate(61.000000, 180.000000)">
                  <g>
                    <ellipse
                      fill="#00E054"
                      cx="189"
                      cy="69.9732824"
                      rx="70.0786517"
                      ry="69.9732824"
                    />
                    <g transform="translate(248.152672, 0.000000)">
                      <ellipse
                        fill="#40BCF4"
                        cx="59.7686766"
                        cy="69.9732824"
                        rx="70.0786517"
                        ry="69.9732824"
                      />
                    </g>
                    <g>
                      <ellipse
                        fill="#FF8000"
                        cx="70.0786517"
                        cy="69.9732824"
                        rx="70.0786517"
                        ry="69.9732824"
                      />
                    </g>
                    <path
                      d="M129.539326,107.022244 C122.810493,96.2781677 118.921348,83.5792213 118.921348,69.9732824 C118.921348,56.3673435 122.810493,43.6683972 129.539326,32.9243209 C136.268159,43.6683972 140.157303,56.3673435 140.157303,69.9732824 C140.157303,83.5792213 136.268159,96.2781677 129.539326,107.022244 Z"
                      fill="#556677"
                    />
                    <path
                      d="M248.460674,32.9243209 C255.189507,43.6683972 259.078652,56.3673435 259.078652,69.9732824 C259.078652,83.5792213 255.189507,96.2781677 248.460674,107.022244 C241.731841,96.2781677 237.842697,83.5792213 237.842697,69.9732824 C237.842697,56.3673435 241.731841,43.6683972 248.460674,32.9243209 Z"
                      fill="#556677"
                    />
                  </g>
                </g>
              </g>
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
