import "./App.css";
import { useState } from "react";
import Footer from "./components/Footer";
import MovieCardsContainer from "./components/MovieCardsContainer";
import Navbar from "./components/Navbar";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [mediaType, setMediaType] = useState<"movie" | "tv">("movie");

  const handleSearch = (query: string, type: "movie" | "tv") => {
    setSearchQuery(query);
    setMediaType(type);
  };

  const handleHomeClick = () => {
    setSearchQuery("");
    setMediaType("movie");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0d1117]">
      <Navbar onSearch={handleSearch} onHomeClick={handleHomeClick} />
      <main className="flex-1">
        <MovieCardsContainer searchQuery={searchQuery} searchType={mediaType} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
