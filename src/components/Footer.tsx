import type { ReactElement } from "react";

export default function Footer(): ReactElement {
  const year: number = new Date().getFullYear();
  return (
    <div className="Footer w-screen h-[6vh] bg-[#171b26] sticky bottom-0 align-middle">
      <p className="Footer__paragraph-message text-center text-[#ffffffc8]">
        This application or website uses TMDB and the TMDB APIs but is not endorsed, certified, or otherwise approved by
        TMDB.
      </p>
    </div>
  );
}
