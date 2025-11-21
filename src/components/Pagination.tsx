import type { FC } from "react";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({ page, totalPages, onPageChange }) => {
  const getPages = () => {
    const delta = 2;
    const range: (number | string)[] = [];
    const min = Math.max(2, page - delta);
    const max = Math.min(totalPages - 1, page + delta);

    for (let i = min; i <= max; i++) range.push(i);
    if (page - delta > 2) range.unshift("...");
    if (page + delta < totalPages - 1) range.push("...");
    range.unshift(1);
    if (totalPages > 1) range.push(totalPages);
    return range;
  };

  return (
    <div className="flex gap-3 items-center text-white flex-wrap justify-center">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="px-5 py-3 bg-[#252c3e] rounded-lg disabled:opacity-50 hover:bg-[#3e4966] transition"
      >
        Prev
      </button>

      {getPages().map((p, i) => (
        <button
          key={i}
          onClick={() => typeof p === "number" && onPageChange(p)}
          disabled={p === "..."}
          className={`px-4 py-3 rounded-lg min-w-12 transition ${
            p === page ? "bg-[#3e4966] font-bold" : p === "..." ? "cursor-default" : "bg-[#252c3e] hover:bg-[#3e4966]"
          }`}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="px-5 py-3 bg-[#252c3e] rounded-lg disabled:opacity-50 hover:bg-[#3e4966] transition"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
