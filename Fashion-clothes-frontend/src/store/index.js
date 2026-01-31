import { configureStore } from '@reduxjs/toolkit';
import cartSlice from '../features/cart/cartSlice';
import authSlice from '../features/auth/authSlice';
import productsSlice from '../features/products/productsSlice';
import checkoutSlice from '../features/checkout/checkoutSlice';

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    auth: authSlice,
    products: productsSlice,
    checkout: checkoutSlice,
  },
});

export default store;