// pages/admin/AdminBooksPage.jsx
import AdminSidebar from "../../components/admin/AdminSidebar";

export default function AdminBooksPage() {
  const books = [
    { id: 1, title: "1984", author: "George Orwell", category: "Fiction" },
    { id: 2, title: "Sapiens", author: "Yuval Noah Harari", category: "Histoire" },
  ];

  return (
    <div className="flex bg-gray-950 min-h-screen">
      <AdminSidebar />

      <main className="flex-1 p-8 text-white">
        <h2 className="text-3xl font-bold mb-6">Gestion des livres</h2>

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
      </main>
    </div>
  );
}
