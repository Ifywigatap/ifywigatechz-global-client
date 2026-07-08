import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { cartService } from '../services/cart';
import { useToast } from './ToastContext';
import PaystackButton from '../components/PaystackButton'; // Import PaystackButton

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, cartTotal: total, cartLoading } = useCart();
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Nigeria'
  });
  const [paymentMethod, setPaymentMethod] = useState('paystack');
  const [agreeTerms, setAgreeTerms] = useState(false);

  useEffect(() => {
    if (cartLoading) {
      return;
    }

    if (!cart || cart.length === 0) {
      navigate('/ecommerce');
    }
  }, [cart, cartLoading, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePaymentSuccess = (response) => {
    console.log('[Checkout] Payment successful:', response);
    // Here you would typically call your backend to verify the transaction reference
    // and create the order in your database.
    // For now, we'll just navigate to a success page.
    navigate('/payment-success', { state: { reference: response.reference } });
  };

  const handleFormSubmit = (e) => {
    if (!agreeTerms) {
      addToast('You must agree to the terms and conditions.', 'error');
      e.preventDefault(); // Prevent the button's default action if it's inside a form
    }
  };

  if (cartLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
        <div className="text-center p-6 bg-white dark:bg-slate-900 rounded-2xl shadow-md border border-slate-200 dark:border-slate-800 transition-colors duration-300">
          <p className="text-lg font-semibold text-slate-700 dark:text-slate-300">Loading your cart...</p>
        </div>
      </div>
    );
  }

  if (!cart || cart.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 text-slate-900 dark:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-md p-8 border border-slate-200 dark:border-slate-800 transition-colors duration-300">
              <h1 className="text-3xl font-bold mb-8">Checkout</h1>

              <div className="space-y-8">
                {/* Shipping Information */}
                <section className="mb-8">
                  <h2 className="text-xl font-semibold mb-6">Shipping Information</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name *"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="col-span-2 sm:col-span-1 px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
                    />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="col-span-2 sm:col-span-1 px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address *"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="col-span-2 px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
                    />
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="col-span-2 px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
                    />
                    <input
                      type="text"
                      name="address"
                      placeholder="Street Address *"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="col-span-2 px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
                    />
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="col-span-2 sm:col-span-1 px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
                    />
                    <input
                      type="text"
                      name="state"
                      placeholder="State/Province"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="col-span-2 sm:col-span-1 px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
                    />
                    <input
                      type="text"
                      name="zipCode"
                      placeholder="ZIP/Postal Code"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className="col-span-2 sm:col-span-1 px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
                    />
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="col-span-2 sm:col-span-1 px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
                    >
                      <option>Nigeria</option>
                      <option>Ghana</option>
                      <option>Kenya</option>
                      <option>South Africa</option>
                      <option>Other</option>
                    </select>
                  </div>
                </section>

                {/* Payment Method */}
                <section className="mb-8">
                  <h2 className="text-xl font-semibold mb-6">Payment Method</h2>
                  <div className="space-y-4">
                    <label className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors duration-300 ${paymentMethod === 'paystack' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-slate-200 dark:border-slate-700 hover:border-blue-500'}`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="paystack"
                        checked={paymentMethod === 'paystack'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="w-4 h-4"
                      />
                      <span className="ml-4">
                        <p className="font-semibold">Paystack Payment</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Secure online payment with card</p>
                      </span>
                    </label>
                  </div>
                </section>

                {/* Terms and Conditions */}
                <section className="mb-8">
                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="mt-1 w-4 h-4 rounded"
                    />
                    <span className="ml-3 text-sm text-slate-700 dark:text-slate-300">
                      I agree to the terms and conditions and privacy policy
                    </span>
                  </label>
                </section>

                <PaystackButton
                  email={formData.email}
                  amount={total}
                  reference={`IFY-ECOM-${Date.now()}`}
                  metadata={{
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    phone: formData.phone,
                    address: formData.address,
                    city: formData.city,
                    state: formData.state,
                    zipCode: formData.zipCode,
                    country: formData.country,
                    cart_items: JSON.stringify(cart.map(item => ({ id: item.id, name: item.name, qty: item.qty })))
                  }}
                  onSuccess={handlePaymentSuccess}
                  onClose={() => addToast('Payment window closed.', 'info')}
                  onError={(errorMsg) => addToast(errorMsg, 'error')}
                  onClick={handleFormSubmit}
                  disabled={loading || !agreeTerms || !formData.email || !formData.firstName}
                  className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition ${
                    (!agreeTerms || !formData.email || !formData.firstName)
                      ? 'disabled:bg-gray-400 disabled:cursor-not-allowed'
                      : ''
                  }`}
                  label={loading ? 'Processing...' : 'Proceed to Payment'}
                />

              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-md p-6 sticky top-20 border border-slate-200 dark:border-slate-800 transition-colors duration-300">
              <h2 className="text-xl font-semibold mb-6 text-slate-900 dark:text-white">Order Summary</h2>

              <div className="space-y-4 mb-6">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-400">{item.name}</span>
                    <span className="font-semibold text-slate-900 dark:text-white">₦{((Number(item?.price) || 0) * (Number(item?.qty) || 0)).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-slate-200 dark:border-slate-800 pt-4 space-y-2 transition-colors duration-300">
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Subtotal</span>
                  <span>₦{(Number(total) || 0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Tax</span>
                  <span>Calculated at payment</span>
                </div>
              </div>

              <div className="border-t border-slate-200 dark:border-slate-800 mt-4 pt-4 transition-colors duration-300">
                <div className="flex justify-between text-lg font-bold text-slate-900 dark:text-white">
                  <span>Total</span>
                  <span className="text-blue-600">₦{total.toLocaleString()}</span>
                </div>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-500 mt-6">
                Your payment is secured and encrypted
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}