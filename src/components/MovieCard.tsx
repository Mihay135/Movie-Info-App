import type { ReactElement } from "react";

export default function Navbar(): ReactElement {
  return (
    <div
      className="
        Navbar 
        w-[22vw] 
        h-[65vh] 
        bg-[#151f30] 
        sticky 
        top-0 
        rounded-xl 
        ml-4  
        hover:shadow-lg 
        hover:shadow-[#1b202d] 
        hover:scale-105 
        hover:transition 
        hover:duration-100 
        hover:ease-in-out"
    >
      <div className="MovieCard__Image-container mr-auto ml-auto mt-[6%] w-9/10 h-75/100 rounded-sm bg-amber-100">
        <img src="#" alt="Movie image" />
      </div>
      <div className="MovieCard__Image-container mr-auto ml-auto mt-[6%] w-9/10 h-auto rounded-sm bg-amber-100 text-xs">
        <p className="overflow-scroll">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia officiis aspernatur repudiandae repellat,
          provident est placeat ab suscipit minima voluptas saepe vero debitis quibusdam ratione, iusto qui nesciunt
          deleniti enim.
        </p>
      </div>
    </div>
  );
}
