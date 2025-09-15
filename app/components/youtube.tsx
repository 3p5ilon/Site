"use client";
import YT from "react-youtube";

export function YouTube(props: any) {
  return (
    <div className="block my-3">
      <YT
        opts={{
          height: "100%",
          width: "100%",
        }}
        {...props}
        className="w-full h-54 sm:h-80"
      />
    </div>
  );
}
