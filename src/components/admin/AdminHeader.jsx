
export default function AdminHeader() {
    
  return (
    <div className="mb-6 flex items-center justify-around gap-200 ">
      {/* Search */}
      <input
        type="text"
        placeholder="Rechercher des livres, utilisateurs..."
        className="w-[420px] rounded-lg bg-gray-800 px-4 py-2 text-sm 
                   text-gray-200 placeholder-gray-400 outline-none
                   focus:ring-2 focus:ring-indigo-600"
      />

      {/* Right icons (optionnel) */}
      <div className="flex items-center  text-2xl  text-gray-600">
        <span>mercredi 28 janvier</span>
      </div>
      
    </div>
  );
}
