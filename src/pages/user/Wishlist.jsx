import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../../slices/wishlistSlice";
import { addToCart } from "../../slices/cartSlice";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaHeart, FaShoppingCart, FaTrashAlt, FaBookOpen, FaStar } from "react-icons/fa";

export default function Wishlist() {
  const { items } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleMoveToCart = (item) => {
    dispatch(addToCart(item));
    dispatch(removeFromWishlist(item.id));
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-20 -left-40 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 -right-40 w-96 h-96 bg-[#5db2e3]/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-lg shadow-pink-500/30">
              <FaHeart className="text-white text-xl" />
            </div>
            <h1 className="text-4xl font-bold text-white">Ma Wishlist</h1>
          </div>
          <p className="text-gray-400">
            {items.length === 0
              ? "Votre wishlist est vide"
              : `${items.length} livre${items.length > 1 ? "s" : ""} sauvegardé${items.length > 1 ? "s" : ""}`}
          </p>
        </motion.div>

        {/* Empty state */}
        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-800/50 flex items-center justify-center">
              <FaHeart className="text-4xl text-gray-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-400 mb-2">
              Aucun livre sauvegardé
            </h3>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Explorez notre catalogue et ajoutez vos livres préférés à votre wishlist
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/catalogue")}
              className="px-8 py-3 rounded-xl font-semibold bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 transition-all"
            >
              Explorer le catalogue
            </motion.button>
          </motion.div>
        ) : (
          <div className="grid gap-4">
            <AnimatePresence>
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30, transition: { duration: 0.2 } }}
                  transition={{ delay: index * 0.05 }}
                  className="group relative bg-gradient-to-r from-[#111827] to-[#0f172a] rounded-2xl border border-gray-800/50 hover:border-pink-500/30 transition-all duration-300 overflow-hidden"
                >
                  {/* Hover glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 to-[#5db2e3]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="relative flex items-center gap-6 p-5">
                    {/* Book cover */}
                    <div
                      className="relative w-20 h-28 rounded-xl overflow-hidden flex-shrink-0 cursor-pointer shadow-lg shadow-black/30"
                      onClick={() => navigate(`/books/${item.id}`)}
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h3
                        className="text-lg font-bold text-white truncate cursor-pointer hover:text-[#5db2e3] transition-colors"
                        onClick={() => navigate(`/books/${item.id}`)}
                      >
                        {item.title}
                      </h3>
                      <p className="text-gray-400 text-sm mt-1">
                        {item.author || "Auteur inconnu"}
                      </p>

                      <div className="flex items-center gap-4 mt-3">
                        <span className="text-xl font-bold bg-gradient-to-r from-[#5db2e3] to-pink-400 bg-clip-text text-transparent">
                          {item.price} DH
                        </span>
                        {item.rating && (
                          <span className="flex items-center gap-1 text-yellow-400 text-sm">
                            <FaStar className="text-xs" />
                            {item.rating}
                          </span>
                        )}
                        {item.category && (
                          <span className="text-xs px-3 py-1 rounded-full bg-gray-800 text-gray-400 border border-gray-700">
                            {item.category}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleMoveToCart(item)}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#5db2e3] to-[#2B55B5] text-white font-medium text-sm shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all"
                        title="Ajouter au panier"
                      >
                        <FaShoppingCart className="text-sm" />
                        <span className="hidden sm:inline">Ajouter au panier</span>
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => dispatch(removeFromWishlist(item.id))}
                        className="w-10 h-10 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 flex items-center justify-center transition-all"
                        title="Supprimer"
                      >
                        <FaTrashAlt className="text-sm" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Bottom actions */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex justify-between items-center mt-6 pt-6 border-t border-gray-800"
            >
              <button
                onClick={() => navigate("/catalogue")}
                className="flex items-center gap-2 text-gray-400 hover:text-[#5db2e3] transition-colors"
              >
                <FaBookOpen />
                Continuer à explorer
              </button>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
