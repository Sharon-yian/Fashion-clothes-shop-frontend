import { useDispatch } from 'react-redux';
import { updateQuantity, removeFromCart } from '../cartSlice';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity({ id: item.id, quantity: newQuantity }));
    }
  };

  const handleRemove = () => {
    dispatch(removeFromCart(item.id));
  };

  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} className="item-image" />
      <div className="item-details">
        <h3>{item.name}</h3>
        <p>${item.price.toFixed(2)}</p>
        <div className="quantity-controls">
          <button onClick={() => handleQuantityChange(item.quantity - 1)}>-</button>
          <span>{item.quantity}</span>
          <button onClick={() => handleQuantityChange(item.quantity + 1)}>+</button>
        </div>
        <button onClick={handleRemove} className="remove-btn" style={{ background: '#dc3545', marginTop: '8px' }}>Remove</button>
      </div>
      <div className="item-total">${(item.price * item.quantity).toFixed(2)}</div>
    </div>
  );
};

export default CartItem;