import { motion } from "framer-motion";

// ⭐ نجيمة
function Star({ delay }) {
  return (
    <motion.span
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 120, opacity: [0, 1, 0] }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        delay,
        ease: "linear",
      }}
      className="absolute text-yellow-300 text-sm"
      style={{
        left: `${Math.random() * 100}%`,
        top: "-10px",
      }}
    >
      ✦
    </motion.span>
  );
}

export default function CategoryCard({ name, icon, color }) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.05 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="
        relative
        overflow-hidden
        rounded-xl
        aspect-square
        w-36 md:w-50
        flex flex-col
        items-center
        justify-center
        gap-2
        cursor-pointer
        shadow-md
        hover:shadow-xl
        bg-gradient-to-br
        from-rose-100
        via-white
        to-blue-100
      "
    >
      {/* ✨ stars */}
      <div className="absolute inset-0 pointer-events-none">
        <Star delay={0} />
        <Star delay={0.8} />
        <Star delay={1.6} />
        <Star delay={2.2} />
      </div>

      {/* icon */}
      <span className={`text-2xl ${color}`}>
        {icon}
      </span>

      {/* text */}
      <p className="text-base font-semibold text-gray-700">
        {name}
      </p>
    </motion.div>
  );
}
