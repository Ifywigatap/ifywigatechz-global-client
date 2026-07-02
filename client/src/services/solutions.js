import { apiService } from './api';

/**
 * Solutions Service
 * Handles solutions-related API calls
 */

export const solutionsService = {
  /**
   * Get all solutions
   * @param {object} filters - Filter options
   * @returns {Promise} - {data: []}
   */
  async getAllSolutions(filters = {}) {
    try {
      const query = new URLSearchParams(filters);
      const response = await apiService.get(`/solutions?${query}`);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch solutions');
    }
  },

  /**
   * Get a single solution by ID
   * @param {string} id - Solution ID
   * @returns {Promise} - Solution details
   */
  async getSolutionById(id) {
    try {
      const response = await apiService.get(`/solutions/${id}`);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch solution');
    }
  },

  /**
   * Get solutions by slug (URL-friendly identifier)
   * @param {string} slug - Solution slug
   * @returns {Promise} - Solution details
   */
  async getSolutionBySlug(slug) {
    try {
      const response = await apiService.get(`/solutions/slug/${slug}`);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch solution');
    }
  },

  /**
   * Get solutions by category/industry
   * @param {string} category - Category name
   * @param {object} options - Pagination options
   * @returns {Promise} - {data: [], pagination: {}}
   */
  async getSolutionsByCategory(category, options = {}) {
    try {
      const response = await apiService.get(`/solutions/category/${category}`, options);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch solutions by category');
    }
  },

  /**
   * Create a new solution (admin only)
   * @param {object} solutionData - Solution information
   * @returns {Promise} - Created solution
   */
  async createSolution(solutionData) {
    try {
      const response = await apiService.post('/solutions', solutionData);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to create solution');
    }
  },

  /**
   * Update a solution (admin only)
   * @param {string} id - Solution ID
   * @param {object} updates - Solution data to update
   * @returns {Promise} - Updated solution
   */
  async updateSolution(id, updates) {
    try {
      const response = await apiService.put(`/solutions/${id}`, updates);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to update solution');
    }
  },

  /**
   * Delete a solution (admin only)
   * @param {string} id - Solution ID
   * @returns {Promise} - Success response
   */
  async deleteSolution(id) {
    try {
      const response = await apiService.delete(`/solutions/${id}`);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to delete solution');
    }
  },

  /**
   * Get featured solutions
   * @param {number} limit - Number of featured solutions
   * @returns {Promise} - {data: []}
   */
  async getFeaturedSolutions(limit = 6) {
    try {
      const response = await apiService.get(`/solutions/featured?limit=${limit}`);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch featured solutions');
    }
  },

  /**
   * Search solutions
   * @param {string} query - Search query
   * @param {object} options - Pagination options
   * @returns {Promise} - {data: [], pagination: {}}
   */
  async searchSolutions(query, options = {}) {
    try {
      const response = await apiService.get(`/solutions/search?q=${encodeURIComponent(query)}`, options);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to search solutions');
    }
  },
};
