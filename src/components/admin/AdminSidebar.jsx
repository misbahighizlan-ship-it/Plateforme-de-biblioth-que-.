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
      </nav>
    </aside>
  );
}
