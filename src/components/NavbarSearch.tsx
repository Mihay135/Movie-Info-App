import { useState } from "react";

interface NavbarSearchProps {
  onSearch: (query: string, type: "movie" | "tv") => void;
}

export default function NavbarSearch({ onSearch }: NavbarSearchProps) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState<"movie" | "tv">("movie");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) onSearch(query.trim(), type);
  };

  return (
    <div className="w-full">
      {/* Dropdown*/}
      <form onSubmit={handleSubmit} className="flex w-full gap-2">
        <select
          value={type}
          onChange={(e) => setType(e.target.value as "movie" | "tv")}
          className="bg-[#252c3e] text-white px-1 py-2.5 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#3e4966] lg:w-30 sm:w-18"
        >
          <option value="movie">Movies</option>
          <option value="tv">TV Shows</option>
        </select>

        {/* Search input */}
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={`Search ${type === "movie" ? "movies" : "TV shows"}...`}
          className="flex-1 bg-[#252c3e] text-white px-4 h-11 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3e4966] text-sm"
        />

        {/* Search button */}
        <button
          type="submit"
          className="px-5 bg-[#3e4966] hover:bg-[#4a5578] rounded-lg transition flex items-center justify-center"
        >
          <svg width="22" height="22" viewBox="0 0 64 64" stroke="white" strokeWidth="6">
            <circle cx="26" cy="26" r="18" fill="none" />
            <line x1="38" y1="38" x2="56" y2="56" strokeLinecap="round" />
          </svg>
        </button>
      </form>
    </div>
  );
}
