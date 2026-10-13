import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchSongMetadata } from "../../services/songretrieval";
import { ConfirmModal } from "./ConfirmModal";

export default function Search() {
  const navigate = useNavigate();

  const [artist, setArtist] = useState("");
  const [title, setTitle] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [songData, setSongData] = useState(null);
  const [selectedSong, setSelectedSong] = useState(null);
  const [error, setError] = useState(null);

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const metadata = await fetchSongMetadata(artist.trim(), title.trim());
      setSongData(metadata.metadata);
      setSelectedSong({ artist: artist.trim(), title: title.trim() });
      setShowModal(true);
    } catch (err) {
      console.error("Error fetching song data:", err);
      setError("Couldn't load that song. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = () => {
    if (!selectedSong) return;

    navigate(
      `/game?artist=${encodeURIComponent(selectedSong.artist)}&song=${encodeURIComponent(selectedSong.title)}`
    );
  };

  return (
    <div>
      <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded shadow">
        <form onSubmit={handleSearch}>
          <label htmlFor="song-artist" className="block text-sm font-medium text-gray-700 mb-1">
            Artist
          </label>
          <input
            type="text"
            id="song-artist"
            name="artist"
            autoComplete="off"
            placeholder="Enter artist name"
            className="border p-2 rounded mb-4 w-full"
            value={artist}
            onChange={(event) => setArtist(event.target.value)}
            required
          />
          <label htmlFor="song-title" className="block text-sm font-medium text-gray-700 mb-1">
            Song
          </label>
          <input
            type="text"
            id="song-title"
            name="song"
            autoComplete="off"
            placeholder="Enter song title"
            className="border p-2 rounded mb-4 w-full"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-pink-500 text-white px-4 py-2 rounded disabled:opacity-50"
            disabled={loading}
          >
            Search
          </button>
        </form>
        {loading && <p className="text-sm text-gray-500">Loading song details...</p>}
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
      {showModal && songData && (
        <ConfirmModal
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          coverArt={songData.album_art}
          title={songData.title}
          artist={songData.artist}
          explicit={songData.explicit}
        />
      )}
    </div>
  );
}
