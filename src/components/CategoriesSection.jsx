import CategoryCard from "./CategoryCard";
import { MdMovie, MdScience, MdChildCare } from "react-icons/md";
import { GiDramaMasks, GiGhost } from "react-icons/gi";

export default function CategoriesSection() {
  const categories = [
    { name: "Action", icon: <MdMovie />, color: "text-blue-500" },
    { name: "Drame", icon: <GiDramaMasks />, color: "text-rose-400" },
    { name: "Horreur", icon: <GiGhost />, color: "text-blue-500" },
    { name: "Science", icon: <MdScience />, color: "text-rose-400" },
    { name: "Enfants", icon: <MdChildCare />, color: "text-blue-500" },
  ];

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-8">
        <h2 className="text-2xl font-bold mb-8">
          Explorer les catégories
        </h2>

        {/* cards */}
        <div className="flex flex-wrap justify-center gap-5">
          {categories.map((cat, index) => (
            <CategoryCard key={index} {...cat} />
          ))}
        </div>
      </div>
    </section>
  );
}
