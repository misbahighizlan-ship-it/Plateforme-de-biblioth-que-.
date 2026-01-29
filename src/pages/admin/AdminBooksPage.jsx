import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBooks,
  deleteBook,
  updateBook,
} from "../../redux/slices/booksSlice";

import AdminSidebar from "../../components/admin/AdminSidebar";
import EditBookModal from "../../components/admin/EditBookModal";
import ViewBookModal from "../../components/admin/ViewBookModal";
import DeleteConfirmModal from "../../components/admin/DeleteConfirmModal";

import { FiEdit, FiTrash2, FiEye, FiSearch } from "react-icons/fi";

export default function AdminBooksPage() {
  const dispatch = useDispatch();
  const { list: books, loading } = useSelector((state) => state.books);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const [selectedBook, setSelectedBook] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const categories = ["all", ...new Set(books.map((b) => b.category))];

  const filteredBooks = books.filter((book) => {
    const matchSearch =
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase());

    const matchCategory =
      categoryFilter === "all" || book.category === categoryFilter;

    return matchSearch && matchCategory;
  });

  // DELETE HANDLER
  const handleDeleteClick = (book) => {
    setSelectedBook(book);
    setIsDeleteOpen(true);
  };

  const handleDeleteConfirm = (id) => {
    dispatch(deleteBook(id));
    setIsDeleteOpen(false);
  };

  // UPDATE HANDLER
  const handleUpdate = (data) => {
    dispatch(updateBook({ id: selectedBook.id, data }));
  };

  return (
    <div className="flex min-h-screen bg-[#0B0F19] text-white">
      <AdminSidebar />

      <main className="flex-1 p-8">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold">Books</h2>
            <p className="text-gray-400 text-sm">
              Manage all books in your platform
            </p>
          </div>
        </div>

        {/* FILTER CARD */}
        <div className="bg-[#111827] rounded-2xl p-6 mb-6 shadow-lg">
          <div className="flex flex-col md:flex-row gap-4">
            {/* SEARCH */}
            <div className="relative flex-1">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                placeholder="Search by title or author..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#0B0F19] border border-gray-800 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* CATEGORY */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-3 rounded-xl bg-[#0B0F19] border border-gray-800 focus:outline-none focus:border-blue-500"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* TABLE CARD */}
        <div className="bg-[#111827] rounded-2xl shadow-lg overflow-hidden">
          {loading ? (
            <p className="p-6 text-gray-400">Loading...</p>
          ) : (
            <table className="w-full">
              <thead className="bg-[#0B0F19] text-gray-400 text-sm">
                <tr>
                  <th className="p-5 text-left">Title</th>
                  <th className="p-5 text-left">Author</th>
                  <th className="p-5 text-left">Category</th>
                  <th className="p-5 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredBooks.map((book) => (
                  <tr
                    key={book.id}
                    className="border-t border-gray-800 hover:bg-[#0B0F19] transition"
                  >
                    <td className="p-5 font-medium">{book.title}</td>
                    <td className="p-5 text-gray-400">{book.author}</td>
                    <td className="p-5">
                      <span className="px-3 py-1 text-xs rounded-full bg-blue-500/15 text-blue-400">
                        {book.category}
                      </span>
                    </td>

                    <td className="p-5">
                      <div className="flex justify-center gap-3">
                        {/* VIEW */}
                        <button
                          onClick={() => {
                            setSelectedBook(book);
                            setIsViewOpen(true);
                          }}
                          className="p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20"
                        >
                          <FiEye />
                        </button>

                        {/* EDIT */}
                        <button
                          onClick={() => {
                            setSelectedBook(book);
                            setIsEditOpen(true);
                          }}
                          className="p-2 rounded-lg bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20"
                        >
                          <FiEdit />
                        </button>

                        {/* DELETE */}
                        <button
                          onClick={() => handleDeleteClick(book)}
                          className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {filteredBooks.length === 0 && !loading && (
            <p className="p-6 text-center text-gray-500">No books found</p>
          )}
        </div>

        {/* MODALS */}
        <EditBookModal
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          book={selectedBook}
          onSave={handleUpdate}
        />

        <ViewBookModal
          isOpen={isViewOpen}
          onClose={() => setIsViewOpen(false)}
          book={selectedBook}
        />

        <DeleteConfirmModal
          isOpen={isDeleteOpen}
          onClose={() => setIsDeleteOpen(false)}
          onConfirm={handleDeleteConfirm}
          book={selectedBook}
        />
      </main>
    </div>
  );
}
