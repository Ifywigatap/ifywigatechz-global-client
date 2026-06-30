/**
 * Search Service
 * Handles search, filters, and suggestions for courses and products
 */

import { apiService } from './api';

export const searchService = {
  /**
   * Global search across courses and products
   * @param {string} query - Search query
   * @param {object} filters - { category, priceMin, priceMax, rating, type }
   * @param {number} page - Page number for pagination
   * @param {number} limit - Results per page
   * @returns {Promise}
   */
  async search(query, filters = {}, page = 1, limit = 10) {
    try {
      console.log('[searchService] Searching:', { query, filters, page, limit });
      
      const params = new URLSearchParams({
        q: query,
        page,
        limit,
        ...filters
      });
      
      const response = await apiService.get(`/search?${params}`);
      
      if (!response.ok) {
        throw new Error(response.message || 'Search failed');
      }
      
      return response;
    } catch (error) {
      console.error('[searchService] search error:', error);
      return {
        ok: true,
        data: {
          courses: [],
          products: [],
          total: 0,
          page,
          limit
        }
      };
    }
  },

  /**
   * Search only courses
   * @param {string} query - Search query
   * @param {object} filters - { category, level, duration, price }
   * @returns {Promise}
   */
  async searchCourses(query, filters = {}) {
    try {
      console.log('[searchService] Searching courses:', { query, filters });
      
      const params = new URLSearchParams({
        q: query,
        ...filters
      });
      
      const response = await apiService.get(`/courses/search?${params}`);
      
      if (!response.ok) {
        throw new Error(response.message || 'Course search failed');
      }
      
      return response;
    } catch (error) {
      console.error('[searchService] searchCourses error:', error);
      return { ok: true, data: [] };
    }
  },

  /**
   * Search only products
   * @param {string} query - Search query
   * @param {object} filters - { category, priceMin, priceMax, availability }
   * @returns {Promise}
   */
  async searchProducts(query, filters = {}) {
    try {
      console.log('[searchService] Searching products:', { query, filters });
      
      const params = new URLSearchParams({
        q: query,
        ...filters
      });
      
      const response = await apiService.get(`/products/search?${params}`);
      
      if (!response.ok) {
        throw new Error(response.message || 'Product search failed');
      }
      
      return response;
    } catch (error) {
      console.error('[searchService] searchProducts error:', error);
      return { ok: true, data: [] };
    }
  },

  /**
   * Get search suggestions/autocomplete
   * @param {string} query - Partial search query
   * @param {string} type - 'all', 'courses', or 'products'
   * @returns {Promise}
   */
  async getSuggestions(query, type = 'all') {
    try {
      console.log('[searchService] Getting suggestions:', { query, type });
      
      const response = await apiService.get(
        `/search/suggestions?q=${encodeURIComponent(query)}&type=${type}`
      );
      
      if (!response.ok) {
        throw new Error(response.message || 'Failed to fetch suggestions');
      }
      
      return response;
    } catch (error) {
      console.error('[searchService] getSuggestions error:', error);
      return { ok: true, data: [] };
    }
  },

  /**
   * Get trending searches
   * @returns {Promise}
   */
  async getTrendingSearches() {
    try {
      console.log('[searchService] Fetching trending searches');
      const response = await apiService.get('/search/trending');
      
      if (!response.ok) {
        throw new Error(response.message || 'Failed to fetch trending');
      }
      
      return response;
    } catch (error) {
      console.error('[searchService] getTrendingSearches error:', error);
      return { ok: true, data: [] };
    }
  },

  /**
   * Get available filters for search
   * @returns {Promise}
   */
  async getSearchFilters() {
    try {
      console.log('[searchService] Fetching search filters');
      const response = await apiService.get('/search/filters');
      
      if (!response.ok) {
        throw new Error(response.message || 'Failed to fetch filters');
      }
      
      return response;
    } catch (error) {
      console.error('[searchService] getSearchFilters error:', error);
      return {
        ok: true,
        data: {
          categories: [],
          priceRanges: [],
          levels: [],
          ratings: [],
          types: ['course', 'product']
        }
      };
    }
  },

  /**
   * Get search history (user's recent searches)
   * @returns {Promise}
   */
  async getSearchHistory() {
    try {
      console.log('[searchService] Fetching search history');
      const response = await apiService.get('/search/history');
      
      if (!response.ok) {
        throw new Error(response.message || 'Failed to fetch history');
      }
      
      return response;
    } catch (error) {
      console.error('[searchService] getSearchHistory error:', error);
      return { ok: true, data: [] };
    }
  },

  /**
   * Clear search history
   * @returns {Promise}
   */
  async clearSearchHistory() {
    try {
      console.log('[searchService] Clearing search history');
      const response = await apiService.post('/search/history/clear');
      
      if (!response.ok) {
        throw new Error(response.message || 'Failed to clear history');
      }
      
      return response;
    } catch (error) {
      console.error('[searchService] clearSearchHistory error:', error);
      throw error;
    }
  },

  /**
   * Advanced search with multiple criteria
   * @param {object} searchCriteria - Complex search criteria
   * @returns {Promise}
   */
  async advancedSearch(searchCriteria) {
    try {
      console.log('[searchService] Advanced search:', searchCriteria);
      const response = await apiService.post('/search/advanced', searchCriteria);
      
      if (!response.ok) {
        throw new Error(response.message || 'Advanced search failed');
      }
      
      return response;
    } catch (error) {
      console.error('[searchService] advancedSearch error:', error);
      return {
        ok: true,
        data: {
          results: [],
          total: 0,
          facets: {}
        }
      };
    }
  },

  /**
   * Get related items (similar courses/products)
   * @param {string} itemId - Item ID
   * @param {string} itemType - 'course' or 'product'
   * @returns {Promise}
   */
  async getRelated(itemId, itemType = 'product') {
    try {
      console.log('[searchService] Getting related items:', { itemId, itemType });
      const response = await apiService.get(`/search/related/${itemId}?type=${itemType}`);
      
      if (!response.ok) {
        throw new Error(response.message || 'Failed to fetch related items');
      }
      
      return response;
    } catch (error) {
      console.error('[searchService] getRelated error:', error);
      return { ok: true, data: [] };
    }
  }
};
