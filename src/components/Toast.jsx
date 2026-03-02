import { createContext, useContext, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiCheckCircle, FiAlertCircle, FiInfo, FiAlertTriangle, FiX } from "react-icons/fi";

const ToastContext = createContext(null);

const TOAST_ICONS = {
    success: FiCheckCircle,
    error: FiAlertCircle,
    info: FiInfo,
    warning: FiAlertTriangle,
};

const TOAST_STYLES = {
    success: {
        bg: "bg-gradient-to-r from-green-500 to-emerald-600",
        glow: "shadow-green-500/25",
        icon: "text-white",
    },
    error: {
        bg: "bg-gradient-to-r from-red-500 to-rose-600",
        glow: "shadow-red-500/25",
        icon: "text-white",
    },
    info: {
        bg: "bg-gradient-to-r from-blue-500 to-indigo-600",
        glow: "shadow-blue-500/25",
        icon: "text-white",
    },
    warning: {
        bg: "bg-gradient-to-r from-amber-500 to-orange-600",
        glow: "shadow-amber-500/25",
        icon: "text-white",
    },
};

let toastId = 0;

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((message, type = "info", duration = 3500) => {
        const id = ++toastId;
        setToasts((prev) => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, duration);
    }, []);

    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    const toast = useCallback({
        success: (msg) => addToast(msg, "success"),
        error: (msg) => addToast(msg, "error"),
        info: (msg) => addToast(msg, "info"),
        warning: (msg) => addToast(msg, "warning"),
    }, [addToast]);

    // Make toast callable methods
    const toastApi = useCallback(
        Object.assign(
            (msg, type) => addToast(msg, type),
            {
                success: (msg) => addToast(msg, "success"),
                error: (msg) => addToast(msg, "error"),
                info: (msg) => addToast(msg, "info"),
                warning: (msg) => addToast(msg, "warning"),
            }
        ),
        [addToast]
    );

    return (
        <ToastContext.Provider value={toastApi}>
            {children}

            {/* Toast Container — fixed top-right */}
            <div className="fixed top-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none"
                style={{ maxWidth: "400px" }}>
                <AnimatePresence>
                    {toasts.map((t) => {
                        const Icon = TOAST_ICONS[t.type] || FiInfo;
                        const style = TOAST_STYLES[t.type] || TOAST_STYLES.info;

                        return (
                            <motion.div
                                key={t.id}
                                initial={{ opacity: 0, x: 80, scale: 0.85 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                exit={{ opacity: 0, x: 80, scale: 0.85 }}
                                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                className={`pointer-events-auto flex items-center gap-3 px-5 py-4 rounded-2xl
                  ${style.bg} shadow-2xl ${style.glow} backdrop-blur-lg
                  border border-white/20 cursor-pointer`}
                                onClick={() => removeToast(t.id)}
                            >
                                {/* Icon with pulse */}
                                <div className="relative flex-shrink-0">
                                    <div className={`absolute inset-0 rounded-full bg-white/20 animate-ping`}
                                        style={{ animationDuration: "1.5s", animationIterationCount: 1 }} />
                                    <Icon className={`${style.icon} text-xl relative z-10`} />
                                </div>

                                {/* Message */}
                                <p className="text-white font-semibold text-sm flex-1 leading-snug">
                                    {t.message}
                                </p>

                                {/* Close */}
                                <button
                                    onClick={(e) => { e.stopPropagation(); removeToast(t.id); }}
                                    className="flex-shrink-0 text-white/60 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
                                    style={{ cursor: "pointer" }}
                                >
                                    <FiX size={16} />
                                </button>

                                {/* Progress bar */}
                                <motion.div
                                    className="absolute bottom-0 left-0 h-[3px] bg-white/30 rounded-b-2xl"
                                    initial={{ width: "100%" }}
                                    animate={{ width: "0%" }}
                                    transition={{ duration: 3.5, ease: "linear" }}
                                />
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
}
