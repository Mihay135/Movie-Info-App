import type { ReactElement } from "react";
import NavbarTitle from "./NavbarTitle";
import NavbarSearch from "./NavbarSearch";

interface NavbarProps {
  onSearch: (query: string, type: "movie" | "tv") => void;
  onHomeClick: () => void;
}

export default function Navbar({ onSearch, onHomeClick }: NavbarProps): ReactElement {
  return (
    <header className="py-6 w-full bg-[#171b26] sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          {/* App Title*/}
          <NavbarTitle onHomeClick={onHomeClick} />
          {/* Search Bar*/}
          <div className="w-full sm:w-full md:w-auto md:max-w-md lg:max-w-lg xl:max-w-xl">
            <NavbarSearch onSearch={onSearch} />
          </div>
        </div>
      </div>
    </header>
  );
}
