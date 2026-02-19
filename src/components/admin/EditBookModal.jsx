import { useEffect, useState } from "react";
import { FiX, FiCheck } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export default function EditBookModal({
  isOpen,
  onClose,
  book,
  onSave,
}) {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    price: "",
    image: "",
    rating: "",
    description: "",
  });

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title || "",
        author: book.author || "",
        category: book.category || "",
        price: book.price || "",
        image: book.image || "",
        rating: book.rating || "",
        description: book.description || "",
      });
    }
  }, [book]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      price: Number(formData.price),
      rating: Number(formData.rating),
    });
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
          className="relative bg-[#111827] w-full max-w-lg rounded-2xl shadow-2xl border border-gray-800 text-white flex flex-col max-h-[90vh]"
        >
          {/* HEADER */}
          <div className="p-6 border-b border-gray-800 flex justify-between items-center bg-[#0B0F19]">
            <div>
              <h3 className="text-xl font-bold">Modifier le livre</h3>
              <p className="text-gray-400 text-xs">Mise à jour des informations</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors"
            >
              <FiX size={20} />
            </button>
          </div>

          {/* FORM CONTENT */}
          <form id="edit-book-form" onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="text-xs font-bold text-gray-500 uppercase">Titre</label>
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full mt-1 px-4 py-2.5 rounded-xl bg-[#0B0F19] border border-gray-800 focus:outline-none focus:border-blue-500 transition-all"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">Auteur</label>
                <input
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  className="w-full mt-1 px-4 py-2.5 rounded-xl bg-[#0B0F19] border border-gray-800 focus:outline-none focus:border-blue-500 transition-all"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">Catégorie</label>
                <input
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full mt-1 px-4 py-2.5 rounded-xl bg-[#0B0F19] border border-gray-800 focus:outline-none focus:border-blue-500 transition-all"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">Prix (DH)</label>
                <input
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full mt-1 px-4 py-2.5 rounded-xl bg-[#0B0F19] border border-gray-800 focus:outline-none focus:border-blue-500 transition-all"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 uppercase">Rating (1-5)</label>
                <input
                  name="rating"
                  type="number"
                  min="1"
                  max="5"
                  step="0.1"
                  value={formData.rating}
                  onChange={handleChange}
                  className="w-full mt-1 px-4 py-2.5 rounded-xl bg-[#0B0F19] border border-gray-800 focus:outline-none focus:border-blue-500 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-500 uppercase">Lien de l'image</label>
              <input
                name="image"
                type="url"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://cloudinary.com/..."
                className="w-full mt-1 px-4 py-2.5 rounded-xl bg-[#0B0F19] border border-gray-800 focus:outline-none focus:border-blue-500 transition-all"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-500 uppercase">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="w-full mt-1 px-4 py-4 rounded-xl bg-[#0B0F19] border border-gray-800 focus:outline-none focus:border-blue-500 transition-all resize-none"
              ></textarea>
            </div>
          </form>

          {/* FOOTER */}
          <div className="p-6 bg-[#0B0F19]/50 border-t border-gray-800 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 font-semibold transition-all"
            >
              Annuler
            </button>
            <button
              form="edit-book-form"
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 font-bold shadow-lg shadow-blue-900/20 transition-all flex items-center gap-2"
            >
              <FiCheck />
              Sauvegarder
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
