import { useEffect, useState } from "react";
import {
  FiBook,
  FiUsers,
  FiMessageSquare,
  FiTrendingUp,
  FiCheckCircle,
} from "react-icons/fi";

import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminHeader from "../../components/admin/AdminHeader";
import ThemeToggle from "../../components/admin/ThemeToggle";
import AddBookModal from "../../components/admin/AddBookModal";
import CategoriesChart from "../../components/admin/CategoriesChart";

export default function AdminDashboardPage() {
  const [openAdd, setOpenAdd] = useState(false);
  const [dark, setDark] = useState(true);

  // Dark mode
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-900 dark:bg-[#0B0F19] dark:text-white">
      <AdminSidebar />

      <main className="flex-1 p-8">
        {/* HEADER */}
        <div className="mb-6 flex items-center justify-between">
          <AdminHeader />
          <ThemeToggle dark={dark} setDark={setDark} />
        </div>

        {/* TITLE + BUTTON */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Tableau de bord</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Bienvenue dans votre espace d’administration BiblioAI
            </p>
          </div>

          {/* BUTTON بدون background */}
          <button
            onClick={() => setOpenAdd(true)}
            className="flex items-center gap-2 text-blue-500 font-medium
                       hover:text-blue-400 transition"
          >
            <FiCheckCircle size={18} />
            Ajouter un livre
          </button>
        </div>

        {/* STATS */}
        <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-4">
          <StatCard
            title="Total Livres"
            value="2 847"
            icon={<FiBook size={22} />}
            trend="+12%"
            positive
          />

          <StatCard
            title="Utilisateurs"
            value="1 234"
            icon={<FiUsers size={22} />}
            trend="+8%"
            positive
          />

          <StatCard
            title="Messages IA"
            value="15 678"
            icon={<FiMessageSquare size={22} />}
            trend="+24%"
            positive
          />

          <StatCard
            title="Lectures / jour"
            value="847"
            icon={<FiTrendingUp size={22} />}
            trend="-3%"
          />
        </div>

        {/* GRAPH + ACTIVITY */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* GRAPH */}
          <div className="lg:col-span-2">
            <CategoriesChart />
          </div>

          {/* ACTIVITY */}
          <div className="rounded-xl bg-white p-6 shadow dark:bg-gray-900">
            <h3 className="mb-4 text-lg font-semibold">
              Activité récente
            </h3>

            <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
              <li>📘 Nouveau livre ajouté</li>
              <li>🤖 Message IA envoyé</li>
              <li>📂 Catégorie modifiée</li>
              <li>👤 Nouvel utilisateur inscrit</li>
            </ul>
          </div>
        </div>
      </main>

      {/* MODAL */}
      <AddBookModal
        open={openAdd}
        onClose={() => setOpenAdd(false)}
      />
    </div>
  );
}

/* ---------------- STAT CARD ---------------- */
function StatCard({ title, value, icon, trend, positive }) {
  return (
    <div
      className="rounded-xl bg-white p-5 shadow
                 transition hover:-translate-y-1 hover:shadow-lg
                 dark:bg-gray-900"
    >
      <div className="mb-3 flex items-center justify-between">
        <div className="rounded-lg bg-blue-500/10 p-2 text-blue-500">
          {icon}
        </div>

        <span
          className={`text-xs font-medium ${
            positive ? "text-green-500" : "text-red-500"
          }`}
        >
          {trend}
        </span>
      </div>

      <p className="text-sm text-gray-500 dark:text-gray-400">
        {title}
      </p>
      <p className="mt-1 text-2xl font-bold">
        {value}
      </p>
    </div>
  );
}
