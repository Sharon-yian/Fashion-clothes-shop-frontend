import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPaymentMethod, setMpesaPhone, setPaymentStatus, setLoading } from '../checkoutSlice';

const PaymentForm = ({ onNext, total }) => {
  const dispatch = useDispatch();
  const { paymentMethod, mpesaPhone, loading, paymentStatus } = useSelector(state => state.checkout);
  const [phone, setPhone] = useState(mpesaPhone || '');
  const [errors, setErrors] = useState({});

  const handlePhoneInput = (e) => {
    const input = e.target.value.replace(/\D/g, '');
    setPhone(input);
    dispatch(setMpesaPhone(input));
    
    if (errors.phone) {
      setErrors(prev => ({ ...prev, phone: null }));
    }
  };

  const validatePhone = () => {
    if (!phone) {
      setErrors({ phone: 'Phone number is required' });
      return false;
    }
    if (phone.length < 9) {
      setErrors({ phone: 'Please enter a valid phone number' });
      return false;
    }
    return true;
  };

  const handlePayment = async () => {
    if (!validatePhone()) return;

    dispatch(setLoading(true));
    dispatch(setPaymentStatus('processing'));

    try {
      // Will connect to backend API later
      const response = await fetch('/api/mpesa/stkpush', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phoneNumber: `254${phone}`,
          amount: total,
          orderRef: `ORD${Date.now()}`
        })
      });

      if (response.ok) {
        dispatch(setPaymentStatus('success'));
        alert('Check your phone for M-Pesa prompt');
        onNext();
      } else {
        throw new Error('Payment failed');
      }
    } catch (err) {
      dispatch(setPaymentStatus('failed'));
      setErrors({ payment: err.message });
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h3 className="text-xl font-semibold mb-6">Choose Payment Method</h3>
      
      <div className="mb-6">
        <label className="flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-green-500 transition-colors">
          <input
            type="radio"
            name="payment"
            value="mpesa"
            checked={paymentMethod === 'mpesa'}
            onChange={(e) => dispatch(setPaymentMethod(e.target.value))}
            className="text-green-600"
          />
          <span className="font-medium">M-Pesa</span>
        </label>
      </div>

      {paymentMethod === 'mpesa' && (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Mobile Number
            </label>
            <div className="flex border-2 border-gray-300 rounded-lg overflow-hidden focus-within:border-green-500">
              <span className="bg-gray-50 px-4 py-3 border-r border-gray-300 font-medium">
                +254
              </span>
              <input
                type="tel"
                placeholder="712345678"
                value={phone}
                onChange={handlePhoneInput}
                maxLength="9"
                className="flex-1 px-4 py-3 outline-none"
              />
            </div>
            {errors.phone && (
              <span className="text-red-500 text-sm mt-1 block">{errors.phone}</span>
            )}
          </div>

          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <p className="text-lg">
              Total: <strong className="text-green-600">KSh {total?.toFixed(2) || '0.00'}</strong>
            </p>
          </div>

          <button
            type="button"
            onClick={handlePayment}
            disabled={loading || !phone || phone.length < 9}
            className="w-full bg-green-600 text-white py-4 px-6 rounded-lg font-semibold text-lg disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-green-700 transition-colors"
          >
            {loading ? 'Please wait...' : `Pay KSh ${total?.toFixed(2) || '0.00'}`}
          </button>

          {paymentStatus === 'processing' && (
            <div className="bg-blue-50 border border-blue-200 text-blue-800 p-3 rounded-lg text-center">
              <p>Check your phone for M-Pesa prompt...</p>
            </div>
          )}
          
          {errors.payment && (
            <div className="bg-red-50 border border-red-200 text-red-800 p-3 rounded-lg text-center">
              <p>{errors.payment}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PaymentForm;