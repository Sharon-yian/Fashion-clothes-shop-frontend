import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CartItem from './CartItem';
import { clearCart } from '../cartSlice';

const CartPage = () => {
  const { items, total, totalItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (items.length === 0) return;
    navigate('/checkout');
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      dispatch(clearCart());
    }
  };

  if (items.length === 0) {
    return (
      <div className="cart-page empty-cart">
        <h2>Your Cart is Empty</h2>
        <p>Looks like you haven't added any items yet.</p>
        <button 
          onClick={() => navigate('/')} 
          className="continue-shopping-btn"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-header">
        <h2>Your Cart ({totalItems} {totalItems === 1 ? 'item' : 'items'})</h2>
        <button 
          onClick={handleClearCart} 
          className="clear-cart-btn"
        >
          Clear Cart
        </button>
      </div>

      <div className="cart-items">
        {items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>

      <div className="cart-summary">
        <div className="summary-details">
          <p>Subtotal: <span>${total.toFixed(2)}</span></p>
          <p>Shipping: <span>Calculated at checkout</span></p>
          <h3 className="grand-total">Total: ${total.toFixed(2)}</h3>
        </div>

        <button 
          onClick={handleCheckout} 
          className="checkout-btn"
          disabled={items.length === 0}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;