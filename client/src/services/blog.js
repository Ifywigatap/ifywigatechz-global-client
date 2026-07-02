/**
 * Blog Service - All blog-related API calls
 */

import { apiService, API } from './api';

export const blogService = {
  /**
   * Get all published blog posts
   * @returns {Promise} - Complete API response: { ok: true, data: [], pagination: {} }
   */
  async getAllPosts(page = 1, limit = 12, filters = {}) {
    try {
      const queryParams = new URLSearchParams({
        page,
        limit,
        publish: 'true',
        ...filters,
      });

      console.log('[blogService] Fetching posts with:', { page, limit, ...filters });
      const response = await apiService.get(
        `/blog?${queryParams}`
      );

      if (!response.ok) {
        throw new Error(response.message || 'Failed to fetch blog posts');
      }

      console.log('[blogService] Got', response.data?.length || 0, 'posts');
      return response;
    } catch (error) {
      console.error('[blogService] getAllPosts error:', error);
      throw error;
    }
  },

  /**
   * Get a single blog post by ID
   * @returns {Promise} - { ok: true, data: {...} }
   */
  async getPostById(id) {
    try {
      console.log('[blogService] Fetching post by ID:', id);
      const response = await apiService.get(`/blog/${id}`);

      if (!response.ok) {
        throw new Error(response.message || 'Failed to fetch post');
      }

      return response;
    } catch (error) {
      console.error('[blogService] getPostById error:', error);
      throw error;
    }
  },

  /**
   * Get a blog post by slug
   * @returns {Promise} - { ok: true, data: {...} }
   */
  async getPostBySlug(slug) {
    try {
      console.log('[blogService] Fetching post by slug:', slug);
      const response = await apiService.get(`/blog/slug/${slug}`);

      if (!response.ok) {
        throw new Error(response.message || 'Post not found');
      }

      return response;
    } catch (error) {
      console.error('[blogService] getPostBySlug error:', error);
      throw error;
    }
  },

  /**
   * Create a new blog post (admin only)
   */
  async createPost(postData) {
    try {
      const response = await apiService.post('/blog', postData);

      if (!response.ok) {
        throw new Error(response.message || 'Failed to create post');
      }

      return response.data;
    } catch (error) {
      console.error('Create post error:', error);
      throw error;
    }
  },

  /**
   * Update a blog post (admin only)
   */
  async updatePost(id, postData) {
    try {
      const response = await apiService.put(`/blog/${id}`, postData);

      if (!response.ok) {
        throw new Error(response.message || 'Failed to update post');
      }

      return response.data;
    } catch (error) {
      console.error('Update post error:', error);
      throw error;
    }
  },

  /**
   * Delete a blog post (admin only)
   */
  async deletePost(id) {
    try {
      const response = await apiService.delete(`/blog/${id}`);

      if (!response.ok) {
        throw new Error(response.message || 'Failed to delete post');
      }

      return response.data;
    } catch (error) {
      console.error('Delete post error:', error);
      throw error;
    }
  },
};

export default blogService;
