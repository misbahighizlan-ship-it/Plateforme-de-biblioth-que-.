import { FiX, FiStar } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export default function ViewBookModal({ isOpen, onClose, book }) {
  if (!isOpen || !book) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* BACKDROP BLUR */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        />

        {/* MODAL */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="relative bg-[#111827] w-full max-w-lg rounded-2xl shadow-2xl border border-gray-800 text-white overflow-hidden max-h-[90vh] flex flex-col"
        >
          {/* CLOSE */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-black/20 hover:bg-black/40 rounded-full text-white transition-colors"
          >
            <FiX size={20} />
          </button>

          <div className="overflow-y-auto">
            {/* IMAGE BANNER */}
            <div className="relative h-56 bg-gray-800">
              {book.image ? (
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-600">
                  Pas d'image disponible
                </div>
              )}
              <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#111827] to-transparent" />
            </div>

            {/* HEADER */}
            <div className="px-6 pb-2">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h3 className="text-2xl font-bold text-white line-clamp-1">
                    {book.title}
                  </h3>
                  <p className="text-blue-400 font-medium">{book.author}</p>
                </div>
                <div className="flex items-center gap-1 bg-yellow-500/10 text-yellow-500 px-3 py-1 rounded-full text-sm font-bold border border-yellow-500/20 whitespace-nowrap">
                  <FiStar className="fill-current" />
                  {book.rating || "N/A"}
                </div>
              </div>
            </div>

            {/* CONTENT */}
            <div className="p-6 pt-2 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider font-bold text-gray-500">
                    Catégorie
                  </label>
                  <p className="px-3 py-2 rounded-lg bg-[#0B0F19] border border-gray-800 text-sm">
                    {book.category}
                  </p>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase tracking-wider font-bold text-gray-500">
                    Prix
                  </label>
                  <p className="px-3 py-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 font-bold text-sm">
                    {book.price ? `${book.price} DH` : "Gratuit"}
                  </p>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider font-bold text-gray-500">
                  Description
                </label>
                <div className="p-4 rounded-xl bg-[#0B0F19] border border-gray-800 text-sm text-gray-300 leading-relaxed min-h-[100px]">
                  {book.description || (
                    <span className="italic text-gray-600">
                      Aucune description disponible pour ce livre.
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div className="p-6 bg-[#0B0F19]/50 border-t border-gray-800">
            <button
              onClick={onClose}
              className="w-full py-3 rounded-xl bg-gray-800 hover:bg-gray-700 font-bold text-white transition-all transform active:scale-[0.98]"
            >
              Fermer les détails
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
