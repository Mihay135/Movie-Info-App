// src/components/MovieModal.tsx
import { X, Play } from "lucide-react";
import { useState, useEffect } from "react";
import type { TMDBMovie, TMDBShow } from "../types/tmdb";

interface MovieModalProps {
  item: TMDBMovie | TMDBShow;
  onClose: () => void;
}

const baseImgUrl = "https://image.tmdb.org/t/p/original";
const TMDB_BEARER_TOKEN = import.meta.env.VITE_TMDB_BEARER_TOKEN;

export default function MovieModal({ item, onClose }: MovieModalProps) {
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [loadingTrailer, setLoadingTrailer] = useState(true);

  const title = "title" in item ? item.title : item.name || "Unknown";
  const year =
    ("release_date" in item && item.release_date?.split("-")[0]) ||
    ("first_air_date" in item && item.first_air_date?.split("-")[0]) ||
    "N/A";

  const mediaType = "title" in item ? "movie" : "tv";
  const mediaId = item.id;

  // Fetch trailer
  useEffect(() => {
    const fetchTrailer = async () => {
      setLoadingTrailer(true);
      try {
        const res = await fetch(`https://api.themoviedb.org/3/${mediaType}/${mediaId}/videos`, {
          headers: {
            Authorization: `Bearer ${TMDB_BEARER_TOKEN}`,
            Accept: "application/json",
          },
        });
        const data = await res.json();
        const officialTrailer = data.results?.find(
          (v: any) => v.site === "YouTube" && (v.type === "Trailer" || v.type === "Teaser") && v.official !== false
        );
        setTrailerKey(officialTrailer?.key || null);
      } catch (err) {
        console.error("Failed to load trailer", err);
        setTrailerKey(null);
      } finally {
        setLoadingTrailer(false);
      }
    };

    fetchTrailer();
  }, [mediaId, mediaType]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/90 backdrop-blur-md overflow-y-auto py-8"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl mx-4 bg-[#151f30] rounded-2xl overflow-hidden shadow-2xl max-h-screen"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Backdrop */}
        <div className="relative h-64 md:h-96">
          {item.backdrop_path ? (
            <img src={`${baseImgUrl}${item.backdrop_path}`} alt={title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-linear-to-br from-[#1a2332] to-[#0d1117]" />
          )}
          <div className="absolute inset-0 bg-linear-to-t from-[#151f30]/95 via-transparent to-transparent" />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-3 bg-black/70 rounded-full hover:bg-black/90 transition"
          >
            <X className="w-8 h-8 text-white" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="relative px-6 pb-10 max-h-[calc(100vh-16rem)] overflow-y-auto">
          <div className="flex flex-col lg:flex-row gap-8 items-start -mt-32 md:-mt-40">
            {/* Poster */}
            <img
              src={item.poster_path ? `${baseImgUrl}${item.poster_path}` : "/image-missing.png"}
              alt={title}
              className="w-64 md:w-80 rounded-xl shadow-2xl border-4 border-[#151f30] shrink-0"
            />

            {/* Info + Trailer */}
            <div className="flex-1 text-white">
              {/* Trailer Button or Player */}
              {loadingTrailer ? (
                <div className="bg-gray-800 rounded-xl h-64 md:h-96 flex items-center justify-center">
                  <p className="text-gray-400">Loading trailer...</p>
                </div>
              ) : trailerKey ? (
                <div className="relative w-full bg-black rounded-xl overflow-hidden shadow-2xl">
                  <iframe
                    src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&rel=0&modestbranding=1&iv_load_policy=3`}
                    title={`${title} Trailer`}
                    allowFullScreen
                    className="w-full aspect-video"
                  />
                </div>
              ) : (
                <button className="flex items-center gap-3 px-8 py-5 bg-red-600 hover:bg-red-700 rounded-xl text-white font-bold text-xl transition shadow-lg">
                  <Play className="w-8 h-8 fill-white" />
                  No Trailer Available
                </button>
              )}
              <div>
                <h1 className="text-4xl md:text-6xl font-bold mb-2">{title}</h1>
                <p className="text-2xl text-gray-300 mb-6">{year}</p>
              </div>

              <div className="flex items-center gap-4 mb-8">
                <span className="bg-yellow-500 text-black px-5 py-3 rounded-full font-bold text-xl">
                  {item.vote_average.toFixed(1)}
                </span>
                <span className="text-gray-400 text-lg">TMDB Rating</span>
              </div>

              {/* Overview */}
              <p className="mt-10 text-lg leading-relaxed text-gray-200">{item.overview || "No overview available."}</p>

              <p className="mt-10 text-sm text-gray-500">Click outside or press X to close</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
