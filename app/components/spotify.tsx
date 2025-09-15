"use client";

import { useEffect, useState } from "react";
import { Spotify } from "react-spotify-embed";

export default function NowPlaying() {
  const [trackId, setTrackId] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrack = async () => {
      try {
        const res = await fetch("/api/spotify");
        const data = await res.json();
        setTrackId(data?.trackId || null);
      } catch (err) {
        console.error("Error fetching track:", err);
      }
    };

    fetchTrack();
    const interval = setInterval(fetchTrack, 15000);
    return () => clearInterval(interval);
  }, []);

  if (!trackId) return null;

  return (
    <section className="flex flex-col gap-4">
      <div className="rounded-2xl overflow-hidden">
        <Spotify wide link={`https://open.spotify.com/track/${trackId}`} />
      </div>
    </section>
  );
}
