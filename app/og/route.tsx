import { ImageResponse } from "next/og";

export function GET(request: Request) {
  const url = new URL(request.url);
  const title = url.searchParams.get("title") || "Ɛpsilon";

  return new ImageResponse(
    (
      <div tw="flex items-center justify-center w-full h-full bg-white font-bold relative">
        <div tw="absolute top-10 left-10 text-3xl">Ɛpsilon</div>
        <div tw="text-6xl text-center">{title}</div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
