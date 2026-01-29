import { FiX } from "react-icons/fi";

export default function ViewBookModal({ isOpen, onClose, book }) {
  if (!isOpen || !book) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      
      {/* BACKDROP BLUR */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />

      {/* MODAL */}
      <div className="relative bg-gray-900 w-full max-w-md rounded-xl p-6 shadow-xl text-white">
        
        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <FiX size={20} />
        </button>

        {/* HEADER (نفس Edit) */}
        <h3 className="text-xl font-semibold mb-1">
          Détails du livre
        </h3>
        <p className="text-gray-400 text-sm mb-6">
          Informations complètes du livre
        </p>

        {/* CONTENT (نفس form layout ولكن read-only) */}
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-400">Titre</label>
            <div className="w-full mt-1 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700">
              {book.title}
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-400">Auteur</label>
            <div className="w-full mt-1 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700">
              {book.author}
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-400">Catégorie</label>
            <div className="w-full mt-1 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700">
              {book.category}
            </div>
          </div>
        </div>

        {/* FOOTER (نفس Edit) */}
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}
