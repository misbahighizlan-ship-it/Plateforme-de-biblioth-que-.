import { useState, useEffect } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { FaTrash, FaSmileBeam, FaFrown, FaMeh } from "react-icons/fa";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("adminMessages")) || [];
    setMessages(saved);
  }, []);

  const handleDelete = (id) => {
    const confirm = window.confirm("Supprimer ce message ?");
    if (!confirm) return;
    const filtered = messages.filter((m) => m.id !== id);
    setMessages(filtered);
    localStorage.setItem("adminMessages", JSON.stringify(filtered));
  };

  const getSentimentIcon = (sentiment) => {
    switch (sentiment) {
      case "positif": return <FaSmileBeam className="text-green-400 text-xl" title="Positif" />;
      case "negatif": return <FaFrown className="text-red-400 text-xl" title="Négatif" />;
      default: return <FaMeh className="text-yellow-400 text-xl" title="Neutre" />;
    }
  };

  return (
    <div className="flex bg-gray-950 min-h-screen">
      <AdminSidebar />

      <main className="flex-1 p-8 text-white">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Messages & Avis reçus</h2>
          <span className="bg-blue-600/20 text-blue-400 px-4 py-1 rounded-full text-sm font-semibold border border-blue-500/30">
            {messages.length} message(s)
          </span>
        </div>

        {messages.length === 0 ? (
          <div className="bg-gray-800/50 p-8 rounded-2xl border border-gray-700 text-center">
            <p className="text-gray-400 text-lg">Aucun message pour le moment.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {messages.map((msg) => (
              <div key={msg.id} className="bg-gray-900 border border-gray-800 p-6 rounded-2xl flex flex-col md:flex-row gap-6 hover:border-gray-700 transition-colors shadow-lg">

                {/* User Info */}
                <div className="md:w-1/4 flex flex-col gap-2 border-b md:border-b-0 md:border-r border-gray-800 pb-4 md:pb-0 md:pr-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#5db2e3] to-[#2B55B5] flex items-center justify-center text-lg font-bold">
                      {msg.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-semibold truncate max-w-[150px]">{msg.name}</h3>
                      <p className="text-xs text-gray-500 truncate max-w-[150px]">{msg.email}</p>
                    </div>
                  </div>
                  <div className="text-xs text-gray-400 mt-2">
                    {new Date(msg.date).toLocaleString("fr-FR")}
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-sm text-gray-400">Humeur :</span>
                    {getSentimentIcon(msg.sentiment)}
                  </div>
                </div>

                {/* Message Content */}
                <div className="flex-1">
                  <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                </div>

                {/* Actions */}
                <div className="flex items-start md:items-center justify-end">
                  <button
                    onClick={() => handleDelete(msg.id)}
                    className="p-3 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-xl transition-colors border border-red-500/20"
                    title="Supprimer ce message"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
