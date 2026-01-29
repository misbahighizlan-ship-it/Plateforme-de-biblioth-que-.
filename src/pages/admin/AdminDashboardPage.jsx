import { useEffect, useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminStats from "../../components/admin/AdminStats";
import AdminHeader from "../../components/admin/AdminHeader";
import ThemeToggle from "../../components/admin/ThemeToggle";
import AddBookModal from "../../components/admin/AddBookModal";

export default function AdminDashboardPage() {

  const [openAdd, setOpenAdd] = useState(false);

  const [dark, setDark] = useState(true);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-950 dark:text-white">
      <AdminSidebar />

      <main className="flex-1 p-8">
        {/* Header (search) + Toggle */}
        <div className="mb-6 flex items-center justify-between">
          <AdminHeader />
          <ThemeToggle dark={dark} setDark={setDark} />
        </div>

        {/* Title + Button */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">
              Tableau de bord
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Bienvenue dans votre espace d’administration BiblioAI
            </p>
          </div>

          <button
            onClick={() => setOpenAdd(true)}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Add a book
          </button>

        </div>

        {/* Stats */}
        <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-4">
          <AdminStats title="Total Livres" value="2 847" icon="📚" trend="+12%" />
          <AdminStats title="Utilisateurs" value="1 234" icon="👤" trend="+8%" />
          <AdminStats title="Messages IA" value="15 678" icon="🤖" trend="+24%" />
          <AdminStats title="Lectures / jour" value="847" icon="📈" trend="-3%" />
        </div>

        {/* Activité récente */}
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
      </main>
      <AddBookModal
        open={openAdd}
        onClose={() => setOpenAdd(false)}
      />

    </div>
  );
}
