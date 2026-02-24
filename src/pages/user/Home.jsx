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
      <BooksCarousel books={books} />
    </>
  );
}
