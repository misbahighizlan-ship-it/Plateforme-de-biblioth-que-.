import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

/* ================= FETCH ================= */
export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",
  async () => {
    const res = await api.get("/books");
    return res.data;
  }
);

/* ================= ADD ================= */
export const addBook = createAsyncThunk(
  "books/addBook",
  async (newBook) => {
    const res = await api.post("/books", newBook);
    return res.data;
  }
);

/* ================= UPDATE ================= */
export const updateBook = createAsyncThunk(
  "books/updateBook",
  async ({ id, data }) => {
    const res = await api.put(`/books/${id}`, data);
    return res.data;
  }
);

/* ================= DELETE ================= */
export const deleteBook = createAsyncThunk(
  "books/deleteBook",
  async (id) => {
    await api.delete(`/books/${id}`);
    return id;
  }
);

const booksSlice = createSlice({
  name: "books",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      /* FETCH */
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

      /* ADD */
      .addCase(addBook.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })

      /* UPDATE */
      .addCase(updateBook.fulfilled, (state, action) => {
        const i = state.list.findIndex(
          (b) => b.id === action.payload.id
        );
        if (i !== -1) state.list[i] = action.payload;
      })

      /* DELETE */
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.list = state.list.filter(
          (b) => b.id !== action.payload
        );
      });
  },
});

export default booksSlice.reducer;
