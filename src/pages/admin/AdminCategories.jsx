import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  deleteCategory,
} from "../../redux/slices/categoriesSlice";

import AdminSidebar from "../../components/admin/AdminSidebar";
import AddCategoryModal from "../../components/admin/AddCategoryModal";

import { FiTrash2, FiSearch } from "react-icons/fi";

export default function AdminCategories() {
  const COLORS = [
  "bg-blue-500 text-blue-400",
  "bg-green-500 text-green-400",
  "bg-purple-500 text-purple-400",
  "bg-pink-500 text-pink-400",
  "bg-yellow-500 text-yellow-400",
  "bg-red-500 text-red-400",
  "bg-indigo-500 text-indigo-400",
];

  const dispatch = useDispatch();

  const { list: categories, loading } = useSelector(
    (state) => state.categories
  );

  const [search, setSearch] = useState("");
  const [openAdd, setOpenAdd] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalCategories = categories.length;
  const totalBooks = categories.reduce(
    (sum, cat) => sum + (cat.booksCount || 0),
    0
  );
  const avgPerCategory =
    totalCategories > 0
      ? Math.round(totalBooks / totalCategories)
      : 0;

  return (
    <div className="flex min-h-screen bg-[#0B0F19] text-white">
      <AdminSidebar />

      <main className="flex-1 p-8">
        {/* HEADER */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold">
              Gestion des Catégories
            </h2>
            <p className="text-gray-400 text-sm">
              Organisez votre bibliothèque par thématiques
            </p>
          </div>

          <button
            onClick={() => setOpenAdd(true)}
            className="bg-blue-600 px-5 py-2 rounded-lg hover:bg-blue-500 transition"
          >
            + Nouvelle Catégorie
          </button>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#111827] rounded-xl p-6">
            <p className="text-gray-400 text-sm">
              Total Catégories
            </p>
            <h3 className="text-3xl font-bold mt-2">
              {totalCategories}
            </h3>
          </div>

          <div className="bg-[#111827] rounded-xl p-6">
            <p className="text-gray-400 text-sm">
              Total Livres
            </p>
            <h3 className="text-3xl font-bold mt-2">
              {totalBooks}
            </h3>
          </div>

          <div className="bg-[#111827] rounded-xl p-6">
            <p className="text-gray-400 text-sm">
              Moyenne par Catégorie
            </p>
            <h3 className="text-3xl font-bold mt-2">
              {avgPerCategory}
            </h3>
          </div>
        </div>

        {/* SEARCH */}
        <div className="bg-[#111827] rounded-2xl p-6 mb-6 shadow-lg">
          <div className="relative max-w-md">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              placeholder="Rechercher une catégorie..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#0B0F19] border border-gray-800 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-[#111827] rounded-2xl shadow-lg overflow-hidden">
          {loading ? (
            <p className="p-6 text-gray-400">
              Chargement...
            </p>
          ) : (
            <table className="w-full">
              <thead className="bg-[#0B0F19] text-gray-400 text-sm">
                <tr>
                  <th className="p-5 text-left">Catégorie</th>
                  <th className="p-5 text-left">Description</th>
                  <th className="p-5 text-center">Livres</th>
                  <th className="p-5 text-center">Créée le</th>
                  <th className="p-5 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredCategories.map((cat, index) => {
  const color =
    COLORS[index % COLORS.length];

  return (
    <tr
      key={cat.id}
      className="border-t border-gray-800 hover:bg-[#0B0F19] transition"
    >
      {/* NAME */}
      <td className="p-5 flex items-center gap-3">
        <span
          className={`h-2 w-2 rounded-full ${color.split(" ")[0]}`}
        ></span>

        <span className="font-medium">
          {cat.name}
        </span>
      </td>

      {/* DESCRIPTION */}
      <td className="p-5 text-gray-400 text-sm">
        {cat.description || "—"}
      </td>

      {/* BOOKS */}
      <td className="p-5 text-center">
        <span
          className={`px-3 py-1 rounded-full text-sm bg-opacity-10 ${
            color.split(" ")[0]
          } ${color.split(" ")[1]}`}
        >
          {cat.booksCount || 0}
        </span>
      </td>

      {/* DATE */}
      <td className="p-5 text-center text-gray-400 text-sm">
        {cat.createdAt
          ? new Date(
              cat.createdAt
            ).toLocaleDateString()
          : "—"}
      </td>

      {/* ACTION */}
      <td className="p-5">
        <div className="flex justify-center">
          <button
            onClick={() =>
              dispatch(deleteCategory(cat.id))
            }
            className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20"
          >
            <FiTrash2 />
          </button>
        </div>
      </td>
    </tr>
  );
})}




              </tbody>
            </table>
          )}

          {filteredCategories.length === 0 &&
            !loading && (
              <p className="p-6 text-center text-gray-500">
                Aucune catégorie trouvée
              </p>
            )}
        </div>
      </main>

      {/* MODAL */}
      <AddCategoryModal
        open={openAdd}
        onClose={() => setOpenAdd(false)}
      />
    </div>
  );
}
