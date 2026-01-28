import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminStats from "../../components/admin/AdminStats";
import AdminHeader from "../../components/admin/AdminHeader";

export default function AdminDashboardPage() {
  return (
    <div className="flex min-h-screen bg-gray-950 text-white">
      <AdminSidebar />

      <main className="flex-1 p-8">
        <AdminHeader />

        <h2 className="mb-1 text-3xl font-bold">
          Tableau de bord
        </h2>
        <p className="mb-8 text-sm text-gray-400">
          Bienvenue dans votre espace d’administration BiblioAI
        </p>

        {/* Stats */}
        <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-4">
          <AdminStats
            title="Total Livres"
            value="2 847"
            icon="📚"
            trend="+12%"
          />
          <AdminStats
            title="Utilisateurs"
            value="1 234"
            icon="👤"
            trend="+8%"
          />
          <AdminStats
            title="Messages IA"
            value="15 678"
            icon="🤖"
            trend="+24%"
          />
          <AdminStats
            title="Lectures / jour"
            value="847"
            icon="📈"
            trend="-3%"
          />
        </div>

        {/* Activité récente */}
        <div className="rounded-xl bg-gray-900 p-6">
          <h3 className="mb-4 text-lg font-semibold">
            Activité récente
          </h3>

          <ul className="space-y-3 text-sm text-gray-300">
            <li>📘 Nouveau livre ajouté</li>
            <li>🤖 Message IA envoyé</li>
            <li>📂 Catégorie modifiée</li>
            <li>👤 Nouvel utilisateur inscrit</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
