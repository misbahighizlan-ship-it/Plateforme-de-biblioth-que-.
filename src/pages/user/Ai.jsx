import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBooks } from "../../slices/booksSlice";
import { buildPrompt } from "../../features/chatbot/buildPrompt";
import { askGemini } from "../../services/geminiService";
import { FaRobot, FaUser, FaPaperPlane, FaTimes } from "react-icons/fa";

export default function Ai() {
  const dispatch = useDispatch();
  const { list: books, loading: booksLoading } = useSelector((state) => state.books);

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello! I am your SmartLib AI. How can I assist you today? (Recommendations, themes, or specific book info)",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const scrollRef = useRef(null);

  useEffect(() => {
    if (books.length === 0) {
      dispatch(fetchBooks());
    }
  }, [dispatch, books.length]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  async function handleSend(e) {
    e.preventDefault();
    if (!input.trim() || loading) return;

    setError(null);
    const userMessage = input.trim();
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setInput("");
    setLoading(true);

    try {
      const prompt = buildPrompt({ books, userMessage });
      const aiText = await askGemini({ prompt });
      setMessages((prev) => [...prev, { role: "assistant", content: aiText }]);
    } catch (err) {
      setError("AI Service temporarily unavailable. Please check your connection or try again later.");
      console.error("Chatbot error:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0B0F19] transition-colors p-4 md:p-8">
      <div className="mx-auto max-w-4xl bg-white dark:bg-[#111827] rounded-2xl shadow-xl overflow-hidden flex flex-col h-[80vh]">

        {/* Header */}
        <div className="p-4 bg-[#2B55B5] dark:bg-[#1e3a8a] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <FaRobot size={20} />
            </div>
            <div>
              <h1 className="font-bold text-lg">SmartLib AI Assistant</h1>
              <p className="text-xs text-blue-100">Always here to help you find the best books</p>
            </div>
          </div>
          <div className="text-xs bg-black/20 px-2 py-1 rounded-full">
            {books.length} Books Loaded
          </div>
        </div>

        {/* Messages area */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth"
        >
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`flex gap-3 max-w-[85%] ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${m.role === "user" ? "bg-blue-500 text-white" : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"}`}>
                  {m.role === "user" ? <FaUser size={14} /> : <FaRobot size={14} />}
                </div>
                <div className={`p-3 rounded-2xl text-sm ${m.role === "user"
                    ? "bg-[#2B55B5] text-white rounded-tr-none"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-gray-200 rounded-tl-none border border-slate-200 dark:border-slate-700 shadow-sm"
                  }`}>
                  <div className="whitespace-pre-wrap leading-relaxed">
                    {m.content}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="flex gap-3 max-w-[85%]">
                <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 animate-pulse flex items-center justify-center">
                  <FaRobot size={14} className="text-slate-400" />
                </div>
                <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-2xl rounded-tl-none">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-75"></span>
                    <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-150"></span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="flex justify-center p-2">
              <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-4 py-2 rounded-lg text-sm flex items-center gap-2 border border-red-100 dark:border-red-900/30">
                <FaTimes /> {error}
              </div>
            </div>
          )}
        </div>

        {/* Input area */}
        <form onSubmit={handleSend} className="p-4 bg-slate-50 dark:bg-[#1e293b] border-t border-slate-200 dark:border-slate-700">
          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='Type your request (e.g. "Recommend a mystery book")'
              className="flex-1 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-xl border border-slate-300 dark:border-slate-600 px-4 py-3 outline-none focus:ring-2 focus:ring-[#2B55B5] transition-all"
            />
            <button
              disabled={loading || !input.trim()}
              type="submit"
              className="bg-[#2B55B5] hover:bg-blue-700 text-white w-12 h-12 rounded-xl flex items-center justify-center disabled:opacity-50 disabled:grayscale transition-all shadow-lg"
            >
              <FaPaperPlane />
            </button>
          </div>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-2 text-center uppercase tracking-widest">
            Powered by Gemini AI Service
          </p>
        </form>
      </div>
    </div>
  );
}
