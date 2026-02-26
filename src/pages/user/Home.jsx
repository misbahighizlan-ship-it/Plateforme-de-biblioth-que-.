import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaRobot, FaBolt, FaUsers, FaMasksTheater } from "react-icons/fa6";
import { FaBookOpen, FaBook } from "react-icons/fa";

import HeroSection from "../../components/HeroSection";
import CategoriesSection from "../../components/CategoriesSection";
import ProductCard from "../../components/ProductCard";
import { fetchBooks } from "../../slices/booksSlice";

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list: books } = useSelector((state) => state.books);

  useEffect(() => {
    if (books.length === 0) {
      dispatch(fetchBooks());
    }
  }, [dispatch, books.length]);

  return (
    <>
      {/* 1. HERO */}
      <HeroSection />

      {/* 2. À PROPOS */}
      <section className="py-24 bg-[#0B0F19] relative overflow-hidden">

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[#5db2e3] text-sm font-semibold tracking-widest uppercase mb-4 block">
              À PROPOS
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              La bibliothèque du{" "}
              <span className="bg-gradient-to-r from-[#5db2e3] to-pink-400 bg-clip-text text-transparent">
                futur
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              SmartLibrary BiblioIA combine l'intelligence artificielle et une vaste collection
              de livres pour vous offrir une expérience de lecture personnalisée et moderne.
            </p>
          </motion.div>

          {/* 3 feature cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -8 }}
              className="bg-[#111827] border border-gray-800 rounded-3xl p-8 text-center group hover:border-blue-500/30 transition-all duration-300"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r from-blue-500/20 to-blue-600/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <FaRobot className="text-2xl text-blue-400" />
              </div>
              <h3 className="text-white text-xl font-bold mb-3">Assistant IA</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Propulsé par Gemini AI, notre assistant intelligent vous recommande des livres
                selon vos goûts et répond à toutes vos questions littéraires.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -8 }}
              className="bg-[#111827] border border-gray-800 rounded-3xl p-8 text-center group hover:border-pink-500/30 transition-all duration-300"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r from-pink-500/20 to-rose-600/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <FaBookOpen className="text-2xl text-pink-400" />
              </div>
              <h3 className="text-white text-xl font-bold mb-3">Catalogue Riche</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Des centaines de livres soigneusement sélectionnés dans tous les genres.
                Filtrez, recherchez et découvrez votre prochaine lecture facilement.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              whileHover={{ y: -8 }}
              className="bg-[#111827] border border-gray-800 rounded-3xl p-8 text-center group hover:border-[#5db2e3]/30 transition-all duration-300"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r from-[#5db2e3]/20 to-blue-400/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <FaBolt className="text-2xl text-[#5db2e3]" />
              </div>
              <h3 className="text-white text-xl font-bold mb-3">Commande Rapide</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Achetez et téléchargez vos livres en quelques clics. Recevez une confirmation
                instantanée par email grâce à notre système automatisé.
              </p>
            </motion.div>

          </div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { number: "500+", label: "Livres disponibles", Icon: FaBook, color: "text-[#5db2e3]" },
              { number: "10K+", label: "Lecteurs satisfaits", Icon: FaUsers, color: "text-pink-400" },
              { number: "6+", label: "Genres littéraires", Icon: FaMasksTheater, color: "text-purple-400" },
              { number: "24/7", label: "Assistant IA actif", Icon: FaRobot, color: "text-blue-400" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="flex justify-center mb-2">
                  <stat.Icon className={`text-2xl ${stat.color}`} />
                </div>
                <div className="text-3xl font-bold bg-gradient-to-r from-[#5db2e3] to-pink-400 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* 3. CATÉGORIES */}
      <CategoriesSection />

      {/* 4. LIVRES POPULAIRES — 4 cards max en grille */}
      <section id="popular-books" className="py-20 bg-[#0B0F19]">
        <div className="max-w-7xl mx-auto px-6">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-12"
          >
            <div>
              <span className="text-[#5db2e3] text-sm font-semibold tracking-widest uppercase block mb-2">
                SÉLECTION
              </span>
              <h2 className="text-4xl font-bold text-white">
                Livres{" "}
                <span className="text-pink-400">Populaires</span>
              </h2>
            </div>
            <button
              onClick={() => navigate("/catalogue")}
              className="px-6 py-3 rounded-xl border border-gray-700 text-gray-400 hover:border-[#5db2e3] hover:text-[#5db2e3] transition-all text-sm"
            >
              Voir tout →
            </button>
          </motion.div>

          {/* 4 cards grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {books.slice(0, 4).map((book) => (
              <ProductCard key={book.id} book={book} />
            ))}
          </div>

          {/* Voir tout button */}
          <div className="text-center mt-10">
            <button
              onClick={() => navigate("/catalogue")}
              className="px-8 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-[#5db2e3] to-[#2B55B5] hover:opacity-90 transition-all shadow-lg shadow-blue-500/20"
            >
              Voir tout le catalogue →
            </button>
          </div>

        </div>
      </section>
    </>
  );
}
