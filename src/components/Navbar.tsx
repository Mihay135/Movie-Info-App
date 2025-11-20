import type { ReactElement } from "react";
import NavbarTitle from "./NavbarTitle";
import FillerDiv from "./FillerDiv";
import NavbarSearch from "./NavbarSearch";

interface NavbarProps {
  onSearch: (query: string, type: "movie" | "tv") => void;
  onHomeClick: () => void;
}

export default function Navbar({ onSearch, onHomeClick }: NavbarProps): ReactElement {
  return (
    <div className="md:pt-2 w-full bg-[#171b26] sticky top-0 z-50 flex flex-col sm:flex-row items-center justify-between px-4 py-3 sm:py-0 sm:h-[10vh] gap-6 sm:gap-0">
      <div className="w-full sm:w-auto flex justify-between sm:justify-start items-center">
        <NavbarTitle onHomeClick={onHomeClick} />
        <div className="sm:hidden" />
      </div>
      <div className="w-full sm:w-[25%] sm:ml-10 lg:ml-[55%]">
        <NavbarSearch onSearch={onSearch} />
      </div>
      <FillerDiv />
    </div>
  );
}
