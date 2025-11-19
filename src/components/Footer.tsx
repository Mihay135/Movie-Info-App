import type { ReactElement } from "react";
import PageSelector from "./PageSelector";

export default function Footer(): ReactElement {
  return (
    <>
      <PageSelector></PageSelector>
      <div className="Footer w-screen h-[8vh] bg-[#171b26] sticky bottom-0 align-middle">
        <p className="Footer__paragraph-message text-center text-[#ffffffc8] pt-4 text-[10px]">
          This application or website uses TMDB and the TMDB APIs but is not endorsed, certified, or otherwise approved
          by TMDB.
        </p>
      </div>
    </>
  );
}
