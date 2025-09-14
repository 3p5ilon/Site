import { ImageResponse } from "next/og";

export function GET(request: Request) {
  const url = new URL(request.url);
  const title = url.searchParams.get("title") || "Ɛpsilon";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fff",
          fontWeight: 600,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 60,
            left: 60,
            fontSize: 40,
          }}
        >
          Ɛpsilon
        </div>
        <div style={{ fontSize: 80, textAlign: "center" }}>{title}</div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
