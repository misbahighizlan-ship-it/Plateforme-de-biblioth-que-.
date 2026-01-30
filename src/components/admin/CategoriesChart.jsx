import { motion } from "framer-motion";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { FiTag } from "react-icons/fi"; 

const data = [
  { name: 'Développement Personnel', value: 45 },
  { name: 'Science-Fiction', value: 32 },
  { name: 'Histoire', value: 28 },
  { name: 'Philosophie', value: 21 },
  { name: 'Littérature Classique', value: 56 },
  { name: 'Sciences', value: 18 },
];

const COLORS = ['#7C3AED', '#14B8A6', '#F59E0B', '#EF4444', '#3B82F6', '#10B981'];

export default function CategoriesChart() {
  return (
    <motion.div
      whileHover={{ rotate: 360 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="rounded-xl bg-white p-6 shadow dark:bg-gray-900"
    >
      <h3 className="mb-4 text-lg font-semibold">
        Répartition par catégorie
      </h3>

      <div className="flex flex-col items-center justify-center">
        {/* PieChart */}
        <PieChart width={300} height={300}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) =>
              `${name}: ${(percent * 100).toFixed(0)}%`
            }
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>

       { /* icon*/ }
        <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm font-medium text-gray-700 dark:text-gray-300">
          {data.map((cat, i) => (
            <div
              key={i}
              className="flex items-center gap-2"
              style={{ color: COLORS[i % COLORS.length] }}
            >
              <FiTag />
              <span>{cat.name}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
