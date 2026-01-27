import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[90vh] bg-gradient-to-b from-[#050814] to-[#0b1230] overflow-hidden">

      {/* glow background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(34,211,238,0.15),transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-8 py-24 grid md:grid-cols-2 items-center gap-12">

        {/* BOOK - LEFT */}
        <motion.div
          animate={{
            y: [0, -15, 0],
            rotate: [0, 1.5, -1.5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative flex justify-center"
        >
          {/* glow */}
          <div className="absolute w-72 h-72 bg-cyan-400/20 blur-3xl rounded-full" />

          <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-6 shadow-2xl border border-white/10">
            <img
              src="/image1.jpg"
              alt="Livre IA"
              className="w-80 drop-shadow-[0_0_30px_rgba(34,211,238,0.35)]"
            />
          </div>
        </motion.div>

        {/* TEXT - RIGHT */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-white"
        >
          <h1 className="text-5xl font-bold text-cyan-400 leading-tight">
            Bibliothèque <br /> interactive
          </h1>

          <p className="mt-6 text-gray-300 max-w-lg">
            Explorez notre collection grâce à des aperçus dynamiques,
            des recommandations intelligentes et une expérience immersive
            alimentée par l’intelligence artificielle.
          </p>

          <button className="mt-8 px-6 py-3 rounded-full bg-cyan-400 text-black font-semibold hover:bg-cyan-300 transition">
            Commencez à explorer
          </button>
        </motion.div>

      </div>
    </section>
  );
}
