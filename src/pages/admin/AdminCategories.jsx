import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  deleteCategory,
} from "../../slices/categoriesSlice";

import AdminSidebar from "../../components/admin/AdminSidebar";
import AddCategoryModal from "../../components/admin/AddCategoryModal";
import DeleteConfirmModal from "../../components/admin/DeleteConfirmModal";

import { FiTrash2, FiSearch, FiPlus } from "react-icons/fi";

export default function AdminCategories() {
  const COLORS = [
    "bg-blue-500",
    "bg-green-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-yellow-500",
    "bg-red-500",
    "bg-indigo-500",
  ];

  const dispatch = useDispatch();
  const { list: categories, loading } = useSelector((state) => state.categories);

  const [search, setSearch] = useState("");
  const [openAdd, setOpenAdd] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const filteredCategories = categories.filter((cat) =>
    cat.name?.toLowerCase().includes(search.toLowerCase())
  );

  const totalCategories = categories.length;
  const totalBooks = categories.reduce(
    (sum, cat) => sum + (cat.booksCount || 0),
    0
  );

  const avgPerCategory =
    totalCategories > 0 ? Math.round(totalBooks / totalCategories) : 0;

  // Handles starting the deletion process
  const handleDeleteClick = (category) => {
    setSelectedCategory(category);
    setIsDeleteOpen(true);
  };

  // Final confirmation from the modal
  const handleDeleteConfirm = (id) => {
    dispatch(deleteCategory(id));
    setIsDeleteOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-[#0B0F19] text-white font-sans">
      <AdminSidebar />

      <main className="flex-1 p-8">
        {/* HEADER */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold">Gestion des Catégories</h2>
            <p className="text-gray-400 text-sm mt-1">
              Organisez votre bibliothèque par thématiques
            </p>
          </div>

          <button
            onClick={() => setOpenAdd(true)}
            className="flex items-center gap-2 bg-[#2B55B5] hover:bg-blue-600 px-6 py-2.5 rounded-xl font-semibold transition shadow-lg shadow-blue-900/20"
          >
            <FiPlus size={20} />
            Nouvelle Catégorie
          </button>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard title="Total Catégories" value={totalCategories} />
          <StatCard title="Total Livres" value={totalBooks} />
          <StatCard title="Moyenne / Catégorie" value={avgPerCategory} />
        </div>

        {/* SEARCH & FILTER */}
        <div className="bg-[#111827] rounded-2xl p-6 mb-6 shadow-xl border border-gray-800">
          <div className="relative max-w-md">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              placeholder="Rechercher une catégorie..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#0B0F19] border border-gray-800 focus:outline-none focus:border-blue-500 text-white placeholder-gray-500 transition-all"
            />
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-[#111827] rounded-2xl shadow-xl overflow-hidden border border-gray-800">
          {loading ? (
            <div className="p-20 text-center">
              <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-400">Chargement des catégories...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[#0B0F19]/50 text-gray-400 text-xs uppercase tracking-wider">
                  <tr>
                    <th className="p-5 text-left font-semibold">Catégorie</th>
                    <th className="p-5 text-left font-semibold">Description</th>
                    <th className="p-5 text-center font-semibold">Livres</th>
                    <th className="p-5 text-center font-semibold">Créée le</th>
                    <th className="p-5 text-center font-semibold">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-800">
                  {filteredCategories.map((cat, index) => {
                    const colorCircle = COLORS[index % COLORS.length];

                    return (
                      <tr
                        key={cat.id}
                        className="hover:bg-[#0B0F19]/40 transition group"
                      >
                        {/* NAME */}
                        <td className="p-5">
                          <div className="flex items-center gap-3">
                            <span className={`h-2.5 w-2.5 rounded-full ${colorCircle} shadow-sm shadow-current/50`}></span>
                            <span className="font-medium group-hover:text-blue-400 transition-colors">
                              {cat.name}
                            </span>
                          </div>
                        </td>

                        {/* DESCRIPTION */}
                        <td className="p-5 text-gray-400 text-sm max-w-xs truncate">
                          {cat.description || "—"}
                        </td>

                        {/* BOOKS COUNT */}
                        <td className="p-5 text-center">
                          <span className="px-3 py-1 rounded-full text-xs bg-blue-500/10 text-blue-400 font-bold border border-blue-500/20">
                            {cat.booksCount || 0}
                          </span>
                        </td>

                        {/* DATE */}
                        <td className="p-5 text-center text-gray-400 text-sm">
                          {cat.createdAt
                            ? new Date(cat.createdAt).toLocaleDateString("fr-FR", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })
                            : "—"}
                        </td>

                        {/* ACTION */}
                        <td className="p-5">
                          <div className="flex justify-center">
                            <button
                              onClick={() => handleDeleteClick(cat)}
                              className="p-2.5 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all transform hover:scale-110 active:scale-95"
                            >
                              <FiTrash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {filteredCategories.length === 0 && !loading && (
            <div className="p-20 text-center">
              <p className="text-gray-500 italic text-lg">Aucune catégorie trouvée</p>
              <button
                onClick={() => setSearch("")}
                className="mt-4 text-blue-400 hover:underline text-sm"
              >
                Effacer la recherche
              </button>
            </div>
          )}
        </div>
      </main>

      <AddCategoryModal
        open={openAdd}
        onClose={() => setOpenAdd(false)}
      />

      <DeleteConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
        item={selectedCategory}
        type="Category"
      />
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-[#111827] rounded-2xl p-6 border border-gray-800 shadow-xl hover:-translate-y-1 transition-transform">
      <p className="text-gray-400 text-sm uppercase tracking-wider font-semibold">
        {title}
      </p>
      <h3 className="text-4xl font-bold mt-2 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
        {value}
      </h3>
    </div>
  );
}
