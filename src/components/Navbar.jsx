import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaHeart,
  FaShoppingCart,
  FaUserShield,
  FaChevronDown,
  FaMoon,
  FaSun
} from "react-icons/fa";
import { MdMovie, MdScience, MdChildCare } from "react-icons/md";
import { GiDramaMasks, GiGhost } from "react-icons/gi";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories } from "../slices/categoriesSlice";

export default function Navbar({ onCartClick, darkMode, toggleDarkMode }) {
  const [openCat, setOpenCat] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartCount = useSelector((state) => state.cart.items.length);
  const wishCount = useSelector((state) => state.wishlist.items.length);
  const { list: categories, loading: catLoading } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const categoryIcons = {
    Action: <MdMovie />,
    Drame: <GiDramaMasks />,
    Horreur: <GiGhost />,
    "Science-fiction": <MdScience />,
    Science: <MdScience />,
    Animation: <MdChildCare />,
    Enfants: <MdChildCare />,
  };

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white dark:bg-[#0B0F19] shadow-md sticky top-0 z-50">

      {/* LOGO */}
      <Link to="/" className="flex items-center gap-3">
        <motion.img
          src="/logo.png"
          alt="Logo"
          className="w-10"
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6 }}
        />
        <span className="font-bold text-xl text-[#2B55B5]">
          SmartLibrary
        </span>
      </Link>

      {/* LINKS */}
      <div className="flex items-center gap-8 text-[#212E53] dark:text-gray-300 font-medium relative">
        <Link to="/">Accueil</Link>
        <Link to="/catalogue">Catalogue</Link>
        <Link to="/ai">Assistant IA</Link>
        <Link to="/contact">Contact & Avis</Link>

        {/* CATEGORIES */}
        <div className="relative">
          <button
            onClick={() => setOpenCat(!openCat)}
            className="flex items-center gap-1"
          >
            Catégories <FaChevronDown size={12} />
          </button>

          {openCat && (
            <div className="absolute top-10 left-0 bg-white dark:bg-[#111827] shadow-xl rounded-xl w-56 p-3 space-y-2 z-50">
              {catLoading ? (
                <p className="text-xs text-gray-400 p-2">Chargement...</p>
              ) : categories.length > 0 ? (
                categories.map((cat) => (
                  <CategoryItem
                    key={cat.id || cat.name}
                    icon={categoryIcons[cat.name] || <MdMovie />}
                    label={cat.name}
                    onClick={() => {
                      navigate(`/catalogue?category=${cat.name}`);
                      setOpenCat(false);
                    }}
                  />
                ))
              ) : (
                <p className="text-xs text-gray-400 p-2">Aucune catégorie</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ICONS */}
      <div className="flex items-center gap-6 text-[#2B55B5]">

        {/* 🌓 DARK MODE TOGGLE */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-lg transition-colors"
        >
          {darkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
        </button>

        {/* ❤️ WISHLIST */}
        <Link to="/wishlist" className="relative">
          <FaHeart className="text-xl cursor-pointer hover:scale-110 transition" />
          {wishCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-rose-400 text-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
              {wishCount}
            </span>
          )}
        </Link>

        {/* 🛒 CART */}
        <div onClick={onCartClick} className="relative cursor-pointer">
          <FaShoppingCart className="text-xl hover:scale-110 transition" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-cyan-500 text-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold">
              {cartCount}
            </span>
          )}
        </div>

        {/* ADMIN */}
        <Link to="/login">
          <FaUserShield className="text-xl cursor-pointer hover:scale-110 transition" />
        </Link>
      </div>
    </nav>
  );
}

function CategoryItem({ icon, label, onClick }) {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors"
    >
      <span className="text-[#2B55B5] text-lg">
        {icon}
      </span>
      <span className="text-sm dark:text-gray-300">{label}</span>
    </div>
  );
}
