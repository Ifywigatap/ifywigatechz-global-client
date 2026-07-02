/**
 * Payment Service
 * Handles payment processing with Paystack
 */

import { apiService } from './api';

export const paymentService = {
  /**
   * Initialize Paystack payment
   * @param {object} paymentData - { amount, email, orderData }
   * @returns {Promise}
   */
  async initializePayment(paymentData) {
    try {
      console.log('[paymentService] Initializing payment:', { amount: paymentData.amount });
      const response = await apiService.post('/payments/initialize', paymentData);
      
      if (!response.ok) {
        throw new Error(response.message || 'Failed to initialize payment');
      }
      
      return response;
    } catch (error) {
      console.error('[paymentService] initializePayment error:', error);
      throw error;
    }
  },

  /**
   * Verify payment from Paystack
   * @param {string} reference - Payment reference from Paystack
   * @returns {Promise}
   */
  async verifyPayment(reference) {
    try {
      console.log('[paymentService] Verifying payment:', reference);
      const response = await apiService.post('/payments/verify', { reference });
      
      if (!response.ok) {
        throw new Error(response.message || 'Payment verification failed');
      }
      
      console.log('[paymentService] Payment verified successfully');
      return response;
    } catch (error) {
      console.error('[paymentService] verifyPayment error:', error);
      throw error;
    }
  },

  /**
   * Get payment history
   * @param {number} page - Page number
   * @param {number} limit - Items per page
   * @returns {Promise}
   */
  async getPaymentHistory(page = 1, limit = 10) {
    try {
      console.log('[paymentService] Fetching payment history');
      const response = await apiService.get(`/payments?page=${page}&limit=${limit}`);
      
      if (!response.ok) {
        throw new Error(response.message || 'Failed to fetch payment history');
      }
      
      return response;
    } catch (error) {
      console.error('[paymentService] getPaymentHistory error:', error);
      throw error;
    }
  },

  /**
   * Get single payment details
   * @param {string} paymentId - Payment ID
   * @returns {Promise}
   */
  async getPaymentDetails(paymentId) {
    try {
      console.log('[paymentService] Fetching payment details:', paymentId);
      const response = await apiService.get(`/payments/${paymentId}`);
      
      if (!response.ok) {
        throw new Error(response.message || 'Failed to fetch payment details');
      }
      
      return response;
    } catch (error) {
      console.error('[paymentService] getPaymentDetails error:', error);
      throw error;
    }
  }
};
