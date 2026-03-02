import { useState, useEffect } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminHeader from "../../components/admin/AdminHeader";
import { FaTrash, FaSmileBeam, FaFrown, FaMeh } from "react-icons/fa";
import { FiMessageSquare, FiMail, FiSearch } from "react-icons/fi";
import ConfirmModal from "../../components/ConfirmModal";
import { useToast } from "../../components/Toast";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState([]);
  const [search, setSearch] = useState("");
  const toast = useToast();

  // Confirm modal state
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    messageId: null,
  });

  useEffect(() => {
    // On utilise "feedbacks" pour la cohérence avec le AdminHeader
    const saved = JSON.parse(localStorage.getItem("feedbacks")) || [];
    setMessages(saved);
  }, []);

  const filteredMessages = messages.filter((msg) => {
    const q = search.toLowerCase();
    return (
      msg.name?.toLowerCase().includes(q) ||
      msg.email?.toLowerCase().includes(q) ||
      msg.message?.toLowerCase().includes(q) ||
      msg.type?.toLowerCase().includes(q)
    );
  });

  const handleDeleteClick = (id) => {
    setConfirmModal({ isOpen: true, messageId: id });
  };

  const handleDeleteConfirm = () => {
    const filtered = messages.filter((m) => m.id !== confirmModal.messageId);
    setMessages(filtered);
    localStorage.setItem("feedbacks", JSON.stringify(filtered));
    toast.success("Message supprimé avec succès");
  };

  const getSentimentIcon = (sentiment) => {
    switch (sentiment) {
      case "positif": return <FaSmileBeam className="text-green-500" />;
      case "negatif": return <FaFrown className="text-red-500" />;
      default: return <FaMeh className="text-amber-500" />;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f8f9fa] dark:bg-[#0B0F19] transition-colors duration-300">
      <AdminSidebar />

      <main className="flex-1 p-4 md:p-8 pt-16 md:pt-8 max-w-[1200px] mx-auto w-full">
        {/* HEADER */}
        <div className="mb-8">
          <AdminHeader />
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-black tracking-tight text-gray-800 dark:text-white">
              Messages & Avis
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Consultez les retours de vos utilisateurs.
            </p>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* SEARCH */}
            <div className="relative flex-1 sm:w-64">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
              <input
                type="text"
                placeholder="Rechercher un message..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 rounded-2xl border border-gray-200
                           bg-white outline-none focus:border-pink-400
                           focus:ring-2 focus:ring-pink-100 transition-all text-sm"
              />
            </div>
            <span className="px-4 py-2.5 rounded-xl text-white text-xs font-black uppercase tracking-widest flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #ff758c, #7a5cff)" }}>
              {filteredMessages.length} / {messages.length}
            </span>
          </div>
        </div>

        {messages.length === 0 ? (
          <div className="bg-white dark:bg-[#111827] p-20 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 text-center shadow-lg">
            <div className="w-20 h-20 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
              <FiMessageSquare className="text-gray-300 text-3xl" />
            </div>
            <p className="text-gray-400 font-bold text-lg">Aucun message pour le moment.</p>
            <p className="text-gray-500 text-sm mt-2 font-medium">Les avis des utilisateurs apparaîtront ici.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredMessages.length === 0 ? (
              <div className="col-span-full text-center py-12 text-gray-400">
                <p className="text-lg">🔍 Aucun résultat pour "{search}"</p>
                <button
                  onClick={() => setSearch("")}
                  style={{ cursor: "pointer" }}
                  className="mt-3 text-pink-400 hover:underline text-sm font-bold"
                >
                  Effacer la recherche
                </button>
              </div>
            ) : filteredMessages.map((msg) => (
              <div key={msg.id} className="bg-white dark:bg-[#111827] border border-gray-100 dark:border-gray-800 p-6 md:p-8 rounded-[2rem] flex flex-col gap-6 hover:shadow-xl transition-all group relative overflow-hidden h-full flex-grow flex-shrink">

                {/* Header (Top) */}
                <div className="flex justify-between items-start gap-4">
                  <div className="flex items-center gap-4">
                    {/* Avatar */}
                    <div className="w-12 h-12 shrink-0 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg relative z-10"
                      style={{ background: "linear-gradient(135deg, #ff758c, #7a5cff)" }}>
                      {msg.name?.charAt(0).toUpperCase() || "?"}
                    </div>

                    <div className="min-w-0">
                      <h3 className="font-black text-gray-800 dark:text-gray-200 truncate pr-2 text-base">{msg.name || "Utilisateur anonyme"}</h3>
                      <div className="flex items-center gap-1.5 text-gray-400 text-xs font-semibold mt-0.5">
                        <FiMail size={12} className="shrink-0" />
                        <span className="truncate">{msg.email || "Non renseigné"}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions / Date */}
                  <div className="flex flex-col items-end gap-2 shrink-0 z-10">
                    <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 bg-gray-50 dark:bg-gray-800/50 px-2.5 py-1 rounded-lg">
                      {new Date(msg.date || msg.id).toLocaleDateString("fr-FR", { day: 'numeric', month: 'short' })}
                    </div>

                    <button
                      onClick={() => handleDeleteClick(msg.id)}
                      style={{ cursor: "pointer" }}
                      className="p-2.5 bg-red-50 dark:bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all shadow-sm active:scale-90"
                      title="Supprimer ce message"
                    >
                      <FaTrash size={14} />
                    </button>
                  </div>
                </div>

                {/* Tags & Rating */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${msg.type === "Contact" ? "bg-purple-500/10 text-purple-600" : "bg-pink-500/10 text-pink-600"}`}>
                    {msg.type || "Avis"}
                  </span>

                  {msg.rating > 0 && (
                    <span className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-yellow-500/10 text-yellow-600 text-[10px] font-black tracking-widest">
                      ★ {msg.rating}/5
                    </span>
                  )}

                  <div className="flex items-center gap-1.5 bg-gray-50 dark:bg-[#0B0F19] px-2.5 py-1 rounded-lg border border-gray-100 dark:border-gray-800 ml-auto" title="Sentiment">
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Humeur</span>
                    <span className="text-sm">{getSentimentIcon(msg.sentiment)}</span>
                  </div>
                </div>

                {/* Message Body */}
                <div className="flex-1 bg-gray-50 dark:bg-[#0f1523] rounded-2xl p-4 border border-gray-100 dark:border-gray-800/50 mt-auto relative z-10">
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed font-medium">
                    {msg.message}
                  </p>
                </div>

                {/* Decorative element */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-110 group-hover:bg-blue-500/10 transition-transform duration-700 pointer-events-none"></div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Confirm Modal for delete */}
      <ConfirmModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({ isOpen: false, messageId: null })}
        onConfirm={handleDeleteConfirm}
        title="Supprimer ce message"
        message="Voulez-vous vraiment supprimer ce message ? Cette action est irréversible."
        confirmText="Supprimer"
        variant="danger"
      />
    </div>
  );
}
