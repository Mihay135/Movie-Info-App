import { X } from "lucide-react";
import { useState, useEffect } from "react";
import type { TMDBMovie, TMDBShow } from "../../types/tmdb";

//Props Interface
interface MovieModalProps {
  item: TMDBMovie | TMDBShow;
  onClose: () => void;
}

const baseImgUrl = "https://image.tmdb.org/t/p/w1280";
const TMDB_BEARER_TOKEN = import.meta.env.VITE_TMDB_BEARER_TOKEN;

//Takes a TMDB Movie or TV Show type and onCloseFunction and returns The Movie Modal Overlay with trailer and info.
export default function MovieModal({ item, onClose }: MovieModalProps) {
  //State Variables
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [details, setDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const title = "title" in item ? item.title : item.name || "Unknown";
  const year =
    ("release_date" in item && item.release_date?.split("-")[0]) ||
    ("first_air_date" in item && item.first_air_date?.split("-")[0]) ||
    "N/A";

  const mediaType = "title" in item ? "movie" : "tv";
  const mediaId = item.id;

  //Trailer Fetching
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://api.themoviedb.org/3/${mediaType}/${mediaId}?append_to_response=videos`, {
          headers: { Authorization: `Bearer ${TMDB_BEARER_TOKEN}`, Accept: "application/json" },
        });
        const data = await res.json();

        const trailer = data.videos?.results?.find(
          (v: any) => v.site === "YouTube" && ["Trailer", "Teaser"].includes(v.type) && v.official !== false
        );
        setTrailerKey(trailer?.key || null);
        setDetails(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [mediaId, mediaType]);

  //Get the duration if movie (hh::mm) or Number of seasons and episode count (n seasons - m episodes)
  const runtime =
    mediaType === "movie"
      ? details?.runtime
        ? `${Math.floor(details.runtime / 60)}h ${details.runtime % 60}m`
        : "N/A"
      : details?.number_of_seasons
      ? `${details.number_of_seasons} Season${details.number_of_seasons > 1 ? "s" : ""}${
          details.number_of_episodes
            ? ` • ${details.number_of_episodes} Episode${details.number_of_episodes > 1 ? "s" : ""}`
            : ""
        }${details.episode_run_time?.[0] ? ` • ${details.episode_run_time[0]} min/ep.` : ""}`
      : "Airing";

  //Get additional info
  const genres = details?.genres?.map((g: any) => g.name).join(" • ") || "N/A";
  const status = details?.status || "N/A";
  const originalLanguage = details?.original_language?.toUpperCase() || "??";

  //Modal Overlay
  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md overflow-y-auto" onClick={onClose}>
      <div className="min-h-screen flex items-start justify-center py-6 px-4">
        <div
          className="relative w-full max-w-5xl bg-[#151f30] rounded-2xl shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/*Backdrop*/}
          <div className="relative h-48 md:h-72">
            {item.backdrop_path ? (
              <img src={`${baseImgUrl}${item.backdrop_path}`} alt={title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-linear-to-br from-[#1a2332] to-[#0d1117]" />
            )}
            <div className="absolute inset-0 bg-linear-to-t from-[#151f30]/95 to-transparent" />
            <button
              onClick={onClose}
              className="absolute top-3 right-3 z-10 p-2.5 bg-black/70 rounded-full hover:bg-black/90 transition"
            >
              <X className="w-7 h-7 text-white" />
            </button>
          </div>

          {/*Trailer*/}
          <div className="px-6 pt-6">
            {loading ? (
              <div className="aspect-video bg-gray-800 rounded-xl flex items-center justify-center">
                <p className="text-gray-400">Loading trailer...</p>
              </div>
            ) : trailerKey ? (
              <div className="w-full bg-black rounded-xl overflow-hidden shadow-xl">
                <iframe
                  src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&rel=0&modestbranding=1`}
                  title="Trailer"
                  allowFullScreen
                  className="w-full aspect-video"
                />
              </div>
            ) : (
              <div className="aspect-video bg-gray-800/80 rounded-xl flex items-center justify-center">
                <p className="text-gray-400 text-lg">No trailer available</p>
              </div>
            )}
          </div>

          {/*Three-column info */}
          <div className="px-6 pb-8 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/*Poster*/}
              <div className="md:col-span-4 flex justify-center">
                <img
                  src={item.poster_path ? `${baseImgUrl}${item.poster_path}` : "/image-missing.png"}
                  alt={title}
                  className="w-56 md:w-full max-w-xs rounded-xl shadow-2xl border-4 border-[#151f30]"
                />
              </div>

              {/*Info*/}
              <div className="md:col-span-8 space-y-5 text-center md:text-left">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight" title="Title">
                    {title}
                  </h1>
                  <p className="text-xl text-gray-300 mt-1" title="Release Year or First Aired">
                    {year}
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-sm">
                  <span className="bg-yellow-500 text-black px-5 py-2.5 rounded-full font-bold text-xl" title="Rating">
                    {item.vote_average.toFixed(1)}
                  </span>
                  <span className="text-gray-400">TMDB Rating</span>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-300" title="Runtime / Duration">
                    {runtime}
                  </span>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-400 text-sm" title="Original Language">
                    {originalLanguage}
                  </span>
                  {status !== "Released" && status !== "Returning Series" && (
                    <>
                      <span className="text-gray-500">•</span>
                      <span
                        className="text-gray-400 text-sm"
                        title="Status: Released, Returning Series or In Production"
                      >
                        {status}
                      </span>
                    </>
                  )}
                </div>

                <p className="text-gray-400 text-sm font-medium" title="Genres">
                  {genres}
                </p>

                <p className="text-base leading-relaxed text-gray-200" title="Overview">
                  {item.overview || "No overview available."}
                </p>
                <div className="mt-6 pt-4 border-t border-gray-700" title="Click to get more info on TMDB">
                  <a
                    href={`https://www.themoviedb.org/${mediaType}/${mediaId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#3e4966] hover:bg-[#4a5578] rounded-lg text-gray-200 text-sm font-medium transition"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                    View on TMDB
                  </a>
                </div>
              </div>
            </div>
          </div>
          {/*Disclaimer and Attribution to comply with 
          TMDB Api Terms https://www.themoviedb.org/api-terms-of-use#:~:text=3%2E%20Attribution
           */}
          <div className="mt-2 pt-2 pb-2 border-t border-gray-700 text-center">
            <p className="text-xs text-gray-500">
              Data provided by{" "}
              <a
                href="https://www.themoviedb.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:underline"
              >
                TMDB
              </a>
              {". "}
              <p className="mb-2 mt-1 text-[10px]">
                This app uses{" "}
                <a
                  href="https://www.themoviedb.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 hover:text-cyan-400 transition"
                >
                  TMDB
                  <img
                    src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
                    alt="TMDB Logo"
                    className="h-2 inline-block"
                  />
                </a>{" "}
                and the TMDB APIs but is not endorsed, certified, or otherwise approved by TMDB.
              </p>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
