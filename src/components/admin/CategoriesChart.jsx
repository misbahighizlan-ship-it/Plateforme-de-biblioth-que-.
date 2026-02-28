import { useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const COLORS = ["#ff758c", "#7a5cff", "#5db2e3", "#f59e0b", "#10b981", "#f43f5e", "#8b5cf6"];

export default function CategoriesChart() {
  const { list: books } = useSelector((state) => state.books);
  const { list: categories } = useSelector((state) => state.categories);
  const [rotation, setRotation] = useState(0);

  // Donnees REELLES depuis Redux (on exclut "Toutes" s'il existe dans la liste)
  const data = categories
    .filter(cat => cat.name !== "Toutes")
    .map((cat) => ({
      name: cat.name,
      value: books.filter((b) => b.category === cat.name).length,
    }))
    .filter(d => d.value > 0);

  if (data.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        <p>Aucune donnée disponible</p>
      </div>
    );
  }

  const handleSpin = () => {
    setRotation(prev => prev + 360);
  };

  return (
    <div className="bg-white dark:bg-[#111827] rounded-3xl p-6 shadow-lg border border-gray-100 dark:border-gray-800">
      {/* Titre */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-md shadow-pink-500/20"
          style={{ background: "linear-gradient(135deg, #ff758c, #7a5cff)" }}>
          📊
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">
            Répartition par catégorie
          </h3>
          <p className="text-gray-400 text-xs mt-0.5">
            {books.length} livres au total
          </p>
        </div>
      </div>

      {/* Graphe Pie avec Framer Motion */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1, rotate: rotation }}
        transition={{
          type: "spring",
          stiffness: 60,
          damping: 20,
          opacity: { duration: 0.8 },
          scale: { duration: 0.8 }
        }}
        onClick={handleSpin}
        className="w-full cursor-pointer"
        style={{ height: 300 }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={4}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                  stroke="#ffffff"
                  strokeWidth={2}
                  className="outline-none"
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name) => [value + " livres", name]}
              contentStyle={{
                background: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(4px)",
                border: "none",
                borderRadius: "16px",
                padding: "10px 16px",
                fontSize: "13px",
                boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                color: "#1f2937"
              }}
              itemStyle={{ color: "#1f2937", fontWeight: "600" }}
            />
            <Legend
              formatter={(value) => (
                <span className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  {value}
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Liste categories avec barres */}
      <div className="mt-8 space-y-4">
        {data.map((item, i) => (
          <div key={i} className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="text-gray-700 dark:text-gray-300">{item.name}</span>
              <span className="text-gray-400">{item.value} ex.</span>
            </div>
            <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(item.value / books.length) * 100}%` }}
                transition={{ delay: 0.5 + i * 0.1, duration: 1, ease: "easeOut" }}
                className="h-full rounded-full"
                style={{ background: COLORS[i % COLORS.length] }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
