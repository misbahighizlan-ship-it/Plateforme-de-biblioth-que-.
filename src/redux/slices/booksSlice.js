import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";


/*Action : uploud book
========================= */
export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",
  async () => {
    const response = await api.get("/books");
    console.log("📦 DATA MEN API:", response.data);
    return response.data;
  }
);


/*action : ajouter des livr*/
export const addBook = createAsyncThunk(
  "books/addBook",
  async (newBook) => {
    const response = await api.post("/books", newBook);
    console.log("➕ BOOK ADDED:", response.data);
    return response.data;
  }
);


/* 
   SLICE
*/
const booksSlice = createSlice({
  name: "books",
  initialState: {
    list: [],       //pour stocker les livre
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      // fetch books
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // add book
      .addCase(addBook.fulfilled, (state, action) => {
        state.list.push(action.payload);
      });
  },
});

export default booksSlice.reducer;
