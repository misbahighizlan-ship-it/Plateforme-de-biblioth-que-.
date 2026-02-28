import { useState } from "react";
import { NavLink } from "react-router-dom";
import { BiCategory } from "react-icons/bi";
import { FaBook, FaChartBar, FaComments, FaShoppingBag, FaBars, FaTimes } from "react-icons/fa";

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group ${isActive
      ? "bg-blue-600/10 text-blue-400 border border-blue-500/20 shadow-sm shadow-blue-500/10"
      : "text-gray-400 hover:bg-gray-800 hover:text-white"
    }`;

  const iconClass = (isActive) =>
    `text-2xl transition-transform duration-300 group-hover:scale-110 ${isActive ? "text-blue-400" : "text-gray-500 group-hover:text-blue-400"
    }`;

  return (
    <>
      {/* Bouton burger mobile */}
      <button
        onClick={() => setIsOpen(true)}
        style={{ cursor: "pointer" }}
        className="md:hidden fixed top-4 left-4 z-50 w-10 h-10 rounded-xl
                   bg-white dark:bg-[#111827] shadow-lg border border-gray-200 dark:border-gray-800
                   flex items-center justify-center text-gray-700 dark:text-gray-300"
      >
        <FaBars />
      </button>

      {/* Overlay mobile */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:sticky top-0 left-0 h-screen z-50 md:z-auto
          w-64 bg-[#111827] border-r border-gray-800 shadow-2xl md:shadow-none
          flex flex-col p-4 transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Bouton fermer mobile */}
        <button
          onClick={() => setIsOpen(false)}
          style={{ cursor: "pointer" }}
          className="md:hidden absolute top-4 right-4 w-8 h-8 rounded-lg
                     bg-gray-800 flex items-center justify-center
                     text-gray-500 hover:text-white"
        >
          <FaTimes size={14} />
        </button>

        {/* Logo avec gradient */}
        <div className="mb-10 mt-2 text-center">
          <h1 className="text-2xl font-black tracking-tighter bg-gradient-to-r from-[#ff758c] to-[#7a5cff] bg-clip-text text-transparent">
            BiblioIA
          </h1>
          <div className="h-1 w-12 bg-gradient-to-r from-[#ff758c] to-[#7a5cff] mx-auto mt-1 rounded-full opacity-50"></div>
        </div>

        <nav className="flex flex-col gap-3 flex-1">
          <NavLink to="/admin" className={linkClass} onClick={() => setIsOpen(false)}>
            {({ isActive }) => (
              <>
                <FaChartBar className={iconClass(isActive)} />
                <span className="font-semibold">Tableau de bord</span>
              </>
            )}
          </NavLink>

          <NavLink to="/admin/books" className={linkClass} onClick={() => setIsOpen(false)}>
            {({ isActive }) => (
              <>
                <FaBook className={iconClass(isActive)} />
                <span className="font-semibold">Livres</span>
              </>
            )}
          </NavLink>

          <NavLink to="/admin/categorie" className={linkClass} onClick={() => setIsOpen(false)}>
            {({ isActive }) => (
              <>
                <BiCategory className={iconClass(isActive)} />
                <span className="font-semibold">Catégories</span>
              </>
            )}
          </NavLink>

          <NavLink to="/admin/messages" className={linkClass} onClick={() => setIsOpen(false)}>
            {({ isActive }) => (
              <>
                <FaComments className={iconClass(isActive)} />
                <span className="font-semibold">Messages</span>
              </>
            )}
          </NavLink>

          <NavLink to="/orders" className={linkClass} onClick={() => setIsOpen(false)}>
            {({ isActive }) => (
              <>
                <FaShoppingBag className={iconClass(isActive)} />
                <span className="font-semibold">Commandes</span>
              </>
            )}
          </NavLink>
        </nav>

        {/* Bouton déconnexion en bas */}
        <button
          onClick={() => {
            localStorage.removeItem("isAdmin");
            window.location.href = "/";
          }}
          className="flex items-center gap-4 px-4 py-3 mt-8 rounded-xl transition-all duration-300 text-red-400 hover:bg-red-500/10 hover:text-red-500 border border-transparent hover:border-red-500/20"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span className="font-bold">Déconnexion</span>
        </button>
      </aside>
    </>
  );
}
