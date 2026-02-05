import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../styles/cartCheckout.css';

const ConfirmationPage = () => {
  const navigate = useNavigate();
  const recentOrder = useSelector(state => state.cart);

  return (
    <div className="confirmation-page">
      <h2>Order Confirmed! 🎉</h2>
      <p>Thank you for shopping with Fashion Store!</p>
      <p>Your order has been placed successfully.</p>
      
      <div className="invoice-preview">
        <h3>Invoice</h3>
        <p>Invoice #: INV-{Math.floor(Math.random() * 100000)}</p>
        <p>Date: {new Date().toLocaleDateString()}</p>
        <p>Payment Method: Card Payment</p>
      </div>

      <div className="confirmation-actions">
        <Link to="/" className="cart-checkout-btn continue-shopping-btn">Continue Shopping</Link>
        </div>
    </div>
  );
};

export default ConfirmationPage;