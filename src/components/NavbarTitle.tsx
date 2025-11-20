interface NavbarTitleProps {
  onHomeClick: () => void;
}

export default function NavbarTitle({ onHomeClick }: NavbarTitleProps) {
  return (
    <div className="p-3 ">
      <button
        onClick={onHomeClick}
        className="text-2xl md:text-3xl font-bold text-white hover:text-gray-200 transition cursor-pointer"
        title="Movie Info App - Click to go home"
      >
        Movie Info App
      </button>
    </div>
  );
}
