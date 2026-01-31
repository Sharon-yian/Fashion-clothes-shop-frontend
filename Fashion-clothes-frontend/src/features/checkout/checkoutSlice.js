import { createSlice } from '@reduxjs/toolkit';

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState: {
    shippingAddress: {},
    billingAddress: {},
    orderSummary: null,
    currentStep: 'shipping',
    loading: false,
  },
  reducers: {
    setShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
    },
    setBillingAddress: (state, action) => {
      state.billingAddress = action.payload;
    },
    setCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
    setOrderSummary: (state, action) => {
      state.orderSummary = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    resetCheckout: (state) => {
      state.shippingAddress = {};
      state.billingAddress = {};
      state.orderSummary = null;
      state.currentStep = 'shipping';
      state.loading = false;
    },
  },
});

export const { 
  setShippingAddress, 
  setBillingAddress, 
  setCurrentStep, 
  setOrderSummary, 
  setLoading, 
  resetCheckout 
} = checkoutSlice.actions;
export default checkoutSlice.reducer;