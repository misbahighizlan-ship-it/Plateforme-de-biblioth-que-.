import { motion } from "framer-motion";
import { FaHeart, FaShoppingCart, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-md sticky top-0 z-50">
      {/* LEFT */}
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

      {/* CENTER */}
      <div className="flex gap-8 text-[#212E53] font-medium">
        <Link to="/">Accueil</Link>
        <Link to="/catalogue">Bibliothèque</Link>
        <Link to="/chatbot">IA</Link>
        <Link to="/contact">Contact</Link>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        {/* SEARCH */}
        <div className="relative">
          <FaSearch className="absolute top-3 left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un livre..."
            className="pl-10 pr-4 py-2 rounded-full bg-[#B6D8F2] outline-none"
          />
        </div>

        <FaHeart className="text-xl cursor-pointer text-[#2B55B5]" />
        <FaShoppingCart className="text-xl cursor-pointer text-[#2B55B5]" />
      </div>
    </nav>
  );
}
