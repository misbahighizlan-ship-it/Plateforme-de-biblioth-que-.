import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../../slices/cartSlice";
import { addOrder } from "../../slices/ordersSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiUser, FiMail, FiPhone, FiMapPin, FiSend } from "react-icons/fi";
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

    try {
      setLoading(true);

      await axios.post(
        "https://n8n.deontex.com/webhook/orders",
        orderData
      );

      dispatch(addOrder(orderData));
      dispatch(clearCart());
      navigate("/orders");

    } catch (error) {
      console.error(error);
      alert("Erreur lors de l'envoi ❌");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50 p-10">
      <h2 className="text-3xl font-bold mb-10 text-center text-[#2B55B5]">
        Finaliser votre commande
      </h2>

      <div className="grid md:grid-cols-2 gap-10">

        {/* LEFT - CART */}
        <div className="bg-white shadow-xl rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-4 text-blue-500">
            🛒 Vos articles
          </h3>

          {items.map((item) => (
            <div key={item.id} className="flex gap-4 mb-4 border-b pb-4">
              <img
                src={item.image}
                alt={item.title}
                className="w-16 h-20 object-cover rounded-lg"
              />
              <div>
                <h4 className="font-semibold">{item.title}</h4>
                <p className="text-sm text-gray-500">
                  {item.quantity} × {item.price} DH
                </p>
              </div>
            </div>
          ))}

          <div className="mt-4 text-lg font-bold text-pink-500">
            Total : {total.toFixed(2)} DH
          </div>
        </div>

        {/* RIGHT - FORM */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white shadow-xl rounded-2xl p-8"
        >
          <h3 className="text-xl font-semibold mb-6 text-pink-500">
            📦 Informations de livraison
          </h3>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

            {/* NAME + EMAIL */}
            <div className="grid md:grid-cols-2 gap-4">

              {/* NAME */}
              <div>
                <label className="text-sm text-gray-600 mb-1 block">
                  Nom complet
                </label>
                <div className="flex items-center bg-gray-50 border rounded-xl px-4 focus-within:ring-2 focus-within:ring-blue-300">
                  <FiUser className="text-gray-400 mr-3" />
                  <input
                    {...register("name", { required: "Le nom est requis" })}
                    placeholder="Votre nom"
                    className="w-full py-3 bg-transparent outline-none"
                  />
                </div>
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* EMAIL */}
              <div>
                <label className="text-sm text-gray-600 mb-1 block">
                  Email
                </label>
                <div className="flex items-center bg-gray-50 border rounded-xl px-4 focus-within:ring-2 focus-within:ring-pink-300">
                  <FiMail className="text-gray-400 mr-3" />
                  <input
                    {...register("email", {
                      required: "L'email est requis",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Entrez un email valide",
                      },
                    })}
                    placeholder="votre@email.com"
                    className="w-full py-3 bg-transparent outline-none"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            {/* PHONE */}
            <div>
              <label className="text-sm text-gray-600 mb-1 block">
                Téléphone
              </label>
              <div className="flex items-center bg-gray-50 border rounded-xl px-4 focus-within:ring-2 focus-within:ring-blue-300">
                <FiPhone className="text-gray-400 mr-3" />
                <input
                  {...register("phone", {
                    required: "Le téléphone est requis",
                    minLength: {
                      value: 8,
                      message: "Le téléphone doit contenir au moins 8 chiffres",
                    },
                  })}
                  placeholder="06XXXXXXXX"
                  className="w-full py-3 bg-transparent outline-none"
                />
              </div>
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* ADDRESS */}
            <div>
              <label className="text-sm text-gray-600 mb-1 block">
                Adresse complète
              </label>
              <div className="flex items-start bg-gray-50 border rounded-xl px-4 py-2 focus-within:ring-2 focus-within:ring-pink-300">
                <FiMapPin className="text-gray-400 mr-3 mt-2" />
                <textarea
                  {...register("address", {
                    required: "L'adresse est requise",
                  })}
                  rows="3"
                  placeholder="Votre adresse..."
                  className="w-full bg-transparent outline-none resize-none"
                />
              </div>
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.address.message}
                </p>
              )}
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-400 to-pink-400 text-white font-bold shadow-lg hover:scale-105 transition flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  Confirmer la commande
                  <FiSend />
                </>
              )}
            </button>

          </form>
        </motion.div>
      </div>
    </div>
  );
}
