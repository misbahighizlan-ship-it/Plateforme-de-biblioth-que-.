import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBooks } from "../../slices/booksSlice";
import { buildPrompt } from "../../features/chatbot/buildPrompt";
import { askGemini } from "../../services/geminiService";
import { FaRobot, FaUser, FaPaperPlane, FaTimes, FaBook } from "react-icons/fa";
import * as pdfjsLib from "pdfjs-dist";

// Configure le worker PDF.js
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

// Lit un PDF depuis une URL et retourne son texte
async function extractPdfText(pdfUrl) {
  try {
    const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
    let fullText = "";
    const maxPages = Math.min(pdf.numPages, 20);
    for (let i = 1; i <= maxPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      fullText += content.items.map((item) => item.str).join(" ") + "\n";
    }
    return fullText.trim();
  } catch (err) {
    console.error("Erreur lecture PDF:", err);
    return "";
  }
}

export default function Ai() {
  const dispatch = useDispatch();
  const { list: books } = useSelector((state) => state.books);

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Bonjour ! Je suis votre assistant SmartLib IA. Sélectionnez un livre en haut pour obtenir des citations exactes, ou posez-moi une question générale !",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // État PDF
  const [currentBook, setCurrentBook] = useState(null);
  const [pdfContext, setPdfContext] = useState("");
  const [pdfLoading, setPdfLoading] = useState(false);

  const scrollRef = useRef(null);

  useEffect(() => {
    if (books.length === 0) dispatch(fetchBooks());
  }, [dispatch, books.length]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  // Quand l'user sélectionne un livre dans le dropdown
  async function handleSelectBook(e) {
    const bookId = e.target.value;

    if (!bookId) {
      setCurrentBook(null);
      setPdfContext("");
      return;
    }

    const book = books.find((b) => b.id === bookId);
    if (!book) return;

    setCurrentBook(book);
    setPdfContext("");

    if (book.pdf || book.pdfUrl) {
      setPdfLoading(true);
      const url = book.pdf || book.pdfUrl;
      const text = await extractPdfText(url);
      setPdfContext(text);
      setPdfLoading(false);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: text
            ? `📖 J'ai chargé "${book.title}" ! Je peux maintenant donner des citations exactes dans la langue originale du livre. Posez votre question !`
            : `📖 Livre "${book.title}" sélectionné, mais le PDF n'est pas lisible. Les citations exactes ne sont pas disponibles.`,
        },
      ]);
    } else {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `📖 Livre "${book.title}" sélectionné. Posez vos questions !`,
        },
      ]);
    }
  }

  async function handleSend(e) {
    e.preventDefault();
    if (!input.trim() || loading) return;

    setError(null);
    const userMessage = input.trim();
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setInput("");
    setLoading(true);

    try {
      // ✅ FIX : on passe currentBook et pdfContext au prompt
      const prompt = buildPrompt({ books, userMessage, currentBook, pdfContext });
      const aiText = await askGemini({ prompt });
      setMessages((prev) => [...prev, { role: "assistant", content: aiText }]);
    } catch (err) {
      setError("Service IA temporairement indisponible. Vérifiez votre connexion ou réessayez.");
      console.error("Chatbot error:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* HEADER */}
      <div className="px-6 py-5 shadow-lg" style={{ background: "linear-gradient(135deg, #ff758c, #7a5cff)" }}>
        <div className="max-w-4xl mx-auto">

          {/* Titre + statut */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center shadow-lg border border-white/30">
                <FaRobot className="text-white text-2xl" />
              </div>
              <div>
                <h1 className="text-white font-bold text-xl">Assistant SmartLib IA</h1>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-white/80 text-sm">
                    {pdfLoading
                      ? "⏳ Lecture du PDF..."
                      : currentBook
                        ? `📖 ${currentBook.title}`
                        : "En ligne · Propulsé par Gemini IA"}
                  </span>
                </div>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-2 bg-white/20 rounded-2xl px-4 py-2">
              <FaBook className="text-white text-sm" />
              <span className="text-white text-sm font-semibold">{books.length} livres</span>
            </div>
          </div>

          {/* ── Dropdown sélection livre ── */}
          <select
            onChange={handleSelectBook}
            defaultValue=""
            className="w-full rounded-xl px-4 py-3 text-sm bg-white/20 text-white
                       border border-white/30 outline-none cursor-pointer backdrop-blur"
          >
            <option value="" className="text-gray-800 bg-white">
              🔍 Sélectionner un livre pour des citations exactes...
            </option>
            {books.map((book) => (
              <option key={book.id} value={book.id} className="text-gray-800 bg-white">
                {book.pdf || book.pdfUrl ? "📄 " : ""}{book.title} — {book.author}
              </option>
            ))}
          </select>

          {/* Badge PDF chargé */}
          {pdfContext && !pdfLoading && (
            <div className="mt-2 bg-green-400/20 rounded-xl px-4 py-2 w-fit">
              <span className="text-white text-xs">✅ PDF chargé — Citations exactes disponibles</span>
            </div>
          )}
        </div>
      </div>

      {/* ZONE MESSAGES */}
      <div className="flex-1 overflow-y-auto py-6 px-4">
        <div className="max-w-4xl mx-auto space-y-4" ref={scrollRef}>

          {messages.map((m, idx) => (
            <div key={idx} className={`flex gap-3 ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              {m.role === "assistant" && (
                <div className="w-9 h-9 rounded-xl flex-shrink-0 flex items-center justify-center shadow-md"
                  style={{ background: "linear-gradient(135deg, #ff758c, #7a5cff)" }}>
                  <FaRobot className="text-white text-sm" />
                </div>
              )}
              <div
                className={`max-w-[75%] px-5 py-4 rounded-3xl shadow-sm text-sm leading-relaxed
                  ${m.role === "user"
                    ? "rounded-br-lg text-white"
                    : "rounded-bl-lg bg-white border border-gray-100 text-gray-700 shadow-md"}`}
                style={m.role === "user" ? { background: "linear-gradient(135deg, #ff758c, #7a5cff)" } : {}}
              >
                <div className="whitespace-pre-wrap">{m.content}</div>
              </div>
              {m.role === "user" && (
                <div className="w-9 h-9 rounded-xl flex-shrink-0 bg-pink-400 flex items-center justify-center shadow-md">
                  <FaUser className="text-white text-sm" />
                </div>
              )}
            </div>
          ))}

          {/* Typing indicator */}
          {loading && (
            <div className="flex gap-3 justify-start">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-md"
                style={{ background: "linear-gradient(135deg, #ff758c, #7a5cff)" }}>
                <FaRobot className="text-white text-sm" />
              </div>
              <div className="bg-white border border-gray-100 rounded-3xl rounded-bl-lg px-5 py-4 shadow-md">
                <div className="flex gap-1.5 items-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-pink-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <div className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="flex justify-center">
              <div className="bg-red-50 border border-red-200 text-red-500 px-5 py-3 rounded-2xl text-sm flex items-center gap-2 shadow-sm">
                <FaTimes /> {error}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* SUGGESTIONS RAPIDES */}
      {messages.length <= 1 && (
        <div className="px-4 pb-3">
          <div className="max-w-4xl mx-auto">
            <p className="text-gray-400 text-xs text-center mb-3">💡 Suggestions rapides</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {["📚 Recommande-moi un livre", "💕 Roman romantique", "🎭 Un livre de drame", "✨ Une citation inspirante", "🔮 Thriller psychologique"].map((s, i) => (
                <button key={i} onClick={() => setInput(s)} style={{ cursor: "pointer" }}
                  className="px-4 py-2 rounded-full text-sm border border-pink-200 text-pink-500 bg-pink-50 hover:bg-pink-100 transition-all font-medium">
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ZONE DE SAISIE */}
      <div className="bg-white border-t border-gray-100 px-4 py-4 shadow-lg">
        <form onSubmit={handleSend} className="max-w-4xl mx-auto">
          <div className="flex gap-3 items-end">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={currentBook ? `Posez une question sur "${currentBook.title}"...` : "Posez votre question..."}
              className="flex-1 px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50
                         outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100
                         transition-all text-gray-700 text-sm"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              style={{
                cursor: loading || !input.trim() ? "not-allowed" : "pointer",
                background: loading || !input.trim() ? "#e5e7eb" : "linear-gradient(135deg, #ff758c, #7a5cff)",
              }}
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg hover:opacity-90 transition-all disabled:opacity-50 flex-shrink-0"
            >
              {loading
                ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                : <FaPaperPlane className="text-lg" />}
            </button>
          </div>
          <p className="text-center text-xs text-gray-400 mt-2 tracking-widest uppercase">Propulsé par Gemini IA</p>
        </form>
      </div>

    </div>
  );
}
