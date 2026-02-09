import { motion } from "framer-motion";
import { FaArrowDown } from "react-icons/fa";

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[80vh] bg-gradient-to-b from-[#050814] to-[#0b1230] overflow-hidden">

      {/* glow background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(34,211,238,0.15),transparent_60%)]" />

      <div className="relative max-w-7xl mx-auto px-8 py-24 grid md:grid-cols-2 items-center gap-12">

        {/* BOOK - LEFT */}
        <motion.div
          animate={{ y: [0, -15, 0], rotate: [0, 1.5, -1.5, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="relative flex justify-center"
        >
          <div className="absolute w-72 h-72 bg-rose-400/20 blur-3xl rounded-full" />

          <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
            <img
              src="/image1.jpg"
              alt="Livre IA"
              className="w-80 drop-shadow-[0_0_35px_rgba(236,72,153,0.4)]"
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
          <h1 className="text-5xl font-bold leading-tight">
            <span className="text-rose-400">Bibliothèque</span>
            <br /> interactive
          </h1>

          <p className="mt-6 text-gray-300 max-w-lg">
            Explorez notre collection grâce à des aperçus dynamiques,
            des recommandations intelligentes et une expérience immersive.
          </p>

          {/* BUTTON + ARROW */}
          <div className="mt-10 flex flex-col items-start gap-4">
            <button
              onClick={() =>
                document
                  .getElementById("popular-books")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="px-7 py-3 rounded-full bg-gradient-to-r from-rose-400 to-pink-500 text-black font-semibold hover:scale-105 transition"
            >
              Commencez à explorer
            </button>

            {/* arrow */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-rose-400 text-xl ml-6"
            >
              <FaArrowDown />
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
