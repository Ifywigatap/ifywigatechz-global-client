/**
 * Admin Service
 * Administrative operations for platform management
 */

import { apiService } from './api';

export const adminService = {
  /**
   * Get admin dashboard stats
   * @returns {Promise}
   */
  async getDashboardStats() {
    try {
      console.log('[adminService] Fetching dashboard stats');
      const response = await apiService.get('/admin/dashboard');
      
      if (!response.ok) {
        throw new Error(response.message || 'Failed to fetch dashboard stats');
      }
      
      return response;
    } catch (error) {
      console.error('[adminService] getDashboardStats error:', error);
      return {
        ok: true,
        data: {
          totalUsers: 0,
          totalOrders: 0,
          totalRevenue: 0,
          totalProducts: 0,
          totalCourses: 0,
          conversionRate: 0,
          recentOrders: [],
          recentUsers: []
        }
      };
    }
  },

  /**
   * Get list of all users
   * @param {number} page - Page number
   * @param {number} limit - Results per page
   * @param {object} filters - Search and filter options
   * @returns {Promise}
   */
  async getAllUsers(page = 1, limit = 20, filters = {}) {
    try {
      console.log('[adminService] Fetching users:', { page, limit, filters });
      
      const params = new URLSearchParams({
        page,
        limit,
        ...filters
      });
      
      const response = await apiService.get(`/admin/users?${params}`);
      
      if (!response.ok) {
        throw new Error(response.message || 'Failed to fetch users');
      }
      
      return response;
    } catch (error) {
      console.error('[adminService] getAllUsers error:', error);
      return {
        ok: true,
        data: { users: [], total: 0, page, limit }
      };
    }
  },

  /**
   * Get user details
   * @param {string} userId - User ID
   * @returns {Promise}
   */
  async getUserDetails(userId) {
    try {
      console.log('[adminService] Fetching user details:', userId);
      const response = await apiService.get(`/admin/users/${userId}`);
      
      if (!response.ok) {
        throw new Error(response.message || 'Failed to fetch user details');
      }
      
      return response;
    } catch (error) {
      console.error('[adminService] getUserDetails error:', error);
      throw error;
    }
  },

  /**
   * Update user role or status
   * @param {string} userId - User ID
   * @param {object} updates - { role, status, etc }
   * @returns {Promise}
   */
  async updateUser(userId, updates) {
    try {
      console.log('[adminService] Updating user:', userId, updates);
      const response = await apiService.put(`/admin/users/${userId}`, updates);
      
      if (!response.ok) {
        throw new Error(response.message || 'Failed to update user');
      }
      
      return response;
    } catch (error) {
      console.error('[adminService] updateUser error:', error);
      throw error;
    }
  },

  /**
   * Get all orders
   * @param {number} page - Page number
   * @param {number} limit - Results per page
   * @param {object} filters - Status, date range, etc
   * @returns {Promise}
   */
  async getAllOrders(page = 1, limit = 20, filters = {}) {
    try {
      console.log('[adminService] Fetching orders:', { page, limit, filters });
      
      const params = new URLSearchParams({
        page,
        limit,
        ...filters
      });
      
      const response = await apiService.get(`/admin/orders?${params}`);
      
      if (!response.ok) {
        throw new Error(response.message || 'Failed to fetch orders');
      }
      
      return response;
    } catch (error) {
      console.error('[adminService] getAllOrders error:', error);
      return {
        ok: true,
        data: { orders: [], total: 0, page, limit }
      };
    }
  },

  /**
   * Get order details
   * @param {string} orderId - Order ID
   * @returns {Promise}
   */
  async getOrderDetails(orderId) {
    try {
      console.log('[adminService] Fetching order details:', orderId);
      const response = await apiService.get(`/admin/orders/${orderId}`);
      
      if (!response.ok) {
        throw new Error(response.message || 'Failed to fetch order');
      }
      
      return response;
    } catch (error) {
      console.error('[adminService] getOrderDetails error:', error);
      throw error;
    }
  },

  /**
   * Update order status
   * @param {string} orderId - Order ID
   * @param {string} status - New status
   * @returns {Promise}
   */
  async updateOrderStatus(orderId, status) {
    try {
      console.log('[adminService] Updating order status:', orderId, status);
      const response = await apiService.put(`/admin/orders/${orderId}/status`, { status });
      
      if (!response.ok) {
        throw new Error(response.message || 'Failed to update order');
      }
      
      return response;
    } catch (error) {
      console.error('[adminService] updateOrderStatus error:', error);
      throw error;
    }
  },

  /**
   * Get analytics data
   * @param {string} metric - 'revenue', 'users', 'orders', 'products'
   * @param {string} period - 'daily', 'weekly', 'monthly', 'yearly'
   * @returns {Promise}
   */
  async getAnalytics(metric = 'revenue', period = 'monthly') {
    try {
      console.log('[adminService] Fetching analytics:', { metric, period });
      const response = await apiService.get(`/admin/analytics?metric=${metric}&period=${period}`);
      
      if (!response.ok) {
        throw new Error(response.message || 'Failed to fetch analytics');
      }
      
      return response;
    } catch (error) {
      console.error('[adminService] getAnalytics error:', error);
      return {
        ok: true,
        data: {
          chartData: [],
          summary: {},
          metric,
          period
        }
      };
    }
  },

  /**
   * Get revenue report
   * @param {string} startDate - Start date (YYYY-MM-DD)
   * @param {string} endDate - End date (YYYY-MM-DD)
   * @returns {Promise}
   */
  async getRevenueReport(startDate, endDate) {
    try {
      console.log('[adminService] Fetching revenue report:', { startDate, endDate });
      const response = await apiService.get(
        `/admin/reports/revenue?startDate=${startDate}&endDate=${endDate}`
      );
      
      if (!response.ok) {
        throw new Error(response.message || 'Failed to fetch report');
      }
      
      return response;
    } catch (error) {
      console.error('[adminService] getRevenueReport error:', error);
      throw error;
    }
  },

  /**
   * Manage products (get all with edit/delete capabilities)
   * @param {number} page - Page number
   * @param {number} limit - Results per page
   * @returns {Promise}
   */
  async getAllProducts(page = 1, limit = 20) {
    try {
      console.log('[adminService] Fetching products:', { page, limit });
      const response = await apiService.get(`/admin/products?page=${page}&limit=${limit}`);
      
      if (!response.ok) {
        throw new Error(response.message || 'Failed to fetch products');
      }
      
      return response;
    } catch (error) {
      console.error('[adminService] getAllProducts error:', error);
      return {
        ok: true,
        data: { products: [], total: 0, page, limit }
      };
    }
  },

  /**
   * Create a product
   * @param {object} productData - Product data
   * @returns {Promise}
   */
  async createProduct(productData) {
    try {
      console.log('[adminService] Creating product:', productData);
      const response = await apiService.post('/admin/products', productData);
      
      if (!response.ok) {
        throw new Error(response.message || 'Failed to create product');
      }
      
      return response;
    } catch (error) {
      console.error('[adminService] createProduct error:', error);
      throw error;
    }
  },

  /**
   * Update a product
   * @param {string} productId - Product ID
   * @param {object} updates - Product data to update
   * @returns {Promise}
   */
  async updateProduct(productId, updates) {
    try {
      console.log('[adminService] Updating product:', productId, updates);
      const response = await apiService.put(`/admin/products/${productId}`, updates);
      
      if (!response.ok) {
        throw new Error(response.message || 'Failed to update product');
      }
      
      return response;
    } catch (error) {
      console.error('[adminService] updateProduct error:', error);
      throw error;
    }
  },

  /**
   * Delete a product
   * @param {string} productId - Product ID
   * @returns {Promise}
   */
  async deleteProduct(productId) {
    try {
      console.log('[adminService] Deleting product:', productId);
      const response = await apiService.delete(`/admin/products/${productId}`);
      
      if (!response.ok) {
        throw new Error(response.message || 'Failed to delete product');
      }
      
      return response;
    } catch (error) {
      console.error('[adminService] deleteProduct error:', error);
      throw error;
    }
  },

  /**
   * Send bulk email
   * @param {object} emailData - { to, subject, template, variables }
   * @returns {Promise}
   */
  async sendBulkEmail(emailData) {
    try {
      console.log('[adminService] Sending bulk email:', emailData);
      const response = await apiService.post('/admin/email/send-bulk', emailData);
      
      if (!response.ok) {
        throw new Error(response.message || 'Failed to send emails');
      }
      
      return response;
    } catch (error) {
      console.error('[adminService] sendBulkEmail error:', error);
      throw error;
    }
  },

  /**
   * Get system logs
   * @param {number} limit - Number of logs to fetch
   * @returns {Promise}
   */
  async getLogs(limit = 100) {
    try {
      console.log('[adminService] Fetching system logs');
      const response = await apiService.get(`/admin/logs?limit=${limit}`);
      
      if (!response.ok) {
        throw new Error(response.message || 'Failed to fetch logs');
      }
      
      return response;
    } catch (error) {
      console.error('[adminService] getLogs error:', error);
      return { ok: true, data: [] };
    }
  }
};
