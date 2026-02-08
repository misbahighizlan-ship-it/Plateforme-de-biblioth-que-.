import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";

export default function EditBookModal({
  isOpen,
  onClose,
  book,
  onSave,
}) {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    image: "",
    description: "",
    category: "",
    rating: "",
    price: 0,
  });

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title,
        author: book.author,
        image: book.image,
        category: book.category,
        description: book.description || "",
        rating: book.rating || "",
        price: book.price || 0,
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

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* BACKDROP BLUR */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />

      {/* MODAL */}
      <div className="relative bg-[#111827] w-full max-w-md rounded-2xl p-6 shadow-xl text-white">

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <FiX size={20} />
        </button>

        {/* HEADER */}
        <h3 className="text-2xl font-bold mb-1">
          Edit book
        </h3>
        <p className="text-gray-400 text-sm mb-6">
          Update book information
        </p>

        {/* FORM */}
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-400">Title</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 rounded-xl bg-[#0B0F19] border border-gray-800 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400">Author</label>
            <input
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 rounded-xl bg-[#0B0F19] border border-gray-800 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400">Image URL</label>
            <input
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 rounded-xl
               bg-[#0B0F19] border border-gray-800
               focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 rounded-xl
               bg-[#0B0F19] border border-gray-800
               focus:outline-none focus:border-blue-500"
            />
          </div>


          <div>
            <label className="text-sm text-gray-400">Category</label>
            <input
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 rounded-xl bg-[#0B0F19] border border-gray-800 focus:outline-none focus:border-blue-500"
            />
          </div>
<div>
  <label className="text-sm text-gray-400">Price</label>
  <input
    type="number"
    name="price"
    value={formData.price}
    onChange={handleChange}
    className="w-full mt-1 px-4 py-2 rounded-xl bg-[#0B0F19] border border-gray-800 focus:outline-none focus:border-blue-500"
  />
</div>

          <div>
            <label className="text-sm text-gray-400">Rating</label>
            <input
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              placeholder="4.5"
              className="w-full mt-1 px-4 py-2 rounded-xl
               bg-[#0B0F19] border border-gray-800
               focus:outline-none focus:border-blue-500"
            />
          </div>

        </div>

        {/* FOOTER */}
        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-gray-700 hover:bg-gray-600 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
