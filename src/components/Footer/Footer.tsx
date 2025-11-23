import type { ReactElement } from "react";
//Footer with disclaimer and attribution to comply with
//TMDB Api Terms https://www.themoviedb.org/api-terms-of-use#:~:text=3%2E%20Attribution
export default function Footer(): ReactElement {
  return (
    <footer className=" mt-12 py-2 px-2 text-center text-gray-500 text-[11px] fixed bottom-0 left-0 right-0 z-40 bg-[#171b26]/95 backdrop-blur-sm border-t border-[#2d3748]">
      <p className="mb-2">
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
            className="h-4 inline-block"
          />
        </a>{" "}
        and the TMDB APIs but is not endorsed, certified, or otherwise approved by TMDB. Made with ❤️ by{" "}
        <a href="https://github.com/mihay135" className="hover:text-white transition">
          @mihay135
        </a>{" "}
        as a personal portfolio project.
      </p>
    </footer>
  );
}
