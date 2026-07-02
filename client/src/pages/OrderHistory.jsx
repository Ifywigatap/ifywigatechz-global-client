import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/auth';
import { orderService as ordersService } from '../services/orders';

const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case 'completed':
    case 'delivered':
      return 'bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-400';
    case 'pending':
    case 'processing':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-500/20 dark:text-yellow-400';
    case 'cancelled':
      return 'bg-red-100 text-red-800 dark:bg-red-500/20 dark:text-red-400';
    case 'refunded':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-500/20 dark:text-blue-400';
    default:
      return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300';
  }
};

export default function OrderHistory() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [sortBy, setSortBy] = useState('recent');

  const limit = 10;

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('[OrderHistory] Fetching orders for page:', page);

      const response = await ordersService.getUserOrders(page, limit);

      if (response.ok) {
        setOrders(response.data.orders || []);
        setTotalPages(Math.ceil((response.data.total || 0) / limit));
      } else {
        setError(response.message || 'Failed to fetch orders');
      }

      setLoading(false);
    } catch (error) {
      console.error('[OrderHistory] Error:', error);
      setError(error.message || 'Failed to load order history');
      setLoading(false);
    }
  }, [page, limit]);

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate('/login', { replace: true });
      return;
    }

    fetchOrders();
  }, [fetchOrders, navigate]);

  // Clear expanded details when navigating to a new page
  useEffect(() => {
    setSelectedOrder(null);
  }, [page]);

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to cancel this order?')) {
      return;
    }

    try {
      console.log('[OrderHistory] Cancelling order:', orderId);
      const response = await ordersService.cancelOrder(orderId);

      if (response.ok) {
        // Refresh orders list
        fetchOrders();
        setSelectedOrder(null);
      } else {
        setError(response.message || 'Failed to cancel order');
      }
    } catch (error) {
      console.error('[OrderHistory] Cancel error:', error);
      setError(error.message || 'Failed to cancel order');
    }
  };

  const handleDownloadInvoice = async (orderId) => {
    try {
      console.log('[OrderHistory] Downloading invoice for order:', orderId);
      const response = await ordersService.downloadInvoice(orderId);

      if (response.ok) {
        // Create download link
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `invoice-${orderId}.pdf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('[OrderHistory] Download error:', error);
      setError('Failed to download invoice');
    }
  };

  const handleRequestRefund = async (orderId) => {
    const reason = window.prompt('Please explain why you want a refund:');
    if (!reason) return;

    try {
      console.log('[OrderHistory] Requesting refund for order:', orderId);
      const response = await ordersService.requestRefund(orderId, reason);

      if (response.ok) {
        setError(null);
        alert('Refund request submitted. We will review and contact you within 48 hours.');
        fetchOrders();
      } else {
        setError(response.message || 'Failed to request refund');
      }
    } catch (error) {
      console.error('[OrderHistory] Refund error:', error);
      setError(error.message || 'Failed to request refund');
    }
  };

  const sortedOrders = useMemo(() => {
    const sorted = [...orders];
    switch (sortBy) {
      case 'recent':
        return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case 'oldest':
        return sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      case 'highest':
        return sorted.sort((a, b) => (b.totalAmount || 0) - (a.totalAmount || 0));
      case 'lowest':
        return sorted.sort((a, b) => (a.totalAmount || 0) - (b.totalAmount || 0));
      default:
        return sorted;
    }
  }, [orders, sortBy]);

  const getVisiblePages = () => {
    const pages = [];
    let start = Math.max(1, page - 2);
    let end = Math.min(totalPages, page + 2);
    
    if (end - start < 4) {
      if (start === 1) end = Math.min(totalPages, 5);
      else if (end === totalPages) start = Math.max(1, totalPages - 4);
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  if (loading && orders.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-600 dark:text-slate-400">Loading your order history...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">Order History</h1>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30 rounded-lg p-4 mb-6">
            <p className="text-red-700 dark:text-red-400">{error}</p>
            <button
              onClick={() => setError(null)}
              className="text-red-600 hover:text-red-800 text-sm mt-2"
            >
              Dismiss
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-slate-900 rounded-lg shadow dark:border dark:border-slate-800 p-6 transition-colors duration-300">
              <h2 className="font-semibold text-slate-900 dark:text-white mb-4">Sort By</h2>
              <div className="space-y-2">
                {[
                  { value: 'recent', label: 'Most Recent' },
                  { value: 'oldest', label: 'Oldest First' },
                  { value: 'highest', label: 'Highest Amount' },
                  { value: 'lowest', label: 'Lowest Amount' }
                ].map(option => (
                  <label key={option.value} className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="sort"
                      value={option.value}
                      checked={sortBy === option.value}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-4 h-4"
                    />
                    <span className="ml-2 text-sm text-slate-700 dark:text-slate-300">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Orders List */}
          <div className="lg:col-span-3">
            {orders.length === 0 ? (
              <div className="bg-white dark:bg-slate-900 rounded-lg shadow dark:border dark:border-slate-800 p-12 text-center transition-colors duration-300">
                <p className="text-slate-600 dark:text-slate-400 mb-4">No orders found</p>
                <button
                  onClick={() => navigate('/ecommerce')}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded transition-colors duration-300"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <div className={`space-y-4 transition-opacity duration-200 ${loading ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
                {sortedOrders.map(order => (
                  <div key={order._id} className="bg-white dark:bg-slate-900 rounded-lg shadow dark:border dark:border-slate-800 hover:shadow-lg transition-all duration-300">
                    <div className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                            Order #{order.orderNumber || order._id}
                          </h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            {new Date(order.createdAt).toLocaleDateString()} at{' '}
                            {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                        <span className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-300 ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-slate-600 dark:text-slate-400 uppercase tracking-wider">Items</p>
                          <p className="text-lg font-semibold text-slate-900 dark:text-white">{order.items?.length || 0}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-600 dark:text-slate-400 uppercase tracking-wider">Total Amount</p>
                          <p className="text-lg font-semibold text-slate-900 dark:text-white">
                            ₦{(order.totalAmount || 0).toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-600 dark:text-slate-400 uppercase tracking-wider">Payment Status</p>
                          <p className="text-lg font-semibold text-green-600 dark:text-green-400">{order.paymentStatus || 'Completed'}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-600 dark:text-slate-400 uppercase tracking-wider">Items Preview</p>
                          <p className="text-sm text-slate-600 dark:text-slate-400">
                            {order.items?.slice(0, 2).map(i => i.name).join(', ')}
                            {order.items?.length > 2 && ` +${order.items.length - 2} more`}
                          </p>
                        </div>
                      </div>

                      <div className="border-t border-slate-200 dark:border-slate-700 pt-4 flex flex-wrap gap-2">
                        <button
                          onClick={() => setSelectedOrder(selectedOrder === order._id ? null : order._id)}
                          className="flex-1 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/40 text-blue-600 dark:text-blue-400 font-semibold py-2 rounded transition-colors duration-300"
                        >
                          {selectedOrder === order._id ? 'Hide Details' : 'View Details'}
                        </button>
                        <button
                          onClick={() => handleDownloadInvoice(order._id)}
                          className="flex-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 font-semibold py-2 rounded transition-colors duration-300"
                        >
                          📥 Invoice
                        </button>
                        {order.status?.toLowerCase() === 'completed' && (
                          <button
                            onClick={() => handleRequestRefund(order._id)}
                            className="flex-1 bg-orange-50 dark:bg-orange-900/20 hover:bg-orange-100 dark:hover:bg-orange-900/40 text-orange-600 dark:text-orange-400 font-semibold py-2 rounded transition-colors duration-300"
                          >
                            🔄 Refund
                          </button>
                        )}
                        {['pending', 'processing'].includes(order.status?.toLowerCase()) && (
                          <button
                            onClick={() => handleCancelOrder(order._id)}
                            className="flex-1 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/40 text-red-600 dark:text-red-400 font-semibold py-2 rounded transition-colors duration-300"
                          >
                            ❌ Cancel
                          </button>
                        )}
                      </div>

                      {/* Expanded Details */}
                      {selectedOrder === order._id && (
                        <div className="mt-6 border-t border-slate-200 dark:border-slate-700 pt-6">
                          <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Order Items</h4>
                          <div className="space-y-3">
                            {order.items?.map((item, idx) => (
                              <div key={idx} className="flex justify-between text-sm">
                                <div>
                                  <p className="font-medium text-slate-900 dark:text-white">{item.name}</p>
                                  <p className="text-slate-600 dark:text-slate-400">Qty: {item.quantity}</p>
                                </div>
                                <p className="font-semibold text-slate-900 dark:text-white">
                                  ₦{(item.price * item.quantity).toLocaleString()}
                                </p>
                              </div>
                            ))}
                          </div>

                          {order.shippingAddress && (
                            <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg transition-colors duration-300">
                              <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Shipping Address</h4>
                              <p className="text-sm text-slate-600 dark:text-slate-400">
                                {order.shippingAddress.address}<br />
                                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}<br />
                                {order.shippingAddress.country}
                              </p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center gap-2">
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg disabled:opacity-50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-300"
                >
                  Previous
                </button>
                {getVisiblePages().map(p => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`px-4 py-2 rounded-lg transition-colors duration-300 ${
                      page === p
                        ? 'bg-blue-600 text-white'
                        : 'border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors'
                    }`}
                  >
                    {p}
                  </button>
                ))}
                <button
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg disabled:opacity-50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-300"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
