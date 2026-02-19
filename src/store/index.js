import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "../slices/booksSlice";
import categoriesReducer from "../slices/categoriesSlice";
import cartReducer from "../slices/cartSlice";
import wishlistReducer from "../slices/wishlistSlice";
export const store = configureStore({
  reducer: {
    books: booksReducer,
    categories: categoriesReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
});
