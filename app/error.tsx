"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold">Something went wrong</h1>
      <div className="prose prose-neutral dark:prose-invert">
        <p>An unexpected error occurred. Please try refreshing the page.</p>
      </div>
    </section>
  );
}
