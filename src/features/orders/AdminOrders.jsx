import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllOrders, updateOrderStatus } from './orderSlice';
import Loader from '../../components/Loader';
import './AdminOrders.css';

const AdminOrders = () => {
  const dispatch = useDispatch();
  const { allOrders, allOrdersStatus, allOrdersError } = useSelector(state => state.orders);
  
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  // Filter orders
  const filteredOrders = allOrders.filter(order => {
    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
    const matchesSearch = searchTerm === '' || 
      order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer?.email?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await dispatch(updateOrderStatus({ orderId, status: newStatus })).unwrap();
    } catch (error) {
      console.error('Failed to update order status:', error);
    }
  };

  if (allOrdersStatus === 'loading') return <Loader />;
  if (allOrdersError) return <div className="alert alert-error">Error: {allOrdersError}</div>;

  return (
    <div className="admin-orders-container">
      <div className="admin-orders-header">
        <h1>Order Management</h1>
        <div className="admin-orders-stats">
          <div className="stat-card">
            <div className="stat-value">{allOrders.length}</div>
            <div className="stat-label">Total Orders</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{allOrders.filter(o => o.status === 'pending').length}</div>
            <div className="stat-label">Pending</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{allOrders.filter(o => o.status === 'delivered').length}</div>
            <div className="stat-label">Delivered</div>
          </div>
        </div>
      </div>

      <div className="admin-orders-controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search by ID, customer name, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="filter-controls">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="status-filter"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="orders-table-container">
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map(order => (
              <tr key={order._id}>
                <td className="order-id">{order._id.slice(-8)}</td>
                <td>
                  <div>{order.customer?.name || 'N/A'}</div>
                  <div className="email">{order.customer?.email || 'N/A'}</div>
                </td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>{order.items.reduce((sum, item) => sum + item.quantity, 0)}</td>
                <td className="total">${order.totalAmount.toFixed(2)}</td>
                <td>
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                    className={`status-select status-${order.status.toLowerCase()}`}
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
                <td>
                  <button 
                    className="btn-view" 
                    onClick={() => setSelectedOrder(order)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Order Details</h2>
              <button className="btn-close" onClick={() => setSelectedOrder(null)}>×</button>
            </div>
            <div className="modal-body">
              <div className="order-detail-grid">
                <div>
                  <h3>Order Information</h3>
                  <p><strong>ID:</strong> {selectedOrder._id}</p>
                  <p><strong>Date:</strong> {new Date(selectedOrder.createdAt).toLocaleString()}</p>
                  <p><strong>Status:</strong> <span className={`status-badge status-${selectedOrder.status.toLowerCase()}`}>{selectedOrder.status}</span></p>
                  <p><strong>Total:</strong> ${selectedOrder.totalAmount.toFixed(2)}</p>
                </div>
                <div>
                  <h3>Customer</h3>
                  <p><strong>Name:</strong> {selectedOrder.customer?.name || 'N/A'}</p>
                  <p><strong>Email:</strong> {selectedOrder.customer?.email || 'N/A'}</p>
                  <p><strong>Phone:</strong> {selectedOrder.customer?.phone || 'N/A'}</p>
                </div>
              </div>
              
              <h3>Items</h3>
              <div className="items-list">
                {selectedOrder.items.map((item, index) => (
                  <div key={index} className="item-row">
                    <span>{item.name}</span>
                    <span>{item.quantity} × ${item.price.toFixed(2)}</span>
                    <span>${(item.quantity * item.price).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              
              <div className="order-totals">
                <div>
                  <span>Subtotal:</span>
                  <span>${selectedOrder.subtotal?.toFixed(2) || selectedOrder.totalAmount.toFixed(2)}</span>
                </div>
                <div>
                  <span>Shipping:</span>
                  <span>${selectedOrder.shippingFee?.toFixed(2) || '0.00'}</span>
                </div>
                <div className="total-row">
                  <span>Total:</span>
                  <span>${selectedOrder.totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;