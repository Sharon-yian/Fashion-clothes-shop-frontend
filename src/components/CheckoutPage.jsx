import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from "../slices/cartSlice";
import { useState } from 'react';
import '../styles/cartCheckout.css';

const CheckoutPage = () => {
  const { items, total } = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    phone: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = () => {
    alert(`Thank you, ${formData.fullName}! Your order of $${total.toFixed(2)} has been placed successfully.`);
    
    dispatch(clearCart());
    navigate('/confirmation');
  };

  return (
    <div className="checkout-page">
      <h2>Checkout</h2>
      
      <div className="checkout-grid">
        <div className="checkout-form">
          <h3>Shipping Information</h3>
          <input name="fullName" placeholder="Full Name" onChange={handleChange} required />
          <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
          <input name="address" placeholder="Street Address" onChange={handleChange} required />
          <input name="city" placeholder="City" onChange={handleChange} required />
          <input name="zipCode" placeholder="ZIP Code" onChange={handleChange} required />
          <input name="phone" placeholder="Phone Number" onChange={handleChange} required />
        </div>

        <div className="order-summary">
          <h3>Order Summary</h3>
          {items.map(item => (
            <div key={item.id} className="summary-item">
              <span>{item.name} × {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="summary-total">
            <strong>Total: ${total.toFixed(2)}</strong>
          </div>
          <button 
            onClick={handlePlaceOrder} 
            className="cart-checkout-btn place-order-btn"
            disabled={!formData.fullName || !formData.email || !formData.address}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;