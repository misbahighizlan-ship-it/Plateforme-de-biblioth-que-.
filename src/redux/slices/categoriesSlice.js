import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

/* FETCH */
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    const res = await api.get("/categories");
    return res.data;
  }
);

/* DELETE */
export const deleteCategory = createAsyncThunk(
  "categories/delete",
  async (id) => {
    await api.delete(`/categories/${id}`);
    return id;
  }
)
/* ADD */
export const addCategory = createAsyncThunk(
  "categories/add",
  async (newCategory) => {
    const res = await api.post("/categories", newCategory);
    return res.data;
  }
);


const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    list: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
.addCase(addCategory.fulfilled, (state, action) => {
  state.list.push(action.payload);
})


      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.list = state.list.filter(
          (c) => c.id !== action.payload
        );
      });
  },
});

export default categoriesSlice.reducer;
