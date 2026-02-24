import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { FaArrowLeft, FaPaperPlane, FaRobot } from "react-icons/fa";
import { useState } from "react";

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

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        // Add user message
        const userMessage = { role: "user", content: inputValue };
        setMessages((prev) => [...prev, userMessage]);

        // Simulate AI response (in production, this would call your AI API)
        setTimeout(() => {
            const aiResponse = {
                role: "assistant",
                content: `C'est une excellente question sur "${book?.title}". En tant qu'assistant IA, je peux vous fournir des informations détaillées sur le contenu, les thèmes et le contexte du livre. N'hésitez pas à poser d'autres questions !`,
            };
            setMessages((prev) => [...prev, aiResponse]);
        }, 1000);

        setInputValue("");
    };

    if (!book) {
        return (
            <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center">
                <div className="text-center">
                    <p className="text-white text-xl mb-4">Livre introuvable</p>
                    <button
                        onClick={() => navigate("/")}
                        className="px-6 py-3 bg-gradient-to-r from-[#5db2e3] to-[#2B55B5] text-white rounded-xl font-semibold hover:from-[#2B55B5] hover:to-[#5db2e3] transition-all"
                    >
                        Retour à l'accueil
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#0B0F19] via-[#111827] to-[#0B0F19] text-white">
            {/* Header */}
            <div className="bg-white/5 backdrop-blur-md border-b border-white/10 sticky top-0 z-10">
                <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <motion.button
                            whileHover={{ x: -5 }}
                            onClick={() => navigate(`/books/${book.id}`)}
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            <FaArrowLeft className="text-xl" />
                        </motion.button>
                        <div className="flex items-center gap-3">
                            <img
                                src={book.image}
                                alt={book.title}
                                className="w-12 h-16 rounded object-cover shadow-lg"
                            />
                            <div>
                                <h1 className="font-bold text-lg line-clamp-1">{book.title}</h1>
                                <p className="text-sm text-gray-400">Assistant IA du livre</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-600/20 border border-purple-500/30">
                        <FaRobot className="text-purple-400" />
                        <span className="text-sm font-semibold text-purple-300">Chat IA</span>
                    </div>
                </div>
            </div>

            {/* Chat Container */}
            <div className="max-w-5xl mx-auto px-6 py-8">
                <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 h-[calc(100vh-250px)] flex flex-col">
                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-4">
                        {messages.map((message, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"
                                    }`}
                            >
                                <div
                                    className={`max-w-[80%] rounded-2xl px-6 py-4 ${message.role === "user"
                                        ? "bg-gradient-to-r from-[#5db2e3] to-[#2B55B5] text-white"
                                        : "bg-white/10 backdrop-blur-md text-gray-200 border border-white/10"
                                        }`}
                                >
                                    {message.role === "assistant" && (
                                        <div className="flex items-center gap-2 mb-2">
                                            <FaRobot className="text-purple-400" />
                                            <span className="text-xs font-semibold text-purple-300">
                                                Assistant IA
                                            </span>
                                        </div>
                                    )}
                                    <p className="leading-relaxed">{message.content}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Input Area */}
                    <div className="border-t border-white/10 p-6">
                        <form onSubmit={handleSendMessage} className="flex gap-3">
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Posez une question sur ce livre..."
                                className="flex-1 px-6 py-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 focus:outline-none focus:border-[#5db2e3] text-white placeholder-gray-400 transition-colors"
                            />
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                type="submit"
                                className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#5db2e3] to-[#2B55B5] hover:from-[#2B55B5] hover:to-[#5db2e3] text-white font-semibold shadow-lg transition-all flex items-center gap-2"
                            >
                                <FaPaperPlane />
                                Envoyer
                            </motion.button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
