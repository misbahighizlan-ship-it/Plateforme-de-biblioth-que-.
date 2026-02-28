import { useState } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import {
  FiBook,
  FiMessageSquare,
  FiTrendingUp,
  FiCheckCircle,
  FiPackage,
  FiUsers
} from "react-icons/fi";

import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminHeader from "../../components/admin/AdminHeader";
import AddBookModal from "../../components/admin/AddBookModal";
import CategoriesChart from "../../components/admin/CategoriesChart";

export default function AdminDashboardPage() {
  const [openAdd, setOpenAdd] = useState(false);

  // Donnees REELLES
  const { list: books } = useSelector((state) => state.books);
  const { list: categories } = useSelector((state) => state.categories);
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  const feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];

  return (
    <div className="flex min-h-screen bg-[#f8f9fa] dark:bg-[#0B0F19] text-gray-900 dark:text-white transition-colors duration-300">
      <AdminSidebar />

      <main className="flex-1 p-4 md:p-8 pt-16 md:pt-8 max-w-[1600px] mx-auto w-full">
        {/* HEADER */}
        <div className="mb-8">
          <AdminHeader />
        </div>

        {/* TITRE + BOUTON AJOUTER */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-black tracking-tight text-gray-800 dark:text-white">
              Tableau de bord
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Bienvenue, voici l'état actuel de votre bibliothèque IA.
            </p>
          </div>

          <button
            onClick={() => setOpenAdd(true)}
            style={{
              cursor: "pointer",
              background: "linear-gradient(135deg, #ff758c, #7a5cff)"
            }}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl
                       text-white font-bold text-sm shadow-xl shadow-pink-500/20
                       hover:scale-105 hover:shadow-pink-500/40 transition-all active:scale-95"
          >
            <FiCheckCircle size={18} />
            Ajouter un livre
          </button>
        </div>

        {/* STATS CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10">
          <StatCard
            title="Total Livres"
            value={books.length}
            icon={<FiBook size={22} />}
            trend="+12%"
            color="#ff758c"
            delay={0.1}
          />
          <StatCard
            title="Commandes"
            value={orders.length}
            icon={<FiPackage size={22} />}
            trend="+8%"
            color="#7a5cff"
            delay={0.2}
          />
          <StatCard
            title="Avis Clients"
            value={feedbacks.length}
            icon={<FiMessageSquare size={22} />}
            trend="+24%"
            color="#5db2e3"
            delay={0.3}
          />
          <StatCard
            title="Catégories"
            value={categories.length}
            icon={<FiTrendingUp size={22} />}
            trend="+3%"
            color="#f59e0b"
            delay={0.4}
          />
        </div>

        {/* GRAPH + ACTIVITE */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* GRAPH */}
          <div className="lg:col-span-2">
            <CategoriesChart />
          </div>

          {/* ACTIVITY */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-[#111827] rounded-3xl p-6 shadow-lg border border-gray-100 dark:border-gray-800"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                Activité récente
              </h3>
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-500 bg-blue-500/10 px-2 py-1 rounded-lg">
                LIVE
              </span>
            </div>

            <div className="space-y-4">
              {[
                { icon: "📘", text: "Nouveau livre ajouté", date: "Il y a 2h", color: "bg-blue-50" },
                { icon: "🤖", text: "Message IA envoyé", date: "Il y a 5h", color: "bg-purple-50" },
                { icon: "📂", text: "Catégorie modifiée", date: "Hier", color: "bg-pink-50" },
                { icon: "👤", text: "Nouvel utilisateur inscrit", date: "Hier", color: "bg-amber-50" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 group cursor-default">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-sm ${item.color} group-hover:scale-110 transition-transform`}>
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-700 dark:text-gray-300 group-hover:text-blue-500 transition-colors">
                      {item.text}
                    </p>
                    <p className="text-[10px] text-gray-400 font-medium">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* QUICK LINK */}
            <button className="w-full mt-8 py-3 rounded-xl border border-dashed border-gray-200 dark:border-gray-800 text-xs font-bold text-gray-400 hover:text-blue-500 hover:border-blue-500/50 transition-all uppercase tracking-widest">
              Voir tout l'historique
            </button>
          </motion.div>
        </div>
      </main>

      <AddBookModal open={openAdd} onClose={() => setOpenAdd(false)} />
    </div>
  );
}

function StatCard({ title, value, icon, trend, color, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-[#111827] rounded-3xl p-6 shadow-lg border border-gray-100 dark:border-gray-800 relative overflow-hidden group transition-all"
    >
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg transform group-hover:rotate-12 transition-transform"
            style={{ background: `linear-gradient(135deg, ${color}, ${color}dd)` }}
          >
            {icon}
          </div>
          <span className="text-[10px] font-black px-2 py-1 rounded-lg bg-green-500/10 text-green-500 border border-green-500/20">
            {trend}
          </span>
        </div>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{title}</p>
        <p className="text-3xl font-black text-gray-800 dark:text-white mt-1 leading-none tracking-tight">
          {value}
        </p>
      </div>

      {/* Decorative background circle */}
      <div
        className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full opacity-[0.03] group-hover:opacity-[0.06] transition-opacity"
        style={{ backgroundColor: color }}
      />
    </motion.div>
  );
}
