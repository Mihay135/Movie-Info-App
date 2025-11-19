export default function () {
  return (
    <div className="Navbar-Search pt-2 ml-6 sticky right-0 w-[25%] mr-0 flex flex-row  ">
      <form>
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
          className="bg-[#252c3e] rounded-xl h-[50%] grow w-[60%] text-center text-l text-blue-50 ring-2 ring-[#141821c9] focus:outline-none focus:ring-2 focus:ring-[#313a53]"
        ></input>
      </form>
      <button className="hover:cursor-pointer mb-3 scale-90 ml-0 w-auto ">
        <svg
          width="32"
          height="32"
          viewBox="0 0 64 64"
          stroke="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          className="text-[#252c3e] hover:text-[#3e4966] transition-colors duration-200"
        >
          <circle cx="26" cy="26" r="18" fill="none" stroke-width="6" />
          <line x1="38" y1="38" x2="56" y2="56" stroke-width="6" stroke-linecap="round" />
        </svg>
      </button>
    </div>
  );
}
