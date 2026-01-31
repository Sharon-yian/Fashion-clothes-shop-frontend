import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setShippingAddress, setBillingAddress, setCurrentStep } from '../checkoutSlice';

const CheckoutForm = ({ onNext }) => {
  const dispatch = useDispatch();
  const { shippingAddress, billingAddress } = useSelector(state => state.checkout);
  
  const [formData, setFormData] = useState({
    shipping: shippingAddress,
    billing: billingAddress,
    sameAsShipping: true
  });

  const handleInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: { ...prev[section], [field]: value }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setShippingAddress(formData.shipping));
    dispatch(setBillingAddress(formData.sameAsShipping ? formData.shipping : formData.billing));
    dispatch(setCurrentStep('review'));
    onNext();
  };

  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      <div className="shipping-section">
        <h3>Shipping Address</h3>
        <input
          type="text"
          placeholder="Full Name"
          value={formData.shipping.fullName || ''}
          onChange={(e) => handleInputChange('shipping', 'fullName', e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Address"
          value={formData.shipping.address || ''}
          onChange={(e) => handleInputChange('shipping', 'address', e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="City"
          value={formData.shipping.city || ''}
          onChange={(e) => handleInputChange('shipping', 'city', e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="ZIP Code"
          value={formData.shipping.zipCode || ''}
          onChange={(e) => handleInputChange('shipping', 'zipCode', e.target.value)}
          required
        />
      </div>

      <div className="billing-section">
        <label>
          <input
            type="checkbox"
            checked={formData.sameAsShipping}
            onChange={(e) => setFormData(prev => ({ ...prev, sameAsShipping: e.target.checked }))}
          />
          Billing address same as shipping
        </label>
        
        {!formData.sameAsShipping && (
          <div>
            <h3>Billing Address</h3>
            <input
              type="text"
              placeholder="Full Name"
              value={formData.billing.fullName || ''}
              onChange={(e) => handleInputChange('billing', 'fullName', e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Address"
              value={formData.billing.address || ''}
              onChange={(e) => handleInputChange('billing', 'address', e.target.value)}
              required
            />
          </div>
        )}
      </div>

      <button type="submit">Continue to Review</button>
    </form>
  );
};

export default CheckoutForm;