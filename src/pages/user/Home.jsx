import HeroSection from "../../components/HeroSection";
import BooksCarousel from "../../components/BooksCarousel";
import CategoriesSection from "../../components/CategoriesSection";

import api from "../../services/api";
import { useEffect, useState } from "react";

export default function Home() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    api.get("/books").then(res => setBooks(res.data));
  }, []);

  return (
    <>
      <HeroSection />

      <CategoriesSection />

      <BooksCarousel books={books} />
    </>
  );
}
