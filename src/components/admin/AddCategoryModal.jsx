import { useState } from "react";
import { useDispatch } from "react-redux";
import { addCategory } from "../../redux/slices/categoriesSlice";
import { FiX } from "react-icons/fi";

export default function AddCategoryModal({ open, onClose }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  if (!open) return null;

  const submit = () => {
    if (!name.trim()) return;
    dispatch(addCategory({ name }));
    setName("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      
      {/* 🔥 BACKDROP flou */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />

      {/* MODAL */}
      <div className="relative bg-[#111827] w-full max-w-sm rounded-2xl p-6 shadow-2xl text-white">

        {/* ❌ Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <FiX size={20} />
        </button>

        {/* HEADER */}
        <h3 className="text-2xl font-bold mb-4 text-red-400">
          Nouvelle catégorie
        </h3>

        {/* INPUT */}
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nom de la catégorie"
          className="w-full px-4 py-3 rounded-xl
                     bg-[#0B0F19] border border-gray-800
                     text-white placeholder-gray-400
                     outline-none focus:ring-2 focus:ring-red-400"
        />

        {/* FOOTER BUTTONS */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-gray-700 hover:bg-gray-400 transition"
          >
            Cancel
          </button>

          <button
            onClick={submit}
            className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 transition"
          >
            Ajouter
          </button>
        </div>
      </div>
    </div>
  );
}
