import { useState, useEffect } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminHeader from "../../components/admin/AdminHeader";
import { FaTrash, FaSmileBeam, FaFrown, FaMeh } from "react-icons/fa";
import { FiMessageSquare, FiMail } from "react-icons/fi";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // On utilise "feedbacks" pour la cohérence avec le AdminHeader
    const saved = JSON.parse(localStorage.getItem("feedbacks")) || [];
    setMessages(saved);
  }, []);

  const handleDelete = (id) => {
    const confirm = window.confirm("Supprimer ce message ?");
    if (!confirm) return;
    const filtered = messages.filter((m) => m.id !== id);
    setMessages(filtered);
    localStorage.setItem("feedbacks", JSON.stringify(filtered));
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
          <span className="px-4 py-2 rounded-xl bg-blue-500/10 text-blue-500 text-xs font-black uppercase tracking-widest border border-blue-500/10">
            {messages.length} messages reçus
          </span>
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
          <div className="grid gap-6">
            {messages.map((msg) => (
              <div key={msg.id} className="bg-white dark:bg-[#111827] border border-gray-100 dark:border-gray-800 p-6 md:p-8 rounded-[2rem] flex flex-col md:flex-row gap-6 hover:shadow-xl transition-all group relative overflow-hidden">

                {/* User Info */}
                <div className="md:w-1/4 flex flex-col gap-4 border-b md:border-b-0 md:border-r border-gray-100 dark:border-gray-800 pb-6 md:pb-0 md:pr-6 whitespace-nowrap">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg group-hover:rotate-6 transition-transform"
                      style={{ background: "linear-gradient(135deg, #ff758c, #7a5cff)" }}>
                      {msg.name?.charAt(0).toUpperCase() || "?"}
                    </div>
                    <div className="overflow-hidden">
                      <h3 className="font-black text-gray-800 dark:text-gray-200 truncate">{msg.name}</h3>
                      <div className="flex items-center gap-1.5 text-gray-400 text-xs font-medium mt-0.5">
                        <FiMail size={12} className="shrink-0" />
                        <span className="truncate">{msg.email}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 mt-2">
                    <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                      {new Date(msg.date || msg.id).toLocaleDateString("fr-FR", { day: 'numeric', month: 'long' })}
                    </div>

                    <div className="flex items-center gap-2 bg-gray-50 dark:bg-[#0B0F19] p-2 rounded-xl border border-gray-100 dark:border-gray-800 w-fit">
                      <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Humeur :</span>
                      <span className="text-lg">{getSentimentIcon(msg.sentiment)}</span>
                    </div>
                  </div>
                </div>

                {/* Message Content */}
                <div className="flex-1 py-2">
                  <div className="mb-3">
                    <span className="px-2 py-1 rounded-lg bg-pink-500/10 text-pink-500 text-[10px] font-black uppercase tracking-widest">
                      {msg.type || "Avis"}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium italic">
                    "{msg.message}"
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end md:self-center">
                  <button
                    onClick={() => handleDelete(msg.id)}
                    style={{ cursor: "pointer" }}
                    className="p-4 bg-red-50 dark:bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-2xl transition-all shadow-sm border border-transparent hover:border-red-500/20 active:scale-90"
                    title="Supprimer ce message"
                  >
                    <FaTrash size={18} />
                  </button>
                </div>

                {/* Decorative element */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-700"></div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
