import { useState } from "react";
import { useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiPlusCircle, FiCheck } from "react-icons/fi";
import { addCategory } from "../../slices/categoriesSlice";

export default function AddCategoryModal({ open, onClose }) {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ name: "", description: "" });

  if (!open) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;

    dispatch(
      addCategory({
        ...form,
        booksCount: 0,
        createdAt: new Date().toISOString(),
      })
    );
    setForm({ name: "", description: "" });
    onClose();
  };

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
          className="relative bg-[#111827] w-full max-w-md rounded-2xl shadow-2xl border border-gray-800 text-white overflow-hidden"
        >
          {/* HEADER (Red Accent) */}
          <div className="bg-[#0B0F19] p-6 border-b border-gray-800 flex justify-between items-center text-red-500">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-500/10 rounded-lg">
                <FiPlusCircle size={24} />
              </div>
              <h3 className="text-xl font-bold">Nouvelle Catégorie</h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors"
            >
              <FiX size={20} />
            </button>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Nom de la catégorie
              </label>
              <input
                autoFocus
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Ex: Fantastique, Science-Fiction..."
                className="w-full px-4 py-3 rounded-xl bg-[#0B0F19] border border-gray-800 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 text-white placeholder-gray-600 transition-all font-medium"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Description (optionnel)
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Brève description de la thématique..."
                rows="3"
                className="w-full px-4 py-3 rounded-xl bg-[#0B0F19] border border-gray-800 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 text-white placeholder-gray-600 transition-all resize-none"
              ></textarea>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-3 rounded-xl bg-gray-800 hover:bg-gray-700 font-semibold transition-colors"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-3 rounded-xl bg-red-600 hover:bg-red-500 font-bold shadow-lg shadow-red-900/20 transition-all transform active:scale-95 flex items-center justify-center gap-2"
              >
                <FiCheck />
                Créer
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
