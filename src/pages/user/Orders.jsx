import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
    FaBox,
    FaCheckCircle,
    FaClock,
    FaTruck,
    FaShoppingBag,
    FaCalendarAlt,
    FaMapMarkerAlt,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { FiXCircle } from "react-icons/fi";
import { cancelOrder } from "../../slices/ordersSlice";

const statusConfig = {
    "Confirmée": {
        icon: FaCheckCircle,
        color: "text-green-400",
        bg: "bg-green-400/10",
        border: "border-green-400/30",
        gradient: "from-green-500 to-emerald-500",
    },
    "En cours": {
        icon: FaClock,
        color: "text-yellow-400",
        bg: "bg-yellow-400/10",
        border: "border-yellow-400/30",
        gradient: "from-yellow-500 to-orange-500",
    },
    "Expédiée": {
        icon: FaTruck,
        color: "text-blue-400",
        bg: "bg-blue-400/10",
        border: "border-blue-400/30",
        gradient: "from-blue-500 to-cyan-500",
    },
    "Livrée": {
        icon: FaCheckCircle,
        color: "text-green-400",
        bg: "bg-green-400/10",
        border: "border-green-400/30",
        gradient: "from-green-500 to-emerald-500",
    },
    "Annulée": {
        icon: FaCheckCircle,
        color: "text-red-400",
        bg: "bg-red-400/10",
        border: "border-red-500/20",
        gradient: "from-red-500 to-rose-500",
    },
};

export default function Orders() {
    const { list: orders } = useSelector((state) => state.orders);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [filter, setFilter] = useState("Toutes");

    const filteredOrders = filter === "Toutes"
        ? orders
        : orders.filter((o) => o.status === filter);

    const isAdmin = localStorage.getItem("isAdmin") === "true";

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("fr-FR", {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const handleCancel = (orderId) => {
        const confirm = window.confirm("Voulez-vous annuler cette commande ?");
        if (confirm) {
            dispatch(cancelOrder(orderId));
        }
    };

    return (
        <div className="min-h-screen bg-[#0B0F19] relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-40 -left-40 w-96 h-96 bg-[#5db2e3]/8 rounded-full blur-3xl" />
            <div className="absolute bottom-20 -right-40 w-96 h-96 bg-purple-500/8 rounded-full blur-3xl" />

            <div className="relative z-10 max-w-5xl mx-auto px-6 py-12">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#5db2e3] to-[#2B55B5] flex items-center justify-center shadow-lg shadow-blue-500/30">
                            <FaBox className="text-white text-xl" />
                        </div>
                        <h1 className="text-4xl font-bold text-white">Mes Commandes</h1>
                    </div>
                    <p className="text-gray-400">
                        {orders.length === 0
                            ? "Aucune commande pour le moment"
                            : `${orders.length} commande${orders.length > 1 ? "s" : ""}`}
                    </p>
                </motion.div>

                {/* Filters */}
                <div className="flex gap-3 mb-8 justify-center flex-wrap">
                    {["Toutes", "Confirmée", "Annulée"].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-6 py-2 rounded-full text-sm font-semibold border transition-all ${filter === f
                                ? "bg-gradient-to-r from-[#5db2e3] to-[#2B55B5] text-white border-transparent"
                                : "bg-transparent border-gray-700 text-gray-400 hover:border-[#5db2e3] hover:text-[#5db2e3]"
                                }`}
                        >
                            {f}
                            <span className="ml-2 bg-white/10 px-2 py-0.5 rounded-full text-xs">
                                {f === "Toutes"
                                    ? orders.length
                                    : orders.filter((o) => o.status === f).length}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Empty state */}
                {filteredOrders.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-20"
                    >
                        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-800/50 flex items-center justify-center">
                            <FaShoppingBag className="text-4xl text-gray-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-400 mb-2">
                            {filter === "Toutes" ? "Aucune commande" : `Aucune commande ${filter.toLowerCase()}`}
                        </h3>
                        <p className="text-gray-500 mb-8 max-w-md mx-auto">
                            {filter === "Toutes"
                                ? "Commencez à explorer notre catalogue et passez votre première commande"
                                : `Vous n'avez pas de commandes avec le statut ${filter.toLowerCase()}`}
                        </p>
                        {filter === "Toutes" && (
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate("/catalogue")}
                                className="px-8 py-3 rounded-xl font-semibold bg-gradient-to-r from-[#5db2e3] to-[#2B55B5] text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all"
                            >
                                Explorer le catalogue
                            </motion.button>
                        )}
                    </motion.div>
                ) : (
                    <div className="space-y-6">
                        {filteredOrders.map((order, index) => {
                            const config = statusConfig[order.status] || statusConfig["En cours"];
                            const StatusIcon = config.icon;

                            return (
                                <motion.div
                                    key={order.orderId || order.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.08 }}
                                    className="bg-gradient-to-r from-[#111827] to-[#0f172a] rounded-2xl border border-gray-800/50 overflow-hidden hover:border-gray-700/50 transition-all duration-300"
                                >
                                    {/* Order header */}
                                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800/50">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-10 h-10 rounded-xl ${config.bg} flex items-center justify-center`}>
                                                <StatusIcon className={`${config.color} text-lg`} />
                                            </div>
                                            <div>
                                                <h3 className="text-white font-bold">
                                                    Commande #{(order.orderId || order.id).slice(-6)}
                                                </h3>
                                                <div className="flex items-center gap-2 text-gray-400 text-sm mt-0.5">
                                                    <FaCalendarAlt className="text-xs" />
                                                    {formatDate(order.date)}
                                                </div>
                                            </div>
                                        </div>

                                        <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${config.bg} ${config.color} border ${config.border}`}>
                                            {order.status}
                                        </span>
                                    </div>

                                    {/* Order items */}
                                    <div className="px-6 py-4">
                                        <div className="space-y-3">
                                            {order.items.map((item) => (
                                                <div key={item.id} className="flex items-center gap-4">
                                                    <div className="w-12 h-16 rounded-lg overflow-hidden flex-shrink-0 shadow-md">
                                                        <img
                                                            src={item.image}
                                                            alt={item.title}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-white text-sm font-medium truncate">
                                                            {item.title}
                                                        </p>
                                                        <p className="text-gray-500 text-xs">
                                                            Qté: {item.quantity}
                                                        </p>
                                                    </div>
                                                    <span className="text-[#5db2e3] font-semibold text-sm">
                                                        {(item.price * item.quantity).toFixed(2)} DH
                                                    </span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Customer info + total */}
                                        <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-800/50">
                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center gap-2 text-gray-400 text-sm">
                                                    <FaMapMarkerAlt className="text-xs" />
                                                    <span className="truncate max-w-[150px]">
                                                        {order.customer?.name || "Client"}
                                                    </span>
                                                </div>

                                                {!isAdmin && order.status === "Confirmée" && (
                                                    <button
                                                        onClick={() => handleCancel(order.orderId || order.id)}
                                                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white text-sm font-semibold transition-all"
                                                    >
                                                        <FiXCircle className="text-sm" />
                                                        Annuler
                                                    </button>
                                                )}
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xs text-gray-500">Total</p>
                                                <p className="text-xl font-bold bg-gradient-to-r from-[#5db2e3] to-pink-400 bg-clip-text text-transparent">
                                                    {order.total.toFixed(2)} DH
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
