"use client";

import { useEffect, useState } from "react";
import { Spotify } from "react-spotify-embed";

interface TrackResponse {
  trackId: string | null;
  status: "now" | "recent" | "error";
}

export default function Listening() {
  const [track, setTrack] = useState<TrackResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrack = async () => {
      try {
        const res = await fetch("/api/spotify");
        const data: TrackResponse = await res.json();
        setTrack(data);
      } catch (err) {
        console.error("Error fetching track:", err);
        setTrack({ trackId: null, status: "error" });
      } finally {
        setLoading(false);
      }
    };

    fetchTrack();
    const interval = setInterval(fetchTrack, 15000);
    return () => clearInterval(interval);
  }, []);

  const heading =
    track?.status === "now"
      ? "Now playing"
      : track?.status === "recent"
      ? "Last played"
      : "Music";

  if (loading) {
    return (
      <section>
        <h2>{heading}</h2>
        <div className="bg-[#F1F1F1] dark:bg-[#1F1F1F] rounded-2xl min-h-[80px] animate-pulse" />
      </section>
    );
  }

  if (!track?.trackId) {
    return (
      <section>
        <h2>{heading}</h2>
        <div className="bg-[#F1F1F1] dark:bg-[#1F1F1F] rounded-2xl min-h-[80px] flex items-center justify-center text-neutral-500 dark:text-neutral-400 text-sm">
          Failed to load Spotify data
        </div>
      </section>
    );
  }

  return (
    <section>
      <h2>{heading}</h2>
      <div className="bg-[#F1F1F1] dark:bg-[#1F1F1F] rounded-2xl overflow-hidden min-h-[80px] flex items-center justify-center">
        <Spotify
          wide
          link={`https://open.spotify.com/track/${track.trackId}`}
        />
      </div>
    </section>
  );
}
