import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { FiMail, FiLock, FiEye, FiEyeOff, FiLogIn } from "react-icons/fi";
import { FaBook, FaHome } from "react-icons/fa";
import { motion } from "framer-motion";

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "admin@biblioia.com" && password === "admin123") {
      setLoading(true);
      localStorage.setItem("isAdmin", "true");
      setTimeout(() => {
        setLoading(false);
        navigate("/admin");
      }, 1000);
    } else {
      setError("Email ou mot de passe incorrect");
    }
  };


  return (
    <div className="min-h-screen flex flex-col-reverse lg:flex-row">

      {/* GAUCHE — Nouvelle Photo (Anciennement Droite) */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="hidden lg:block w-1/2 relative overflow-hidden"
      >
        <img
          src="/image_login.jpg"
          alt="Bibliothèque"
          className="w-full h-full object-cover"
        />

        {/* Overlay léger pour le texte si nécessaire, sinon on peut l'enlever */}
        <div className="absolute inset-0 bg-black/40"></div>

        {/* Texte sur la photo */}
        <div className="absolute inset-0 flex flex-col justify-end p-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="text-white text-4xl font-bold mb-4 leading-tight">
              Votre bibliothèque<br />intelligente
            </h2>
            <p className="text-white/80 text-lg">
              Des milliers de livres à portée de main,<br />
              recommandés par l'intelligence artificielle.
            </p>

            {/* Stats */}
            <div className="flex gap-6 mt-8">
              {[
                { value: "500+", label: "Livres" },
                { value: "10K+", label: "Lecteurs" },
                { value: "24/7", label: "IA Active" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-white font-bold text-2xl">{stat.value}</div>
                  <div className="text-white/70 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* DROITE — Formulaire (Anciennement Gauche) */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 py-12 bg-white dark:bg-[#0B0F19] transition-colors duration-300"
      >
        {/* Logo et Retour */}
        <div className="mb-10 w-full relative">
          <button
            onClick={() => navigate("/")}
            type="button"
            style={{ cursor: "pointer" }}
            className="absolute top-0 right-0 flex items-center gap-2 px-3 py-1.5 rounded-lg
                       bg-white dark:bg-[#111827] border border-gray-200 dark:border-gray-800 text-gray-400
                       hover:text-pink-500 hover:border-pink-200 transition-all text-sm shadow-sm"
          >
            <FaHome /> Accueil
          </button>

          <div className="flex items-center gap-3 mb-8">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg"
              style={{ background: "linear-gradient(135deg, #ff758c, #7a5cff)" }}
            >
              <FaBook className="text-white text-xl" />
            </div>
            <div>
              <span className="font-bold text-gray-900 dark:text-white text-xl block leading-none">
                SmartLibrary
              </span>
              <span className="text-gray-400 text-xs">BiblioIA</span>
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 tracking-tight">
            Espace Admin <span className="text-2xl">🔐</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
            Connectez-vous pour accéder au tableau de bord.
          </p>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleLogin} className="space-y-6">

          {/* Email */}
          <div>
            <label className="text-xs font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-3 block">
              Adresse email
            </label>
            <div className="relative">
              <FiMail className="absolute left-5 top-1/2 -translate-y-1/2
                                 text-gray-400 text-lg" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@biblioia.com"
                className="w-full pl-12 pr-4 py-4 rounded-[1.2rem] border border-gray-100
                           dark:border-gray-800 bg-gray-50 dark:bg-[#111827] outline-none 
                           focus:border-pink-400 dark:focus:border-blue-500
                           transition-all text-sm text-gray-700 dark:text-white font-medium"
              />
            </div>
          </div>

          {/* Mot de passe */}
          <div>
            <label className="text-xs font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-3 block">
              Mot de passe
            </label>
            <div className="relative">
              <FiLock className="absolute left-5 top-1/2 -translate-y-1/2
                                 text-gray-400 text-lg" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full pl-12 pr-12 py-4 rounded-[1.2rem] border border-gray-100
                           dark:border-gray-800 bg-gray-50 dark:bg-[#111827] outline-none 
                           focus:border-pink-400 dark:focus:border-blue-500
                           transition-all text-sm text-gray-700 dark:text-white font-medium"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ cursor: "pointer" }}
                className="absolute right-5 top-1/2 -translate-y-1/2
                           text-gray-400 hover:text-pink-400 transition-colors"
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>
          </div>

          {/* Mémoriser + Mot de passe oublié */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-pink-500 focus:ring-pink-200" />
              <span className="text-xs font-bold text-gray-400 group-hover:text-gray-600 transition-colors">Se souvenir de moi</span>
            </label>
            <button
              type="button"
              className="text-xs font-black uppercase tracking-widest transition-colors hover:underline"
              style={{
                background: "linear-gradient(135deg, #ff758c, #7a5cff)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                cursor: "pointer"
              }}
            >
              Mot de passe oublié ?
            </button>
          </div>

          {/* Message d'erreur global */}
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 
                              rounded-2xl px-5 py-3 text-red-500 text-xs font-black uppercase tracking-widest
                              flex items-center gap-3 shadow-sm"
            >
              <FiXCircle className="text-lg" /> {error}
            </motion.div>
          )}

          {/* Bouton connexion */}
          <button
            type="submit"
            disabled={loading}
            style={{
              cursor: loading ? "not-allowed" : "pointer",
              background: loading
                ? "#e5e7eb"
                : "linear-gradient(135deg, #ff758c, #7a5cff)"
            }}
            className="w-full py-4 rounded-[1.2rem] text-white font-black text-xs uppercase tracking-[0.2em]
                       hover:scale-[1.02] transition-all shadow-xl shadow-pink-500/20
                       flex items-center justify-center gap-3 active:scale-95"
          >
            {loading ? (
              <div className="w-5 h-5 border-3 border-white border-t-transparent
                              rounded-full animate-spin" />
            ) : (
              <>
                <FiLogIn className="text-xl" />
                Se connecter
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
