/**
 * Order Management Service
 * Handles all order-related API calls
 */

import { apiService } from './api';

export const orderService = {
  /**
   * Create a new order from cart
   * @param {object} orderData - { items, shippingAddress, paymentMethod }
   * @returns {Promise}
   */
  async createOrder(orderData) {
    try {
      console.log('[orderService] Creating order:', orderData);
      const response = await apiService.post('/orders', orderData);
      
      if (!response.ok) {
        throw new Error(response.message || 'Failed to create order');
      }
      
      console.log('[orderService] Order created:', response.data.orderId);
      return response;
    } catch (error) {
      console.error('[orderService] createOrder error:', error);
      throw error;
    }
  },

  /**
   * Get user's orders
   * @param {number} page - Page number
   * @param {number} limit - Items per page
   * @returns {Promise}
   */
  async getUserOrders(page = 1, limit = 10) {
    try {
      console.log('[orderService] Fetching user orders');
      const response = await apiService.get(`/orders?page=${page}&limit=${limit}`);
      
      if (!response.ok) {
        throw new Error(response.message || 'Failed to fetch orders');
      }
      
      return response;
    } catch (error) {
      console.error('[orderService] getUserOrders error:', error);
      throw error;
    }
  },

  /**
   * Get single order details
   * @param {string} orderId - Order ID
   * @returns {Promise}
   */
  async getOrderById(orderId) {
    try {
      console.log('[orderService] Fetching order:', orderId);
      const response = await apiService.get(`/orders/${orderId}`);
      
      if (!response.ok) {
        throw new Error(response.message || 'Failed to fetch order');
      }
      
      return response;
    } catch (error) {
      console.error('[orderService] getOrderById error:', error);
      throw error;
    }
  },

  /**
   * Download order invoice
   * @param {string} orderId - Order ID
   * @returns {Promise}
   */
  async downloadInvoice(orderId) {
    try {
      console.log('[orderService] Downloading invoice for order:', orderId);
      const response = await apiService.get(`/orders/${orderId}/invoice`);
      
      if (!response.ok) {
        throw new Error(response.message || 'Failed to download invoice');
      }
      
      return response;
    } catch (error) {
      console.error('[orderService] downloadInvoice error:', error);
      throw error;
    }
  },

  /**
   * Cancel order
   * @param {string} orderId - Order ID
   * @returns {Promise}
   */
  async cancelOrder(orderId) {
    try {
      console.log('[orderService] Canceling order:', orderId);
      const response = await apiService.put(`/orders/${orderId}`, { status: 'cancelled' });
      
      if (!response.ok) {
        throw new Error(response.message || 'Failed to cancel order');
      }
      
      return response;
    } catch (error) {
      console.error('[orderService] cancelOrder error:', error);
      throw error;
    }
  },

  /**
   * Request refund
   * @param {string} orderId - Order ID
   * @param {string} reason - Refund reason
   * @returns {Promise}
   */
  async requestRefund(orderId, reason) {
    try {
      console.log('[orderService] Requesting refund for order:', orderId);
      const response = await apiService.post(`/orders/${orderId}/refund`, { reason });
      
      if (!response.ok) {
        throw new Error(response.message || 'Failed to request refund');
      }
      
      return response;
    } catch (error) {
      console.error('[orderService] requestRefund error:', error);
      throw error;
    }
  }
};
