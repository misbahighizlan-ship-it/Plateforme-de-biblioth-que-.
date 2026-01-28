// pages/admin/AdminMessagesPage.jsx
import AdminSidebar from "../../components/admin/AdminSidebar";

export default function AdminMessagesPage() {
  return (
    <div className="flex bg-gray-950 min-h-screen">
      <AdminSidebar />

      <main className="flex-1 p-8 text-white">
        <h2 className="text-3xl font-bold mb-6">Messages reçus</h2>

        <div className="bg-gray-800 p-6 rounded-xl">
          <p className="text-gray-400">Aucun message pour le moment.</p>
        </div>
      </main>
    </div>
  );
}
