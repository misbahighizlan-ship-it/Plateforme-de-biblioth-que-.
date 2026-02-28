import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { FaArrowLeft, FaPaperPlane, FaRobot, FaUser, FaTimes, FaBook } from "react-icons/fa";
import { useState, useRef, useEffect } from "react";
import { buildPrompt } from "../../features/chatbot/buildPrompt";
import { askGemini } from "../../services/geminiService";

export default function BookChatbot() {
    const { id } = useParams();
    const navigate = useNavigate();
    const books = useSelector((state) => state.books.list);
    const book = books.find((b) => b.id == id);

    const [messages, setMessages] = useState([
        {
            role: "assistant",
            content: `Bonjour ! Je suis votre assistant IA pour "${book?.title || 'ce livre'}". Je peux répondre à vos questions sur ce livre, ses thèmes, ses personnages et bien plus encore. Que souhaitez-vous savoir ?`,
        },
    ]);
    const [inputValue, setInputValue] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, loading]);

    const handleSendMessage = async (e) => {
        if (e) e.preventDefault();
        if (!inputValue.trim() || loading) return;

        setError(null);
        const userMessage = inputValue.trim();
        setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
        setInputValue("");
        setLoading(true);

        try {
            const prompt = buildPrompt({ books, userMessage, currentBook: book });
            const aiText = await askGemini({ prompt });
            setMessages((prev) => [...prev, { role: "assistant", content: aiText }]);
        } catch (err) {
            setError("Service IA temporairement indisponible. Vérifiez votre connexion ou réessayez.");
            console.error("Chatbot error:", err);
        } finally {
            setLoading(false);
        }
    };

    if (!book) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-900 text-xl font-bold mb-4">Livre introuvable</p>
                    <button
                        onClick={() => navigate("/")}
                        className="px-6 py-3 bg-gradient-to-r from-[#ff758c] to-[#7a5cff] text-white rounded-xl font-semibold hover:opacity-90 transition-all shadow-lg"
                    >
                        Retour à l'accueil
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">

            {/* HEADER Gradient from Ai.jsx */}
            <div
                className="px-6 py-5 shadow-lg"
                style={{ background: "linear-gradient(135deg, #ff758c, #7a5cff)" }}
            >
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate(`/books/${book.id}`)}
                            style={{ cursor: "pointer" }}
                            className="w-10 h-10 rounded-xl bg-white/20 hover:bg-white/30
                                       flex items-center justify-center text-white transition-all"
                        >
                            <FaArrowLeft />
                        </button>
                        <img
                            src={book.image}
                            alt={book.title}
                            className="w-10 h-14 rounded shadow-lg border border-white/30 object-cover"
                        />
                        <div>
                            <h1 className="text-white font-bold text-xl line-clamp-1">{book.title}</h1>
                            <div className="flex items-center gap-2 mt-1">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                <span className="text-white/80 text-sm">Assistant IA du livre</span>
                            </div>
                        </div>
                    </div>
                    {/* Badge Chat IA */}
                    <div className="hidden sm:flex items-center gap-2 bg-white/20 rounded-2xl px-4 py-2 border border-white/30">
                        <FaRobot className="text-white text-sm" />
                        <span className="text-white text-sm font-semibold">Chat IA</span>
                    </div>
                </div>
            </div>

            {/* ZONE MESSAGES style as Ai.jsx */}
            <div className="flex-1 overflow-y-auto py-6 px-4">
                <div className="max-w-4xl mx-auto space-y-4" ref={scrollRef}>

                    {messages.map((m, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex gap-3 ${m.role === "user" ? "justify-end" : "justify-start"}`}
                        >
                            {/* Avatar BOT */}
                            {m.role === "assistant" && (
                                <div className="w-9 h-9 rounded-xl flex-shrink-0 flex items-center justify-center shadow-md"
                                    style={{ background: "linear-gradient(135deg, #ff758c, #7a5cff)" }}>
                                    <FaRobot className="text-white text-sm" />
                                </div>
                            )}

                            {/* Bulle message */}
                            <div
                                className={`max-w-[75%] px-5 py-4 rounded-3xl shadow-sm text-sm leading-relaxed
                                  ${m.role === "user"
                                        ? "rounded-br-lg text-white"
                                        : "rounded-bl-lg bg-white border border-gray-100 text-gray-700 shadow-md"
                                    }`}
                                style={m.role === "user" ? {
                                    background: "linear-gradient(135deg, #ff758c, #7a5cff)"
                                } : {}}
                            >
                                <div className="whitespace-pre-wrap">{m.content}</div>
                            </div>

                            {/* Avatar USER */}
                            {m.role === "user" && (
                                <div className="w-9 h-9 rounded-xl flex-shrink-0 bg-pink-400
                                               flex items-center justify-center shadow-md">
                                    <FaUser className="text-white text-sm" />
                                </div>
                            )}
                        </motion.div>
                    ))}

                    {/* Typing indicator */}
                    {loading && (
                        <div className="flex gap-3 justify-start">
                            <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-md"
                                style={{ background: "linear-gradient(135deg, #ff758c, #7a5cff)" }}>
                                <FaRobot className="text-white text-sm" />
                            </div>
                            <div className="bg-white border border-gray-100 rounded-3xl rounded-bl-lg
                                              px-5 py-4 shadow-md">
                                <div className="flex gap-1.5 items-center">
                                    <div className="w-2.5 h-2.5 rounded-full bg-pink-400 animate-bounce"
                                        style={{ animationDelay: "0ms" }} />
                                    <div className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-bounce"
                                        style={{ animationDelay: "150ms" }} />
                                    <div className="w-2.5 h-2.5 rounded-full bg-blue-400 animate-bounce"
                                        style={{ animationDelay: "300ms" }} />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Message d'erreur */}
                    {error && (
                        <div className="flex justify-center">
                            <div className="bg-red-50 border border-red-200 text-red-500 px-5 py-3
                                              rounded-2xl text-sm flex items-center gap-2 shadow-sm">
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
                        <p className="text-gray-400 text-xs text-center mb-3">
                            💡 Suggestions rapides
                        </p>
                        <div className="flex flex-wrap gap-2 justify-center">
                            {[
                                "📚 Résume-moi ce livre",
                                "🔍 Quels sont les personnages ?",
                                "💡 La leçon principale ?",
                                "✨ Une citation de ce livre",
                                "⏳ Quelle est l'époque du récit ?",
                            ].map((s, i) => (
                                <button
                                    key={i}
                                    onClick={() => setInputValue(s)}
                                    style={{ cursor: "pointer" }}
                                    className="px-4 py-2 rounded-full text-sm border border-pink-200
                                             text-pink-500 bg-pink-50 hover:bg-pink-100
                                             transition-all font-medium"
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* ZONE DE SAISIE Input from Ai.jsx */}
            <div className="bg-white border-t border-gray-100 px-4 py-4 shadow-lg">
                <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto">
                    <div className="flex gap-3 items-end">
                        <div className="flex-1 relative">
                            <input
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Posez votre question sur ce livre..."
                                className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-gray-50
                                           outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100
                                           transition-all text-gray-700 text-sm"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={loading || !inputValue.trim()}
                            style={{
                                cursor: loading || !inputValue.trim() ? "not-allowed" : "pointer",
                                background: loading || !inputValue.trim()
                                    ? "#e5e7eb"
                                    : "linear-gradient(135deg, #ff758c, #7a5cff)"
                            }}
                            className="w-14 h-14 rounded-2xl flex items-center justify-center
                                         text-white shadow-lg hover:opacity-90 hover:scale-105
                                         transition-all disabled:opacity-50 flex-shrink-0"
                        >
                            {loading
                                ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                : <FaPaperPlane className="text-lg" />
                            }
                        </button>
                    </div>
                    <p className="text-center text-xs text-gray-400 mt-2 tracking-widest uppercase">
                        Propulsé par Gemini IA
                    </p>
                </form>
            </div>

        </div>
    );
}
