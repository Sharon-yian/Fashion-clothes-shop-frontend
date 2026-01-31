import axios from './axios';

//  HELPER 

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  };
};

// API METHODS 

// Get user's order history
export const getUserOrders = async (token) => {
  return await axios.get('/api/orders/my-orders', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
};

// Get all orders (admin)
export const getAllOrders = async () => {
  return await axios.get('/api/orders/admin/all', getAuthHeader());
};

// Get admin analytics
export const getAdminAnalytics = async () => {
  return await axios.get('/api/orders/admin/analytics', getAuthHeader());
};

// Get single order by ID
export const getOrderById = async (orderId) => {
  return await axios.get(`/api/orders/${orderId}`, getAuthHeader());
};

// Create new order
export const createOrder = async (orderData) => {
  // If user is logged in, use auth header
  const token = localStorage.getItem('token');
  const config = token ? getAuthHeader() : { headers: { 'Content-Type': 'application/json' } };
  
  return await axios.post('/api/orders', orderData, config);
};

// Update order status (admin)
export const updateOrderStatus = async (orderId, status) => {
  return await axios.patch(
    `/api/orders/admin/${orderId}/status`,
    { status },
    getAuthHeader()
  );
};

// Cancel order
export const cancelOrder = async (orderId) => {
  return await axios.patch(
    `/api/orders/${orderId}/cancel`,
    {},
    getAuthHeader()
  );
};

// Get order statistics
export const getOrderStats = async () => {
  return await axios.get('/api/orders/stats', getAuthHeader());
};

// Export as default object for easy import
const orderApi = {
  getUserOrders,
  getAllOrders,
  getAdminAnalytics,
  getOrderById,
  createOrder,
  updateOrderStatus,
  cancelOrder,
  getOrderStats
};

export default orderApi;