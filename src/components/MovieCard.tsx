import type { ReactElement } from "react";
import Image_Missing from "../assets/Image_Missing.png";

interface MovieCardProps {
  title: string;
  posterPath: string | null;
  releaseDate: string;
  rating: number;
  overview: string;
  onClick?: () => void;
}

const baseImgUrl = "https://image.tmdb.org/t/p/w500";

export default function MovieCard({
  title,
  posterPath,
  releaseDate,
  rating,
  overview,
  onClick,
}: MovieCardProps): ReactElement {
  const posterUrl = posterPath ? `${baseImgUrl}${posterPath}` : Image_Missing;

  return (
    <div
      onClick={onClick}
      className="w-72 bg-[#151f30] rounded-xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-[#282f42] transform hover:scale-105 transition-all duration-300 cursor-pointer"
    >
      <div className="h-96 bg-gray-900">
        <img src={posterUrl} alt={title} className="w-full h-full object-cover" loading="lazy" />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold text-white truncate">{title}</h3>
        <div className="flex justify-between items-center mt-2 text-sm text-gray-300">
          <span>{releaseDate.split("-")[0] || "N/A"}</span>
          <span className="bg-yellow-500 text-black px-2 py-1 rounded font-bold">★ {rating.toFixed(1)}</span>
        </div>
        <p className="mt-3 text-sm text-gray-400 line-clamp-3">{overview || "No overview available."}</p>
      </div>
    </div>
  );
}
