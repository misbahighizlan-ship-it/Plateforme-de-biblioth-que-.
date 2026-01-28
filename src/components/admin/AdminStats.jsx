import { motion } from "framer-motion";

export default function AdminStats({ title, value, icon, trend }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{
        opacity: 1,
        y: [0, -6, 0],     
        scale: [1, 1.02, 1], 
      }}
      transition={{
        duration: 3,
        ease: "easeInOut",
        repeat: Infinity,   
      }}
      whileHover={{
        scale: 1.05,
        boxShadow: "0 0 25px rgba(59,130,246,0.4)",
      }}
      className="rounded-xl bg-gray-900 p-6 shadow-lg"
    >
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xl">{icon}</span>
        <span
          className={`text-xs ${
            trend.startsWith("-")
              ? "text-red-400"
              : "text-green-400"
          }`}
        >
          {trend}
        </span>
      </div>

      <h3 className="text-2xl font-bold text-white">
        {value}
      </h3>
      <p className="text-sm text-gray-400">
        {title}
      </p>
    </motion.div>
  );
}
