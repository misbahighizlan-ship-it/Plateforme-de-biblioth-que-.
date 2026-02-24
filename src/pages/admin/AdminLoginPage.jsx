import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { motion } from "framer-motion";

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) return;
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      navigate("/admin");
    }, 1000);
  };

  // stars animation
  const stars = Array.from({ length: 20 });

  return (
    <div className="min-h-screen flex text-white">
      {/* LEFT */}
      <div
        className="relative hidden md:flex w-1/2 items-center justify-center overflow-hidden"
      >
        {/* 🔴 BACKGROUND IMAGE (Cloudinary) */}
        <img
          src="https://res.cloudinary.com/dmxy7k7pm/image/upload/f_auto,q_auto/v1769605578/Book_uu3lq8.jpg"
          alt="Bibliothèque intelligente"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* 🔴 DARK OVERLAY WITH PINK TINGE */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
        <div className="absolute inset-0 bg-pink-500/5"></div>

        {/* ⭐ Animated stars */}
        {stars.map((_, i) => (
          <motion.span
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-70"
            initial={{
              x: Math.random() * 600 - 300,
              y: Math.random() * 600 - 300,
              opacity: 0,
            }}
            animate={{
              y: [-300, 300],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 6 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}

        {/* 🟢 CONTENT */}
        <div className="relative z-10 text-center px-10">
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-white/10 flex items-center justify-center text-2xl font-bold">
            IA
          </div>

          <h1 className="text-3xl font-bold mb-3">BiblioIA</h1>

          <p className="text-white/80">
            Votre bibliothèque intelligente avec assistant IA
          </p>
        </div>
      </div>


      {/* RIGHT */}
      <div
        className="w-full md:w-1/2 flex items-center justify-center"
        style={{ backgroundColor: "#13233e" }}
      >
        <div className="w-full max-w-md px-8">
          <h2 className="text-2xl font-semibold mb-2">
            Connexion Admin
          </h2>
          <p className="text-sm text-slate-300 mb-8 border-l-2 border-pink-500/50 pl-3">
            Accédez à votre espace d'administration
          </p>

          <form onSubmit={handleLogin}>
            {/* Email */}
            <div className="mb-4">
              <label className="text-sm mb-1 block">Email</label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  placeholder="admin@biblioia.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#121d34] border border-slate-600 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="text-sm mb-1 block">Mot de passe</label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#121d34] border border-slate-600 rounded-lg py-2 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            {/* Options */}
            <div className="flex items-center justify-between mb-6 text-sm">
              <label className="flex items-center gap-2 text-slate-300">
                <input type="checkbox" className="accent-indigo-500" />
                Se souvenir de moi
              </label>
              <button type="button" className="text-indigo-400 hover:underline">
                Mot de passe oublié ?
              </button>
            </div>

            {/* Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-600 via-pink-500 to-purple-600 py-3 rounded-xl font-bold shadow-lg shadow-pink-500/10 transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                "Se connecter"
              )}
            </motion.button>
          </form>

          <p className="text-xs text-center text-slate-400 mt-8">
            © 2024 BiblioIA. Tous droits réservés.
          </p>
        </div>
      </div>
    </div>
  );
}
