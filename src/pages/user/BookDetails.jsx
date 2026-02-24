import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import {
  FaStar,
  FaHeart,
  FaShoppingCart,
  FaRobot,
  FaDownload,
  FaCalendar,
  FaBook,
  FaLanguage,
  FaBookOpen,
  FaArrowLeft
} from "react-icons/fa";
import { useState, useMemo } from "react";
import { addToCart } from "../../slices/cartSlice";
import { addToWishlist } from "../../slices/wishlistSlice";
import DownloadModal from "../../components/DownloadModal";

export default function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.list);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const book = books.find((b) => b.id == id);
  const reviewCount = useMemo(() => Math.floor(Math.random() * 200) + 50, [id]);

  if (!book) {
    return (
      <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center">
        <div className="text-center">
          <p className="text-white text-xl mb-4">Book not found</p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-gradient-to-r from-[#5db2e3] to-[#2B55B5] text-white rounded-xl font-semibold hover:from-[#2B55B5] hover:to-[#5db2e3] transition-all"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const handleWishlist = () => {
    dispatch(addToWishlist(book));
    setIsWishlisted(true);
    setTimeout(() => setIsWishlisted(false), 2000);
  };

  const handleAddToCart = () => {
    dispatch(addToCart(book));
  };

  const handleAIChat = () => {
    navigate(`/books/${book.id}/chat`);
  };

  // Get related books (same category, excluding current book)
  const relatedBooks = books
    .filter((b) => b.category === book.category && b.id !== book.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B0F19] via-[#111827] to-[#0B0F19] text-white">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-8 pt-8">
        <motion.button
          whileHover={{ x: -5 }}
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
        >
          <FaArrowLeft />
          <span>Back to Library</span>
        </motion.button>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-10">
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* LEFT: Book Cover */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center"
          >
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#5db2e3] to-[#2B55B5] rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity" />
              <img
                src={book.image}
                alt={book.title}
                className="relative rounded-2xl shadow-2xl max-w-md w-full h-auto object-cover"
              />
            </div>
          </motion.div>

          {/* RIGHT: Book Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col justify-center space-y-6"
          >
            {/* Title */}
            <h1 className="text-5xl font-bold leading-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {book.title}
            </h1>

            {/* Author */}
            <p className="text-xl text-gray-400 flex items-center gap-2">
              <span className="text-2xl">✍️</span>
              <span>by {book.author || "Unknown Author"}</span>
            </p>

            {/* Category & Rating */}
            <div className="flex items-center gap-4 flex-wrap">
              <span className="px-4 py-2 rounded-full bg-gradient-to-r from-[#5db2e3] to-[#2B55B5] text-white font-semibold text-sm shadow-lg">
                {book.category}
              </span>

              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={
                        i < Math.floor(book.rating || 4.5)
                          ? "text-yellow-400"
                          : "text-gray-600"
                      }
                    />
                  ))}
                </div>
                <span className="font-semibold">{book.rating || 4.5}/5</span>
                <span className="text-gray-400 text-sm">
                  ({reviewCount} reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="text-4xl font-bold text-[#5db2e3]">
              {book.price} <span className="text-2xl">DH</span>
            </div>

            {/* Metadata Grid */}
            <div className="grid grid-cols-2 gap-4 bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
              <div className="flex items-center gap-3">
                <FaCalendar className="text-[#5db2e3] text-xl" />
                <div>
                  <p className="text-xs text-gray-400">Publish Date</p>
                  <p className="font-semibold">
                    {book.publishDate || "Oct 12, 2025"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <FaBook className="text-[#5db2e3] text-xl" />
                <div>
                  <p className="text-xs text-gray-400">Pages</p>
                  <p className="font-semibold">{book.pages || 320}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <FaLanguage className="text-[#5db2e3] text-xl" />
                <div>
                  <p className="text-xs text-gray-400">Language</p>
                  <p className="font-semibold">{book.language || "English"}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <FaBookOpen className="text-[#5db2e3] text-xl" />
                <div>
                  <p className="text-xs text-gray-400">Format</p>
                  <p className="font-semibold">{book.format || "Hardcover"}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4">
              {/* AI Chat Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAIChat}
                className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white shadow-lg transition-all"
              >
                <FaRobot className="text-xl" />
                AI Chat
              </motion.button>

              {/* Download Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowDownloadModal(true)}
                className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold bg-gradient-to-r from-[#5db2e3] to-[#2B55B5] hover:from-[#2B55B5] hover:to-[#5db2e3] text-white shadow-lg transition-all"
              >
                <FaDownload className="text-xl" />
                Download
              </motion.button>

              {/* Wishlist Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleWishlist}
                className={`flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold transition-all ${isWishlisted
                  ? "bg-pink-500 text-white"
                  : "bg-white/10 backdrop-blur-md hover:bg-pink-500/80 text-white border border-white/20"
                  }`}
              >
                <FaHeart className={`text-xl ${isWishlisted ? "animate-pulse" : ""}`} />
                {isWishlisted ? "Added to Wishlist!" : "Wishlist"}
              </motion.button>

              {/* Add to Cart Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
                className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-semibold bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 text-white shadow-lg transition-all"
              >
                <FaShoppingCart className="text-xl" />
                Add to Cart
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Description Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16 bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10"
        >
          <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
            <span className="text-[#5db2e3]">📖</span>
            Deep Dive
          </h2>
          <p className="text-gray-300 leading-relaxed text-lg">
            {book.description ||
              "Discover an immersive journey through the pages of this captivating book. With rich storytelling and compelling characters, this work stands as a testament to literary excellence. Whether you're a seasoned reader or just beginning your literary adventure, this book promises to engage, enlighten, and entertain."}
          </p>
        </motion.div>

        {/* Author Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-16 bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/10"
        >
          <h2 className="text-3xl font-bold mb-6">About {book.author || "the Author"}</h2>
          <div className="flex items-start gap-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#5db2e3] to-[#2B55B5] flex items-center justify-center text-3xl font-bold flex-shrink-0">
              {(book.author || "A")[0].toUpperCase()}
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">{book.author || "Unknown Author"}</h3>
              <p className="text-gray-400 leading-relaxed">
                {book.author || "Unknown Author"} is a best-selling author known for their captivating storytelling and unique narrative style. With numerous acclaimed works, they continue to inspire readers worldwide.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Related Books Section */}
        {relatedBooks.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold mb-8">Users who liked this also read...</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedBooks.map((relatedBook) => (
                <motion.div
                  key={relatedBook.id}
                  whileHover={{ scale: 1.05, y: -5 }}
                  onClick={() => navigate(`/books/${relatedBook.id}`)}
                  className="cursor-pointer group"
                >
                  <div className="relative overflow-hidden rounded-xl shadow-lg mb-3">
                    <img
                      src={relatedBook.image}
                      alt={relatedBook.title}
                      className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <p className="text-white font-semibold text-sm line-clamp-2">
                        {relatedBook.title}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm text-center line-clamp-1">
                    {relatedBook.author || "Unknown Author"}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Download Modal */}
      <DownloadModal
        show={showDownloadModal}
        onClose={() => setShowDownloadModal(false)}
        bookTitle={book.title}
      />
    </div>
  );
}
