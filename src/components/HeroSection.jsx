import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative w-full min-h-screen bg-[#0B0F19] overflow-hidden flex items-center">

      {/* Animated glow circles */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 blur-3xl rounded-full"
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink-500/10 blur-3xl rounded-full"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 10, ease: "easeInOut", delay: 2 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 blur-3xl rounded-full"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-24 w-full grid md:grid-cols-2 items-center gap-16">

        {/* LEFT — Text */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-pink-500/20 border border-blue-500/30 rounded-full px-4 py-2 mb-6"
          >
            <span className="text-[#5db2e3] text-sm font-medium">✨ Bibliothèque Intelligente IA</span>
          </motion.div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-bold leading-tight text-white">
            Découvrez votre prochaine
            <br />
            <span className="bg-gradient-to-r from-[#5db2e3] to-pink-400 bg-clip-text text-transparent">
              Lecture Idéale
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-gray-400 text-lg md:text-xl max-w-xl mt-6 leading-relaxed">
            Notre bibliothèque intelligente vous recommande des livres
            personnalisés grâce à l'intelligence artificielle.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-wrap gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/catalogue")}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-[#5db2e3] to-[#2B55B5] text-white font-bold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300"
            >
              Explorer le catalogue
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/ai")}
              className="px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all duration-300"
            >
              Assistant IA
            </motion.button>
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 flex gap-8 flex-wrap"
          >
            {[
              { value: "500+", label: "Livres" },
              { value: "10K+", label: "Lecteurs" },
              { value: "IA Gemini", label: "Propulsé par" },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-white font-bold text-xl">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT — Book image */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative flex justify-center"
        >
          <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full scale-75" />
          <div className="relative rounded-3xl border border-white/10 shadow-2xl shadow-blue-500/20 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600"
              alt="Bibliothèque"
              className="w-full h-full object-cover rounded-3xl"
              style={{ maxHeight: "500px" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19]/40 via-transparent to-transparent rounded-3xl" />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
