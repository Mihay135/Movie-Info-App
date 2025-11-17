import type { ReactElement } from "react";

export default function Navbar(): ReactElement {
  return (
    <div className="Navbar w-screen h-[10vh] bg-[#171b26] sticky top-0 z-10 flex flex-row">
      <div className="p-3 ml-6 sticky left-0 w-[20%]">
        <p
          className="text-3xl text-[#ffffffed] rounded-xl left-0 h-[50%] w-auto align-middle text-left"
          title="Simple Vite App to Retrieve Info from TMDB database of Movies and Shows created with TypeScript and Tailwind CSS"
        >
          Movie Info App
        </p>
      </div>
      <div className="Navbar-Filler p-3 ml-6 rounded-xl left-10 h-full grow align-middle text-center"></div>
      <div className="pt-2 ml-6 sticky right-0 w-[20%] mr-10 flex flex-row">
        <select
          id="Navbar-media-type"
          name="media-type"
          className="bg-[#252c3e] rounded-lg text-top text-blue-50 w-fit h-7 mt-2 mr-2 pl-2"
        >
          <option value="volvo">Movie</option>
          <option value="saab">Tv Show</option>
          <option value="fiat">Theater</option>
          <option value="audi">Other</option>
        </select>
        <input
          type="search"
          id="query"
          name="q"
          placeholder=" Search..."
          className="bg-[#252c3e] rounded-xl h-[50%] grow w-auto mt-2 align-middle text-center text-l text-blue-50 ring-2 ring-[#141821c9] focus:outline-none focus:ring-2 focus:ring-[#313a53]"
        ></input>
      </div>
    </div>
  );
}
