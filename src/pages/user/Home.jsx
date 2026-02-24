import HeroSection from "../../components/HeroSection";
import BooksCarousel from "../../components/BooksCarousel";
import CategoriesSection from "../../components/CategoriesSection";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBooks } from "../../slices/booksSlice";

export default function Home() {
  const dispatch = useDispatch();
  const { list: books } = useSelector((state) => state.books);

  useEffect(() => {
    if (books.length === 0) {
      dispatch(fetchBooks());
    }
  }, [dispatch, books.length]);

  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <section id="popular-books" className="bg-gradient-to-b from-[#0b1230] to-[#050814] py-20">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-3xl font-bold text-white mb-10">
            Livres <span className="text-rose-400">Populaires</span>
          </h2>
          <BooksCarousel books={books} />
        </div>
      </section>
    </>
  );
}

