import { Outlet, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />

      <main className="flex-1 px-6 py-6">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl
                       bg-[#111827] border border-gray-700 text-gray-400
                       hover:text-white hover:border-[#5db2e3] transition-all text-sm"
          >
            <FaHome /> Retour à l'accueil
          </button>
        </div>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
