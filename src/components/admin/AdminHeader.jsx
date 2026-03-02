import { useSelector } from "react-redux";
import { FiBell } from "react-icons/fi";

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
