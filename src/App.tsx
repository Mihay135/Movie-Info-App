import "./App.css";
import { useState } from "react";
import Footer from "./components/Footer";
import MovieCardsContainer from "./components/MovieCardsContainer";
import Navbar from "./components/Navbar";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen flex flex-col bg-[#0d1117]">
      <Navbar
        onSearch={(q, t) => {
          console.log(q, t);
        }}
      />
      <main className="flex-1">
        <MovieCardsContainer />
      </main>
      <Footer />
    </div>
  );
}

export default App;
