import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../../redux/slices/booksSlice";
import AdminSidebar from "../../components/admin/AdminSidebar";

export default function AdminBooksPage() {
  const dispatch = useDispatch();

  // importer data depuis redux
  const { list: books, loading } = useSelector(
    (state) => state.books
  );

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  return (
    <div className="flex bg-gray-950 min-h-screen">
      <AdminSidebar />

      <main className="flex-1 p-8 text-white">
        <h2 className="text-3xl font-bold mb-6">Gestion des livres</h2>

        {loading ? (
          <p>Chargement...</p>
        ) : (
          <div className="bg-gray-800 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-700 text-left">
                <tr>
                  <th className="p-4">Titre</th>
                  <th className="p-4">Auteur</th>
                  <th className="p-4">Catégorie</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book) => (
                  <tr key={book.id} className="border-t border-gray-700">
                    <td className="p-4">{book.title}</td>
                    <td className="p-4">{book.author}</td>
                    <td className="p-4">{book.category}</td>
                    <td className="p-4 space-x-2">
                      <button className="text-blue-400">✏️</button>
                      <button className="text-red-400">🗑️</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
