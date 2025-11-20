// src/components/Footer.tsx
import type { ReactElement } from "react";

export default function Footer(): ReactElement {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#171b26]/95 backdrop-blur-sm border-t border-[#2d3748]">
      <div className="px-4 py-3 text-center">
        <p className="text-[12px] leading-tight text-gray-400 max-w-full mx-auto px-2">
          This application uses TMDB and the TMDB APIs but is not endorsed, certified, or otherwise approved by TMDB.
        </p>
      </div>
    </div>
  );
}
