import { useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { FiUser, FiMail, FiPhone, FiMapPin, FiSend } from "react-icons/fi";
import { motion } from "framer-motion";

export default function Checkout() {
  const { items, total } = useSelector((state) => state.cart);

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  // Validation
  const validate = () => {
    let newErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.includes("@")) newErrors.email = "Valid email required";
    if (form.phone.length < 8) newErrors.phone = "Valid phone required";
    if (!form.address.trim()) newErrors.address = "Address is required";

    return newErrors;
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const orderData = {
      customer: form,
      items,
      total,
      date: new Date(),
      status: "Pending",
    };

    try {
      setLoading(true);

      await axios.post(
        "https://librery.app.n8n.cloud/webhook-test/c953a4fb-810d-4236-a46f-93cd1378fd1d",
        orderData
      );

      alert("Commande envoyée avec succès 💖");

      setForm({
        name: "",
        email: "",
        address: "",
        phone: "",
      });

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
        
        {/* LEFT SIDE */}
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

        {/* RIGHT SIDE - FORM */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white shadow-xl rounded-2xl p-8"
        >
          <h3 className="text-xl font-semibold mb-6 text-pink-500">
            📦 Informations de livraison
          </h3>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* NAME + EMAIL in same row */}
            <div className="grid md:grid-cols-2 gap-4">

              {/* NAME */}
              <div>
                <label className="text-sm text-gray-600 mb-1 block">
                  Nom complet
                </label>
                <div className="flex items-center bg-gray-50 border rounded-xl px-4 focus-within:ring-2 focus-within:ring-blue-300">
                  <FiUser className="text-gray-400 mr-3" />
                  <input
                    type="text"
                    name="name"
                    placeholder="Votre nom"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full py-3 bg-transparent outline-none"
                  />
                </div>
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
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
                    type="email"
                    name="email"
                    placeholder="votre@email.com"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full py-3 bg-transparent outline-none"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
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
                  type="text"
                  name="phone"
                  placeholder="06XXXXXXXX"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full py-3 bg-transparent outline-none"
                />
              </div>
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
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
                  name="address"
                  placeholder="Votre adresse..."
                  value={form.address}
                  onChange={handleChange}
                  rows="3"
                  className="w-full bg-transparent outline-none resize-none"
                />
              </div>
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">{errors.address}</p>
              )}
            </div>

            {/* BUTTON with icon */}
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
                  <FiSend className="text-lg" />
                </>
              )}
            </button>

          </form>
        </motion.div>
      </div>
    </div>
  );
}
