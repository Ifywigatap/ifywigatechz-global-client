import { apiService } from './api';

/**
 * Course Management Service
 * Handles all course-related API calls
 */

export const courseService = {
  /**
   * Get all courses with pagination
   * @param {number} page - Page number (default: 1)
   * @param {number} limit - Items per page (default: 50)
   * @param {object} filters - Filter options (category, level, etc.)
   * @returns {Promise} - { ok: true, data: [], pagination: {} }
   */
  async getAllCourses(page = 1, limit = 50, filters = {}) {
    try {
      const query = new URLSearchParams({
        page,
        limit,
        ...filters,
      });
      console.log('[courseService] Fetching courses:', { page, limit, filters });
      const response = await apiService.get(`/courses?${query}`);
      
      if (!response.ok) {
        throw new Error(response.message || 'Failed to fetch courses');
      }
      
      console.log('[courseService] Got', response.data?.length || 0, 'courses');
      return response;
    } catch (error) {
      console.error('[courseService] getAllCourses error:', error);
      throw new Error(error.message || 'Failed to fetch courses');
    }
  },

  /**
   * Get a single course by ID
   * @param {string} id - Course ID
   * @returns {Promise} - { ok: true, data: {...} }
   */
  async getCourseById(id) {
    try {
      console.log('[courseService] Fetching course by ID:', id);
      const response = await apiService.get(`/courses/${id}`);
      
      if (!response.ok) {
        throw new Error(response.message || 'Failed to fetch course');
      }
      
      console.log('[courseService] Got course:', response.data?.title || 'Unknown');
      return response;
    } catch (error) {
      console.error('[courseService] getCourseById error:', error);
      throw new Error(error.message || 'Failed to fetch course');
    }
  },

  /**
   * Get courses by category
   * @param {string} category - Course category (e.g., 'web-development', 'design')
   * @param {object} options - Pagination and filter options
   * @returns {Promise} - {data: [], pagination: {}}
   */
  async getCoursesByCategory(category, options = {}) {
    try {
      const response = await apiService.get(`/courses/category/${category}`, options);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch courses by category');
    }
  },

  /**
   * Create a new course (admin only)
   * @param {object} courseData - Course information
   * @returns {Promise} - Created course
   */
  async createCourse(courseData) {
    try {
      const response = await apiService.post('/courses', courseData);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to create course');
    }
  },

  /**
   * Update a course (admin only)
   * @param {string} id - Course ID
   * @param {object} updates - Course data to update
   * @returns {Promise} - Updated course
   */
  async updateCourse(id, updates) {
    try {
      const response = await apiService.put(`/courses/${id}`, updates);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to update course');
    }
  },

  /**
   * Delete a course (admin only)
   * @param {string} id - Course ID
   * @returns {Promise} - Success response
   */
  async deleteCourse(id) {
    try {
      const response = await apiService.delete(`/courses/${id}`);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to delete course');
    }
  },

  /**
   * Enroll in a course
   * @param {string} courseId - Course ID
   * @returns {Promise} - Enrollment confirmation
   */
  async enrollInCourse(courseId) {
    try {
      const response = await apiService.post(`/courses/${courseId}/enroll`, {});
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to enroll in course');
    }
  },

  /**
   * Get courses user is enrolled in
   * @returns {Promise} - {data: [], pagination: {}}
   */
  async getEnrolledCourses() {
    try {
      const response = await apiService.get('/courses/user/enrolled');
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch enrolled courses');
    }
  },

  /**
   * Get course progress
   * @param {string} courseId - Course ID
   * @returns {Promise} - Progress data
   */
  async getProgressByCourse(courseId) {
    try {
      const response = await apiService.get(`/courses/${courseId}/progress`);
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch course progress');
    }
  },
};
