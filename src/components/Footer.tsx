import type { ReactElement } from "react";

export default function Footer(): ReactElement {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#171b26]/90 backdrop-blur-md border-t border-[#2d3748]">
      <div className="px-6 py-4 text-center">
        <p className="text-xs text-gray-400 font-medium tracking-wide">
          This application uses TMDB and the TMDB APIs but is not endorsed, certified, or otherwise approved by TMDB.
        </p>
      </div>
    </div>
  );
}
