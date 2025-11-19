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
    <div className="w-screen h-[10vh] bg-[#171b26] sticky top-0 z-50 flex items-center justify-between">
      <NavbarTitle onHomeClick={onHomeClick} />
      <FillerDiv />
      <NavbarSearch onSearch={onSearch} />
    </div>
  );
}
