import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar, FaPaperPlane, FaEnvelope, FaPhone, FaMapMarkerAlt, FaBook } from "react-icons/fa";
import { FiMessageSquare, FiUser, FiMail, FiSend } from "react-icons/fi";

export default function ContactAvis() {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [form, setForm] = useState({
        name: "", email: "", type: "Compliment", message: ""
    });
    const [submitted, setSubmitted] = useState(false);
    const [activeTab, setActiveTab] = useState("avis"); // "avis" ou "contact"

    const handleSubmit = (e) => {
        e.preventDefault();
        if (form.message.length < 5) return;

        const feedback = {
            id: Date.now(),
            ...form,
            rating,
            date: new Date().toISOString(),
            read: false,
        };

        const existing = JSON.parse(localStorage.getItem("feedbacks")) || [];
        existing.unshift(feedback);
        localStorage.setItem("feedbacks", JSON.stringify(existing));
        setSubmitted(true);
    };

    // PAGE SUCCÈS
    if (submitted) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center bg-white rounded-3xl p-12 shadow-xl max-w-md w-full"
                >
                    <motion.div
                        animate={{ rotate: [0, -10, 10, -10, 0], scale: [1, 1.2, 1] }}
                        transition={{ duration: 0.6 }}
                        className="text-7xl mb-6"
                    >
                        🎉
                    </motion.div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">
                        Merci pour votre avis !
                    </h2>
                    <p className="text-gray-500 mb-8">
                        Votre message a bien été envoyé. Nous vous en sommes très reconnaissants !
                    </p>
                    <button
                        onClick={() => { setSubmitted(false); setForm({ name: "", email: "", type: "Compliment", message: "" }); setRating(0); }}
                        style={{ background: "linear-gradient(135deg, #ff758c, #7a5cff)", cursor: "pointer" }}
                        className="px-8 py-3 rounded-2xl text-white font-bold hover:opacity-90 transition-all shadow-lg"
                    >
                        Laisser un autre avis
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">

            {/* HEADER */}
            <div
                className="px-6 py-10 shadow-md"
                style={{ background: "linear-gradient(135deg, #ff758c, #7a5cff)" }}
            >
                <div className="max-w-5xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/20
                            flex items-center justify-center">
                            <FiMessageSquare className="text-white text-2xl" />
                        </div>
                        <h1 className="text-white font-bold text-3xl mb-2">
                            Contact & Avis
                        </h1>
                        <p className="text-white/70 text-base">
                            Votre opinion nous aide à améliorer SmartLibrary BiblioIA
                        </p>
                    </motion.div>

                    {/* TABS */}
                    <div className="flex justify-center gap-3 mt-8">
                        {["avis", "contact"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                style={{ cursor: "pointer" }}
                                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all
                  ${activeTab === tab
                                        ? "bg-white text-purple-600 shadow-lg"
                                        : "bg-white/20 text-white hover:bg-white/30"
                                    }`}
                            >
                                {tab === "avis" ? "⭐ Laisser un avis" : "✉️ Nous contacter"}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-6 py-10">

                <AnimatePresence mode="wait">

                    {/* ===== TAB AVIS ===== */}
                    {activeTab === "avis" && (
                        <motion.div
                            key="avis"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                        >

                            {/* INFO CARDS GAUCHE */}
                            <div className="space-y-4">
                                {[
                                    { icon: "💬", title: "Votre avis compte", desc: "Chaque retour nous aide à améliorer l'expérience" },
                                    { icon: "⭐", title: "Notez l'application", desc: "Donnez une note de 1 à 5 étoiles" },
                                    { icon: "🚀", title: "Suggestions", desc: "Proposez de nouvelles fonctionnalités" },
                                ].map((card, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm
                               flex items-start gap-4"
                                    >
                                        <div className="text-2xl">{card.icon}</div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 text-sm">{card.title}</h3>
                                            <p className="text-gray-500 text-xs mt-1">{card.desc}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* FORMULAIRE AVIS DROITE */}
                            <div className="lg:col-span-2">
                                <form
                                    onSubmit={handleSubmit}
                                    className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 space-y-6"
                                >

                                    {/* Étoiles */}
                                    <div className="text-center">
                                        <p className="text-gray-700 font-bold mb-4 text-lg">
                                            Quelle est votre note globale ?
                                        </p>
                                        <div className="flex justify-center gap-3">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <motion.button
                                                    key={star}
                                                    type="button"
                                                    whileHover={{ scale: 1.3 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    onClick={() => setRating(star)}
                                                    onMouseEnter={() => setHover(star)}
                                                    onMouseLeave={() => setHover(0)}
                                                    style={{ cursor: "pointer" }}
                                                    className="text-4xl transition-all"
                                                >
                                                    <FaStar className={
                                                        star <= (hover || rating)
                                                            ? "text-yellow-400"
                                                            : "text-gray-200"
                                                    } />
                                                </motion.button>
                                            ))}
                                        </div>
                                        {rating > 0 && (
                                            <motion.p
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="text-sm text-gray-500 mt-2"
                                            >
                                                {["", "😕 Mauvais", "😐 Passable", "🙂 Bien", "😊 Très bien", "🤩 Excellent !"][rating]}
                                            </motion.p>
                                        )}
                                    </div>

                                    {/* Nom + Email */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-xs font-semibold text-gray-600 mb-1.5 block">
                                                Nom (optionnel)
                                            </label>
                                            <div className="relative">
                                                <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                                                <input
                                                    type="text"
                                                    placeholder="Votre nom"
                                                    value={form.name}
                                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                                    className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-200
                                     bg-gray-50 outline-none focus:border-pink-400
                                     focus:ring-2 focus:ring-pink-100 transition-all text-sm"
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="text-xs font-semibold text-gray-600 mb-1.5 block">
                                                Email (optionnel)
                                            </label>
                                            <div className="relative">
                                                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                                                <input
                                                    type="email"
                                                    placeholder="votre@email.com"
                                                    value={form.email}
                                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                                    className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-200
                                     bg-gray-50 outline-none focus:border-pink-400
                                     focus:ring-2 focus:ring-pink-100 transition-all text-sm"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Type */}
                                    <div>
                                        <label className="text-xs font-semibold text-gray-600 mb-1.5 block">
                                            Type de feedback
                                        </label>
                                        <div className="flex gap-2 flex-wrap">
                                            {["Compliment", "Suggestion", "Recommandation", "Autre"].map((type) => (
                                                <button
                                                    key={type}
                                                    type="button"
                                                    onClick={() => setForm({ ...form, type })}
                                                    className={`px-4 py-2 rounded-full text-sm font-semibold
                                     border-2 transition-all flex items-center gap-2
                                     ${form.type === type
                                                            ? "text-white border-transparent shadow-md"
                                                            : "border-gray-200 text-gray-500 hover:border-pink-300 bg-white"
                                                        }`}
                                                    style={{
                                                        cursor: "pointer",
                                                        ...(form.type === type && {
                                                            background: "linear-gradient(135deg, #ff758c, #7a5cff)",
                                                            border: "none"
                                                        })
                                                    }}
                                                >
                                                    <span>
                                                        {type === "Compliment" ? "🎉" : type === "Suggestion" ? "💡" : type === "Recommandation" ? "⭐" : "💬"}
                                                    </span>
                                                    {type}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Message */}
                                    <div>
                                        <label className="text-xs font-semibold text-gray-600 mb-1.5 block">
                                            Votre message <span className="text-red-400">*</span>
                                        </label>
                                        <textarea
                                            rows={4}
                                            placeholder="Partagez votre expérience, vos suggestions ou remarques..."
                                            value={form.message}
                                            onChange={(e) => setForm({ ...form, message: e.target.value })}
                                            required
                                            minLength={5}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200
                                 bg-gray-50 outline-none focus:border-pink-400
                                 focus:ring-2 focus:ring-pink-100 transition-all
                                 resize-none text-sm"
                                        />
                                    </div>

                                    {/* Bouton */}
                                    <button
                                        type="submit"
                                        style={{
                                            background: "linear-gradient(135deg, #ff758c, #7a5cff)",
                                            cursor: "pointer"
                                        }}
                                        className="w-full py-4 rounded-2xl font-bold text-white
                               hover:opacity-90 hover:scale-[1.02] transition-all
                               flex items-center justify-center gap-2 shadow-lg text-base"
                                    >
                                        <FiSend />
                                        Envoyer mon avis
                                    </button>
                                </form>
                            </div>
                        </motion.div>
                    )}

                    {/* ===== TAB CONTACT ===== */}
                    {activeTab === "contact" && (
                        <motion.div
                            key="contact"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                        >

                            {/* Infos contact */}
                            <div className="space-y-4">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                                    Nous sommes là pour vous 🤝
                                </h2>
                                {[
                                    { icon: <FaEnvelope className="text-pink-400" />, title: "Email", value: "contact@biblioia.com" },
                                    { icon: <FaPhone className="text-purple-400" />, title: "Téléphone", value: "+212 6XX XXX XXX" },
                                    { icon: <FaMapMarkerAlt className="text-blue-400" />, title: "Adresse", value: "Fès, Maroc" },
                                    { icon: <FaBook className="text-pink-400" />, title: "Horaires", value: "24h/7 - IA toujours active" },
                                ].map((info, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm
                               flex items-center gap-4"
                                    >
                                        <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center
                                    justify-center text-xl">
                                            {info.icon}
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-400 font-medium">{info.title}</p>
                                            <p className="text-gray-900 font-semibold text-sm">{info.value}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Formulaire contact */}
                            <form className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 space-y-5">
                                <h3 className="text-lg font-bold text-gray-900">
                                    Envoyer un message
                                </h3>
                                <div>
                                    <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Nom</label>
                                    <input type="text" placeholder="Votre nom"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50
                               outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 text-sm" />
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Email</label>
                                    <input type="email" placeholder="votre@email.com"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50
                               outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 text-sm" />
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Sujet</label>
                                    <input type="text" placeholder="Objet de votre message"
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50
                               outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100 text-sm" />
                                </div>
                                <div>
                                    <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Message</label>
                                    <textarea rows={4} placeholder="Votre message..."
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50
                               outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100
                               resize-none text-sm" />
                                </div>
                                <button type="button"
                                    style={{ background: "linear-gradient(135deg, #ff758c, #7a5cff)", cursor: "pointer" }}
                                    className="w-full py-4 rounded-2xl font-bold text-white
                             hover:opacity-90 transition-all shadow-lg flex items-center justify-center gap-2">
                                    <FaPaperPlane /> Envoyer le message
                                </button>
                            </form>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>
        </div>
    );
}
