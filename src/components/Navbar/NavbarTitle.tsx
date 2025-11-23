interface NavbarTitleProps {
  onHomeClick: () => void;
}

//Title on click return to initial page
export default function NavbarTitle({ onHomeClick }: NavbarTitleProps) {
  return (
    <div className="p-3">
      <button
        onClick={onHomeClick}
        className="text-3xl md:text-4xl font-bold text-[#e2e2e2] hover:text-white hover:brightness-110 hover:text-shadow-[#d8d8d8] hover:text-shadow-3xs transition cursor-pointer"
        title="Movie Info App - Click to go home"
      >
        Movie Info App
      </button>
    </div>
  );
}
