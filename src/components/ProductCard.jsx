import { motion } from "framer-motion";
import { FaHeart, FaShoppingCart, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import { addToWishlist } from "../redux/slices/wishlistSlice";
import { useState } from "react";

export default function ProductCard({ book }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="relative w-64 h-96 rounded-2xl overflow-hidden
                 cursor-pointer backdrop-blur-xl
                 bg-white/5 border border-white/10
                 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
      whileHover={{ y: -12 }}
      transition={{ type: "spring", stiffness: 200 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => navigate(`/books/${book.id}`)}
    >
      {/* IMAGE */}
      <img
        src={book.image}
        alt={book.title}
        className="w-full h-full object-cover"
      />

      {/* OVERLAY HOVER */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: hovered ? 1 : 0 }}
        className="absolute inset-0 bg-black/70 p-4 flex flex-col justify-end"
      >
        <h3 className="text-white font-bold text-lg">
          {book.title}
        </h3>
        <p className="text-gray-300 text-sm">
          {book.author}
        </p>

        <div className="flex items-center gap-1 mt-2">
          <FaStar className="text-yellow-400" />
          <span className="text-white text-sm">
            {book.rating || 4.5}
          </span>
        </div>
      </motion.div>

      {/* CATEGORY BADGE */}
      <span className="absolute top-4 left-4 px-3 py-1
                       text-xs rounded-full
                       bg-rose-400/90 text-black font-semibold">
        {book.category}
      </span>

      {/* ICONS */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-3 z-20">
        {/* WISHLIST */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            dispatch(addToWishlist(book));
          }}
          className="bg-white/80 p-2 rounded-full
                     hover:scale-110 transition"
        >
          <FaHeart className="text-pink-500" />
        </button>

        {/* CART */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            dispatch(addToCart(book));
          }}
          className="bg-white/80 p-2 rounded-full
                     hover:scale-110 transition"
        >
          <FaShoppingCart className="text-cyan-600" />
        </button>
      </div>
    </motion.div>
  );
}
