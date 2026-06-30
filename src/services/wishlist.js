/**
 * Wishlist Service
 * Manages user wishlist operations (save, remove, view)
 */

import { apiService } from './api';

export const wishlistService = {
  /**
   * Get user's wishlist
   * @returns {Promise}
   */
  async getWishlist() {
    try {
      console.log('[wishlistService] Fetching wishlist');
      const response = await apiService.get('/wishlist');
      
      if (!response.ok) {
        throw new Error(response.message || 'Failed to fetch wishlist');
      }
      
      return response;
    } catch (error) {
      console.error('[wishlistService] getWishlist error:', error);
      // Return empty wishlist on error
      return { ok: true, data: { items: [], total: 0 } };
    }
  },

  /**
   * Add item to wishlist
   * @param {string} itemId - Product or course ID
   * @param {string} itemType - 'product' or 'course'
   * @returns {Promise}
   */
  async addToWishlist(itemId, itemType = 'product') {
    try {
      console.log('[wishlistService] Adding to wishlist:', { itemId, itemType });
      const response = await apiService.post('/wishlist', {
        itemId,
        itemType
      });
      
      if (!response.ok) {
        throw new Error(response.message || 'Failed to add to wishlist');
      }
      
      console.log('[wishlistService] Item added successfully');
      return response;
    } catch (error) {
      console.error('[wishlistService] addToWishlist error:', error);
      throw error;
    }
  },

  /**
   * Remove item from wishlist
   * @param {string} itemId - Product or course ID
   * @returns {Promise}
   */
  async removeFromWishlist(itemId) {
    try {
      console.log('[wishlistService] Removing from wishlist:', itemId);
      const response = await apiService.delete(`/wishlist/${itemId}`);
      
      if (!response.ok) {
        throw new Error(response.message || 'Failed to remove from wishlist');
      }
      
      return response;
    } catch (error) {
      console.error('[wishlistService] removeFromWishlist error:', error);
      throw error;
    }
  },

  /**
   * Check if item is in wishlist
   * @param {string} itemId - Product or course ID
   * @returns {Promise<boolean>}
   */
  async isInWishlist(itemId) {
    try {
      console.log('[wishlistService] Checking if in wishlist:', itemId);
      const response = await apiService.get(`/wishlist/check/${itemId}`);
      
      if (!response.ok) {
        return false;
      }
      
      return response.data?.isInWishlist || false;
    } catch (error) {
      console.error('[wishlistService] isInWishlist error:', error);
      return false;
    }
  },

  /**
   * Bulk add items to wishlist
   * @param {array} items - Array of { itemId, itemType }
   * @returns {Promise}
   */
  async bulkAddToWishlist(items) {
    try {
      console.log('[wishlistService] Bulk adding to wishlist:', items);
      const response = await apiService.post('/wishlist/bulk-add', { items });
      
      if (!response.ok) {
        throw new Error(response.message || 'Failed to add items to wishlist');
      }
      
      return response;
    } catch (error) {
      console.error('[wishlistService] bulkAddToWishlist error:', error);
      throw error;
    }
  },

  /**
   * Clear entire wishlist
   * @returns {Promise}
   */
  async clearWishlist() {
    try {
      console.log('[wishlistService] Clearing wishlist');
      const response = await apiService.post('/wishlist/clear');
      
      if (!response.ok) {
        throw new Error(response.message || 'Failed to clear wishlist');
      }
      
      return response;
    } catch (error) {
      console.error('[wishlistService] clearWishlist error:', error);
      throw error;
    }
  },

  /**
   * Share wishlist
   * @param {array} emails - Emails to share with
   * @returns {Promise}
   */
  async shareWishlist(emails) {
    try {
      console.log('[wishlistService] Sharing wishlist:', emails);
      const response = await apiService.post('/wishlist/share', { emails });
      
      if (!response.ok) {
        throw new Error(response.message || 'Failed to share wishlist');
      }
      
      return response;
    } catch (error) {
      console.error('[wishlistService] shareWishlist error:', error);
      throw error;
    }
  },

  /**
   * Get wishlist statistics
   * @returns {Promise}
   */
  async getWishlistStats() {
    try {
      console.log('[wishlistService] Fetching wishlist stats');
      const response = await apiService.get('/wishlist/stats');
      
      if (!response.ok) {
        throw new Error(response.message || 'Failed to fetch stats');
      }
      
      return response;
    } catch (error) {
      console.error('[wishlistService] getWishlistStats error:', error);
      return {
        ok: true,
        data: {
          totalItems: 0,
          products: 0,
          courses: 0,
          totalValue: 0
        }
      };
    }
  }
};
