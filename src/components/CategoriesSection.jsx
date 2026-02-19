import { useSelector } from "react-redux";
import CategoryCard from "./CategoryCard";
import { MdMovie, MdScience, MdChildCare } from "react-icons/md";
import { GiDramaMasks, GiGhost } from "react-icons/gi";

export default function CategoriesSection() {
  const { list: books } = useSelector((state) => state.books);

  // Extract unique categories
  const categoriesNames = [...new Set(books.map((b) => b.category))].filter(Boolean);

  const categoryIcons = {
    Action: { icon: <MdMovie />, color: "text-blue-500" },
    Drame: { icon: <GiDramaMasks />, color: "text-rose-400" },
    Horreur: { icon: <GiGhost />, color: "text-blue-500" },
    "Science-fiction": { icon: <MdScience />, color: "text-rose-400" },
    Science: { icon: <MdScience />, color: "text-rose-400" },
    Animation: { icon: <MdChildCare />, color: "text-blue-500" },
    Enfants: { icon: <MdChildCare />, color: "text-blue-500" },
  };

  const dynamicCategories = categoriesNames.map((name) => ({
    name,
    icon: categoryIcons[name]?.icon || <MdMovie />,
    color: categoryIcons[name]?.color || "text-blue-500",
  }));

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-8">
        <h2 className="text-2xl font-bold mb-8">
          Explorer les catégories
        </h2>

        {/* cards */}
        <div className="flex flex-wrap justify-center gap-5">
          {dynamicCategories.map((cat, index) => (
            <CategoryCard key={index} {...cat} />
          ))}
          {dynamicCategories.length === 0 && (
            <p className="text-gray-400 italic">Chargement des catégories...</p>
          )}
        </div>
      </div>
    </section>
  );
}
