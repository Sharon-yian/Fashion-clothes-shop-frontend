import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import orderApi from '../../api/orderApi';

// THUNKS 

// Fetch user's order history
export const fetchUserOrders = createAsyncThunk(
  'orders/fetchUserOrders',
  async (token, { rejectWithValue }) => {
    try {
      const response = await orderApi.getUserOrders(token);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch orders');
    }
  }
);

// Fetch admin analytics
export const fetchAdminAnalytics = createAsyncThunk(
  'orders/fetchAdminAnalytics',
  async (_, { rejectWithValue }) => {
    try {
      const response = await orderApi.getAdminAnalytics();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch analytics');
    }
  }
);

// Fetch all orders for admin
export const fetchAllOrders = createAsyncThunk(
  'orders/fetchAllOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await orderApi.getAllOrders();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to fetch orders');
    }
  }
);

// Update order status
export const updateOrderStatus = createAsyncThunk(
  'orders/updateOrderStatus',
  async ({ orderId, status }, { rejectWithValue }) => {
    try {
      const response = await orderApi.updateOrderStatus(orderId, status);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to update order');
    }
  }
);

// Create new order
export const createOrder = createAsyncThunk(
  'orders/createOrder',
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await orderApi.createOrder(orderData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to create order');
    }
  }
);

// SLICE 

const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    // User orders
    orders: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,

    // Admin analytics
    analytics: null,
    analyticsStatus: 'idle',
    analyticsError: null,

    // All orders for admin
    allOrders: [],
    allOrdersStatus: 'idle',
    allOrdersError: null,

    // Order creation
    createdOrder: null,
    createStatus: 'idle',
    createError: null,
  },
  reducers: {
    clearOrders: (state) => {
      state.orders = [];
      state.status = 'idle';
      state.error = null;
    },
    clearAnalytics: (state) => {
      state.analytics = null;
      state.analyticsStatus = 'idle';
      state.analyticsError = null;
    },
    clearCreatedOrder: (state) => {
      state.createdOrder = null;
      state.createStatus = 'idle';
      state.createError = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch user orders
    builder
      .addCase(fetchUserOrders.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUserOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orders = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });

    // Fetch admin analytics
    builder
      .addCase(fetchAdminAnalytics.pending, (state) => {
        state.analyticsStatus = 'loading';
        state.analyticsError = null;
      })
      .addCase(fetchAdminAnalytics.fulfilled, (state, action) => {
        state.analyticsStatus = 'succeeded';
        state.analytics = action.payload;
      })
      .addCase(fetchAdminAnalytics.rejected, (state, action) => {
        state.analyticsStatus = 'failed';
        state.analyticsError = action.payload;
      });

    // Fetch all orders
    builder
      .addCase(fetchAllOrders.pending, (state) => {
        state.allOrdersStatus = 'loading';
        state.allOrdersError = null;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.allOrdersStatus = 'succeeded';
        state.allOrders = action.payload;
      })
      .addCase(fetchAllOrders.rejected, (state, action) => {
        state.allOrdersStatus = 'failed';
        state.allOrdersError = action.payload;
      });

    // Update order status
    builder
      .addCase(updateOrderStatus.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Update the order in allOrders array
        const index = state.allOrders.findIndex(
          order => order._id === action.payload._id
        );
        if (index !== -1) {
          state.allOrders[index] = action.payload;
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });

    // Create order
    builder
      .addCase(createOrder.pending, (state) => {
        state.createStatus = 'loading';
        state.createError = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.createStatus = 'succeeded';
        state.createdOrder = action.payload;
        // Add to orders array if user is logged in
        state.orders.unshift(action.payload);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.createStatus = 'failed';
        state.createError = action.payload;
      });
  },
});

export const { clearOrders, clearAnalytics, clearCreatedOrder } = orderSlice.actions;

export default orderSlice.reducer;

// SELECTORS 

export const selectUserOrders = (state) => state.orders.orders;
export const selectOrdersStatus = (state) => state.orders.status;
export const selectOrdersError = (state) => state.orders.error;

export const selectAnalytics = (state) => state.orders.analytics;
export const selectAnalyticsStatus = (state) => state.orders.analyticsStatus;
export const selectAnalyticsError = (state) => state.orders.analyticsError;

export const selectAllOrders = (state) => state.orders.allOrders;
export const selectAllOrdersStatus = (state) => state.orders.allOrdersStatus;
export const selectAllOrdersError = (state) => state.orders.allOrdersError;

export const selectCreatedOrder = (state) => state.orders.createdOrder;
export const selectCreateStatus = (state) => state.orders.createStatus;
export const selectCreateError = (state) => state.orders.createError;