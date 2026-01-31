import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserOrders } from './orderSlice';
import Loader from '../../components/Loader';
import './OrderHistory.css';

const OrderHistory = () => {
  const dispatch = useDispatch();
  const { orders, status, error } = useSelector(state => state.orders);
  const { user } = useSelector(state => state.auth);

  useEffect(() => {
    if (user?.token) dispatch(fetchUserOrders(user.token));
  }, [dispatch, user?.token]);

  if (status === 'loading') return <Loader />;
  if (error) return <div className="alert alert-error">Error: {error}</div>;

  return (
    <div className="order-history-container">
      <h1 className="text-2xl font-bold mb-6">My Order History</h1>
      
      {orders.length === 0 ? (
        <div className="empty-state">
          <p>No orders found. Start shopping!</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 text-left">Order ID</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Items</th>
                <th className="p-3 text-left">Total</th>
                <th className="p-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr 
                  key={order._id} 
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-3 font-mono text-sm">{order._id.slice(-6)}</td>
                  <td className="p-3">{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td className="p-3">{order.items.reduce((sum, item) => sum + item.quantity, 0)}</td>
                  <td className="p-3 font-bold">${order.totalAmount.toFixed(2)}</td>
                  <td className="p-3">
                    <span className={`status-badge status-${order.status.toLowerCase()}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;