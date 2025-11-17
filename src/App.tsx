import "./App.css";
import Footer from "./components/Footer";
import MovieCardsContainer from "./components/MovieCardsContainer";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App min-h-screen flex flex-col justify-between">
      <Navbar></Navbar>
      <MovieCardsContainer></MovieCardsContainer>
      <Footer></Footer>
    </div>
  );
}

export default App;
