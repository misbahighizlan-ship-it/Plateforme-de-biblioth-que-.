import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import {
  FaStar,
  FaHeart,
  FaShoppingCart,
  FaRobot,
  FaDownload,
  FaCalendar,
  FaBook,
  FaLanguage,
  FaTag,
  FaArrowLeft,
  FaUser
} from "react-icons/fa";
import { useState, useMemo } from "react";
import { addToCart } from "../../slices/cartSlice";
import { addToWishlist, removeFromWishlist } from "../../slices/wishlistSlice";
import DownloadModal from "../../components/DownloadModal";

export default function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.list);
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const [showDownloadModal, setShowDownloadModal] = useState(false);

  const book = books.find((b) => b.id == id);
  const reviewCount = useMemo(() => Math.floor(Math.random() * 200) + 50, [id]);

  if (!book) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-900 text-xl mb-4 font-bold">Livre introuvable</p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-gradient-to-r from-[#ff758c] to-[#7a5cff] text-white rounded-xl font-semibold hover:opacity-90 transition-all shadow-lg"
          >
            Retour à l'accueil
          </button>
        </div>
      </div>
    );
  }

  const isInWishlist = wishlistItems.some((item) => item.id === book.id);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* BOUTON RETOUR */}
      <div className="max-w-6xl mx-auto px-6 pt-6">
        <button
          onClick={() => navigate(-1)}
          style={{ cursor: "pointer" }}
          className="flex items-center gap-2 text-gray-500 hover:text-pink-500
                     transition-colors text-sm font-medium group"
        >
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          Retour à la bibliothèque
        </button>
      </div>

      {/* SECTION PRINCIPALE */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* GAUCHE — Image avec effets */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Glow derrière l'image */}
            <div
              className="absolute inset-4 rounded-3xl blur-2xl opacity-30"
              style={{ background: "linear-gradient(135deg, #ff758c, #7a5cff)" }}
            />

            {/* Image principale */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-[500px] object-cover"
              />
              {/* Overlay gradient bas */}
              <div className="absolute bottom-0 left-0 right-0 h-32
                              bg-gradient-to-t from-black/50 to-transparent" />

              {/* Badge catégorie */}
              <div className="absolute top-4 left-4">
                <span
                  className="px-4 py-2 rounded-full text-white text-sm font-bold shadow-lg"
                  style={{ background: "linear-gradient(135deg, #ff758c, #7a5cff)" }}
                >
                  {book.category}
                </span>
              </div>

              {/* Note en bas */}
              <div className="absolute bottom-4 left-4 flex items-center gap-2">
                <div className="flex items-center gap-1 bg-white/20 backdrop-blur
                                rounded-full px-3 py-1.5">
                  <FaStar className="text-yellow-400 text-sm" />
                  <span className="text-white font-bold text-sm">{book.rating || 4.5}</span>
                </div>
              </div>
            </div>

            {/* Miniatures décoratives */}
            <div className="flex gap-3 mt-4 justify-center">
              {[1, 2, 3].map((_, i) => (
                <div
                  key={i}
                  className="w-16 h-20 rounded-xl overflow-hidden opacity-60
                             hover:opacity-100 cursor-pointer transition-all hover:scale-105"
                >
                  <img src={book.image} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </motion.div>

          {/* DROITE — Informations */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Auteur */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                style={{ background: "linear-gradient(135deg, #ff758c, #7a5cff)" }}>
                {book.author?.charAt(0) || "A"}
              </div>
              <span className="text-gray-500 text-sm">par <strong className="text-gray-700">{book.author || "Auteur inconnu"}</strong></span>
            </div>

            {/* Titre */}
            <h1 className="text-4xl font-bold text-gray-900 leading-tight">
              {book.title}
            </h1>

            {/* Étoiles + avis */}
            <div className="flex items-center gap-4">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <FaStar key={s}
                    className={`text-lg ${s <= Math.round(book.rating || 4.5) ? "text-yellow-400" : "text-gray-200"}`} />
                ))}
              </div>
              <span className="text-gray-500 text-sm">{book.rating || 4.5}/5</span>
            </div>

            {/* Prix */}
            <div className="flex items-end gap-3">
              <span
                className="text-5xl font-bold"
                style={{
                  background: "linear-gradient(135deg, #ff758c, #7a5cff)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}
              >
                {book.price} DH
              </span>
            </div>

            {/* Infos détaillées */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: <FaCalendar />, label: "Publication", value: book.publishedDate || book.publishDate || "2024" },
                { icon: <FaBook />, label: "Pages", value: book.pages || "320" },
                { icon: <FaLanguage />, label: "Langue", value: book.language || "Français" },
                { icon: <FaTag />, label: "Format", value: book.format || "Relié" },
              ].map((info, i) => (
                <div key={i}
                  className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm
                             flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-xs"
                    style={{ background: "linear-gradient(135deg, #ff758c, #7a5cff)" }}>
                    {info.icon}
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">{info.label}</p>
                    <p className="text-sm font-semibold text-gray-700">{info.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* BOUTONS D'ACTION */}
            <div className="grid grid-cols-2 gap-3">

              {/* Chat IA */}
              <button
                onClick={() => navigate(`/books/${book.id}/chat`)}
                style={{ cursor: "pointer" }}
                className="flex items-center justify-center gap-2 py-4 rounded-2xl
                           bg-purple-50 border border-purple-200 text-purple-600
                           font-semibold hover:bg-purple-100 transition-all text-sm"
              >
                🤖 Chat IA
              </button>

              {/* Télécharger */}
              <button
                onClick={() => setShowDownloadModal(true)}
                style={{
                  cursor: "pointer",
                  background: "linear-gradient(135deg, #5db2e3, #2B55B5)"
                }}
                className="flex items-center justify-center gap-2 py-4 rounded-2xl
                           text-white font-semibold hover:opacity-90 transition-all
                           shadow-lg text-sm"
              >
                <FaDownload /> Télécharger
              </button>

              {/* Wishlist */}
              <button
                onClick={() => isInWishlist
                  ? dispatch(removeFromWishlist(book.id))
                  : dispatch(addToWishlist(book))
                }
                style={{ cursor: "pointer" }}
                className={`flex items-center justify-center gap-2 py-4 rounded-2xl
                           font-semibold transition-all text-sm border-2
                           ${isInWishlist
                    ? "bg-pink-500 border-pink-500 text-white"
                    : "bg-white border-pink-300 text-pink-500 hover:bg-pink-50"
                  }`}
              >
                <FaHeart />
                {isInWishlist ? "Sauvegardé" : "Ma liste"}
              </button>

              {/* Ajouter au panier */}
              <button
                onClick={() => dispatch(addToCart(book))}
                style={{
                  cursor: "pointer",
                  background: "linear-gradient(135deg, #ff758c, #7a5cff)"
                }}
                className="flex items-center justify-center gap-2 py-4 rounded-2xl
                           text-white font-bold hover:opacity-90 transition-all
                           shadow-lg text-sm"
              >
                <FaShoppingCart /> Ajouter au panier
              </button>
            </div>

          </motion.div>
        </div>

        {/* DESCRIPTIONS & AUTEUR GRID */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* DESCRIPTION */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 bg-white rounded-3xl p-8 md:p-10 border border-gray-100 shadow-xl shadow-gray-200/40 relative overflow-hidden"
          >
            {/* Forme décorative */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/4" />

            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3 relative z-10">
              <span className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-lg shadow-md"
                style={{ background: "linear-gradient(135deg, #ff758c, #7a5cff)" }}>
                📖
              </span>
              Résumé du livre
            </h2>

            <div className="relative z-10 text-gray-600 leading-loose text-lg font-medium text-justify">
              <p className="first-letter:text-6xl first-letter:font-bold first-letter:text-transparent
                            first-letter:bg-clip-text first-letter:mr-3 first-letter:float-left first-letter:leading-none"
                style={{ backgroundImage: "linear-gradient(135deg, #ff758c, #7a5cff)" }}>
                {book.description ? book.description.charAt(0) : "D"}
              </p>
              <p className="inline">
                {book.description ? book.description.slice(1) : "écouvrez un voyage immersif à travers les pages de ce livre captivant. Avec une narration riche et des personnages convaincants, cette œuvre témoigne de l'excellence littéraire. Que vous soyez un lecteur chevronné ou que vous commenciez tout juste votre aventure littéraire, ce livre promet de vous engager, de vous éclairer et de vous divertir."}
              </p>
            </div>
          </motion.div>

          {/* À PROPOS AUTEUR */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-1 bg-white rounded-3xl p-8 border border-gray-100 shadow-xl shadow-gray-200/40
                       flex flex-col items-center text-center relative overflow-hidden group hover:-translate-y-1 transition-transform cursor-default"
          >
            {/* Top gradient bar */}
            <div className="absolute top-0 left-0 right-0 h-28 opacity-60 group-hover:opacity-100 transition-opacity"
              style={{ background: "linear-gradient(135deg, #ff758c, #7a5cff)" }} />

            <div className="relative z-10 mt-6 mb-4">
              <div className="w-24 h-24 mx-auto rounded-[2rem] bg-white p-2 shadow-xl rotate-3 group-hover:rotate-0 transition-transform">
                <div className="w-full h-full rounded-2xl flex items-center justify-center text-white text-3xl font-bold"
                  style={{ background: "linear-gradient(135deg, #ff758c, #7a5cff)" }}>
                  {(book.author || "A")[0].toUpperCase()}
                </div>
              </div>
            </div>

            <h3 className="font-bold text-gray-900 text-xl mb-1">{book.author || "Auteur inconnu"}</h3>
            <p className="text-pink-500 text-sm font-semibold mb-5 flex items-center gap-1 justify-center">
              <FaStar className="text-yellow-400" /> Auteur Bestseller
            </p>

            <p className="text-gray-500 text-sm leading-relaxed mb-6 px-2">
              Maître de son genre, <strong>{book.author}</strong> crée des univers fascinants qui captivent des millions de lecteurs.
            </p>

            <div className="w-full grid grid-cols-2 gap-3 mt-auto border-t border-gray-100 pt-5">
              <div className="text-center">
                <strong className="block text-gray-900 text-lg">12+</strong>
                <span className="text-xs text-gray-400">Ouvres</span>
              </div>
              <div className="text-center border-l border-gray-100">
                <strong className="block text-gray-900 text-lg">{book.rating || 4.9}</strong>
                <span className="text-xs text-gray-400">Note</span>
              </div>
            </div>
          </motion.div>

        </div>

      </div>

      {/* Download Modal - Preserved logic */}
      <DownloadModal
        show={showDownloadModal}
        onClose={() => setShowDownloadModal(false)}
        book={book}
        bookTitle={book.title}
      />
    </div>
  );
}
