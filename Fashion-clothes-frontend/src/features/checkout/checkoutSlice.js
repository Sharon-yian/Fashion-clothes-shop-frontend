import { createSlice } from '@reduxjs/toolkit';

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState: {
    shippingAddress: {},
    billingAddress: {},
    orderSummary: null,
    currentStep: 'shipping',
    loading: false,
    paymentMethod: 'mpesa',
    mpesaPhone: '',
    paymentStatus: 'pending',
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
    setPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },
    setMpesaPhone: (state, action) => {
      state.mpesaPhone = action.payload;
    },
    setPaymentStatus: (state, action) => {
      state.paymentStatus = action.payload;
    },
    resetCheckout: (state) => {
      state.shippingAddress = {};
      state.billingAddress = {};
      state.orderSummary = null;
      state.currentStep = 'shipping';
      state.loading = false;
      state.paymentMethod = 'mpesa';
      state.mpesaPhone = '';
      state.paymentStatus = 'pending';
    },
  },
});

export const { 
  setShippingAddress, 
  setBillingAddress, 
  setCurrentStep, 
  setOrderSummary, 
  setLoading, 
  setPaymentMethod,
  setMpesaPhone,
  setPaymentStatus,
  resetCheckout 
} = checkoutSlice.actions;

export default checkoutSlice.reducer;