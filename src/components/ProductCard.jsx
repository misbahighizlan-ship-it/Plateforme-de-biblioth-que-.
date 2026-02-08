import { motion } from "framer-motion";
import { FaStar, FaHeart, FaShoppingCart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import { addToWishlist } from "../redux/slices/wishlistSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function ProductCard({ book }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const handleWishlist = (e) => {
    e.stopPropagation();
    dispatch(addToWishlist(book));
    setIsWishlisted(true);
    setTimeout(() => setIsWishlisted(false), 1000);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch(addToCart(book));
    setIsAddedToCart(true);
    setTimeout(() => setIsAddedToCart(false), 1000);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -8 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="relative group w-64 h-96 rounded-2xl overflow-hidden cursor-pointer shadow-2xl hover:shadow-[0_20px_60px_rgba(93,178,227,0.3)]"
      onClick={() => navigate(`/books/${book.id}`)}
    >
      {/* IMAGE */}
      <img
        src={book.image}
        alt={book.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />

      {/* GRADIENT OVERLAY - Always visible for better readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-0 transition-opacity duration-300" />

      {/* HOVER OVERLAY - Glassmorphism */}
      <motion.div
        initial={{ opacity: 0 }}
        className="absolute inset-0 bg-gradient-to-br from-[#212E53]/95 via-[#2B55B5]/90 to-[#212E53]/95 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-between p-5 text-white"
      >
        {/* TOP SECTION */}
        <div className="space-y-3">
          {/* Category Badge */}
          <motion.span
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-block px-4 py-1.5 text-xs font-semibold rounded-full bg-gradient-to-r from-[#5db2e3] to-[#2B55B5] text-white shadow-lg"
          >
            {book.category}
          </motion.span>

          {/* Title */}
          <motion.h3
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="font-bold text-xl leading-tight"
          >
            {book.title}
          </motion.h3>

          {/* Description */}
          <motion.p
            initial={{ y: -20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm text-gray-200 leading-relaxed line-clamp-3"
          >
            {book.description}
          </motion.p>
        </div>

        {/* BOTTOM SECTION */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.25 }}
          className="space-y-4"
        >
          {/* Rating & Price Row */}
          <div className="flex items-center justify-between">
            {/* Rating */}
            <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-lg">
              <FaStar className="text-yellow-400 text-sm" />
              <span className="font-semibold text-sm">{book.rating || 4.5}</span>
            </div>

            {/* Price */}
            <div className="text-right">
              <p className="text-2xl font-bold text-[#5db2e3] drop-shadow-lg">
                {book.price} <span className="text-base">DH</span>
              </p>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex gap-3">
            {/* Wishlist Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleWishlist}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 ${isWishlisted
                  ? "bg-pink-500 text-white"
                  : "bg-white/10 backdrop-blur-md hover:bg-pink-500/80 text-white border border-white/20"
                }`}
            >
              <FaHeart className={isWishlisted ? "animate-pulse" : ""} />
              {isWishlisted ? "Added!" : "Wishlist"}
            </motion.button>

            {/* Add to Cart Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 ${isAddedToCart
                  ? "bg-[#5db2e3] text-black"
                  : "bg-gradient-to-r from-[#5db2e3] to-[#2B55B5] hover:from-[#2B55B5] hover:to-[#5db2e3] text-white shadow-lg"
                }`}
            >
              <FaShoppingCart className={isAddedToCart ? "animate-bounce" : ""} />
              {isAddedToCart ? "Added!" : "Cart"}
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
