import ProductCard from "./ProductCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useRef } from "react";

export default function BooksCarousel({ books }) {
  const sliderRef = useRef(null);

  const scrollLeft = () => {
    sliderRef.current.scrollBy({
      left: -320,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({
      left: 320,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative">
      {/* ⬅ arrow */}
      <button
        onClick={scrollLeft}
        className="absolute -left-6 top-1/2 -translate-y-1/2
                   z-10 bg-white/80 hover:bg-white
                   p-3 rounded-full shadow"
      >
        <FaChevronLeft />
      </button>

      {/* slider */}
      <div
        ref={sliderRef}
        className="flex gap-8 overflow-x-auto scroll-smooth scrollbar-hide"
      >
        {books.map((book) => (
          <ProductCard key={book.id} book={book} />
        ))}
      </div>

      {/* ➡ arrow */}
      <button
        onClick={scrollRight}
        className="absolute -right-6 top-1/2 -translate-y-1/2
                   z-10 bg-white/80 hover:bg-white
                   p-3 rounded-full shadow"
      >
        <FaChevronRight />
      </button>
    </div>
  );
}
