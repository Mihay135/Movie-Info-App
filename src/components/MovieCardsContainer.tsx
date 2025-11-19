import type { ReactElement } from "react";
import { useState, useEffect, useCallback } from "react";
import MovieCard from "./MovieCard";
import MovieModal from "./MovieModal";
import axios from "axios";
import type { TMDBMovie, TMDBShow, TMDBResponse } from "../types/tmdb";

// Bearer token loaded from .env
const TMDB_BEARER_TOKEN = import.meta.env.VITE_TMDB_BEARER_TOKEN;

if (!TMDB_BEARER_TOKEN) {
  console.error("TMDB Bearer token is missing! Add VITE_TMDB_BEARER_TOKEN to your .env file");
}

// Axios instance with v4 auth headers
const tmdb = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${TMDB_BEARER_TOKEN}`,
    Accept: "application/json",
  },
});

interface MovieCardsContainerProps {
  searchQuery?: string;
  searchType?: "movie" | "tv";
}

export default function MovieCardsContainer({
  searchQuery = "",
  searchType = "movie",
}: MovieCardsContainerProps): ReactElement {
  const [items, setItems] = useState<(TMDBMovie | TMDBShow)[]>([]);
  const [selectedItem, setSelectedItem] = useState<(TMDBMovie | TMDBShow) | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [currentQuery, setCurrentQuery] = useState("");

  const fetchData = useCallback(
    async (pageNum: number) => {
      setLoading(true);
      try {
        let url = "";
        if (searchQuery.trim()) {
          url = `/search/${searchType}`;
          setCurrentQuery(searchQuery.trim());
        } else {
          url = `/${searchType}/popular`;
          setCurrentQuery("");
        }

        const res = await tmdb.get<TMDBResponse>(url, {
          params: {
            page: pageNum,
            query: searchQuery.trim() || undefined,
          },
        });

        setItems(res.data.results);
        setTotalPages(Math.min(res.data.total_pages || 1, 500));
        setPage(pageNum);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (err) {
        console.error("TMDB Error:", err);
        setItems([]);
      } finally {
        setLoading(false);
      }
    },
    [searchQuery, searchType]
  );

  useEffect(() => {
    setPage(1);
    fetchData(1);
  }, [searchQuery, searchType, fetchData]);

  return (
    <div className="min-h-screen bg-[#131720] p-8">
      {/* Optional header when searching */}
      {currentQuery && (
        <h2 className="text-3xl text-white font-bold text-center mb-8">
          Results for: <span className="text-[#3e4966]">"{currentQuery}"</span> (
          {searchType === "movie" ? "Movies" : "TV Shows"})
        </h2>
      )}

      {loading ? (
        <div className="text-center text-white text-2xl py-20">Loading...</div>
      ) : items.length === 0 ? (
        <div className="text-center text-white text-2xl py-20">
          {currentQuery ? `No ${searchType}s found for "${currentQuery}"` : "No results"}
        </div>
      ) : (
        <>
          <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-10 xl:gap-12 2xl:gap-16 justify-items-center">
              {items.map((item) => (
                <MovieCard
                  key={item.id}
                  title={"title" in item ? item.title : item.name || "Unknown"}
                  posterPath={item.poster_path}
                  releaseDate={"release_date" in item ? item.release_date : item.first_air_date || ""}
                  rating={item.vote_average}
                  overview={item.overview}
                  onClick={() => setSelectedItem(item)}
                />
              ))}
            </div>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-16 mb-8">
              <Pagination page={page} totalPages={totalPages} onPageChange={fetchData} />
            </div>
          )}
          {selectedItem && <MovieModal item={selectedItem} onClose={() => setSelectedItem(null)} />}
        </>
      )}
    </div>
  );
}

//PAGINATION COMPONENT
function Pagination({
  page,
  totalPages,
  onPageChange,
}: {
  page: number;
  totalPages: number;
  onPageChange: (p: number) => void;
}) {
  const getPages = () => {
    const delta = 2;
    const range = [];
    const min = Math.max(2, page - delta);
    const max = Math.min(totalPages - 1, page + delta);

    for (let i = min; i <= max; i++) range.push(i);
    if (page - delta > 2) range.unshift("...");
    if (page + delta < totalPages - 1) range.push("...");
    range.unshift(1);
    if (totalPages > 1) range.push(totalPages);
    return range;
  };

  return (
    <div className="flex gap-3 items-center text-white flex-wrap justify-center">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="px-5 py-3 bg-[#252c3e] rounded-lg disabled:opacity-50 hover:bg-[#3e4966] transition"
      >
        ← Prev
      </button>

      {getPages().map((p, i) => (
        <button
          key={i}
          onClick={() => typeof p === "number" && onPageChange(p)}
          disabled={p === "..."}
          className={`px-4 py-3 rounded-lg min-w-12 ${
            p === page ? "bg-[#3e4966] font-bold" : p === "..." ? "cursor-default" : "bg-[#252c3e] hover:bg-[#3e4966]"
          } transition`}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="px-5 py-3 bg-[#252c3e] rounded-lg disabled:opacity-50 hover:bg-[#3e4966] transition"
      >
        Next →
      </button>
    </div>
  );
}
