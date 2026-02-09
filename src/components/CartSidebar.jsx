import { useSelector, useDispatch } from "react-redux";
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart
} from "../redux/slices/cartSlice";

export default function CartSidebar({ show, onClose }) {
  const { items, total } = useSelector(state => state.cart);
  const dispatch = useDispatch();

  if (!show) return null;

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
                   bg-cover bg-center
                   text-white shadow-xl
                   flex flex-col"
        style={{
          backgroundImage: "url('imageSidbar.jpg')"
        }}
      >
        {/* overlay */}
        <div className="absolute inset-0 bg-black/70" />

        {/* CONTENT */}
        <div className="relative flex-1 overflow-y-auto p-5 space-y-4">
          <h2 className="text-2xl font-bold mb-4">🛒 Panier</h2>

          {items.length === 0 ? (
            <p className="text-gray-300">Panier vide</p>
          ) : (
            items.map(item => (
              <div
                key={item.id}
                className="flex gap-3 bg-white/10 p-3 rounded-xl"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-20 object-cover rounded"
                />

                <div className="flex-1">
                  <h4 className="font-semibold">{item.title}</h4>

                  <p className="text-sm text-gray-300">
                    {item.price} DH
                  </p>

                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() =>
                        dispatch(decrementQuantity(item.id))
                      }
                      className="px-2 bg-gray-700 rounded"
                    >
                      -
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() =>
                        dispatch(incrementQuantity(item.id))
                      }
                      className="px-2 bg-gray-700 rounded"
                    >
                      +
                    </button>
                  </div>

                  <button
  onClick={() => dispatch(removeFromCart(item.id))}
  className="flex items-center gap-1 text-pink-400 hover:text-pink-300 text-sm mt-2"
>
   Supprimer
</button>

                </div>
              </div>
            ))
          )}
        </div>

        {/* FOOTER */}
        <div className="relative p-5 border-t border-white/20">
          <p className="text-lg font-bold">
            Total : {total.toFixed(2)} DH
          </p>
        </div>
      </aside>
    </div>
  );
}
