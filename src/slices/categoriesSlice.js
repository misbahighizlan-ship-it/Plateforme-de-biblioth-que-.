import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, { rejectWithValue, getState }) => {
    try {
      const res = await api.get("/categories");
      if (res.data && res.data.length > 0) {
        return res.data;
      }
      // If API returns empty, fallback to books
      throw new Error("Empty categories");
    } catch (err) {
      // Fallback: extract from books data in state
      const { books } = getState();
      if (books.list && books.list.length > 0) {
        const extracted = [...new Set(books.list.map((b) => b.category?.trim()))]
          .filter(Boolean)
          .map((name, index) => ({
            id: `ext-${index}`,
            name,
            description: "Extracted from books",
            booksCount: books.list.filter(b => b.category?.trim() === name).length
          }));
        return extracted;
      }
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const addCategory = createAsyncThunk(
  "categories/add",
  async (newCategory, { rejectWithValue }) => {
    try {
      const res = await api.post("/categories", newCategory);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "categories/delete",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/categories/${id}`);
      return id;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearCategoriesError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.list = state.list.filter((c) => c.id !== action.payload);
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      });
  },
});

export const { clearCategoriesError } = categoriesSlice.actions;
export default categoriesSlice.reducer;
