"use client";

import { useEffect, useState } from "react";
import { Spotify } from "react-spotify-embed";

interface TrackResponse {
  trackId: string | null;
  status: "now" | "recent" | "error";
}

export default function NowPlaying() {
  const [track, setTrack] = useState<TrackResponse | null>(null);

  useEffect(() => {
    const fetchTrack = async () => {
      try {
        const res = await fetch("/api/spotify");
        const data: TrackResponse = await res.json();
        setTrack(data);
      } catch (err) {
        console.error("Error fetching track:", err);
        setTrack({ trackId: null, status: "error" });
      }
    };

    fetchTrack();
    const interval = setInterval(fetchTrack, 15000);
    return () => clearInterval(interval);
  }, []);

  const heading =
    track?.status === "now"
      ? "Currently playing"
      : track?.status === "recent"
      ? "Recently played"
      : "Music";

  return (
    <section>
      <h3>{heading}</h3>

      <div className="rounded-2xl bg-[#F1F1F1] dark:bg-[#1F1F1F] min-h-[80px] flex items-center justify-center overflow-hidden">
        {track?.trackId && (
          <Spotify
            wide
            link={`https://open.spotify.com/track/${track.trackId}`}
          />
        )}
      </div>
    </section>
  );
}
