import type { ReactElement } from "react";
import { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import axios from "axios";
import type { TMDBMovie, TMDBShow, TMDBResponse } from "../types/tmdb";

const API_KEY = "TMDB_API_KEY";
const BASE_URL = "https://api.themoviedb.org/3";

export default function MovieCardsContainer(): ReactElement {
  const [movies, setMovies] = useState<(TMDBMovie | TMDBShow)[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchPopular = async (pageNum: number) => {
    setLoading(true);
    try {
      const res = await axios.get<TMDBResponse>(`${BASE_URL}/movie/popular`, {
        params: { api_key: API_KEY, page: pageNum },
      });
      setMovies(res.data.results);
      setTotalPages(Math.min(res.data.total_pages, 500)); // TMDB limit
      setPage(pageNum);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPopular(1);
  }, []);

  return (
    <div className="min-h-screen bg-[#131720] p-8">
      {loading ? (
        <div className="text-center text-white text-2xl">Loading movies...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 justify-items-center">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              title={"title" in movie ? movie.title : movie.name}
              posterPath={movie.poster_path}
              releaseDate={"release_date" in movie ? movie.release_date : movie.first_air_date || ""}
              rating={movie.vote_average}
              overview={movie.overview}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-16 mb-8">
        <Pagination page={page} totalPages={totalPages} onPageChange={fetchPopular} />
      </div>
    </div>
  );
}

// Pagination component
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
    for (let i = Math.max(2, page - delta); i <= Math.min(totalPages - 1, page + delta); i++) range.push(i);
    if (page - delta > 2) range.unshift("...");
    if (page + delta < totalPages - 1) range.push("...");
    range.unshift(1);
    if (totalPages > 1) range.push(totalPages);
    return range;
  };

  return (
    <div className="flex gap-2 items-center text-white">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="px-4 py-2 bg-[#252c3e] rounded disabled:opacity-50"
      >
        ← Prev
      </button>

      {getPages().map((p, i) => (
        <button
          key={i}
          onClick={() => typeof p === "number" && onPageChange(p)}
          className={`px-4 py-2 rounded ${p === page ? "bg-[#3e4966] font-bold" : "bg-[#252c3e]"} ${
            p === "..." ? "cursor-default" : ""
          }`}
          disabled={p === "..."}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="px-4 py-2 bg-[#252c3e] rounded disabled:opacity-50"
      >
        Next →
      </button>
    </div>
  );
}
