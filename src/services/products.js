import { apiService } from './api';

/**
 * Product Management Service
 * Handles all product-related API calls for e-commerce
 */

export const productService = {
  /**
   * Get all products with pagination
   * @param {number} page - Page number (default: 1)
   * @param {number} limit - Items per page (default: 50)
   * @param {object} filters - Filter options (category, price range, etc.)
   * @returns {Promise} - {data: [], pagination: {}}
   */
  async getAllProducts(page = 1, limit = 50, filters = {}) {
    try {
      const query = new URLSearchParams({
        page,
        limit,
        ...filters,
      });
      const response = await apiService.get(`/products?${query}`);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch products');
    }
  },

  /**
   * Get a single product by ID
   * @param {string} id - Product ID
   * @returns {Promise} - Product details
   */
  async getProductById(id) {
    try {
      const response = await apiService.get(`/products/${id}`);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch product');
    }
  },

  /**
   * Get products by category
   * @param {string} category - Product category
   * @param {object} options - Pagination and filter options
   * @returns {Promise} - {data: [], pagination: {}}
   */
  async getProductsByCategory(category, options = {}) {
    try {
      const response = await apiService.get(`/products/category/${category}`, options);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch products by category');
    }
  },

  /**
   * Search products
   * @param {string} query - Search query
   * @param {object} options - Pagination and filter options
   * @returns {Promise} - {data: [], pagination: {}}
   */
  async searchProducts(query, options = {}) {
    try {
      const response = await apiService.get(`/products/search?q=${encodeURIComponent(query)}`, options);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to search products');
    }
  },

  /**
   * Create a new product (admin only)
   * @param {object} productData - Product information
   * @returns {Promise} - Created product
   */
  async createProduct(productData) {
    try {
      const response = await apiService.post('/products', productData);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to create product');
    }
  },

  /**
   * Update a product (admin only)
   * @param {string} id - Product ID
   * @param {object} updates - Product data to update
   * @returns {Promise} - Updated product
   */
  async updateProduct(id, updates) {
    try {
      const response = await apiService.put(`/products/${id}`, updates);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to update product');
    }
  },

  /**
   * Delete a product (admin only)
   * @param {string} id - Product ID
   * @returns {Promise} - Success response
   */
  async deleteProduct(id) {
    try {
      const response = await apiService.delete(`/products/${id}`);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to delete product');
    }
  },

  /**
   * Get featured products
   * @param {number} limit - Number of featured products (default: 6)
   * @returns {Promise} - {data: []}
   */
  async getFeaturedProducts(limit = 6) {
    try {
      const response = await apiService.get(`/products/featured?limit=${limit}`);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch featured products');
    }
  },

  /**
   * Get products on sale
   * @param {object} options - Pagination options
   * @returns {Promise} - {data: [], pagination: {}}
   */
  async getSaleProducts(options = {}) {
    try {
      const response = await apiService.get('/products/sale', options);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch sale products');
    }
  },

  /**
   * Get related products
   * @param {string} productId - Product ID
   * @param {number} limit - Number of related products (default: 4)
   * @returns {Promise} - {data: []}
   */
  async getRelatedProducts(productId, limit = 4) {
    try {
      const response = await apiService.get(`/products/${productId}/related?limit=${limit}`);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch related products');
    }
  },

  /**
   * Get product reviews
   * @param {string} productId - Product ID
   * @param {object} options - Pagination options
   * @returns {Promise} - {data: [], pagination: {}}
   */
  async getProductReviews(productId, options = {}) {
    try {
      const response = await apiService.get(`/products/${productId}/reviews`, options);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch product reviews');
    }
  },

  /**
   * Add a product review
   * @param {string} productId - Product ID
   * @param {object} reviewData - Review information (rating, comment)
   * @returns {Promise} - Created review
   */
  async addProductReview(productId, reviewData) {
    try {
      const response = await apiService.post(`/products/${productId}/reviews`, reviewData);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to add product review');
    }
  },
};
