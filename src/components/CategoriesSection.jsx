import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  LuHeart,
  LuGlobe,
  LuSparkles,
  LuTheater,
  LuLandmark,
  LuRocket,
  LuScroll,
  LuSword,
  LuBrainCircuit,
  LuLibrary,
} from "react-icons/lu";

const categoryConfig = {
  "Romance": { Icon: LuHeart, color: "text-rose-300", border: "hover:border-rose-400/40", glow: "hover:shadow-rose-500/15", bg: "from-rose-500/10 to-pink-500/10" },
  "Social Novel": { Icon: LuGlobe, color: "text-emerald-300", border: "hover:border-emerald-400/40", glow: "hover:shadow-emerald-500/15", bg: "from-emerald-500/10 to-teal-500/10" },
  "Social-Romantic Fiction": { Icon: LuSparkles, color: "text-amber-300", border: "hover:border-amber-400/40", glow: "hover:shadow-amber-500/15", bg: "from-amber-500/10 to-yellow-500/10" },
  "Tragedy & Drama": { Icon: LuTheater, color: "text-violet-300", border: "hover:border-violet-400/40", glow: "hover:shadow-violet-500/15", bg: "from-violet-500/10 to-purple-500/10" },
  "Religious/Spiritual Drama": { Icon: LuLandmark, color: "text-sky-300", border: "hover:border-sky-400/40", glow: "hover:shadow-sky-500/15", bg: "from-sky-500/10 to-blue-500/10" },
  "Fantasy, and Psychological Thriller": { Icon: LuBrainCircuit, color: "text-fuchsia-300", border: "hover:border-fuchsia-400/40", glow: "hover:shadow-fuchsia-500/15", bg: "from-fuchsia-500/10 to-pink-500/10" },
  "Science-Fiction": { Icon: LuRocket, color: "text-cyan-300", border: "hover:border-cyan-400/40", glow: "hover:shadow-cyan-500/15", bg: "from-cyan-500/10 to-blue-500/10" },
  "Histoire": { Icon: LuScroll, color: "text-orange-300", border: "hover:border-orange-400/40", glow: "hover:shadow-orange-500/15", bg: "from-orange-500/10 to-amber-500/10" },
  "historique": { Icon: LuSword, color: "text-red-300", border: "hover:border-red-400/40", glow: "hover:shadow-red-500/15", bg: "from-red-500/10 to-rose-500/10" },
};

const defaultConfig = {
  Icon: LuLibrary,
  color: "text-[#5db2e3]",
  border: "hover:border-[#5db2e3]/40",
  glow: "hover:shadow-blue-500/15",
  bg: "from-blue-500/10 to-indigo-500/10",
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

export default function CategoriesSection() {
  const { list: books } = useSelector((state) => state.books);
  const navigate = useNavigate();

  const categoriesNames = [...new Set(books.map((b) => b.category))].filter(Boolean);
  const displayedCategories = categoriesNames.slice(0, 5).map((name) => ({
    name,
    bookCount: books.filter((b) => b.category === name).length,
  }));

  return (
    <section className="py-20 bg-white relative overflow-hidden">

      {/* Ambient blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <span className="text-[#5db2e3] text-sm font-semibold tracking-widest uppercase block mb-3">
            GENRES
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Explorer les{" "}
            <span className="bg-gradient-to-r from-[#5db2e3] to-pink-400 bg-clip-text text-transparent">
              catégories
            </span>
          </h2>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {displayedCategories.map((cat) => {
            const { Icon, color, border, glow, bg } = categoryConfig[cat.name] ?? defaultConfig;
            return (
              <motion.div
                key={cat.name}
                variants={cardVariants}
                whileHover={{ y: -10, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`relative bg-white border border-gray-100 rounded-2xl p-6 text-center
                  cursor-pointer transition-all duration-300 group
                  shadow-sm hover:shadow-xl overflow-hidden`}
                onClick={() => navigate(`/catalogue?category=${encodeURIComponent(cat.name)}`)}
              >
                {/* Subtle card shimmer on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-[#2B55B5]/[0.02] to-transparent rounded-2xl" />

                {/* Icon container */}
                <motion.div
                  className={`w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br ${bg}
                    flex items-center justify-center`}
                  whileHover={{ rotate: [0, -6, 6, 0], scale: 1.1 }}
                  transition={{ duration: 0.45 }}
                >
                  <Icon className={`text-xl ${color}`} strokeWidth={1.5} />
                </motion.div>

                <h3 className="text-gray-900 font-semibold text-sm leading-tight">{cat.name}</h3>
                <p className="text-gray-500 text-xs mt-1">{cat.bookCount} livres</p>
              </motion.div>
            );
          })}

          {displayedCategories.length === 0 && (
            <p className="col-span-5 text-gray-500 italic text-center">Chargement des catégories...</p>
          )}
        </motion.div>

      </div>
    </section>
  );
}
