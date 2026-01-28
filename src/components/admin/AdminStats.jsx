import { motion } from "framer-motion";

export default function AdminStats({ title, value, icon, trend }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 80 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.5 }}
      className="rounded-xl bg-gray-200 p-5 shadow 
                 dark:bg-gray-900"
    >
      <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
        <span>{title}</span>
        <span className="text-green-500">{trend}</span>
      </div>

      <div className="mt-3 flex items-center gap-3">
        <span className="text-2xl">{icon}</span>
        <span className="text-2xl font-bold text-gray-900 dark:text-white">
          {value}
        </span>
      </div>
    </motion.div>
  );
}
