import type { ReactElement } from "react";
import { useState, useEffect, useCallback } from "react";
import type { TMDBMovie, TMDBShow, TMDBResponse } from "../../types/tmdb";
import MovieCard from "./MovieCard";
import MovieModal from "./MovieModal";
import axios from "axios";
import Pagination from "./Pagination";

// Bearer token (v4 read-only) loaded from .env
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

//Props Interface
interface MovieCardsContainerProps {
  searchQuery?: string;
  searchType?: "movie" | "tv";
}

//Takes MovieCardsContainerProps and returns ReactElement displaying the resulting grid if results are found
export default function MovieCardsContainer({
  searchQuery = "",
  searchType = "movie",
}: MovieCardsContainerProps): ReactElement {
  //State variables
  const [items, setItems] = useState<(TMDBMovie | TMDBShow)[]>([]);
  const [selectedItem, setSelectedItem] = useState<(TMDBMovie | TMDBShow) | null>(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [currentQuery, setCurrentQuery] = useState("");

  //Fetch Results or initial data Function
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

        //Get Results from TMDB API Axios Connection
        const res = await tmdb.get<TMDBResponse>(url, {
          params: {
            page: pageNum,
            query: searchQuery.trim() || undefined,
          },
        });

        //Set results to state variables
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

  //Actual data Fetching Call
  useEffect(() => {
    setPage(1);
    fetchData(1);
  }, [searchQuery, searchType, fetchData]);

  //Display Results Grid
  return (
    <div className="min-h-screen bg-[#131720] p-8">
      {/* Optional header displaying name of the results when searching */}
      {currentQuery && (
        <h2 className="text-3xl text-white font-bold text-center mb-8">
          Results for: <span className="text-[#3e4966]">"{currentQuery}"</span> (
          {searchType === "movie" ? "Movies" : "TV Shows"})
        </h2>
      )}

      {/*Loading placeholder on grid */}
      {loading ? (
        <div className="text-center text-white text-2xl py-20">Loading...</div>
      ) : items.length === 0 ? (
        <div className="text-center text-white text-2xl py-20">
          {currentQuery ? `No ${searchType}s found for "${currentQuery}"` : "No results"}
        </div>
      ) : (
        <>
          {/*Actual Grid with Results*/}
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
          {/* Pagination (Page number viewer) */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-16 mb-8">
              <Pagination page={page} totalPages={totalPages} onPageChange={fetchData} />
            </div>
          )}
          {/*Display Modal Overlay*/}
          {selectedItem && <MovieModal item={selectedItem} onClose={() => setSelectedItem(null)} />}
        </>
      )}
    </div>
  );
}
