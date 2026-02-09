import { motion } from "framer-motion";

export default function CategoryCard({ name }) {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      whileTap={{ scale: 0.95 }}
      className="bg-white rounded-xl px-6 py-4 shadow-md cursor-pointer"
    >
      <p className="font-semibold text-center">{name}</p>
    </motion.div>
  );
}
