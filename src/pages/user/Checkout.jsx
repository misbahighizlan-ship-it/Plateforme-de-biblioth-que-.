import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../../slices/cartSlice";
import { addOrder } from "../../slices/ordersSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiArrowLeft, FiUser, FiMail, FiPhone, FiMapPin, FiSend } from "react-icons/fi";
import { motion } from "framer-motion";

export default function Checkout() {
  const { items, total } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  // 🔹 Initialize React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // 🔹 Submit function
  const onSubmit = async (data) => {
    const orderData = {
      orderId: `ORD-${Date.now()}`,
      date: new Date().toISOString(),
      status: "Confirmée",
      customer: data,
      items: [...items],
      total: total,
    };

    // Détecter si c'est un téléchargement
    const isDownloadOrder = items.some((item) => item.isDownload === true);

    try {
      setLoading(true);

      if (isDownloadOrder) {
        // 📥 CAS TÉLÉCHARGEMENT → webhook /download
        const downloadData = {
          email: data.email,
          customerName: data.name,
          bookTitle: items[0]?.title || "",
          bookAuthor: items[0]?.author || "",
          price: total.toFixed(2),
          pdfUrl: items[0]?.pdf || "",
          orderId: orderData.orderId,
        };
        await axios.post("https://n8n.deontex.com/webhook/download", downloadData);
      } else {
        // 🛒 CAS ACHAT NORMAL → webhook /orders
        await axios.post("https://n8n.deontex.com/webhook/orders", orderData);
      }

      dispatch(addOrder(orderData));
      dispatch(clearCart());

      navigate("/catalogue");

    } catch (error) {
      console.error(error);
      alert("Erreur lors de l'envoi ❌");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gray-50">

      {/* HEADER */}
      <div
        className="px-6 py-6 shadow-md"
        style={{ background: "linear-gradient(135deg, #ff758c, #7a5cff)" }}
      >
        <div className="max-w-5xl mx-auto flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            style={{ cursor: "pointer" }}
            className="w-10 h-10 rounded-xl bg-white/20 hover:bg-white/30
                       flex items-center justify-center text-white transition-all"
          >
            <FiArrowLeft />
          </button>
          <div>
            <h1 className="text-white font-bold text-xl">Finaliser la commande</h1>
            <p className="text-white/70 text-sm">{items.length} article{items.length > 1 ? "s" : ""} dans votre panier</p>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* GAUCHE — Récapitulatif commande */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6"
          >
            <h2 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-sm"
                style={{ background: "linear-gradient(135deg, #ff758c, #7a5cff)" }}>
                🛒
              </span>
              Vos articles
            </h2>

            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id}
                  className="flex gap-4 p-3 rounded-2xl bg-gray-50 border border-gray-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-20 object-cover rounded-xl shadow-sm flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 text-sm truncate">
                      {item.title}
                    </h4>
                    <p className="text-gray-400 text-xs mt-0.5">{item.author}</p>
                    <p className="text-gray-500 text-xs mt-1">
                      Qté : {item.quantity}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-bold text-sm"
                      style={{
                        background: "linear-gradient(135deg, #ff758c, #7a5cff)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent"
                      }}>
                      {(item.price * item.quantity).toFixed(2)} DH
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="mt-6 pt-4 border-t border-gray-100">
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm">Sous-total</span>
                <span className="text-gray-700 font-medium">{total.toFixed(2)} DH</span>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-gray-500 text-sm">Livraison</span>
                <span className="text-green-500 font-medium text-sm">Gratuite</span>
              </div>
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                <span className="text-gray-900 font-bold text-lg">Total</span>
                <span className="text-2xl font-bold"
                  style={{
                    background: "linear-gradient(135deg, #ff758c, #7a5cff)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent"
                  }}>
                  {total.toFixed(2)} DH
                </span>
              </div>
            </div>
          </motion.div>

          {/* DROITE — Formulaire */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6"
          >
            <h2 className="text-lg font-bold text-gray-900 mb-5 flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-sm"
                style={{ background: "linear-gradient(135deg, #ff758c, #7a5cff)" }}>
                📦
              </span>
              Informations de livraison
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

              {/* Nom + Email */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-600 mb-1.5 block">
                    Nom complet
                  </label>
                  <div className="relative">
                    <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                    <input
                      {...register("name", { required: "Requis" })}
                      placeholder="Votre nom"
                      className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-200
                                 bg-gray-50 outline-none focus:border-pink-400
                                 focus:ring-2 focus:ring-pink-100 transition-all text-sm"
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-600 mb-1.5 block">
                    Email
                  </label>
                  <div className="relative">
                    <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                    <input
                      {...register("email", { required: "Requis" })}
                      placeholder="votre@email.com"
                      className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-200
                                 bg-gray-50 outline-none focus:border-pink-400
                                 focus:ring-2 focus:ring-pink-100 transition-all text-sm"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
                  )}
                </div>
              </div>

              {/* Téléphone */}
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-1.5 block">
                  Téléphone
                </label>
                <div className="relative">
                  <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                  <input
                    {...register("phone", { required: "Requis" })}
                    placeholder="06XXXXXXXX"
                    className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-200
                               bg-gray-50 outline-none focus:border-pink-400
                               focus:ring-2 focus:ring-pink-100 transition-all text-sm"
                  />
                </div>
                {errors.phone && (
                  <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>
                )}
              </div>

              {/* Adresse */}
              <div>
                <label className="text-xs font-semibold text-gray-600 mb-1.5 block">
                  Adresse complète
                </label>
                <div className="relative">
                  <FiMapPin className="absolute left-3 top-3 text-gray-400 text-sm" />
                  <textarea
                    {...register("address", { required: "Requis" })}
                    rows={3}
                    placeholder="Votre adresse..."
                    className="w-full pl-9 pr-4 py-3 rounded-xl border border-gray-200
                               bg-gray-50 outline-none focus:border-pink-400
                               focus:ring-2 focus:ring-pink-100 transition-all
                               resize-none text-sm"
                  />
                </div>
                {errors.address && (
                  <p className="text-red-400 text-xs mt-1">{errors.address.message}</p>
                )}
              </div>

              {/* Bouton confirmer */}
              <button
                type="submit"
                disabled={loading}
                style={{
                  cursor: loading ? "not-allowed" : "pointer",
                  background: loading
                    ? "#e5e7eb"
                    : "linear-gradient(135deg, #ff758c, #7a5cff)"
                }}
                className="w-full py-4 rounded-2xl text-white font-bold text-base
                           hover:opacity-90 hover:scale-[1.02] transition-all
                           shadow-lg flex items-center justify-center gap-2 mt-2"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent
                                  rounded-full animate-spin" />
                ) : (
                  <>
                    <FiSend />
                    Confirmer la commande
                  </>
                )}
              </button>

            </form>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
