// components/admin/AdminStats.jsx
export default function AdminStats({ title, value }) {
  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow">
      <h3 className="text-gray-400 text-sm">{title}</h3>
      <p className="text-3xl font-bold text-white mt-2">{value}</p>
    </div>
  );
}
