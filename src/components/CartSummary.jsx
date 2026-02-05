import { useSelector } from 'react-redux';
import '../styles/cartCheckout.css';

const CartSummary = () => {
  const { items, total } = useSelector(state => state.cart);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="cart-summary">
      <h3>Cart Summary</h3>
      <div className="summary-line">
        <span>Items ({itemCount})</span>
        <span>${total.toFixed(2)}</span>
      </div>
      <div className="summary-line">
        <span>Shipping</span>
        <span>Free</span>
      </div>
      <div className="summary-total">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default CartSummary;