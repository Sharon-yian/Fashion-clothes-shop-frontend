import { createSlice } from '@reduxjs/toolkit';

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    categories: [],
    selectedCategory: 'all',
    loading: false,
  },
  reducers: {
    setProducts: (state, action) => {
      state.items = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setProducts, setCategories, setSelectedCategory, setLoading } = productsSlice.actions;
export default productsSlice.reducer;