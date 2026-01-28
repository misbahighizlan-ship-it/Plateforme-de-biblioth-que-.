// components/admin/AdminSidebar.jsx
import { NavLink } from "react-router-dom";

export default function AdminSidebar() {
  const linkClass = ({ isActive }) =>
    `block px-4 py-2 rounded-lg ${
      isActive ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-700"
    }`;

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-8 text-center">BiblioIA</h1>

      <nav className="space-y-2">
        <NavLink to="/admin/dashboard" className={linkClass}>
          📊 Dashboard
        </NavLink>
        <NavLink to="/admin/books" className={linkClass}>
          📚 Livres
        </NavLink>
        <NavLink to="/admin/messages" className={linkClass}>
          💬 Messages
        </NavLink>
      </nav>
    </aside>
  );
}
