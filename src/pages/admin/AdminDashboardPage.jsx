// pages/admin/AdminDashboardPage.jsx
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminStats from "../../components/admin/AdminStats";

export default function AdminDashboardPage() {
  return (
    <div className="flex bg-gray-950 min-h-screen">
      <AdminSidebar />

      <main className="flex-1 p-8 text-white">
        <h2 className="text-3xl font-bold mb-6">Tableau de bord</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <AdminStats title="Total Livres" value="2 847" />
          <AdminStats title="Utilisateurs" value="1 234" />
          <AdminStats title="Messages IA" value="15 678" />
          <AdminStats title="Lectures / jour" value="847" />
        </div>

        <div className="bg-gray-800 rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4">Activité récente</h3>
          <ul className="space-y-2 text-gray-300">
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
