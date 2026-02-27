import { useState } from "react";
import { motion } from "framer-motion";
import { FaPaperPlane, FaSmileBeam, FaFrown, FaMeh } from "react-icons/fa";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        sentiment: "neutre",
        message: "",
    });
    const [status, setStatus] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.message) {
            setStatus("error");
            return;
        }

        const newMessage = {
            id: Date.now(),
            date: new Date().toISOString(),
            ...formData
        };

        const existingMessages = JSON.parse(localStorage.getItem("adminMessages")) || [];
        localStorage.setItem("adminMessages", JSON.stringify([newMessage, ...existingMessages]));

        setStatus("success");
        setFormData({ name: "", email: "", sentiment: "neutre", message: "" });

        setTimeout(() => setStatus(""), 4000);
    };

    return (
        <div className="min-h-screen bg-[#0B0F19] relative overflow-hidden flex items-center justify-center p-6 text-white">
            {/* Background elements */}
            <div className="absolute top-20 -left-20 w-80 h-80 bg-[#5db2e3]/10 rounded-full blur-3xl mix-blend-screen" />
            <div className="absolute bottom-20 -right-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl mix-blend-screen" />

            <div className="relative z-10 w-full max-w-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-10"
                >
                    <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#5db2e3] to-purple-400 bg-clip-text text-transparent">
                        Donnez votre avis
                    </h1>
                    <p className="text-gray-400">
                        Votre expérience compte pour nous ! Partagez vos idées ou signalez un problème.
                    </p>
                </motion.div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Nom complet</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full bg-[#111827]/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#5db2e3] focus:ring-1 focus:ring-[#5db2e3] transition-colors"
                                placeholder="Jean Dupont"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full bg-[#111827]/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#5db2e3] focus:ring-1 focus:ring-[#5db2e3] transition-colors"
                                placeholder="jean@exemple.com"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-4">Comment vous sentez-vous ?</label>
                        <div className="flex gap-4 justify-center md:justify-start">
                            {[
                                { val: "positif", icon: FaSmileBeam, color: "text-green-400", bg: "bg-green-400/10 hover:bg-green-400/20 border-green-500/30", activeBg: "bg-green-400/20 border-green-400" },
                                { val: "neutre", icon: FaMeh, color: "text-yellow-400", bg: "bg-yellow-400/10 hover:bg-yellow-400/20 border-yellow-500/30", activeBg: "bg-yellow-400/20 border-yellow-400" },
                                { val: "negatif", icon: FaFrown, color: "text-red-400", bg: "bg-red-400/10 hover:bg-red-400/20 border-red-500/30", activeBg: "bg-red-400/20 border-red-400" }
                            ].map(({ val, icon: Icon, color, bg, activeBg }) => (
                                <button
                                    key={val}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, sentiment: val })}
                                    className={`flex items-center justify-center w-14 h-14 rounded-full border transition-all ${formData.sentiment === val ? activeBg : bg
                                        }`}
                                >
                                    <Icon className={`text-2xl ${color}`} />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                        <textarea
                            rows="4"
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            className="w-full bg-[#111827]/50 border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#5db2e3] focus:ring-1 focus:ring-[#5db2e3] transition-colors resize-none"
                            placeholder="Dites-nous tout..."
                        />
                    </div>

                    {status === "error" && (
                        <p className="text-red-400 text-sm font-medium">Veuillez remplir tous les champs correctement.</p>
                    )}
                    {status === "success" && (
                        <div className="bg-green-500/10 border border-green-500/30 text-green-400 px-4 py-3 rounded-xl flex items-center gap-2">
                            <FaSmileBeam /> Message envoyé avec succès ! L'équipe vous remercie.
                        </div>
                    )}

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="w-full py-4 rounded-xl flex items-center justify-center gap-2 bg-gradient-to-r from-[#5db2e3] to-[#2B55B5] hover:from-[#2B55B5] hover:to-[#5db2e3] text-white font-bold shadow-lg shadow-blue-500/20 transition-all"
                    >
                        Envoyer le feedback <FaPaperPlane />
                    </motion.button>
                </form>
            </div>
        </div>
    );
}
