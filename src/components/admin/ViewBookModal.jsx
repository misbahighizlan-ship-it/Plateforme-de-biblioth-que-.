import { FiX } from "react-icons/fi";
import { FaStar } from "react-icons/fa";

export default function ViewBookModal({ isOpen, onClose, book }) {
  if (!isOpen || !book) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      
      {/* BACKDROP */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />

      {/* MODAL */}
      <div className="relative bg-gray-900 w-full max-w-lg rounded-2xl p-8 shadow-xl text-white">
        
        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <FiX size={22} />
        </button>

        {/* HEADER */}
        <h3 className="text-2xl font-semibold mb-1">
          Détails du livre
        </h3>
        <p className="text-gray-400 text-sm mb-6">
          Informations complètes du livre
        </p>

        {/* CONTENT */}
        <div className="space-y-5">
          {/* TITLE */}
          <div>
            <label className="text-sm text-gray-400">Titre</label>
            <div className="w-full mt-1 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700">
              {book.title}
            </div>
          </div>

          {/* IMAGE */}
          <div>
            <label className="text-sm text-gray-400">Image</label>

            {book.image ? (
              <>
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-56 object-cover rounded-xl mb-2"
                />
                <div className="text-xs text-blue-400 break-all">
                  {book.image}
                </div>
              </>
            ) : (
              <div className="text-gray-500 text-sm">No image</div>
            )}
          </div>

          {/* AUTHOR */}
          <div>
            <label className="text-sm text-gray-400">Auteur</label>
            <div className="w-full mt-1 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700">
              {book.author}
            </div>
          </div>

          {/* CATEGORY */}
          <div>
            <label className="text-sm text-gray-400">Catégorie</label>
            <div className="w-full mt-1 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700">
              {book.category}
            </div>
          </div>

          {/* RATING */}
          <div>
            <label className="text-sm text-gray-400">Rating</label>
            <div className="flex items-center gap-2 mt-1 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700">
              <FaStar className="text-yellow-400" />
              <span className="font-semibold">
                {book.rating || 4.5}
              </span>
              <span className="text-sm text-gray-400">/ 5</span>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="flex justify-end mt-8">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 transition"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}
