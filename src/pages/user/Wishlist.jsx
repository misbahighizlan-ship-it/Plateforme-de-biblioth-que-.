import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist } from "../../redux/slices/wishlistSlice";

export default function Wishlist() {
  const { items } = useSelector(state => state.wishlist);
  const dispatch = useDispatch();

  return (
    <div className="p-10">
      <h2 className="text-2xl font-bold mb-6">❤️ Wishlist</h2>

      {items.length === 0 ? (
        <p>Wishlist vide</p>
      ) : (
        items.map(item => (
          <div key={item.id} className="flex gap-4 mb-4">
            <img src={item.image} className="w-20 h-28 object-cover" />
            <div>
              <h4>{item.title}</h4>
              <p>{item.price} DH</p>
              <button
                onClick={() => dispatch(removeFromWishlist(item.id))}
                className="text-red-500 text-sm"
              >
                Supprimer
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
