import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { paymentService } from '../services/payments';
import { orderService as ordersService } from '../services/orders';
import { useCart } from '../context/CartContext';

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { clearCart } = useCart();
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const verifyPayment = async () => {
      const reference = searchParams.get('reference');

      if (!reference) {
        setError('No payment reference found');
        setLoading(false);
        return;
      }

      try {
        console.log('[PaymentSuccess] Verifying payment with reference:', reference);

        // Verify the payment
        const paymentResponse = await paymentService.verifyPayment(reference);

        if (!paymentResponse.ok) {
          throw new Error(paymentResponse.message || 'Payment verification failed');
        }

        console.log('[PaymentSuccess] Payment verified successfully');

        // Get the order details
        if (paymentResponse.data?.orderId) {
          const orderResponse = await ordersService.getOrderById(paymentResponse.data.orderId);
          setOrder(orderResponse.data);
        }

        // Clear cart after successful payment
        clearCart();

        setLoading(false);
      } catch (error) {
        console.error('[PaymentSuccess] Error:', error);
        setError(error.message || 'Failed to verify payment');
        setLoading(false);
      }
    };

    verifyPayment();
  }, [searchParams, clearCart]);

  const handleDownloadInvoice = async () => {
    if (!order) return;

    try {
      console.log('[PaymentSuccess] Downloading invoice for order:', order._id);
      const response = await ordersService.downloadInvoice(order._id);
      
      // Create a blob and download
      const url = window.URL.createObjectURL(new Blob([response]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `invoice-${order.orderNumber}.pdf`);
      document.body.appendChild(link);
      link.click();
link.parentNode && link.parentNode.removeChild(link);
    } catch (error) {
      console.error('[PaymentSuccess] Download error:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">Verifying your payment...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 transition-colors duration-300">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm dark:shadow-none border border-slate-200 dark:border-slate-800 p-8 text-center transition-colors duration-300">
            <div className="w-16 h-16 bg-red-50 dark:bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300">
              <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 transition-colors duration-300">Payment Verification Failed</h1>
            <p className="text-slate-600 dark:text-slate-400 mb-6 transition-colors duration-300">{error}</p>
            <button
              onClick={() => navigate('/ecommerce')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300"
            >
              Back to Shop
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 transition-colors duration-300">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm dark:shadow-none border border-slate-200 dark:border-slate-800 p-8 transition-colors duration-300">
          {/* Success Icon */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-50 dark:bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300">
              <svg className="w-10 h-10 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 transition-colors duration-300">Payment Successful!</h1>
            <p className="text-slate-600 dark:text-slate-400 transition-colors duration-300">Thank you for your purchase</p>
          </div>

          {/* Order Details */}
          {order && (
            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-6 mb-8 transition-colors duration-300">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6 transition-colors duration-300">Order Details</h2>
              
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 transition-colors duration-300">Order Number</p>
                  <p className="text-lg font-semibold text-slate-900 dark:text-white transition-colors duration-300">{order.orderNumber || order._id}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 transition-colors duration-300">Order Date</p>
                  <p className="text-lg font-semibold text-slate-900 dark:text-white transition-colors duration-300">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 transition-colors duration-300">Status</p>
                  <p className="text-lg font-semibold text-green-600 dark:text-green-400 transition-colors duration-300">{order.status}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 transition-colors duration-300">Total Amount</p>
                  <p className="text-lg font-semibold text-slate-900 dark:text-white transition-colors duration-300">
                    ₦{order.totalAmount?.toLocaleString() || '0'}
                  </p>
                </div>
              </div>

              {/* Ordered Items */}
              <div className="border-t border-slate-200 dark:border-slate-700 pt-6 transition-colors duration-300">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-4 transition-colors duration-300">Items Ordered</h3>
                <div className="space-y-3">
                  {order.items?.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-slate-600 dark:text-slate-400 transition-colors duration-300">{item.name}</span>
                      <span className="font-semibold text-slate-900 dark:text-white transition-colors duration-300">₦{item.price?.toLocaleString() || '0'}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping Details */}
              {order.shippingAddress && (
                <div className="border-t border-slate-200 dark:border-slate-700 mt-6 pt-6 transition-colors duration-300">
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-4 transition-colors duration-300">Shipping Address</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 transition-colors duration-300">
                    {order.shippingAddress.address}<br />
                    {order.shippingAddress.city}, {order.shippingAddress.state}<br />
                    {order.shippingAddress.zipCode}, {order.shippingAddress.country}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="space-y-3">
            <button
              onClick={handleDownloadInvoice}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors duration-300 shadow-md"
            >
              📥 Download Invoice
            </button>
            <button
              onClick={() => navigate('/dashboard')}
              className="w-full bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold py-3 rounded-lg transition-colors duration-300"
            >
              View My Orders
            </button>
            <button
              onClick={() => navigate('/')}
              className="w-full bg-slate-100 dark:bg-slate-800/50 hover:bg-slate-200 dark:hover:bg-slate-700/50 text-slate-900 dark:text-white font-bold py-3 rounded-lg transition-colors duration-300"
            >
              Continue Shopping
            </button>
          </div>

          {/* Next Steps */}
          <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 border border-transparent dark:border-blue-800/30 rounded-lg transition-colors duration-300">
            <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-2 transition-colors duration-300">What Happens Next?</h3>
            <ul className="text-sm text-blue-800 dark:text-blue-200/80 space-y-2 transition-colors duration-300">
              <li>✓ You'll receive a confirmation email with order details</li>
              <li>✓ Your items will be available in your dashboard</li>
              <li>✓ Digital products are available immediately</li>
              <li>✓ Physical products will be shipped within 3-5 business days</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
