import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaStar, FaBookOpen } from "react-icons/fa";
import api from "../services/api";

export default function PopularBooks() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    api.get("/books").then((res) => {
      console.log(res.data)
      setBooks(res.data); 
    });
  
  }, []);
  

  return (
    <section className="flex flex-col gap-6">
      {books.map((book, index) => (
        <motion.div
          key={book.id}
          initial={{ opacity: 0, x: -80, y: 30 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{
            duration: 0.6,
            delay: index * 0.15,
            ease: "easeOut",
          }}
          className="flex gap-5 bg-white/5 hover:bg-white/10 p-5 rounded-2xl transition"
        >
          {/* IMAGE */}
          <div className="w-28 h-40 flex-shrink-0">
            {book.image ? (
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-full object-cover rounded-xl"
              />
            ) : (
              <div className="w-full h-full bg-cyan-500/20 rounded-xl flex items-center justify-center">
                <FaBookOpen className="text-cyan-400 text-3xl" />
              </div>
            )}
          </div>

          {/* CONTENT */}
          <div className="flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-white">
                {book.title}
              </h3>
              <p className="text-sm text-cyan-300">
                {book.author}
              </p>

              <p className="text-xs text-gray-300 mt-2 line-clamp-3">
                {book.description}
              </p>
            </div>

            {/* TAGS */}
            <div className="flex items-center gap-4 mt-4 text-xs text-gray-300">
              {/* Rating */}
              <div className="flex items-center gap-1">
                <FaStar className="text-yellow-400" />
                <span>{book.rating || "4.5"}</span>
              </div>

              {/* Pages */}
              <div className="flex items-center gap-1">
                <FaBookOpen className="text-cyan-400" />
                <span>{book.pages || "320"} pages</span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </section>
  );
}
