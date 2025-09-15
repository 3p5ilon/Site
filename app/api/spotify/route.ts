import { NextResponse } from "next/server";

const client_id = process.env.SPOTIFY_CLIENT_ID!;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET!;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN!;

async function getAccessToken() {
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(client_id + ":" + client_secret).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token,
    }),
    cache: "no-store",
  });

  return res.json();
}

export async function GET() {
  try {
    const { access_token } = await getAccessToken();

    // Check currently playing
    const nowRes = await fetch(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: { Authorization: `Bearer ${access_token}` },
        cache: "no-store",
      }
    );

    if (nowRes.status === 200) {
      const nowData = await nowRes.json();
      const trackId = nowData?.item?.id;
      if (trackId) {
        return NextResponse.json({ trackId, status: "now" }); // Currently playing
      }
    }

    // Fallback: recently played
    const recentRes = await fetch(
      "https://api.spotify.com/v1/me/player/recently-played?limit=1",
      {
        headers: { Authorization: `Bearer ${access_token}` },
        cache: "no-store",
      }
    );

    const recentData = await recentRes.json();
    const trackId = recentData?.items?.[0]?.track?.id || null;

    return NextResponse.json({ trackId, status: "recent" }); // Recently played
  } catch (e) {
    console.error("Spotify API error:", e);
    return NextResponse.json(
      { trackId: null, status: "error" },
      { status: 500 }
    );
  }
}
