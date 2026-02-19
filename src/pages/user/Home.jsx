import HeroSection from "../../components/HeroSection";
import BooksCarousel from "../../components/BooksCarousel";
import CategoriesSection from "../../components/CategoriesSection";

import api from "../../services/api";
import { useEffect, useState } from "react";

export default function Home() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const res = await api.get("/books");
        setBooks(res.data);
      } catch (error) {
        console.error("Erreur chargement livres:", error);
      }
    };
    loadBooks();
  }, []);

  return (
    <>
      <HeroSection />

      <CategoriesSection />

      <BooksCarousel books={books} />
    </>
  );
}
