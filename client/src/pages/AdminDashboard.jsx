import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { adminService } from '../services/admin';
import { blogService } from '../services/blog';
import Toast from '../components/Toast';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState({
    dashboard: true,
    users: false,
    orders: false,
    products: false,
    blog: false
  });
  const [toast, setToast] = useState(null);
  
  // Dashboard Data
  const [dashboardStats, setDashboardStats] = useState(null);
  const [analyticsData, setAnalyticsData] = useState(null);
  
  // Users Data
  const [users, setUsers] = useState([]);
  const [usersPage, setUsersPage] = useState(1);
  const [usersTotal, setUsersTotal] = useState(0);
  
  // Orders Data
  const [orders, setOrders] = useState([]);
  const [ordersPage, setOrdersPage] = useState(1);
  const [ordersTotal, setOrdersTotal] = useState(0);
  
  // Products Data
  const [products, setProducts] = useState([]);
  const [productsPage, setProductsPage] = useState(1);
  const [productsTotal, setProductsTotal] = useState(0);

  // Blog Posts Data
  const [blogPosts, setBlogPosts] = useState([]);
  const [blogPostsPage, setBlogPostsPage] = useState(1);
  const [blogPostsTotal, setBlogPostsTotal] = useState(0);

  useEffect(() => {
    // Check if user is admin
    const userRole = localStorage.getItem('userRole');
    if (userRole !== 'admin') {
      navigate('/');
      return;
    }

    fetchDashboardData();
  }, [navigate]);

  const fetchDashboardData = async () => {
    try {
      setLoading(prev => ({ ...prev, dashboard: true }));
      // Prod: Fetching dashboard stats

      const statsResponse = await adminService.getDashboardStats();
      if (statsResponse.ok) {
        setDashboardStats(statsResponse.data);
      }

      const analyticsResponse = await adminService.getAnalytics('revenue', 'monthly');
      if (analyticsResponse.ok) {
        setAnalyticsData(analyticsResponse.data);
      }

      setLoading(prev => ({ ...prev, dashboard: false }));
    } catch (error) {
      console.error('[AdminDashboard] Error:', error);
      showToast('Failed to load dashboard', 'error');
      setLoading(prev => ({ ...prev, dashboard: false }));
    }
  };

  const fetchUsers = async (page = 1) => {
    try {
      setLoading(prev => ({ ...prev, users: true }));
      console.log('[AdminDashboard] Fetching users, page:', page);
      const response = await adminService.getAllUsers(page, 10);

      if (response.ok) {
        setUsers(response.data.users || []);
        setUsersTotal(response.data.total || 0);
        setUsersPage(page);
      }
      setLoading(prev => ({ ...prev, users: false }));
    } catch (error) {
      console.error('[AdminDashboard] Error:', error);
      showToast('Failed to load users', 'error');
      setLoading(prev => ({ ...prev, users: false }));
    }
  };

  const fetchOrders = async (page = 1) => {
    try {
      setLoading(prev => ({ ...prev, orders: true }));
      console.log('[AdminDashboard] Fetching orders, page:', page);
      const response = await adminService.getAllOrders(page, 10);

      if (response.ok) {
        setOrders(response.data.orders || []);
        setOrdersTotal(response.data.total || 0);
        setOrdersPage(page);
      }
      setLoading(prev => ({ ...prev, orders: false }));
    } catch (error) {
      console.error('[AdminDashboard] Error:', error);
      showToast('Failed to load orders', 'error');
      setLoading(prev => ({ ...prev, orders: false }));
    }
  };

  const fetchProducts = async (page = 1) => {
    try {
      setLoading(prev => ({ ...prev, products: true }));
      console.log('[AdminDashboard] Fetching products, page:', page);
      const response = await adminService.getAllProducts(page, 10);

      if (response.ok) {
        setProducts(response.data.products || []);
        setProductsTotal(response.data.total || 0);
        setProductsPage(page);
      }
      setLoading(prev => ({ ...prev, products: false }));
    } catch (error) {
      console.error('[AdminDashboard] Error:', error);
      showToast('Failed to load products', 'error');
      setLoading(prev => ({ ...prev, products: false }));
    }
  };

  const fetchBlogPosts = async (page = 1) => {
    try {
      setLoading(prev => ({ ...prev, blog: true }));
      console.log('[AdminDashboard] Fetching blog posts, page:', page);
      const response = await blogService.getAllPosts(page, 10);

      if (response.ok) {
        setBlogPosts(response.data || []);
        setBlogPostsTotal(response.pagination?.total || 0);
        setBlogPostsPage(page);
      }
      setLoading(prev => ({ ...prev, blog: false }));
    } catch (error) {
      console.error('[AdminDashboard] Error:', error);
      showToast('Failed to load blog posts', 'error');
      setLoading(prev => ({ ...prev, blog: false }));
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);

    if (tab === 'users' && users.length === 0) {
      fetchUsers();
    } else if (tab === 'orders' && orders.length === 0) {
      fetchOrders();
    } else if (tab === 'products' && products.length === 0) {
      fetchProducts();
    } else if (tab === 'blog' && blogPosts.length === 0) {
      fetchBlogPosts();
    }
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleUpdateOrderStatus = async (orderId, newStatus) => {
    try {
      console.log('[AdminDashboard] Updating order status:', orderId, newStatus);
      const response = await adminService.updateOrderStatus(orderId, newStatus);

      if (response.ok) {
        showToast('Order updated successfully', 'success');
        fetchOrders(ordersPage);
      } else {
        showToast('Failed to update order', 'error');
      }
    } catch (error) {
      console.error('[AdminDashboard] Error:', error);
      showToast(error.message || 'Failed to update order', 'error');
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      console.log('[AdminDashboard] Deleting product:', productId);
      const response = await adminService.deleteProduct(productId);

      if (response.ok) {
        showToast('Product deleted successfully', 'success');
        fetchProducts(productsPage);
      } else {
        showToast('Failed to delete product', 'error');
      }
    } catch (error) {
      console.error('[AdminDashboard] Error:', error);
      showToast(error.message || 'Failed to delete product', 'error');
    }
  };

  const handleDeleteBlogPost = async (postId) => {
    if (!window.confirm('Are you sure you want to delete this blog post?')) return;

    try {
      console.log('[AdminDashboard] Deleting blog post:', postId);
      const response = await blogService.deletePost(postId);

      if (response.ok) {
        showToast('Blog post deleted successfully', 'success');
        fetchBlogPosts(blogPostsPage);
      } else {
        showToast('Failed to delete blog post', 'error');
      }
    } catch (error) {
      console.error('[AdminDashboard] Error:', error);
      showToast(error.message || 'Failed to delete blog post', 'error');
    }
  };

  const getPaginationDisabled = (page, total, limit = 10) => page * limit >= total;

  if (loading.dashboard && activeTab === 'dashboard') {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-600 dark:text-slate-400">Loading dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Header */}
          <div className="mb-8 flex justify-between items-center">
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white transition-colors duration-300">Admin Dashboard</h1>
            <button
              onClick={() => {
                localStorage.removeItem('token');
                localStorage.removeItem('userRole');
                navigate('/login');
              }}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg shadow-md transition-all duration-200"
            >
              Logout
            </button>
          </div>

          {/* Tabs */}
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-xl dark:shadow-none border border-transparent dark:border-slate-800 overflow-hidden mb-8 transition-colors duration-300">
            <div className="border-b border-slate-200 dark:border-slate-800 divide-x divide-slate-200 dark:divide-slate-800 flex overflow-x-auto transition-colors duration-300">
              {['dashboard', 'users', 'orders', 'products', 'blog'].map(tab => (
                <button
                  key={tab}
                  onClick={() => handleTabChange(tab)}
                  disabled={loading[tab]}
                  className={`flex-1 py-4 px-2 font-semibold capitalize transition-all whitespace-nowrap text-sm md:text-base ${
                    activeTab === tab
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  } ${loading[tab] ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {tab.replace(/\\b(\\w)/g, m => m.toUpperCase())}
                </button>
              ))}
            </div>

            <div className="p-6 md:p-8">
              {/* Dashboard Tab */}
              {activeTab === 'dashboard' && (
                <>
                  {loading.dashboard ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                      <p className="text-slate-600 dark:text-slate-400">Loading dashboard...</p>
                    </div>
                  ) : dashboardStats ? (
                    <div>
                      {/* Stats Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
                          <p className="text-sm opacity-90 font-medium">Total Users</p>
                          <p className="text-3xl font-bold mt-1">{dashboardStats.totalUsers || 0}</p>
                        </div>
                        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
                          <p className="text-sm opacity-90 font-medium">Total Orders</p>
                          <p className="text-3xl font-bold mt-1">{dashboardStats.totalOrders || 0}</p>
                        </div>
                        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
                          <p className="text-sm opacity-90 font-medium">Total Revenue</p>
                          <p className="text-3xl font-bold mt-1">₦{(dashboardStats.totalRevenue || 0).toLocaleString()}</p>
                        </div>
                        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white shadow-lg">
                          <p className="text-sm opacity-90 font-medium">Conversion Rate</p>
                          <p className="text-3xl font-bold mt-1">{((dashboardStats.conversionRate || 0) * 100).toFixed(1)}%</p>
                        </div>
                      </div>

                      {/* Recent Orders */}
                      <div>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center transition-colors duration-300">
                          Recent Orders
                          <span className="ml-2 text-sm bg-blue-100 dark:bg-blue-500/20 text-blue-800 dark:text-blue-400 px-2 py-1 rounded-full transition-colors duration-300">
                            {(dashboardStats.recentOrders || []).length}
                          </span>
                        </h2>
                        {(dashboardStats.recentOrders || []).length > 0 ? (
                          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm dark:shadow-none overflow-hidden transition-colors duration-300">
                            <table className="w-full text-left">
                              <thead className="bg-slate-50 dark:bg-slate-800/50 transition-colors duration-300">
                                <tr>
                                  <th className="px-6 py-4 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Order ID</th>
                                  <th className="px-6 py-4 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Date</th>
                                  <th className="px-6 py-4 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Amount</th>
                                  <th className="px-6 py-4 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Status</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-200 dark:divide-slate-800/50">
                                {(dashboardStats.recentOrders || []).map(order => (
                                  <tr key={order._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors duration-300">
                                    <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">
                                      {order.orderNumber || order._id?.slice(-8)}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                                      {new Date(order.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-sm font-semibold text-slate-900 dark:text-white">
                                      ₦{(order.totalAmount || 0).toLocaleString()}
                                    </td>
                                    <td className="px-6 py-4">
                                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                        order.status === 'completed' ? 'bg-green-100 dark:bg-green-500/20 text-green-800 dark:text-green-400' :
                                        order.status === 'processing' ? 'bg-yellow-100 dark:bg-yellow-500/20 text-yellow-800 dark:text-yellow-400' :
                                        order.status === 'cancelled' ? 'bg-red-100 dark:bg-red-500/20 text-red-800 dark:text-red-400' :
                                        'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-300'
                                      }`}>
                                        {order.status}
                                      </span>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        ) : (
                          <div className="text-center py-12 bg-slate-50 dark:bg-slate-800/50 rounded-xl transition-colors duration-300">
                            <div className="text-slate-400 dark:text-slate-500 mb-4 text-3xl">📊</div>
                            <p className="text-slate-500 dark:text-slate-400">No recent orders</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-slate-500 dark:text-slate-400 transition-colors duration-300">
                      <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300">
                        <svg className="w-8 h-8 text-slate-400 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 0v6m0-6H4m15 0v6m-6 0h6m-6-6V5a2 2 0 012-2h4a2 2 0 012 2v6z" />
                        </svg>
                      </div>
                      <p className="text-lg">No dashboard data available</p>
                    </div>
                  )}
                </>
              )}

              {/* Users Tab */}
              {activeTab === 'users' && (
                <>
                  {loading.users ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                      <p className="text-slate-600 dark:text-slate-400">Loading users...</p>
                    </div>
                  ) : users.length === 0 ? (
                    <div className="text-center py-12 text-slate-500 dark:text-slate-400 transition-colors duration-300">
                      <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300">
                        <svg className="w-8 h-8 text-slate-400 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </div>
                      <p className="text-lg">No users found</p>
                    </div>
                  ) : (
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 transition-colors duration-300">
                        Users ({usersTotal})
                      </h2>
                      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm dark:shadow-none overflow-hidden transition-colors duration-300">
                        <table className="w-full text-left">
                          <thead className="bg-slate-50 dark:bg-slate-800/50 transition-colors duration-300">
                            <tr>
                              <th className="px-6 py-4 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">User</th>
                              <th className="px-6 py-4 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Email</th>
                              <th className="px-6 py-4 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Role</th>
                              <th className="px-6 py-4 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Joined</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-200 dark:divide-slate-800/50">
                            {users.map(user => (
                              <tr key={user._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors duration-300">
                                <td className="px-6 py-4">
                                  <div className="flex items-center">
                                    <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center mr-4">
                                      <span className="text-white font-semibold text-sm">
                                        {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
                                      </span>
                                    </div>
                                    <div>
                                      <div className="text-sm font-medium text-slate-900 dark:text-white">
                                        {user.firstName} {user.lastName}
                                      </div>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{user.email}</td>
                                <td className="px-6 py-4">
                                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                    user.role === 'admin' ? 'bg-red-100 dark:bg-red-500/20 text-red-800 dark:text-red-400' :
                                    user.role === 'affiliate' ? 'bg-purple-100 dark:bg-purple-500/20 text-purple-800 dark:text-purple-400' :
                                    'bg-blue-100 dark:bg-blue-500/20 text-blue-800 dark:text-blue-400'
                                  }`}>
                                    {user.role || 'user'}
                                  </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                                  {new Date(user.createdAt).toLocaleDateString()}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Pagination */}
                      {usersTotal > 10 && (
                        <div className="mt-8 flex justify-center gap-2">
                          <button
                            onClick={() => fetchUsers(Math.max(1, usersPage - 1))}
                            disabled={usersPage === 1}
                            className="px-6 py-2 border border-slate-300 dark:border-slate-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors duration-300 font-medium"
                          >
                            Previous
                          </button>
                          <span className="px-6 py-2 text-slate-700 dark:text-slate-300 font-semibold bg-slate-50 dark:bg-slate-800 rounded-lg transition-colors duration-300">
                            Page {usersPage} of {Math.ceil(usersTotal / 10)}
                          </span>
                          <button
                            onClick={() => fetchUsers(usersPage + 1)}
                            disabled={getPaginationDisabled(usersPage, usersTotal)}
                            className="px-6 py-2 border border-slate-300 dark:border-slate-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors duration-300 font-medium"
                          >
                            Next
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}

              {/* Similar improvements for other tabs - Orders, Products, Blog */}
              {activeTab === 'orders' && (
                <>
                  {loading.orders ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                      <p className="text-slate-600 dark:text-slate-400">Loading orders...</p>
                    </div>
                  ) : orders.length === 0 ? (
                    <div className="text-center py-12 text-slate-500 dark:text-slate-400 transition-colors duration-300">
                      <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300">
                        <svg className="w-8 h-8 text-slate-400 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-4V7m8 10v3m0 0l-8 4m8-4l-8-4" />
                        </svg>
                      </div>
                      <p className="text-lg">No orders found</p>
                    </div>
                  ) : (
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 transition-colors duration-300">
                        Orders ({ordersTotal})
                      </h2>
                      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm dark:shadow-none overflow-hidden transition-colors duration-300">
                        <table className="w-full text-left">
                          <thead className="bg-slate-50 dark:bg-slate-800/50 transition-colors duration-300">
                            <tr>
                              <th className="px-6 py-4 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Order</th>
                              <th className="px-6 py-4 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Customer</th>
                              <th className="px-6 py-4 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Amount</th>
                              <th className="px-6 py-4 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Status</th>
                              <th className="px-6 py-4 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-200 dark:divide-slate-800/50">
                            {orders.map(order => (
                              <tr key={order._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors duration-300">
                                <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">
                                  #{order.orderNumber || order._id?.slice(-8)}
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{order.customerEmail}</td>
                                <td className="px-6 py-4">
                                  <span className="text-lg font-bold text-slate-900 dark:text-white">
                                    ₦{(order.totalAmount || 0).toLocaleString()}
                                  </span>
                                </td>
                                <td className="px-6 py-4">
                                  <select
                                    value={order.status || 'pending'}
                                    onChange={(e) => handleUpdateOrderStatus(order._id, e.target.value)}
                                    className="px-3 py-1 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300"
                                  >
                                    <option>Pending</option>
                                    <option>Processing</option>
                                    <option>Shipped</option>
                                    <option>Completed</option>
                                    <option>Cancelled</option>
                                  </select>
                                </td>
                                <td className="px-6 py-4 text-sm font-medium">
                                  <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-semibold transition-colors duration-300">View</button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      {ordersTotal > 10 && (
                        <div className="mt-8 flex justify-center gap-2">
                          <button
                            onClick={() => fetchOrders(Math.max(1, ordersPage - 1))}
                            disabled={ordersPage === 1}
                            className="px-6 py-2 border border-slate-300 dark:border-slate-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors duration-300 font-medium"
                          >
                            Previous
                          </button>
                          <span className="px-6 py-2 text-slate-700 dark:text-slate-300 font-semibold bg-slate-50 dark:bg-slate-800 rounded-lg transition-colors duration-300">
                            Page {ordersPage} of {Math.ceil(ordersTotal / 10)}
                          </span>
                          <button
                            onClick={() => fetchOrders(ordersPage + 1)}
                            disabled={getPaginationDisabled(ordersPage, ordersTotal)}
                            className="px-6 py-2 border border-slate-300 dark:border-slate-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors duration-300 font-medium"
                          >
                            Next
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}

              {/* Products Tab */}
              {activeTab === 'products' && (
                <>
                  {loading.products ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                      <p className="text-slate-600 dark:text-slate-400">Loading products...</p>
                    </div>
                  ) : products.length === 0 ? (
                    <div className="text-center py-12 text-slate-500 dark:text-slate-400 transition-colors duration-300">
                      <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300">
                        <svg className="w-8 h-8 text-slate-400 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-4V7m8 10v3m0 0l-8 4m8-4l-8-4" />
                        </svg>
                      </div>
                      <p className="text-lg">No products found</p>
                      <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700">
                        Add New Product
                      </button>
                    </div>
                  ) : (
                    <div>
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white transition-colors duration-300">Products ({productsTotal})</h2>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-md transition-all">
                          Add New Product
                        </button>
                      </div>
                      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm dark:shadow-none overflow-hidden transition-colors duration-300">
                        <table className="w-full text-left">
                          <thead className="bg-slate-50 dark:bg-slate-800/50 transition-colors duration-300">
                            <tr>
                              <th className="px-6 py-4 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Name</th>
                              <th className="px-6 py-4 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Price</th>
                              <th className="px-6 py-4 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Stock</th>
                              <th className="px-6 py-4 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Category</th>
                              <th className="px-6 py-4 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-200 dark:divide-slate-800/50">
                            {products.map(product => (
                              <tr key={product._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors duration-300">
                                <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white max-w-md truncate">{product.name}</td>
                                <td className="px-6 py-4">
                                  <span className="text-lg font-bold text-slate-900 dark:text-white">
                                    ₦{(product.price || 0).toLocaleString()}
                                  </span>
                                </td>
                                <td className="px-6 py-4">
                                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                    (product.stock || 0) > 0 ? 'bg-green-100 dark:bg-green-500/20 text-green-800 dark:text-green-400' : 'bg-red-100 dark:bg-red-500/20 text-red-800 dark:text-red-400'
                                  }`}>
                                    {(product.stock || 0) > 0 ? 'In Stock' : 'Out of Stock'}
                                  </span>
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{product.category || 'Uncategorized'}</td>
                                <td className="px-6 py-4 text-sm font-medium space-x-2">
                                  <button className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-semibold text-sm px-3 py-1 rounded hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-colors">
                                    Edit
                                  </button>
                                  <button
                                    onClick={() => handleDeleteProduct(product._id)}
                                    className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 font-semibold text-sm px-3 py-1 rounded hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                                  >
                                    Delete
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      {productsTotal > 10 && (
                        <div className="mt-8 flex justify-center gap-2">
                          <button
                            onClick={() => fetchProducts(Math.max(1, productsPage - 1))}
                            disabled={productsPage === 1}
                            className="px-6 py-2 border border-slate-300 dark:border-slate-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors duration-300 font-medium"
                          >
                            Previous
                          </button>
                          <span className="px-6 py-2 text-slate-700 dark:text-slate-300 font-semibold bg-slate-50 dark:bg-slate-800 rounded-lg transition-colors duration-300">
                            Page {productsPage} of {Math.ceil(productsTotal / 10)}
                          </span>
                          <button
                            onClick={() => fetchProducts(productsPage + 1)}
                            disabled={getPaginationDisabled(productsPage, productsTotal)}
                            className="px-6 py-2 border border-slate-300 dark:border-slate-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors duration-300 font-medium"
                          >
                            Next
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}

              {/* Blog Posts Tab */}
              {activeTab === 'blog' && (
                <>
                  {loading.blog ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                      <p className="text-slate-600 dark:text-slate-400">Loading blog posts...</p>
                    </div>
                  ) : blogPosts.length === 0 ? (
                    <div className="text-center py-12 text-slate-500 dark:text-slate-400 transition-colors duration-300">
                      <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300">
                        <svg className="w-8 h-8 text-slate-400 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                      <p className="text-lg">No blog posts found</p>
                      <Link to="/blog/submit" className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700">
                        Create First Post
                      </Link>
                    </div>
                  ) : (
                    <div>
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white transition-colors duration-300">
                          Blog Posts ({blogPostsTotal})
                        </h2>
                        <Link 
                          to="/blog/submit" 
                          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-md transition-all duration-200 flex items-center gap-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                          Add New Post
                        </Link>
                      </div>
                      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm dark:shadow-none overflow-hidden transition-colors duration-300">
                        <table className="w-full text-left">
                          <thead className="bg-slate-50 dark:bg-slate-800/50 transition-colors duration-300">
                            <tr>
                              <th className="px-6 py-4 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Title</th>
                              <th className="px-6 py-4 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Category</th>
                              <th className="px-6 py-4 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Author</th>
                              <th className="px-6 py-4 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Status</th>
                              <th className="px-6 py-4 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Date</th>
                              <th className="px-6 py-4 text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-200 dark:divide-slate-800/50">
                            {blogPosts.map(post => (
                              <tr key={post._id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors duration-300">
                                <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white max-w-xs truncate pr-4">
                                  {post.title}
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{post.category}</td>
                                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{post.author?.name || 'Unknown'}</td>
                                <th className="px-6 py-4">
                                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                    post.status === 'published' ? 'bg-green-100 dark:bg-green-500/20 text-green-800 dark:text-green-400' :
                                    post.status === 'draft' ? 'bg-yellow-100 dark:bg-yellow-500/20 text-yellow-800 dark:text-yellow-400' :
                                    'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-300'
                                  }`}>
                                    {post.status}
                                  </span>
                                </th>
                                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                                  {new Date(post.createdAt).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 text-sm font-medium space-x-2">
                                  <Link to={`/blog/${post.slug}`} className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-semibold text-sm px-3 py-1 rounded hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-colors">
                                    View
                                  </Link>
                                  <button className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-semibold text-sm px-3 py-1 rounded hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-colors">
                                    Edit
                                  </button>
                                  <button
                                    onClick={() => handleDeleteBlogPost(post._id)}
                                    className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 font-semibold text-sm px-3 py-1 rounded hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                                  >
                                    Delete
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      {blogPostsTotal > 10 && (
                        <div className="mt-8 flex justify-center gap-2">
                          <button
                            onClick={() => fetchBlogPosts(Math.max(1, blogPostsPage - 1))}
                            disabled={blogPostsPage === 1}
                            className="px-6 py-2 border border-slate-300 dark:border-slate-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors duration-300 font-medium"
                          >
                            Previous
                          </button>
                          <span className="px-6 py-2 text-slate-700 dark:text-slate-300 font-semibold bg-slate-50 dark:bg-slate-800 rounded-lg transition-colors duration-300">
                            Page {blogPostsPage} of {Math.ceil(blogPostsTotal / 10)}
                          </span>
                          <button
                            onClick={() => fetchBlogPosts(blogPostsPage + 1)}
                            disabled={getPaginationDisabled(blogPostsPage, blogPostsTotal)}
                            className="px-6 py-2 border border-slate-300 dark:border-slate-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors duration-300 font-medium"
                          >
                            Next
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Toast positioned absolutely */}
      {toast && (
        <div className="fixed top-4 right-4 z-50">
          <Toast message={toast.message} type={toast.type} />
        </div>
      )}
    </>
  );
}
