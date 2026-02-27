import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaRobot, FaBolt, FaUsers, FaMasksTheater } from "react-icons/fa6";
import { FaBookOpen, FaBook } from "react-icons/fa";

import HeroSection from "../../components/HeroSection";
import CategoriesSection from "../../components/CategoriesSection";
import ProductCard from "../../components/ProductCard";
import { fetchBooks } from "../../slices/booksSlice";

const RainStars = () => {
  const stars = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 4,
    duration: 2 + Math.random() * 2,
    size: 10 + Math.random() * 10,
    emoji: ["⭐", "✨", "🌟", "💫"][Math.floor(Math.random() * 4)],
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute"
          style={{
            left: `${star.left}%`,
            top: -30,
            fontSize: star.size,
          }}
          animate={{
            y: ["0vh", "110vh"],
            opacity: [0, 1, 1, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            repeatDelay: Math.random() * 3,
            ease: "linear",
          }}
        >
          {star.emoji}
        </motion.div>
      ))}
    </div>
  );
};

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list: books } = useSelector((state) => state.books);
  const [clickedCard, setClickedCard] = useState(null);

  useEffect(() => {
    if (books.length === 0) {
      dispatch(fetchBooks());
    }
  }, [dispatch, books.length]);

  return (
    <div className="bg-white min-h-screen">
      {/* 1. HERO */}
      <HeroSection />

      {/* 2. À PROPOS */}
      <section className="py-24 bg-gray-50 relative overflow-hidden">

        <RainStars />

        <div className="max-w-7xl mx-auto px-6 relative z-10">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[#5db2e3] text-sm font-semibold tracking-widest uppercase mb-4 block">
              À PROPOS
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              La bibliothèque du{" "}
              <span className="bg-gradient-to-r from-[#5db2e3] to-pink-400 bg-clip-text text-transparent">
                futur
              </span>
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
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
              transition={{ delay: 0.15 }}
              whileHover={{ y: -12, scale: 1.04, transition: { type: "spring", stiffness: 300, damping: 15 } }}
              whileTap={{ scale: 0.95, rotate: [-2, 2, -2, 0], transition: { duration: 0.3 } }}
              onClick={() => {
                setClickedCard(0);
                setTimeout(() => setClickedCard(null), 1000);
              }}
              style={{ cursor: 'pointer' }}
              className="relative bg-white border border-gray-100 shadow-lg rounded-3xl p-8 text-center group hover:border-blue-500/30 transition-all duration-300 overflow-hidden"
            >
              <AnimatePresence>
                {clickedCard === 0 && (
                  <>
                    {[...Array(16)].map((_, i) => (
                      <motion.span
                        key={i}
                        className="absolute pointer-events-none select-none text-yellow-400"
                        style={{
                          top: "50%",
                          left: "50%",
                          fontSize: `${12 + Math.random() * 14}px`,
                          zIndex: 50,
                        }}
                        initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
                        animate={{
                          x: Math.cos((i / 16) * Math.PI * 2) * (80 + Math.random() * 60),
                          y: Math.sin((i / 16) * Math.PI * 2) * (80 + Math.random() * 60),
                          opacity: 0,
                          scale: 1.5 + Math.random(),
                          rotate: Math.random() * 360,
                        }}
                        transition={{ duration: 0.8 + Math.random() * 0.4, ease: "easeOut" }}
                      >
                        {["⭐", "✨", "🌟", "💫"][Math.floor(Math.random() * 4)]}
                      </motion.span>
                    ))}
                  </>
                )}
              </AnimatePresence>
              <div className="relative z-10 w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r from-blue-500/20 to-blue-600/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <FaRobot className="text-2xl text-blue-400" />
              </div>
              <h3 className="text-gray-900 text-xl font-bold mb-3">Assistant IA</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Propulsé par Gemini AI, notre assistant intelligent vous recommande des livres
                selon vos goûts et répond à toutes vos questions littéraires.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              whileHover={{ y: -12, scale: 1.04, transition: { type: "spring", stiffness: 300, damping: 15 } }}
              whileTap={{ scale: 0.95, rotate: [-2, 2, -2, 0], transition: { duration: 0.3 } }}
              onClick={() => {
                setClickedCard(1);
                setTimeout(() => setClickedCard(null), 1000);
              }}
              style={{ cursor: 'pointer' }}
              className="relative bg-white border border-gray-100 shadow-lg rounded-3xl p-8 text-center group hover:border-pink-500/30 transition-all duration-300 overflow-hidden"
            >
              <AnimatePresence>
                {clickedCard === 1 && (
                  <>
                    {[...Array(16)].map((_, i) => (
                      <motion.span
                        key={i}
                        className="absolute pointer-events-none select-none text-yellow-400"
                        style={{
                          top: "50%",
                          left: "50%",
                          fontSize: `${12 + Math.random() * 14}px`,
                          zIndex: 50,
                        }}
                        initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
                        animate={{
                          x: Math.cos((i / 16) * Math.PI * 2) * (80 + Math.random() * 60),
                          y: Math.sin((i / 16) * Math.PI * 2) * (80 + Math.random() * 60),
                          opacity: 0,
                          scale: 1.5 + Math.random(),
                          rotate: Math.random() * 360,
                        }}
                        transition={{ duration: 0.8 + Math.random() * 0.4, ease: "easeOut" }}
                      >
                        {["⭐", "✨", "🌟", "💫"][Math.floor(Math.random() * 4)]}
                      </motion.span>
                    ))}
                  </>
                )}
              </AnimatePresence>
              <div className="relative z-10 w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r from-pink-500/20 to-rose-600/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <FaBookOpen className="text-2xl text-pink-400" />
              </div>
              <h3 className="text-gray-900 text-xl font-bold mb-3">Catalogue Riche</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
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
              className="relative bg-white border border-gray-100 shadow-lg rounded-3xl p-8 text-center group hover:border-[#5db2e3]/30 transition-all duration-300 overflow-hidden"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r from-[#5db2e3]/20 to-blue-400/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <FaBolt className="text-2xl text-[#5db2e3]" />
              </div>
              <h3 className="text-gray-900 text-xl font-bold mb-3">Commande Rapide</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
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
                <div className="text-3xl font-bold text-gray-900">
                  {stat.number}
                </div>
                <div className="text-gray-500 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* 3. CATÉGORIES */}
      <CategoriesSection />

      {/* 4. LIVRES POPULAIRES — 4 cards max en grille */}
      <section id="popular-books" className="py-20 bg-white">
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
              <h2 className="text-4xl font-bold text-gray-900">
                Livres{" "}
                <span className="text-pink-400">Populaires</span>
              </h2>
            </div>
            <button
              onClick={() => navigate("/catalogue")}
              className="px-6 py-3 rounded-xl border border-gray-200 text-gray-600 hover:border-[#5db2e3] hover:text-[#5db2e3] transition-all text-sm"
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
    </div>
  );
}
