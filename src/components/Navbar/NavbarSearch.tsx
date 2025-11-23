import { useState, useEffect } from "react";

interface NavbarSearchProps {
  onSearch: (query: string, type: "movie" | "tv") => void;
}

//Search Functionality with Debouncing to avoid many api calls when typing on search
export default function NavbarSearch({ onSearch }: NavbarSearchProps) {
  const debouncingDelay = 400;
  const [query, setQuery] = useState("");
  const [type, setType] = useState<"movie" | "tv">("movie");
  const [isLoading, setIsLoading] = useState(false);

  // Debounced search
  useEffect(() => {
    if (query.trim() === "") {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    const timer = setTimeout(() => {
      onSearch(query.trim(), type);
      setIsLoading(false);
    }, debouncingDelay);

    return () => clearTimeout(timer);
  }, [query, type, onSearch]);

  //Form Submit Handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim(), type);
      setQuery(""); // Clear input after search
    }
  };

  //Navbar Search
  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <div className="flex items-center bg-[#252c3e] rounded-lg overflow-hidden shadow-lg border border-[#3e4966]/50">
        {/* Type Selector */}
        <select
          value={type}
          onChange={(e) => setType(e.target.value as "movie" | "tv")}
          className="hidden sm:block bg-[#2d3748] text-gray-200 px-4 py-3 text-sm font-medium focus:outline-none border-r border-[#3e4966]"
        >
          <option value="movie">Movies</option>
          <option value="tv">TV Shows</option>
        </select>

        {/* Search Input */}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={`Search ${type === "movie" ? "movies" : "TV shows"}...`}
          className="w-full bg-transparent text-white px-4 py-3 text-sm placeholder-gray-500 focus:outline-none"
        />

        {/* Loading Spinner */}
        {isLoading && (
          <div className="absolute right-25 top-[50%] -translate-y-1/2">
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          </div>
        )}

        {/* Search Button */}
        <button
          type="submit"
          className="px-5 py-3 bg-[#3e4966] hover:bg-[#4a5578] transition flex items-center justify-center"
        >
          <svg width="22" height="22" viewBox="0 0 64 64" stroke="white" strokeWidth="6" fill="none">
            <circle cx="26" cy="26" r="18" />
            <line x1="38" y1="38" x2="56" y2="56" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Mobile Type Toggle*/}
      <div className="sm:hidden mt-3 flex justify-center gap-4">
        <button
          onClick={() => setType("movie")}
          className={`px-6 py-2 rounded-lg text-sm font-medium transition ${
            type === "movie" ? "bg-[#3e4966] text-white" : "bg-[#252c3e] text-gray-400 hover:text-white"
          }`}
        >
          Movies
        </button>
        <button
          onClick={() => setType("tv")}
          className={`px-6 py-2 rounded-lg text-sm font-medium transition ${
            type === "tv" ? "bg-[#3e4966] text-white" : "bg-[#252c3e] text-gray-400 hover:text-white"
          }`}
        >
          TV Shows
        </button>
      </div>
    </form>
  );
}
