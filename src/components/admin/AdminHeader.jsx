import { useSelector } from "react-redux";
import { FiSearch, FiBell } from "react-icons/fi";

export default function AdminHeader() {
  const { list: books } = useSelector((state) => state.books);
  const feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];
  const unread = feedbacks.filter(f => !f.read).length;

  const today = new Date().toLocaleDateString("fr-FR", {
    weekday: "long", day: "numeric", month: "long", year: "numeric"
  });

  return (
    <div className="w-full flex flex-col sm:flex-row items-start sm:items-center
                    justify-between gap-4 mb-2">

      {/* Gauche — Titre + date */}
      <div>
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white capitalize">
          {today}
        </h2>
        <p className="text-gray-400 text-xs mt-0.5">
          {books.length} livres dans le catalogue
        </p>
      </div>

      {/* Droite — Search + Notifs */}
      <div className="flex items-center gap-3 w-full sm:w-auto">

        {/* Search */}
        <div className="relative flex-1 sm:w-64">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2
                               text-gray-400 text-sm" />
          <input
            type="text"
            placeholder="Rechercher..."
            className="w-full pl-9 pr-4 py-2.5 rounded-2xl border border-gray-200
                       bg-white dark:bg-[#0B0F19] dark:border-gray-800 text-sm text-gray-700 dark:text-gray-200 outline-none
                       focus:border-pink-400 focus:ring-2 focus:ring-pink-100
                       transition-all"
          />
        </div>

        {/* Notif avis */}
        <div className="relative">
          <button
            style={{ cursor: "pointer" }}
            className="w-10 h-10 rounded-xl bg-white dark:bg-[#0B0F19] border border-gray-200 dark:border-gray-800
                       flex items-center justify-center text-gray-500
                       hover:border-pink-300 hover:text-pink-500 transition-all"
          >
            <FiBell className="text-base" />
          </button>
          {unread > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full
                             text-white text-xs font-bold flex items-center
                             justify-center shadow"
              style={{ background: "linear-gradient(135deg, #ff758c, #7a5cff)" }}>
              {unread}
            </span>
          )}
        </div>

        {/* Avatar admin */}
        <div className="w-10 h-10 rounded-xl flex items-center justify-center
                        text-white font-bold text-sm shadow-md flex-shrink-0"
          style={{ background: "linear-gradient(135deg, #ff758c, #7a5cff)" }}>
          A
        </div>

      </div>
    </div>
  );
}
