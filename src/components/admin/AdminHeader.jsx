export default function AdminHeader() {
  return (
    <div className="mb-8 flex items-center justify-between">
      <input
        type="text"
        placeholder="Rechercher des livres, utilisateurs..."
        className="w-1/3 rounded-lg bg-gray-900 px-4 py-2 text-sm text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-indigo-600"
      />

      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-400">
          mercredi 29 janvier
        </span>

        <button className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium hover:bg-indigo-700">
          + Ajouter un livre
        </button>
      </div>
    </div>
  );
}
