import { FiX } from "react-icons/fi";

export default function DeleteConfirmModal({ isOpen, onClose, onConfirm, book }) {
  if (!isOpen || !book) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* BACKDROP */}
      <div onClick={onClose} className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* MODAL */}
      <div className="relative bg-[#111827] w-full max-w-sm rounded-2xl p-6 shadow-2xl text-white">
        {/* CLOSE BUTTON */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
          <FiX size={20} />
        </button>

        {/* HEADER */}
        <h3 className="text-2xl font-bold mb-2 text-red-400">Delete Book</h3>
        <p className="text-gray-400 text-sm mb-6">
          Are you sure you want to delete <span className="font-semibold text-white">{book.title}</span>? This action cannot be undone.
        </p>

        {/* FOOTER BUTTONS */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-gray-700 hover:bg-gray-600 transition"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(book.id)}
            className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-500 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
