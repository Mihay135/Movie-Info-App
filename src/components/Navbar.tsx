import type { ReactElement } from "react";
import NavbarTitle from "./NavbarTitle";
import FillerDiv from "./FillerDiv";
import NavbarSearch from "./NavbarSearch";

export default function Navbar(): ReactElement {
  return (
    <div className="Navbar w-screen h-[10vh] bg-[#171b26] sticky top-0 z-10 flex flex-row">
      <NavbarTitle></NavbarTitle>
      <FillerDiv></FillerDiv>
      <NavbarSearch></NavbarSearch>
    </div>
  );
}
