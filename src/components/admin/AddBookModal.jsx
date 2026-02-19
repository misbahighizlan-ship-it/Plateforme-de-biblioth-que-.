import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiCheck } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";

import { addBook } from "../../slices/booksSlice";
import { fetchCategories } from "../../slices/categoriesSlice";

export default function AddBookModal({ open, onClose }) {
  const dispatch = useDispatch();

  // 🟢 categories depuis Redux
  const { list: categories } = useSelector(
    (state) => state.categories
  );

  const [form, setForm] = useState({
    title: "",
    author: "",
    category: "",
    price: "",
    image: "",
    rating: "",
    description: "", // 🆕 description
  });

  // load categories when modal opens
  useEffect(() => {
    if (open) {
      dispatch(fetchCategories());
    }
  }, [dispatch, open]);

  if (!open) return null;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      addBook({
        ...form,
        price: Number(form.price),
        rating: Number(form.rating),
      })
    );

    setForm({
      title: "",
      author: "",
      category: "",
      price: "",
      image: "",
      rating: "",
      description: "",
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
          initial={{ scale: 0.9, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 30 }}
          className="relative w-full max-w-2xl rounded-3xl p-8 shadow-2xl
                     bg-[#111827] border border-gray-800 text-white
                     max-h-[90vh] overflow-hidden flex flex-col"
        >
          {/* header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-extrabold bg-gradient-to-r from-red-500 to-red-300 bg-clip-text text-transparent">
              Ajouter un nouveau livre
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-800 rounded-full text-gray-400 hover:text-white transition-colors"
            >
              <FiX size={26} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto pr-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-1 md:col-span-2">
                <Input
                  name="title"
                  placeholder="📘 Titre du livre"
                  value={form.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <Input
                name="author"
                placeholder="✍️ Auteur"
                value={form.author}
                onChange={handleChange}
                required
              />

              <Input
                name="price"
                type="number"
                placeholder="💰 Prix (DH)"
                value={form.price}
                onChange={handleChange}
              />

              <Input
                name="image"
                type="url"
                placeholder="🖼️ Lien de l'image (Cloudinary)"
                value={form.image}
                onChange={handleChange}
              />

              <Input
                name="rating"
                type="number"
                min="1"
                max="5"
                step="0.1"
                placeholder="⭐ Rating (1 à 5)"
                value={form.rating}
                onChange={handleChange}
              />
            </div>

            {/* SELECT CATEGORY */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500 ml-1">Catégorie</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                required
                className="w-full rounded-xl px-5 py-3.5
                           bg-[#0B0F19] text-white
                           border border-gray-800
                           outline-none focus:ring-2 focus:ring-red-500/50 transition-all"
              >
                <option value="" className="bg-[#111827]">
                  📂 Choisir une catégorie
                </option>
                {categories.map((cat) => (
                  <option
                    key={cat.id}
                    value={cat.name}
                    className="bg-[#111827]"
                  >
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* DESCRIPTION */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500 ml-1">Description</label>
              <textarea
                name="description"
                placeholder="📝 Décrivez brièvement l'ouvrage..."
                value={form.description}
                onChange={handleChange}
                rows="4"
                className="w-full rounded-xl bg-[#0B0F19] px-5 py-4
                           text-white placeholder-gray-600
                           border border-gray-800 outline-none
                           focus:ring-2 focus:ring-red-500/50 transition-all resize-none"
              ></textarea>
            </div>

            {/* ACTIONS */}
            <div className="flex justify-end gap-4 pt-6 sticky bottom-0 bg-[#111827] pb-2">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 rounded-xl border border-gray-800 text-gray-400 hover:text-white hover:bg-gray-800 transition-all font-semibold"
              >
                Annuler
              </button>

              <button
                type="submit"
                className="px-8 py-3 rounded-xl bg-red-600 text-white font-bold
                           shadow-lg shadow-red-900/20 transition-all hover:bg-red-500 transform active:scale-95 flex items-center gap-2"
              >
                <FiCheck size={20} />
                Ajouter le livre
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

/* INPUT COMPONENT */
function Input({ name, type = "text", placeholder, value, onChange, min, max, step, required = false }) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500 ml-1">{placeholder.split(" ").slice(1).join(" ")}</label>
      <input
        name={name}
        type={type}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl bg-[#0B0F19] px-5 py-3.5
                   text-white placeholder-gray-600
                   border border-gray-800 outline-none
                   focus:ring-2 focus:ring-red-500/50 transition-all"
      />
    </div>
  );
}
