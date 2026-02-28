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
    FaUser,
    FaPhone,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { FiXCircle, FiTrash2, FiPackage } from "react-icons/fi";
import { cancelOrder, deleteOrder } from "../../slices/ordersSlice";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminHeader from "../../components/admin/AdminHeader";

const statusConfig = {
    "Confirmée": {
        icon: FaCheckCircle,
        color: "text-green-500",
        bg: "bg-green-500/10",
        border: "border-green-500/20",
    },
    "En cours": {
        icon: FaClock,
        color: "text-amber-500",
        bg: "bg-amber-500/10",
        border: "border-amber-500/20",
    },
    "Expédiée": {
        icon: FaTruck,
        color: "text-blue-500",
        bg: "bg-blue-500/10",
        border: "border-blue-500/20",
    },
    "Livrée": {
        icon: FaCheckCircle,
        color: "text-green-500",
        bg: "bg-green-500/10",
        border: "border-green-500/20",
    },
    "Annulée": {
        icon: FiXCircle,
        color: "text-red-500",
        bg: "bg-red-500/10",
        border: "border-red-500/20",
    },
};

export default function Orders() {
    const { list: orders } = useSelector((state) => state.orders);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [filter, setFilter] = useState("Toutes");

    const isAdmin = localStorage.getItem("isAdmin") === "true";

    const filteredOrders = filter === "Toutes"
        ? orders
        : orders.filter((o) => o.status === filter);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("fr-FR", {
            day: "numeric",
            month: "long",
            year: "numeric"
        });
    };

    const handleCancel = (orderId) => {
        const confirm = window.confirm("Voulez-vous annuler cette commande ?");
        if (confirm) {
            dispatch(cancelOrder(orderId));
        }
    };

    const handleDelete = (orderId) => {
        const confirm = window.confirm("Voulez-vous supprimer cette commande définitivement ?");
        if (confirm) {
            dispatch(deleteOrder(orderId));
        }
    };

    const content = (
        <div className={`relative z-10 w-full ${isAdmin ? "max-w-[1200px] mx-auto" : "max-w-5xl mx-auto px-6 py-12"}`}>
            {/* Header Admin vs User */}
            {isAdmin ? (
                <div className="mb-8">
                    <AdminHeader />
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-8 mb-8">
                        <div>
                            <h2 className="text-2xl font-black tracking-tight text-gray-800 dark:text-white">
                                Gestion des Commandes
                            </h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                Suivez et gérez les achats de vos clients.
                            </p>
                        </div>
                        <span className="px-4 py-2 rounded-xl bg-blue-500/10 text-blue-500 text-[10px] font-black uppercase tracking-widest border border-blue-500/10">
                            {orders.length} commandes totales
                        </span>
                    </div>
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#5db2e3] to-[#2B55B5] flex items-center justify-center shadow-lg shadow-blue-500/30">
                            <FaBox className="text-white text-xl" />
                        </div>
                        <h1 className="text-4xl font-bold text-white tracking-tight">Mes Commandes</h1>
                    </div>
                    <p className="text-gray-400 font-medium">
                        {orders.length === 0
                            ? "Aucune commande pour le moment"
                            : `${orders.length} commande${orders.length > 1 ? "s" : ""}`}
                    </p>
                </motion.div>
            )}

            {/* Filters */}
            <div className={`flex gap-3 mb-10 overflow-x-auto pb-2 scrollbar-none ${isAdmin ? "justify-start" : "justify-center"}`}>
                {["Toutes", "Confirmée", "Annulée", "En cours"].map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        style={{ cursor: "pointer" }}
                        className={`px-6 py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest border transition-all shrink-0 ${filter === f
                            ? "bg-blue-600 text-white border-transparent shadow-lg shadow-blue-500/20"
                            : "bg-white dark:bg-[#111827] border-gray-100 dark:border-gray-800 text-gray-400 hover:border-blue-500/50 hover:text-blue-500"
                            }`}
                    >
                        {f}
                        <span className={`ml-2 px-2 py-0.5 rounded-lg text-[9px] ${filter === f ? "bg-white/20" : "bg-gray-100 dark:bg-gray-800"}`}>
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
                    className="text-center py-20 bg-white dark:bg-[#111827] rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-lg"
                >
                    <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center">
                        <FaShoppingBag className="text-4xl text-gray-300" />
                    </div>
                    <h3 className="text-xl font-black text-gray-400 mb-2 uppercase tracking-tighter">
                        {filter === "Toutes" ? "Aucune commande" : `Aucune commande ${filter.toLowerCase()}`}
                    </h3>
                    {!isAdmin && filter === "Toutes" && (
                        <button
                            onClick={() => navigate("/catalogue")}
                            className="mt-6 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest bg-gradient-to-r from-[#ff758c] to-[#7a5cff] text-white shadow-xl shadow-pink-500/20 hover:scale-105 transition-all"
                        >
                            Explorer le catalogue
                        </button>
                    )}
                </motion.div>
            ) : (
                <div className="grid gap-6">
                    {filteredOrders.map((order, index) => {
                        const config = statusConfig[order.status] || statusConfig["En cours"];
                        const StatusIcon = config.icon || FaBox;

                        return (
                            <motion.div
                                key={order.orderId || order.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="bg-white dark:bg-[#111827] rounded-[2rem] border border-gray-100 dark:border-gray-800 overflow-hidden shadow-lg group transition-all hover:shadow-xl"
                            >
                                {/* Order header */}
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-8 py-6 border-b border-gray-50 dark:border-gray-800 gap-4">
                                    <div className="flex items-center gap-5">
                                        <div className={`w-14 h-14 rounded-2xl ${config.bg} flex items-center justify-center shadow-sm`}>
                                            <StatusIcon className={`${config.color} text-2xl`} />
                                        </div>
                                        <div>
                                            <h3 className="text-gray-800 dark:text-white font-black text-lg">
                                                Commande #{(order.orderId || order.id).slice(-6).toUpperCase()}
                                            </h3>
                                            <div className="flex items-center gap-2 text-gray-400 text-xs font-bold mt-1">
                                                <FaCalendarAlt className="text-blue-400" />
                                                {formatDate(order.date)}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <span className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest ${config.bg} ${config.color} border ${config.border}`}>
                                            {order.status}
                                        </span>
                                        {isAdmin && (
                                            <button
                                                onClick={() => handleDelete(order.orderId || order.id)}
                                                style={{ cursor: "pointer" }}
                                                className="p-3 rounded-xl bg-red-50 dark:bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all active:scale-90"
                                                title="Supprimer"
                                            >
                                                <FiTrash2 size={16} />
                                            </button>
                                        )}
                                    </div>
                                </div>

                                {/* Order Content */}
                                <div className="p-8">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                        {/* Items List */}
                                        <div className="space-y-4">
                                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4">Articles commandés</p>
                                            <div className="space-y-4">
                                                {order.items.map((item) => (
                                                    <div key={item.id} className="flex items-center gap-4 group/item">
                                                        <div className="w-14 h-20 rounded-xl overflow-hidden shadow-md shrink-0 transition-transform group-hover/item:scale-105">
                                                            <img
                                                                src={item.image}
                                                                alt={item.title}
                                                                className="w-full h-full object-cover"
                                                                onError={(e) => e.target.src = "/placeholder-book.png"}
                                                            />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-gray-800 dark:text-white font-bold text-sm truncate">
                                                                {item.title}
                                                            </p>
                                                            <p className="text-gray-400 text-xs font-bold mt-1">
                                                                Quantité: {item.quantity} × {item.price} DH
                                                            </p>
                                                        </div>
                                                        <span className="text-blue-500 font-black text-sm">
                                                            {(item.price * item.quantity).toLocaleString()} DH
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Delivery Info */}
                                        <div className="space-y-6">
                                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4">Informations de livraison</p>
                                            <div className="bg-gray-50 dark:bg-[#0B0F19]/50 p-6 rounded-3xl border border-gray-100 dark:border-gray-800 space-y-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-xl bg-white dark:bg-[#111827] flex items-center justify-center text-blue-500 shadow-sm">
                                                        <FaUser size={16} />
                                                    </div>
                                                    <div>
                                                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Client</p>
                                                        <p className="text-sm font-bold text-gray-800 dark:text-gray-200">{order.customer?.name || "Client Anonyme"}</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-xl bg-white dark:bg-[#111827] flex items-center justify-center text-pink-500 shadow-sm">
                                                        <FaMapMarkerAlt size={16} />
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Adresse</p>
                                                        <p className="text-sm font-bold text-gray-800 dark:text-gray-200 truncate">{order.customer?.address || "Non spécifiée"}</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-xl bg-white dark:bg-[#111827] flex items-center justify-center text-green-500 shadow-sm">
                                                        <FaPhone size={16} />
                                                    </div>
                                                    <div>
                                                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Téléphone</p>
                                                        <p className="text-sm font-bold text-gray-800 dark:text-gray-200">{order.customer?.phone || "Non spécifié"}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Footer Order */}
                                    <div className="mt-8 pt-6 border-t border-gray-50 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-6">
                                        <div className="flex items-center gap-4">
                                            {!isAdmin && order.status === "Confirmée" && (
                                                <button
                                                    onClick={() => handleCancel(order.orderId || order.id)}
                                                    style={{ cursor: "pointer" }}
                                                    className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-red-50 dark:bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white text-[10px] font-black uppercase tracking-widest transition-all active:scale-95"
                                                >
                                                    <FiXCircle size={14} />
                                                    Annuler la commande
                                                </button>
                                            )}
                                        </div>

                                        <div className="flex items-baseline gap-3">
                                            <span className="text-gray-400 text-[10px] font-black uppercase tracking-widest">Total Payé :</span>
                                            <span className="text-3xl font-black bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-transparent">
                                                {order.total.toLocaleString()} DH
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            )}
        </div>
    );

    return (
        <div className={`min-h-screen transition-colors duration-300 ${isAdmin ? "bg-[#f8f9fa] dark:bg-[#0B0F19] flex" : "bg-[#0B0F19]"}`}>
            {isAdmin && <AdminSidebar />}

            <div className={`flex-1 ${isAdmin ? "p-4 md:p-8 pt-16 md:pt-8" : "relative"}`}>
                {!isAdmin && (
                    <>
                        {/* User background glow */}
                        <div className="absolute top-40 -left-40 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
                        <div className="absolute bottom-20 -right-40 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
                    </>
                )}
                {content}
            </div>
        </div>
    );
}
