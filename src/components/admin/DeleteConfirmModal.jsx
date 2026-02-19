import { FiX, FiAlertTriangle } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export default function DeleteConfirmModal({ isOpen, onClose, onConfirm, item, type = "Book" }) {
  if (!isOpen || !item) return null;

  const itemName = type === "Book" ? item.title : item.name;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* BACKDROP */}
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
          className="relative bg-[#111827] w-full max-w-sm rounded-2xl p-6 shadow-2xl text-white border border-gray-800"
        >
          {/* CLOSE BUTTON */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          >
            <FiX size={20} />
          </button>

          {/* ICON */}
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
              <FiAlertTriangle size={32} />
            </div>
          </div>

          {/* HEADER */}
          <h3 className="text-2xl font-bold mb-2 text-center text-red-400">
            Supprimer {type === "Book" ? "le livre" : "la catégorie"}
          </h3>
          <p className="text-gray-400 text-sm mb-8 text-center px-2">
            Êtes-vous sûr de vouloir supprimer <span className="font-semibold text-white">"{itemName}"</span> ? Cette action est irréversible.
          </p>

          {/* FOOTER BUTTONS */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 rounded-xl bg-gray-800 hover:bg-gray-700 font-semibold transition-colors"
            >
              Annuler
            </button>
            <button
              onClick={() => onConfirm(item.id)}
              className="flex-1 px-4 py-3 rounded-xl bg-red-600 hover:bg-red-500 font-bold shadow-lg shadow-red-900/20 transition-all transform active:scale-95 text-white"
            >
              Supprimer
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
