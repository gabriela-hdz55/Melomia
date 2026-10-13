import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { fetchLyrics } from "../services/songretrieval";
import LyricBoard from "../features/game/LyricBoard";
import { prepareLyrics } from "../features/game/prepareLyrics";

export default function Game() {
  const [searchParams] = useSearchParams();
  const artist = searchParams.get("artist");
  const song = searchParams.get("song");

  const [lyricsData, setLyricsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!artist || !song) {
      setLoading(false);
      setError("No song selected.");
      return;
    }

    const controller = new AbortController();
    setLoading(true);
    setError(null);

    fetchLyrics(artist, song, { signal: controller.signal })
      .then((response) => {
        if (response.status !== "success") {
          throw new Error(response.error?.message || "Lyrics not found");
        }
        setLyricsData(response.data);
      })
      .catch((err) => {
        if (err.code === "ERR_CANCELED") return;
        console.error("Error fetching lyrics:", err);
        setError("Couldn't load lyrics for that song.");
      })
      .finally(() => {
        // A cancelled request's `finally` still fires — only the request
        // that's still current should be allowed to clear the loading state.
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, [artist, song]);

  if (loading) {
    return <p className="text-center mt-8 text-gray-500">Loading lyrics...</p>;
  }

  if (error) {
    return (
      <div className="text-center mt-8">
        <p className="text-red-500 mb-2">{error}</p>
        <Link to="/" className="text-pink-500 underline">
          Back to search
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 p-4">
      <h1 className="text-2xl font-bold">{lyricsData.title}</h1>
      <p className="text-gray-600 mb-4">{lyricsData.artist}</p>
      {/* <pre className="whitespace-pre-wrap font-sans">{lyricsData.lyrics}</pre> */}
      <LyricBoard words={prepareLyrics(lyricsData.lyrics)} />
    </div>
  );
}
