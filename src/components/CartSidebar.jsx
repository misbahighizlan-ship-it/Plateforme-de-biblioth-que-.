import { useSelector, useDispatch } from "react-redux";
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  clearCart
} from "../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";

export default function CartSidebar({ show, onClose }) {
  const { items, total } = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!show) return null;

  const handleCheckout = () => {
    onClose();
    navigate("/checkout");
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      
      {/* BACKDROP */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />

      {/* SIDEBAR */}
      <aside
        className="relative w-full max-w-sm h-full
                   bg-white text-gray-800 shadow-2xl
                   flex flex-col"
      >
        {/* HEADER */}
        <div className="p-5 border-b">
          <h2 className="text-2xl font-bold text-[#2B55B5]">
            🛒 Votre panier
          </h2>
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <p className="text-gray-400 text-center mt-10">
              Panier vide
            </p>
          ) : (
            items.map(item => (
              <div
                key={item.id}
                className="flex gap-3 bg-blue-50 p-3 rounded-xl shadow-sm"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-20 object-cover rounded"
                />

                <div className="flex-1">
                  <h4 className="font-semibold">{item.title}</h4>

                  <p className="text-sm text-pink-500 font-medium">
                    {item.price} DH
                  </p>

                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => dispatch(decrementQuantity(item.id))}
                      className="px-2 bg-blue-200 rounded"
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() => dispatch(incrementQuantity(item.id))}
                      className="px-2 bg-blue-200 rounded"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="text-xs text-pink-500 mt-2"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* FOOTER */}
        <div className="p-5 border-t bg-gradient-to-r from-blue-50 to-pink-50">
          
          <p className="text-lg font-bold text-[#2B55B5] mb-4">
            Total : {total.toFixed(2)} DH
          </p>

          {/* BUTTONS */}
          <div className="flex flex-col gap-3">
            
            <button
              onClick={() => dispatch(clearCart())}
              className="w-full py-2 rounded-xl border border-pink-300 text-pink-500 hover:bg-pink-50 transition"
            >
              🗑 Vider le panier
            </button>

            <button
              onClick={handleCheckout}
              disabled={items.length === 0}
              className="w-full py-3 rounded-xl bg-gradient-to-r
                         from-blue-400 to-pink-400
                         text-white font-bold shadow-lg
                         hover:scale-105 transition"
            >
              💳 Passer au checkout
            </button>

          </div>
        </div>
      </aside>
    </div>
  );
}
