/**
 * Cart Service
 * Manages shopping cart operations
 */

import { apiService } from './api';

export const cartService = {
  /**
   * Get user's cart
   * @returns {Promise}
   */
  async getCart() {
    try {
      console.log('[cartService] Fetching cart');
      const response = await apiService.get('/cart');
      
      if (!response.ok) {
        return { ok: true, data: { items: [] } }; // Empty cart by default
      }
      
      return response;
    } catch (error) {
      console.error('[cartService] getCart error:', error);
      return { ok: true, data: { items: [] } }; // Return empty cart on error
    }
  },

  /**
   * Add item to cart
   * @param {object} item - { courseId/productId, type, quantity }
   * @returns {Promise}
   */
  async addToCart(item) {
    try {
      console.log('[cartService] Adding to cart:', item);
      const response = await apiService.post('/cart', item);
      
      if (!response.ok) {
        throw new Error(response.message || 'Failed to add to cart');
      }
      
      return response;
    } catch (error) {
      console.error('[cartService] addToCart error:', error);
      throw error;
    }
  },

  /**
   * Update cart item quantity
   * @param {string} itemId - Cart item ID
   * @param {number} quantity - New quantity
   * @returns {Promise}
   */
  async updateCartItem(itemId, quantity) {
    try {
      console.log('[cartService] Updating cart item:', { itemId, quantity });
      const response = await apiService.put(`/cart/${itemId}`, { quantity });
      
      if (!response.ok) {
        throw new Error(response.message || 'Failed to update cart');
      }
      
      return response;
    } catch (error) {
      console.error('[cartService] updateCartItem error:', error);
      throw error;
    }
  },

  /**
   * Remove item from cart
   * @param {string} itemId - Cart item ID
   * @returns {Promise}
   */
  async removeFromCart(itemId) {
    try {
      console.log('[cartService] Removing from cart:', itemId);
      const response = await apiService.delete(`/cart/${itemId}`);
      
      if (!response.ok) {
        throw new Error(response.message || 'Failed to remove from cart');
      }
      
      return response;
    } catch (error) {
      console.error('[cartService] removeFromCart error:', error);
      throw error;
    }
  },

  /**
   * Clear entire cart
   * @returns {Promise}
   */
  async clearCart() {
    try {
      console.log('[cartService] Clearing cart');
      const response = await apiService.delete('/cart');
      
      if (!response.ok) {
        throw new Error(response.message || 'Failed to clear cart');
      }
      
      return response;
    } catch (error) {
      console.error('[cartService] clearCart error:', error);
      throw error;
    }
  },

  /**
   * Get cart totals
   * @returns {Promise}
   */
  async getCartTotals() {
    try {
      const response = await apiService.get('/cart/totals');
      
      if (!response.ok) {
        return { ok: true, data: { subtotal: 0, tax: 0, total: 0, itemCount: 0 } };
      }
      
      return response;
    } catch (error) {
      console.error('[cartService] getCartTotals error:', error);
      return { ok: true, data: { subtotal: 0, tax: 0, total: 0, itemCount: 0 } };
    }
  }
};
