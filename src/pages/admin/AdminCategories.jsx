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

import { FiTrash2, FiSearch, FiPlus, FiTag, FiFilter } from "react-icons/fi";

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
  const [sortBy, setSortBy] = useState("name-asc");
  const [openAdd, setOpenAdd] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const filteredCategories = categories
    .filter((cat) => cat.name?.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      const countA = books.filter(bk => bk.category === a.name).length;
      const countB = books.filter(bk => bk.category === b.name).length;
      if (sortBy === "name-asc") return a.name?.localeCompare(b.name);
      if (sortBy === "name-desc") return b.name?.localeCompare(a.name);
      if (sortBy === "books-desc") return countB - countA;
      if (sortBy === "books-asc") return countA - countB;
      return 0;
    });

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
    <div className="flex min-h-screen bg-[#f8f9fa] text-gray-900 transition-colors duration-300 font-sans">
      <AdminSidebar />

      <main className="flex-1 p-4 md:p-8 pt-16 md:pt-8 max-w-[1600px] mx-auto w-full">
        {/* HEADER */}
        <div className="mb-8">
          <AdminHeader />
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-black tracking-tight text-gray-800">
              Gestion des Catégories
            </h2>
            <p className="text-sm text-gray-500 mt-1">
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
        <div className="bg-white rounded-3xl p-6 mb-8 shadow-lg border border-gray-100">
          <div className="flex flex-col sm:flex-row gap-4 items-center">

            {/* Search */}
            <div className="relative flex-1 w-full">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                placeholder="Rechercher une catégorie..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-4 rounded-2xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-pink-400 text-gray-700 transition-all font-medium"
              />
            </div>

            {/* Sort Filter */}
            <div className="relative w-full sm:w-64">
              <FiFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full pl-11 pr-4 py-4 rounded-2xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-pink-400 text-gray-700 transition-all font-medium appearance-none cursor-pointer"
              >
                <option value="name-asc">Nom : A → Z</option>
                <option value="name-desc">Nom : Z → A</option>
                <option value="books-desc">Plus de livres</option>
                <option value="books-asc">Moins de livres</option>
              </select>
            </div>

          </div>
        </div>


        {/* TABLE */}
        <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="p-20 text-center">
              <div className="animate-spin w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-400 font-bold">Chargement des catégories...</p>
            </div>
          ) : (
            <>
              {/* ═══ MOBILE CARDS ═══ */}
              <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
                {filteredCategories.map((cat, index) => {
                  const colorCircle = COLORS[index % COLORS.length];
                  const bookCount = books.filter(b => b.category === cat.name).length;
                  return (
                    <div
                      key={cat.id}
                      className="bg-gray-50 rounded-2xl p-4 border border-gray-100 hover:shadow-md transition-all"
                    >
                      <div className="flex items-center justify-between gap-3 mb-3">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className={`h-2.5 w-2.5 rounded-full ${colorCircle} shadow-sm animate-pulse shrink-0`}></span>
                          <span className="font-bold text-gray-800 text-sm truncate">{cat.name}</span>
                        </div>
                        <span className="px-2.5 py-1 rounded-lg text-[10px] font-black uppercase bg-blue-500/10 text-blue-500 border border-blue-500/10 shrink-0">
                          {bookCount} livres
                        </span>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                        <span className="text-[11px] text-gray-400 font-medium">
                          {cat.createdAt
                            ? new Date(cat.createdAt).toLocaleDateString("fr-FR", {
                              day: "2-digit", month: "short", year: "numeric",
                            })
                            : "—"}
                        </span>
                        <button
                          onClick={() => handleDeleteClick(cat)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all text-xs font-bold"
                        >
                          <FiTrash2 size={14} /> Supprimer
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* ═══ DESKTOP TABLE ═══ */}
              <div className="hidden md:block">
                <table className="w-full">
                  <thead className="bg-gray-50 text-gray-400 text-[10px] uppercase font-black tracking-widest">
                    <tr>
                      <th className="p-6 text-left">Nom de la Catégorie</th>
                      <th className="p-6 text-center">Livres</th>
                      <th className="p-6 text-center">Créée le</th>
                      <th className="p-6 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredCategories.map((cat, index) => {
                      const colorCircle = COLORS[index % COLORS.length];
                      return (
                        <tr
                          key={cat.id}
                          className="hover:bg-gray-50 transition group"
                        >
                          <td className="p-6">
                            <div className="flex items-center gap-3">
                              <span className={`h-2.5 w-2.5 rounded-full ${colorCircle} shadow-sm shadow-current/50 animate-pulse`}></span>
                              <span className="font-bold text-gray-800 group-hover:text-blue-500 transition-colors">
                                {cat.name}
                              </span>
                            </div>
                          </td>
                          <td className="p-6 text-center">
                            <span className="px-3 py-1.5 rounded-xl text-[10px] font-black uppercase bg-blue-500/10 text-blue-500 border border-blue-500/10">
                              {books.filter(b => b.category === cat.name).length} livres
                            </span>
                          </td>
                          <td className="p-6 text-center text-gray-400 text-xs font-medium">
                            {cat.createdAt
                              ? new Date(cat.createdAt).toLocaleDateString("fr-FR", {
                                day: "2-digit", month: "short", year: "numeric",
                              })
                              : "—"}
                          </td>
                          <td className="p-6 text-center">
                            <button
                              onClick={() => handleDeleteClick(cat)}
                              className="p-3 rounded-2xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-sm"
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
            </>
          )}

          {filteredCategories.length === 0 && !loading && (
            <div className="p-20 text-center">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
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
    <div className="bg-white rounded-[2rem] p-5 md:p-8 border border-gray-100 shadow-lg hover:-translate-y-2 transition-all group overflow-hidden relative">
      {/* Colored top accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-1 rounded-t-[2rem] opacity-70 group-hover:opacity-100 transition-opacity"
        style={{ background: `linear-gradient(90deg, ${color}, ${color}88)` }}
      />

      <div className="flex items-center justify-between mb-4">
        <p className="text-gray-400 text-[10px] uppercase tracking-[0.2em] font-black relative z-10">
          {title}
        </p>
        <div
          className="p-2.5 rounded-xl relative z-10 transition-transform group-hover:scale-110"
          style={{ backgroundColor: `${color}18`, color }}
        >
          {icon}
        </div>
      </div>
      <h3 className="text-3xl md:text-5xl font-black tracking-tighter relative z-10 leading-none" style={{ color }}>
        {value}
      </h3>

      {/* Decorative gradient blob */}
      <div
        className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full opacity-[0.06] group-hover:opacity-[0.12] group-hover:scale-125 transition-all duration-500"
        style={{ backgroundColor: color }}
      />
    </div>
  );
}

// Pour faire fonctionner FiBook et FiTrendingUp dans StatCard
import { FiBook, FiTrendingUp } from "react-icons/fi";
