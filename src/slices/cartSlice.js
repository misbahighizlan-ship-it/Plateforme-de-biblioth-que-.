import { createSlice } from "@reduxjs/toolkit";

/* load cart from localStorage */
let savedCart = [];
try {
  savedCart = JSON.parse(localStorage.getItem("cart")) || [];
} catch (e) {
  localStorage.removeItem("cart");
}

/* helper to calculate total */
const calculateTotal = (items) =>
  items.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

const initialState = {
  items: savedCart,
  total: calculateTotal(savedCart),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    addToCart: (state, action) => {
      const productInCart = state.items.find(
        (item) => item.id === action.payload.id
      );

      const price = Number(action.payload.price) || 0;

      if (productInCart) {
        productInCart.quantity += 1;
      } else {
        state.items.push({
          ...action.payload,
          price,
          quantity: 1,
        });
      }

      state.total = calculateTotal(state.items);
      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (item) => item.id !== action.payload
      );

      state.total = calculateTotal(state.items);
      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    incrementQuantity: (state, action) => {
      const product = state.items.find(
        (item) => item.id === action.payload
      );

      if (product) product.quantity += 1;

      state.total = calculateTotal(state.items);
      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    decrementQuantity: (state, action) => {
      const product = state.items.find(
        (item) => item.id === action.payload
      );

      if (product && product.quantity > 1) {
        product.quantity -= 1;
      }

      state.total = calculateTotal(state.items);
      localStorage.setItem("cart", JSON.stringify(state.items));
    },

    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      localStorage.removeItem("cart");
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
