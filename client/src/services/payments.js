/**
 * Payment Service
 * Handles all payment-related API calls to the backend.
 */
import { apiService } from './api';

export const paymentService = {
  /**
   * Initialize a payment transaction with the backend.
   * @param {object} paymentData - Contains amount, email, and metadata.
   * @returns {Promise<any>} The response from the server, including the Paystack authorization URL.
   */
  async initializePayment(paymentData) {
    try {
      console.log('[paymentService] Initializing payment with data:', paymentData);
      const response = await apiService.post('/payments/initialize', paymentData);
      if (!response.ok) {
        throw new Error(response.message || 'Failed to initialize payment.');
      }
      return response;
    } catch (error) {
      console.error('[paymentService] initializePayment error:', error);
      throw error;
    }
  },

  /**
   * Verify a payment transaction with the backend after Paystack redirect.
   * @param {string} reference - The payment reference from Paystack.
   * @returns {Promise<any>} The verification result from the server.
   */
  async verifyPayment(reference) {
    try {
      console.log('[paymentService] Verifying payment with reference:', reference);
      return await apiService.post('/payments/verify', { reference });
    } catch (error) {
      console.error('[paymentService] verifyPayment error:', error);
      throw error;
    }
  },
};