import { useState } from "react";
import { useEffect } from "react";
import { FaHeart, FaShoppingCart, FaBook, FaHome, FaRobot, FaSignInAlt, FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import { MdMovie, MdScience, MdChildCare } from "react-icons/md";
import { GiDramaMasks, GiGhost } from "react-icons/gi";
import { useNavigate, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchCategories } from "../slices/categoriesSlice";

export default function Navbar({ onCartClick }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartCount = useSelector((state) => state.cart.items.length);
  const wishlistCount = useSelector((state) => state.wishlist.items.length);
  const { list: categories } = useSelector((state) => state.categories);

  useEffect(() => { dispatch(fetchCategories()); }, [dispatch]);

  const links = [
    { to: "/", label: "Accueil", icon: <FaHome size={18} /> },
    { to: "/catalogue", label: "Catalogue", icon: <FaBook size={18} /> },
    { to: "/ai", label: "Assistant IA", icon: <FaRobot size={18} /> },
    { to: "/contact", label: "Contact & Avis", icon: null },
  ];

  return (
    <div className="w-full px-4 py-3 sticky top-0 z-50 bg-transparent">

      {/* NAVBAR CONTAINER — Arrondie + Gradient */}
      <nav
        className="max-w-7xl mx-auto rounded-2xl shadow-xl px-6 py-3"
        style={{
          background: "linear-gradient(to right, #77A1D3, #79CBCA, #E684AE)",
        }}
      >
        <div className="flex items-center justify-between gap-4">

          {/* LOGO */}
          <NavLink to="/" style={{ cursor: "pointer" }}
            className="flex items-center gap-2 flex-shrink-0">
            <div className="w-11 h-11 rounded-xl bg-white/20 backdrop-blur
                            flex items-center justify-center shadow-md">
              <FaBook className="text-white" size={20} />
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-white text-lg leading-none block">
                SmartLibrary
              </span>
              <span className="text-white/70 text-xs">BiblioIA</span>
            </div>
          </NavLink>

          {/* LIENS — Desktop */}
          <div className="hidden md:flex items-center gap-1">
            {links.map(({ to, label, icon }) => (
              <NavLink
                key={to}
                to={to}
                style={{ cursor: "pointer" }}
                className={({ isActive }) => `
                  flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold
                  transition-all duration-200
                  ${isActive
                    ? "bg-white/30 text-white shadow-sm"
                    : "text-white/80 hover:bg-white/20 hover:text-white"
                  }
                `}
              >
                {icon && <span>{icon}</span>}
                {label}
              </NavLink>
            ))}
          </div>

          {/* DROITE */}
          <div className="flex items-center gap-2">

            {/* Wishlist → ROSE */}
            <NavLink to="/wishlist" style={{ cursor: "pointer" }}
              className="relative w-10 h-10 rounded-xl bg-white/10 hover:bg-white/25
                         flex items-center justify-center transition-all">
              <FaHeart className="text-pink-200" size={20} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-pink-400
                                 text-white text-xs rounded-full flex items-center
                                 justify-center font-bold shadow">
                  {wishlistCount}
                </span>
              )}
            </NavLink>

            {/* Cart → BLEU */}
            <button onClick={onCartClick} style={{ cursor: "pointer" }}
              className="relative w-10 h-10 rounded-xl bg-white/10 hover:bg-white/25
                         flex items-center justify-center transition-all">
              <FaShoppingCart className="text-blue-200" size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#5db2e3]
                                 text-white text-xs rounded-full flex items-center
                                 justify-center font-bold shadow">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Séparateur */}
            <div className="w-px h-6 bg-white/30 mx-1 hidden sm:block" />

            {/* Login UNIQUEMENT */}
            <NavLink to="/login" style={{ cursor: "pointer" }}
              className="hidden sm:flex items-center gap-2 px-5 py-2 rounded-xl
                         text-sm font-bold text-[#7a5cff] bg-white
                         hover:bg-white/90 hover:scale-105
                         transition-all duration-200 shadow-md whitespace-nowrap">
              <FaSignInAlt size={16} /> Login
            </NavLink>

            {/* Burger mobile */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{ cursor: "pointer" }}
              className="md:hidden w-10 h-10 rounded-xl bg-white/10 hover:bg-white/25
                         flex items-center justify-center text-white transition-all">
              {mobileOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
            </button>

          </div>
        </div>

        {/* MOBILE MENU */}
        {mobileOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-white/20 space-y-1">
            {links.map(({ to, label, icon }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setMobileOpen(false)}
                style={{ cursor: "pointer" }}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl
                           text-white/80 hover:bg-white/20 hover:text-white
                           transition-all text-sm font-medium"
              >
                {icon && <span>{icon}</span>}
                {label}
              </NavLink>
            ))}
            <NavLink to="/login"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl
                         text-[#7a5cff] bg-white font-bold text-sm mt-2">
              <FaSignInAlt /> Login
            </NavLink>
          </div>
        )}
      </nav>
    </div>
  );
}
