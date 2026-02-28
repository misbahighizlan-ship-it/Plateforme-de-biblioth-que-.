// src/redux/wishlistSlice.js
import { createSlice } from "@reduxjs/toolkit";

/* Load from localStorage */
let savedWishlist = [];
try {
  savedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
} catch {
  localStorage.removeItem("wishlist");
}

const initialState = {
  items: savedWishlist,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,

  reducers: {
    addToWishlist: (state, action) => {
      const exists = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (!exists) {
        state.items.push(action.payload);
        localStorage.setItem(
          "wishlist",
          JSON.stringify(state.items)
        );
      }
    },

    removeFromWishlist: (state, action) => {
      state.items = state.items.filter(
        (item) => item.id !== action.payload
      );

      localStorage.setItem(
        "wishlist",
        JSON.stringify(state.items)
      );
    },

    clearWishlist: (state) => {
      state.items = [];
      localStorage.removeItem("wishlist");
    },
  },
});

export const {
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
