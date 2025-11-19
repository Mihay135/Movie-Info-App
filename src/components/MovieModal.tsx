import { X } from "lucide-react";
import type { TMDBMovie, TMDBShow } from "../types/tmdb";

interface MovieModalProps {
  item: TMDBMovie | TMDBShow;
  onClose: () => void;
}

const baseImgUrl = "https://image.tmdb.org/t/p/original";

export default function MovieModal({ item, onClose }: MovieModalProps) {
  const title = "title" in item ? item.title : item.name || "Unknown";
  const year =
    ("release_date" in item && item.release_date?.split("-")[0]) ||
    ("first_air_date" in item && item.first_air_date?.split("-")[0]) ||
    "N/A";

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 backdrop-blur-sm overflow-y-auto py-8"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl mx-2 bg-[#151f30] rounded-2xl overflow-y-auto shadow-2xl max-h-screen"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Backdrop */}
        <div className="relative h-64 md:h-96">
          {item.backdrop_path ? (
            <img src={`${baseImgUrl}${item.backdrop_path}`} alt={title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-linear-to-br from-[#1a2332] to-[#0d1117]" />
          )}
          <div className="absolute inset-0 bg-linear-to-t from-[#151f30] via-transparent to-transparent" />

          {/* Close button*/}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-3 bg-black/70 rounded-full hover:bg-black/95 hover:outline-1 hover:outline-[#4e4e4e] transition backdrop-blur-sm"
          >
            <X className="w-7 h-7 text-white" />
          </button>
        </div>

        {/* Scrollable content area */}
        <div className="relative mb-1 px-6 pb-10 max-h-[calc(100vh-16rem)] overflow-y-auto">
          <div className="flex flex-col md:flex-row gap-8 items-start -mt-32 md:-mt-40">
            {/* Poster */}
            <img
              src={item.poster_path ? `${baseImgUrl}${item.poster_path}` : "/image-missing.png"}
              alt={title}
              className="w-64 md:w-80 rounded-xl shadow-2xl border-4 border-[#151f30] shrink-0"
            />

            {/* Info */}
            <div className="flex-1 text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-2">{title}</h1>
              <p className="text-xl text-gray-300 mb-6">{year}</p>

              <div className="flex items-center gap-4 mb-6">
                <span className="bg-yellow-500 text-black px-4 py-2 rounded-full font-bold text-lg">
                  {item.vote_average.toFixed(1)}
                </span>
                <span className="text-gray-400">TMDB Rating</span>
              </div>

              <p className="text-lg leading-relaxed text-gray-200">{item.overview || "No overview available."}</p>

              <p className="mt-8 text-sm text-gray-500">Click outside or press X to close</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
