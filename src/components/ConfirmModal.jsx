import { motion, AnimatePresence } from "framer-motion";
import { FiAlertTriangle, FiTrash2, FiX, FiInfo } from "react-icons/fi";

const VARIANTS = {
    danger: {
        icon: FiTrash2,
        iconBg: "bg-red-500/10",
        iconColor: "text-red-500",
        confirmBg: "bg-gradient-to-r from-red-500 to-rose-600",
        confirmShadow: "shadow-red-500/25",
        titleColor: "text-red-400",
    },
    warning: {
        icon: FiAlertTriangle,
        iconBg: "bg-amber-500/10",
        iconColor: "text-amber-500",
        confirmBg: "bg-gradient-to-r from-amber-500 to-orange-600",
        confirmShadow: "shadow-amber-500/25",
        titleColor: "text-amber-400",
    },
    info: {
        icon: FiInfo,
        iconBg: "bg-blue-500/10",
        iconColor: "text-blue-500",
        confirmBg: "bg-gradient-to-r from-blue-500 to-indigo-600",
        confirmShadow: "shadow-blue-500/25",
        titleColor: "text-blue-400",
    },
};

export default function ConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    title = "Confirmer l'action",
    message = "Êtes-vous sûr de vouloir continuer ?",
    confirmText = "Confirmer",
    cancelText = "Annuler",
    variant = "danger",
}) {
    if (!isOpen) return null;

    const v = VARIANTS[variant] || VARIANTS.danger;
    const Icon = v.icon;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[9998] flex items-center justify-center p-4">
                {/* BACKDROP */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/60 backdrop-blur-md"
                />

                {/* MODAL */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0, y: 30 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.8, opacity: 0, y: 30 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    className="relative w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl"
                >
                    {/* Glass card */}
                    <div className="bg-white border border-gray-100 p-8">
                        {/* Close */}
                        <button
                            onClick={onClose}
                            style={{ cursor: "pointer" }}
                            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600
                rounded-xl hover:bg-gray-100 transition-all"
                        >
                            <FiX size={18} />
                        </button>

                        {/* Icon */}
                        <div className="flex justify-center mb-5">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
                                className={`w-20 h-20 rounded-3xl ${v.iconBg} flex items-center justify-center`}
                            >
                                <Icon className={`${v.iconColor} text-3xl`} />
                            </motion.div>
                        </div>

                        {/* Title */}
                        <h3 className={`text-xl font-black text-center mb-2 ${v.titleColor}`}>
                            {title}
                        </h3>

                        {/* Message */}
                        <p className="text-gray-500 text-sm text-center leading-relaxed mb-8 px-2">
                            {message}
                        </p>

                        {/* Buttons */}
                        <div className="flex gap-3">
                            <button
                                onClick={onClose}
                                style={{ cursor: "pointer" }}
                                className="flex-1 px-5 py-3.5 rounded-2xl bg-gray-100
                  text-gray-700 font-bold text-sm
                  hover:bg-gray-200:bg-gray-700 transition-all active:scale-95"
                            >
                                {cancelText}
                            </button>
                            <button
                                onClick={() => { onConfirm(); onClose(); }}
                                style={{ cursor: "pointer" }}
                                className={`flex-1 px-5 py-3.5 rounded-2xl ${v.confirmBg}
                  text-white font-bold text-sm shadow-xl ${v.confirmShadow}
                  hover:opacity-90 transition-all active:scale-95`}
                            >
                                {confirmText}
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
