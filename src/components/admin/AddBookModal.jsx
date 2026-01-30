import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiX, FiCheck } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";

import { addBook } from "../../redux/slices/booksSlice";
import { fetchCategories } from "../../redux/slices/categoriesSlice";

export default function AddBookModal({ open, onClose }) {
  const dispatch = useDispatch();

  // 🟢 categories  depuis Redux
  const { list: categories } = useSelector(
    (state) => state.categories
  );

  const [form, setForm] = useState({
    title: "",
    author: "",
    category: "",
  });

  // le model ouvre 
  useEffect(() => {
    if (open) {
      dispatch(fetchCategories());
    }
  }, [dispatch, open]);

  if (!open) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addBook(form));
    setForm({ title: "", author: "", category: "" });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* BACKDROP */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-lg"
      />

      {/* MODAL */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.25 }}
        className="relative w-full max-w-2xl rounded-3xl p-10 shadow-2xl
                   bg-gradient-to-br from-[#009eff] to-[#121c33]"
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-6 top-6 text-white/70 hover:text-white"
        >
          <FiX size={26} />
        </button>

        <h2 className="mb-8 text-2xl font-extrabold text-white">
          Ajouter un livre
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          <Input
            name="title"
            placeholder="📘 Titre du livre"
            value={form.title}
            onChange={handleChange}
          />

          <Input
            name="author"
            placeholder="✍️ Auteur"
            value={form.author}
            onChange={handleChange}
          />

          
          {/*  SELECT CATEGORY */}
<select
  name="category"
  value={form.category}
  onChange={handleChange}
  className="w-full rounded-xl px-5 py-4
             from-[#009eff]  text-white
             border border-white/20
             backdrop-blur-md outline-none
             focus:ring-2 focus:ring-red-400"
>
  {/* Option par défaut */}
  <option value="" className="bg-[#0c1d46] text-whith-400">
    📂 Choisir une catégorie
  </option>

  {categories.map((cat) => (
    <option
      key={cat.id}
      value={cat.name}
      className="bg-[#dc7784] text-white"
    >
      {cat.name}
    </option>
  ))}
</select>


          {/* ACTIONS */}
          <div className="flex justify-end gap-4 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex h-14 w-14 items-center justify-center
                         rounded-full border border-white/40
                         text-white hover:bg-white/10"
            >
              <FiX size={24} />
            </button>

            <button
              type="submit"
              className="flex h-14 w-14 items-center justify-center
                         rounded-full bg-red-500 text-white
                         shadow-xl transition hover:scale-110 hover:bg-red-600"
            >
              <FiCheck size={26} />
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

/* INPUT */
function Input({ name, placeholder, value, onChange }) {
  return (
    <input
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full rounded-xl bg-white/15 px-5 py-4
                 text-white placeholder-white/70
                 backdrop-blur-md outline-none
                 focus:ring-2 focus:ring-red-400"
    />
  );
}
