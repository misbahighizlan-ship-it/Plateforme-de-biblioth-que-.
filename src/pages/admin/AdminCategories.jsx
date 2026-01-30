import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddCategoryModal from "../../components/admin/AddCategoryModal";

import {
  fetchCategories,
  deleteCategory,
} from "../../redux/slices/categoriesSlice";

import AdminSidebar from "../../components/admin/AdminSidebar";

import { FiTrash2, FiSearch, FiTag } from "react-icons/fi";

export default function AdminCategories() {
  const [openAdd, setOpenAdd] = useState(false);

  const dispatch = useDispatch();
  const { list: categories, loading } = useSelector(
    (state) => state.categories
  );

  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-[#0B0F19] text-white">
      <AdminSidebar />

      <main className="flex-1 p-8">
        {/* HEADER */}
<div className="mb-8 flex justify-between items-center">
  <div>
    <h2 className="text-3xl font-bold">Categories</h2>
    <p className="text-gray-400 text-sm">
      Manage book categories
    </p>
  </div>

  {/* ADD BUTTON */}
  <button
    onClick={() => setOpenAdd(true)}
    className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-500"
  >
    + Nouvelle catégorie
  </button>
</div>


        {/* SEARCH */}
        <div className="bg-[#111827] rounded-2xl p-6 mb-6 shadow-lg">
          <div className="relative max-w-md">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              placeholder="Search category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#0B0F19] border border-gray-800 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-[#111827] rounded-2xl shadow-lg overflow-hidden">
          {loading ? (
            <p className="p-6 text-gray-400">Loading...</p>
          ) : (
            <table className="w-full">
              <thead className="bg-[#0B0F19] text-gray-400 text-sm">
                <tr>
                  <th className="p-5 text-left">Category</th>
                  <th className="p-5 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredCategories.map((cat) => (
                  <tr
                    key={cat.id}
                    className="border-t border-gray-800 hover:bg-[#0B0F19] transition"
                  >
                    <td className="p-5 flex items-center gap-3">
                      <FiTag className="text-blue-400" />
                      <span className="font-medium">{cat.name}</span>
                    </td>

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
                ))}
              </tbody>
            </table>
          )}

          {filteredCategories.length === 0 && !loading && (
            <p className="p-6 text-center text-gray-500">
              No categories found
            </p>
          )}
        </div>
      </main>
      <AddCategoryModal
  open={openAdd}
  onClose={() => setOpenAdd(false)}
/>

    </div>
  );
}
