import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBooks,
  deleteBook,
  updateBook,
} from "../../slices/booksSlice";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminHeader from "../../components/admin/AdminHeader";
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
      book.title?.toLowerCase().includes(search.toLowerCase()) ||
      book.author?.toLowerCase().includes(search.toLowerCase());
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
    <div className="flex min-h-screen bg-[#f8f9fa] dark:bg-[#0B0F19] text-gray-900 dark:text-white transition-colors duration-300">
      <AdminSidebar />
      <main className="flex-1 p-4 md:p-8 pt-16 md:pt-8 max-w-[1600px] mx-auto w-full">
        {/* HEADER */}
        <div className="mb-8">
          <AdminHeader />
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-black tracking-tight text-gray-800 dark:text-white">
              Livres
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Gérez efficacement votre catalogue d'ouvrages.
            </p>
          </div>
        </div>

        {/* FILTER CARD */}
        <div className="bg-white dark:bg-[#111827] rounded-3xl p-6 mb-8 shadow-lg border border-gray-100 dark:border-gray-800">
          <div className="flex flex-col md:flex-row gap-4">
            {/* SEARCH */}
            <div className="relative flex-1">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                placeholder="Rechercher par titre ou auteur..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-gray-50 dark:bg-[#0B0F19] border border-gray-200 dark:border-gray-800 focus:outline-none focus:border-pink-400 dark:focus:border-blue-500 text-gray-700 dark:text-white transition-all"
              />
            </div>

            {/* CATEGORY */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-6 py-3 rounded-2xl bg-gray-50 dark:bg-[#0B0F19] border border-gray-200 dark:border-gray-800 focus:outline-none focus:border-pink-400 dark:focus:border-blue-500 text-gray-700 dark:text-white transition-all font-semibold text-sm cursor-pointer"
            >
              <option value="all">Toutes les catégories</option>
              {categories.slice(1).map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* TABLE CARD */}
        <div className="bg-white dark:bg-[#111827] rounded-3xl shadow-lg border border-gray-100 dark:border-gray-800 overflow-hidden">
          {loading ? (
            <div className="p-10 text-center">
              <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-400 font-medium">Chargement du catalogue...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead className="bg-gray-50 dark:bg-[#0B0F19]/50 text-gray-400 text-[10px] uppercase font-black tracking-widest">
                  <tr>
                    <th className="p-5 text-left">Titre</th>
                    <th className="p-5 text-left hidden sm:table-cell">Auteur</th>
                    <th className="p-5 text-left hidden md:table-cell">Catégorie</th>
                    <th className="p-5 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {filteredBooks.map((book) => (
                    <tr
                      key={book.id}
                      className="hover:bg-gray-50 dark:hover:bg-[#0B0F19]/40 transition-colors group"
                    >
                      <td className="p-5">
                        <p className="font-bold text-gray-800 dark:text-gray-200 group-hover:text-blue-500 transition-colors">
                          {book.title}
                        </p>
                      </td>
                      <td className="p-5 text-gray-500 dark:text-gray-400 text-sm hidden sm:table-cell font-medium">
                        {book.author}
                      </td>
                      <td className="p-5 hidden md:table-cell">
                        <span className="px-3 py-1 text-[10px] font-black uppercase tracking-tight rounded-lg bg-blue-500/10 text-blue-500 border border-blue-500/10">
                          {book.category}
                        </span>
                      </td>
                      <td className="p-5">
                        <div className="flex justify-center gap-2">
                          {/* VIEW */}
                          <button
                            onClick={() => {
                              setSelectedBook(book);
                              setIsViewOpen(true);
                            }}
                            className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-500 hover:bg-blue-500 hover:text-white transition-all shadow-sm"
                            title="Voir"
                          >
                            <FiEye size={18} />
                          </button>
                          {/* EDIT */}
                          <button
                            onClick={() => {
                              setSelectedBook(book);
                              setIsEditOpen(true);
                            }}
                            className="p-2.5 rounded-xl bg-yellow-50 dark:bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500 hover:text-white transition-all shadow-sm"
                            title="Modifier"
                          >
                            <FiEdit size={18} />
                          </button>
                          {/* DELETE */}
                          <button
                            onClick={() => handleDeleteClick(book)}
                            className="p-2.5 rounded-xl bg-red-50 dark:bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm"
                            title="Supprimer"
                          >
                            <FiTrash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {filteredBooks.length === 0 && !loading && (
            <div className="p-20 text-center">
              <div className="w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
                <FiSearch className="text-gray-300 text-2xl" />
              </div>
              <p className="text-gray-400 font-bold tracking-tight italic">Aucun livre trouvé</p>
              <button
                onClick={() => { setSearch(""); setCategoryFilter("all") }}
                className="mt-4 text-xs font-black text-blue-500 uppercase tracking-widest hover:underline"
              >
                Réinitialiser la recherche
              </button>
            </div>
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
          item={selectedBook}
          type="Book"
        />
      </main>
    </div>
  );
}
