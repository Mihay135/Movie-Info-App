import { useState } from "react";

interface NavbarSearchProps {
  onSearch: (query: string, type: "movie" | "tv") => void;
}

export default function NavbarSearch({ onSearch }: NavbarSearchProps) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState<"movie" | "tv">("movie");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query.trim(), type);
  };

  return (
    <div className="pt-2 w-[25%] flex flex-row items-center mr-8">
      <form onSubmit={handleSubmit} className="flex items-center w-full">
        <select
          value={type}
          onChange={(e) => setType(e.target.value as "movie" | "tv")}
          className="bg-[#252c3e] text-blue-50 h-10 px-3 rounded-l-lg border-r border-gray-600"
        >
          <option value="movie">Movie</option>
          <option value="tv">TV Show</option>
        </select>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
          className="bg-[#252c3e] text-blue-50 px-4 h-10 flex-1 focus:outline-none focus:ring-2 focus:ring-[#313a53]"
        />
        <button type="submit" className="bg-[#252c3e] hover:bg-[#3e4966] p-2 h-10 rounded-r-lg transition-colors">
          <svg width="24" height="24" viewBox="0 0 64 64" stroke="currentColor" className="text-white">
            <circle cx="26" cy="26" r="18" fill="none" strokeWidth="6" />
            <line x1="38" y1="38" x2="56" y2="56" strokeWidth="6" strokeLinecap="round" />
          </svg>
        </button>
      </form>
    </div>
  );
}
