import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist, clearWishlist } from "../../slices/wishlistSlice";
import { addToCart } from "../../slices/cartSlice";
import { motion, AnimatePresence } from "framer-motion";
import { FaHeart, FaShoppingCart, FaTrash, FaBook } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Wishlist() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.wishlist);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HEADER */}
      <div
        className="px-6 py-8 shadow-md"
        style={{ background: "linear-gradient(135deg, #ff758c, #7a5cff)" }}
      >
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
              <FaHeart className="text-white text-2xl" />
            </div>
            <div>
              <h1 className="text-white font-bold text-2xl">Ma Liste de Souhaits</h1>
              <p className="text-white/70 text-sm mt-1">
                {items.length} livre{items.length > 1 ? "s" : ""} sauvegardé{items.length > 1 ? "s" : ""}
              </p>
            </div>
          </div>

          {items.length > 0 && (
            <button
              onClick={() => dispatch(clearWishlist())}
              style={{ cursor: "pointer" }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl
                         bg-white/20 hover:bg-white/30 text-white text-sm
                         font-medium transition-all border border-white/30"
            >
              <FaTrash className="text-xs" />
              Tout effacer
            </button>
          )}
        </div>
      </div>

      {/* CONTENU */}
      <div className="max-w-5xl mx-auto px-6 py-8">

        {/* LISTE VIDE */}
        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-24"
          >
            <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-pink-50
                            flex items-center justify-center">
              <FaHeart className="text-pink-300 text-4xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Votre liste est vide
            </h2>
            <p className="text-gray-500 mb-8 max-w-sm mx-auto">
              Ajoutez des livres à votre liste de souhaits pour les retrouver facilement
            </p>
            <button
              onClick={() => navigate("/catalogue")}
              style={{
                cursor: "pointer",
                background: "linear-gradient(135deg, #ff758c, #7a5cff)"
              }}
              className="px-8 py-3 rounded-2xl text-white font-bold
                         hover:opacity-90 hover:scale-105 transition-all shadow-lg"
            >
              Explorer le catalogue
            </button>
          </motion.div>

        ) : (
          <>
            {/* GRILLE LIVRES */}
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence>
                {items.map((book, index) => (
                  <motion.div
                    key={book.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white rounded-3xl border border-gray-100 shadow-sm
                               overflow-hidden hover:shadow-md transition-all group"
                  >
                    {/* Image */}
                    <div
                      className="relative h-56 overflow-hidden cursor-pointer"
                      onClick={() => navigate(`/books/${book.id}`)}
                    >
                      <img
                        src={book.image}
                        alt={book.title}
                        className="w-full h-full object-cover group-hover:scale-105
                                   transition-transform duration-300"
                      />
                      {/* Badge catégorie */}
                      {book.category && (
                        <span className="absolute top-3 left-3 px-3 py-1 rounded-full
                                         text-white text-xs font-bold shadow-md"
                          style={{ background: "linear-gradient(135deg, #ff758c, #7a5cff)" }}>
                          {book.category}
                        </span>
                      )}
                    </div>

                    {/* Infos */}
                    <div className="p-5">
                      <h3
                        className="font-bold text-gray-900 text-base mb-1 cursor-pointer
                                   hover:text-pink-500 transition-colors line-clamp-2"
                        onClick={() => navigate(`/books/${book.id}`)}
                      >
                        {book.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-3">{book.author}</p>
                      <p className="font-bold text-lg mb-4"
                        style={{
                          background: "linear-gradient(135deg, #ff758c, #7a5cff)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent"
                        }}>
                        {book.price} DH
                      </p>

                      {/* Boutons */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            dispatch(addToCart(book));
                            dispatch(removeFromWishlist(book.id));
                          }}
                          style={{
                            cursor: "pointer",
                            background: "linear-gradient(135deg, #ff758c, #7a5cff)"
                          }}
                          className="flex-1 flex items-center justify-center gap-2
                                     py-2.5 rounded-xl text-white text-sm font-semibold
                                     hover:opacity-90 transition-all shadow-md"
                        >
                          <FaShoppingCart className="text-xs" />
                          Ajouter au panier
                        </button>
                        <button
                          onClick={() => dispatch(removeFromWishlist(book.id))}
                          style={{ cursor: "pointer" }}
                          className="w-10 h-10 rounded-xl bg-red-50 border border-red-100
                                     text-red-400 hover:bg-red-500 hover:text-white
                                     flex items-center justify-center transition-all"
                        >
                          <FaTrash className="text-xs" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* BOUTON CATALOGUE */}
            <div className="text-center mt-10">
              <button
                onClick={() => navigate("/catalogue")}
                style={{ cursor: "pointer" }}
                className="px-8 py-3 rounded-2xl border-2 border-pink-300
                           text-pink-500 font-semibold hover:bg-pink-50
                           transition-all text-sm"
              >
                Continuer mes achats →
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
}
