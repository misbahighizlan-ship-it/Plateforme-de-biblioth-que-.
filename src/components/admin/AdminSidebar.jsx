// components/admin/AdminSidebar.jsx
import { NavLink } from "react-router-dom";
import { BiCategory } from "react-icons/bi";
import { FaBook, FaChartBar, FaComments, FaShoppingBag } from "react-icons/fa";

export default function AdminSidebar() {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-4 px-4 py-2 rounded-lg transition-colors duration-200 ${isActive
      ? " text-white hover:bg-blue-600 "
      : "text-gray-300 hover:bg-blue-600 "
    }`;

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-8 text-center">BiblioIA</h1>

      <nav className="flex flex-col gap-8">
        <NavLink to="/admin" className={linkClass}>
          <FaChartBar className="text-2xl text-blue-400" />
          <span className="text-lg">Tableau de bord</span>
        </NavLink>

        <NavLink to="/admin/books" className={linkClass}>
          <FaBook className="text-2xl text-blue-400" />
          <span className="text-lg">Livres</span>
        </NavLink>

        <NavLink to="/admin/categorie" className={linkClass}>
          <BiCategory className="text-2xl text-blue-400" />
          <span className="text-lg">Catégories</span>
        </NavLink>

        <NavLink to="/admin/messages" className={linkClass}>
          <FaComments className="text-2xl text-blue-400" />
          <span className="text-lg">Messages</span>
        </NavLink>

        <NavLink to="/orders" className={linkClass}>
          <FaShoppingBag className="text-2xl text-blue-400" />
          <span className="text-lg">Commandes</span>
        </NavLink>

        <button
          onClick={() => {
            localStorage.removeItem("isAdmin");
            window.location.href = "/";
          }}
          className="flex items-center gap-4 px-4 py-2 mt-8 rounded-lg transition-colors duration-200 text-red-400 hover:bg-red-600 hover:text-white"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
          <span className="text-lg">Déconnexion</span>
        </button>
      </nav>
    </aside>
  );
}
