import { useEffect, useState } from "react";
import api from "../../services/api";
import { buildPrompt } from "../../features/chatbot/buildPrompt";
import { askGemini } from "../../services/geminiService";
export default function Ai() {
  const [books, setBooks] = useState([]);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Bonjour, décris ton besoin (thème, idée, citation) et je te propose des livres.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
console.log("KEY OK?", !!import.meta.env.VITE_GEMINI_API_KEY);
  useEffect(() => {
    api
      .get("/books")
      .then((res) => setBooks(res.data))
      .catch(() => setError("Erreur chargement livres MockAPI"));
  }, []);

  async function handleSend(e) {
    e.preventDefault();
    setError(null);

    const userMessage = input.trim();
    if (!userMessage) return;

    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setInput("");
    setLoading(true);

    try {
      const prompt = buildPrompt({ books, userMessage });
      const aiText = await askGemini({ prompt });

      setMessages((prev) => [...prev, { role: "assistant", content: aiText }]);
    } catch (err) {
  console.error("Gemini error full:", err);
  console.error("Gemini error message:", err?.message);
  console.error("Gemini error name:", err?.name);
  console.error("Gemini error stack:", err?.stack);

  setError(err?.message || "Erreur IA (chouf console F12)");
} finally {
  setLoading(false);
}


  }

  return (
    <div className="mx-auto max-w-3xl p-4">
      <h1 className="text-2xl font-bold">Chatbot IA</h1>

      {error && (
        <div className="mt-3 rounded-lg bg-red-50 p-3 text-red-700">
          {error}
        </div>
      )}

      <div className="mt-4 min-h-[420px] rounded-xl border border-slate-200 bg-white p-4">
        {messages.map((m, idx) => (
          <div key={idx} className="mb-4">
            <div className="font-semibold">
              {m.role === "user" ? "Moi" : "Assistant"} :
            </div>
            <div className="whitespace-pre-wrap text-slate-800">
              {m.content}
            </div>
          </div>
        ))}

        {loading && <div className="text-slate-500">Réponse en cours...</div>}
      </div>

      <form onSubmit={handleSend} className="mt-3 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Ex: "Je cherche un livre sur la motivation"'
          className="flex-1 rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-500"
        />
        <button
          disabled={loading}
          type="submit"
          className="rounded-lg bg-slate-900 px-4 py-2 text-white disabled:opacity-50"
        >
          Envoyer
        </button>
      </form>

      <p className="mt-2 text-sm text-slate-500">
        Livres chargés : {books.length}
      </p>
    </div>
  );
}