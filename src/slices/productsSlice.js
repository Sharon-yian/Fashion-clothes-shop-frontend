import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/api";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (category, { rejectWithValue }) => {
    try {
      const url =
        category && category !== "all"
          ? `/products?category=${category}`
          : "/products";

      const response = await api.get(url);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch products"
      );
    }
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    categories: [],
    selectedCategory: "all",
    loading: false,
    error: null,
  },
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    clearProducts: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  setCategories,
  setSelectedCategory,
  clearProducts,
} = productsSlice.actions;

export default productsSlice.reducer;