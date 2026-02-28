import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  deleteCategory,
} from "../../slices/categoriesSlice";

import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminHeader from "../../components/admin/AdminHeader";
import AddCategoryModal from "../../components/admin/AddCategoryModal";
import DeleteConfirmModal from "../../components/admin/DeleteConfirmModal";

import { FiTrash2, FiSearch, FiPlus, FiTag } from "react-icons/fi";

export default function AdminCategories() {
  const COLORS = [
    "bg-pink-500",
    "bg-purple-500",
    "bg-blue-500",
    "bg-yellow-500",
    "bg-green-500",
    "bg-indigo-500",
    "bg-red-500",
  ];

  const dispatch = useDispatch();
  const { list: categories, loading } = useSelector((state) => state.categories);
  const { list: books } = useSelector((state) => state.books);

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
  // Calculation with real books list if available
  const totalBooks = books.length;
  const avgPerCategory =
    totalCategories > 0 ? Math.round(totalBooks / totalCategories) : 0;

  const handleDeleteClick = (category) => {
    setSelectedCategory(category);
    setIsDeleteOpen(true);
  };

  const handleDeleteConfirm = (id) => {
    dispatch(deleteCategory(id));
    setIsDeleteOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-[#f8f9fa] dark:bg-[#0B0F19] text-gray-900 dark:text-white transition-colors duration-300 font-sans">
      <AdminSidebar />

      <main className="flex-1 p-4 md:p-8 pt-16 md:pt-8 max-w-[1600px] mx-auto w-full">
        {/* HEADER */}
        <div className="mb-8">
          <AdminHeader />
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-black tracking-tight text-gray-800 dark:text-white">
              Gestion des Catégories
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Organisez votre bibliothèque par thématiques.
            </p>
          </div>

          <button
            onClick={() => setOpenAdd(true)}
            style={{
              cursor: "pointer",
              background: "linear-gradient(135deg, #ff758c, #7a5cff)"
            }}
            className="flex items-center gap-2 px-6 py-4 rounded-2xl
                       text-white font-bold text-sm shadow-xl shadow-pink-500/20
                       hover:scale-105 hover:shadow-pink-500/40 transition-all active:scale-95"
          >
            <FiPlus size={20} />
            Nouvelle Catégorie
          </button>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-10">
          <StatCard title="Total Catégories" value={totalCategories} color="#ff758c" icon={<FiTag />} />
          <StatCard title="Total Livres" value={totalBooks} color="#7a5cff" icon={<FiBook size={20} />} />
          <StatCard title="Moyenne / Cat" value={avgPerCategory} color="#5db2e3" icon={<FiTrendingUp size={20} />} />
        </div>

        {/* SEARCH & FILTER */}
        <div className="bg-white dark:bg-[#111827] rounded-3xl p-6 mb-8 shadow-lg border border-gray-100 dark:border-gray-800">
          <div className="relative max-w-md">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              placeholder="Rechercher une catégorie..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-4 rounded-2xl bg-gray-50 dark:bg-[#0B0F19] border border-gray-200 dark:border-gray-800 focus:outline-none focus:border-pink-400 dark:focus:border-blue-500 text-gray-700 dark:text-white transition-all font-medium"
            />
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white dark:bg-[#111827] rounded-3xl shadow-lg border border-gray-100 dark:border-gray-800 overflow-hidden">
          {loading ? (
            <div className="p-20 text-center">
              <div className="animate-spin w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-400 font-bold">Chargement des catégories...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead className="bg-gray-50 dark:bg-[#0B0F19]/50 text-gray-400 text-[10px] uppercase font-black tracking-widest">
                  <tr>
                    <th className="p-6 text-left">Nom de la Catégorie</th>
                    <th className="p-6 text-left hidden md:table-cell">Description</th>
                    <th className="p-6 text-center">Livres</th>
                    <th className="p-6 text-center hidden sm:table-cell">Créée le</th>
                    <th className="p-6 text-center">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {filteredCategories.map((cat, index) => {
                    const colorCircle = COLORS[index % COLORS.length];

                    return (
                      <tr
                        key={cat.id}
                        className="hover:bg-gray-50 dark:hover:bg-[#0B0F19]/40 transition group"
                      >
                        {/* NAME */}
                        <td className="p-6">
                          <div className="flex items-center gap-3">
                            <span className={`h-2.5 w-2.5 rounded-full ${colorCircle} shadow-sm shadow-current/50 animate-pulse`}></span>
                            <span className="font-bold text-gray-800 dark:text-gray-200 group-hover:text-blue-500 transition-colors">
                              {cat.name}
                            </span>
                          </div>
                        </td>

                        {/* DESCRIPTION */}
                        <td className="p-6 text-gray-500 dark:text-gray-400 text-sm max-w-sm truncate hidden md:table-cell font-medium">
                          {cat.description || "—"}
                        </td>

                        {/* BOOKS COUNT */}
                        <td className="p-6 text-center">
                          <span className="px-3 py-1.5 rounded-xl text-[10px] font-black uppercase bg-blue-500/10 text-blue-500 border border-blue-500/10">
                            {books.filter(b => b.category === cat.name).length} livres
                          </span>
                        </td>

                        {/* DATE */}
                        <td className="p-6 text-center text-gray-400 text-xs hidden sm:table-cell font-medium">
                          {cat.createdAt
                            ? new Date(cat.createdAt).toLocaleDateString("fr-FR", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })
                            : "—"}
                        </td>

                        {/* ACTION */}
                        <td className="p-6 text-center">
                          <button
                            onClick={() => handleDeleteClick(cat)}
                            className="p-3 rounded-2xl bg-red-50 dark:bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm"
                            title="Supprimer"
                          >
                            <FiTrash2 size={18} />
                          </button>
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
              <div className="w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
                <FiSearch className="text-gray-300 text-2xl" />
              </div>
              <p className="text-gray-400 font-bold tracking-tight italic">Aucune catégorie trouvée</p>
              <button
                onClick={() => setSearch("")}
                className="mt-4 text-xs font-black text-blue-500 uppercase tracking-widest hover:underline"
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

function StatCard({ title, value, color, icon }) {
  return (
    <div className="bg-white dark:bg-[#111827] rounded-[2rem] p-8 border border-gray-100 dark:border-gray-800 shadow-lg hover:-translate-y-2 transition-all group overflow-hidden relative">
      <div className="flex items-center justify-between mb-2">
        <p className="text-gray-400 text-[10px] uppercase tracking-[0.2em] font-black relative z-10">
          {title}
        </p>
        <div className="text-gray-200 dark:text-gray-800 relative z-10 transition-colors group-hover:text-blue-500/50">
          {icon}
        </div>
      </div>
      <h3 className="text-4xl font-black text-gray-800 dark:text-white tracking-tighter relative z-10 leading-none">
        {value}
      </h3>

      {/* Decorative gradient dot */}
      <div
        className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full opacity-[0.05] group-hover:opacity-[0.1] group-hover:scale-150 transition-all duration-500"
        style={{ backgroundColor: color }}
      />
    </div>
  );
}

// Pour faire fonctionner FiBook et FiTrendingUp dans StatCard
import { FiBook, FiTrendingUp } from "react-icons/fi";
