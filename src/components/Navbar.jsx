import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaHeart,
  FaShoppingCart,
  FaUserShield,
  FaChevronDown,
} from "react-icons/fa";
import { MdMovie, MdScience, MdChildCare } from "react-icons/md";
import { GiDramaMasks, GiGhost } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Navbar({ onCartClick }) {
  const [openCat, setOpenCat] = useState(false);

  // 🔢 Counters from Redux
  const cartCount = useSelector(
    (state) => state.cart.items.length
  );
  const wishCount = useSelector(
    (state) => state.wishlist.items.length
  );

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-md sticky top-0 z-50">

      {/* LOGO */}
      <div className="flex items-center gap-3">
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
      </div>

      {/* LINKS */}
      <div className="flex items-center gap-8 text-[#212E53] font-medium relative">
        <Link to="/">Accueil</Link>
        <Link to="/catalogue">Catalogue</Link>

        {/* CATEGORIES */}
        <div className="relative">
          <button
            onClick={() => setOpenCat(!openCat)}
            className="flex items-center gap-1"
          >
            Catégories <FaChevronDown size={12} />
          </button>

          {openCat && (
            <div className="absolute top-10 left-0 bg-white shadow-xl rounded-xl w-56 p-3 space-y-2">
              <CategoryItem icon={<MdMovie />} label="Action" />
              <CategoryItem icon={<GiDramaMasks />} label="Drame" />
              <CategoryItem icon={<GiGhost />} label="Horreur" />
              <CategoryItem icon={<MdScience />} label="Science-fiction" />
              <CategoryItem icon={<MdChildCare />} label="Animation" />
            </div>
          )}
        </div>
      </div>

      {/* ICONS */}
      <div className="flex items-center gap-6 text-[#2B55B5]">

        {/* ❤️ WISHLIST */}
        <Link to="/wishlist" className="relative">
          <FaHeart className="text-xl cursor-pointer hover:scale-110 transition" />

          {wishCount > 0 && (
            <span
              className="absolute -top-2 -right-2
                         bg-rose-400 text-black
                         text-xs w-5 h-5 rounded-full
                         flex items-center justify-center"
            >
              {wishCount}
            </span>
          )}
        </Link>

        {/* 🛒 CART */}
        <div
          onClick={onCartClick}
          className="relative cursor-pointer"
        >
          <FaShoppingCart className="text-xl hover:scale-110 transition" />

          {cartCount > 0 && (
            <span
              className="absolute -top-2 -right-2
                         bg-cyan-500 text-black
                         text-xs w-5 h-5 rounded-full
                         flex items-center justify-center"
            >
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

/* Category item */
function CategoryItem({ icon, label }) {
  return (
    <div className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 cursor-pointer">
      <span className="text-[#2B55B5] text-lg">
        {icon}
      </span>
      <span className="text-sm">{label}</span>
    </div>
  );
}
