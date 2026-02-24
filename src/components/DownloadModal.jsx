import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../slices/cartSlice";

export default function DownloadModal({ show, onClose, book, bookTitle }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [showPurchaseMessage, setShowPurchaseMessage] = useState(false);

    const handleYes = () => {
        if (book) dispatch(addToCart(book));
        onClose();
        navigate("/checkout");
    };


    const handleNo = () => {
        setShowPurchaseMessage(true);
    };

    const handleCloseModal = () => {
        setShowPurchaseMessage(false);
        onClose();
    };

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                    onClick={handleCloseModal}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        transition={{ type: "spring", duration: 0.5 }}
                        className="relative bg-gradient-to-br from-[#111827] to-[#0B0F19] rounded-2xl p-8 max-w-md w-full shadow-2xl border border-gray-800"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={handleCloseModal}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                        >
                            <FaTimes className="text-xl" />
                        </button>

                        {!showPurchaseMessage ? (
                            <>
                                {/* Icon */}
                                <div className="flex justify-center mb-6">
                                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#5db2e3] to-[#2B55B5] flex items-center justify-center">
                                        <svg
                                            className="w-8 h-8 text-white"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                            />
                                        </svg>
                                    </div>
                                </div>

                                {/* Title */}
                                <h3 className="text-2xl font-bold text-white text-center mb-3">
                                    Télécharger le livre
                                </h3>

                                {/* Message */}
                                <p className="text-gray-300 text-center mb-8">
                                    Souhaitez-vous acheter{" "}
                                    <span className="font-semibold text-[#5db2e3]">
                                        "{bookTitle}"
                                    </span>{" "}
                                    pour le télécharger ?
                                </p>

                                {/* Buttons */}
                                <div className="flex gap-4">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={handleNo}
                                        className="flex-1 px-6 py-3 rounded-xl font-semibold bg-gray-700 hover:bg-gray-600 text-white transition-colors"
                                    >
                                        Non
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={handleYes}
                                        className="flex-1 px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-[#5db2e3] to-[#2B55B5] hover:from-[#2B55B5] hover:to-[#5db2e3] text-white shadow-lg transition-all"
                                    >
                                        Oui
                                    </motion.button>
                                </div>
                            </>
                        ) : (
                            <>
                                {/* Icon - Warning */}
                                <div className="flex justify-center mb-6">
                                    <div className="w-16 h-16 rounded-full bg-yellow-500/20 flex items-center justify-center">
                                        <svg
                                            className="w-8 h-8 text-yellow-500"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                            />
                                        </svg>
                                    </div>
                                </div>

                                {/* Title */}
                                <h3 className="text-2xl font-bold text-white text-center mb-3">
                                    Achat requis
                                </h3>

                                {/* Message */}
                                <p className="text-gray-300 text-center mb-8">
                                    Désolé, vous devez acheter le livre pour le télécharger.
                                </p>

                                {/* Close Button */}
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={handleCloseModal}
                                    className="w-full px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-[#5db2e3] to-[#2B55B5] hover:from-[#2B55B5] hover:to-[#5db2e3] text-white shadow-lg transition-all"
                                >
                                    D'accord
                                </motion.button>
                            </>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
