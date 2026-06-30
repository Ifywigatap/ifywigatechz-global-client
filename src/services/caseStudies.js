/**
 * Case Studies Service - All case study-related API calls
 */

import { apiService, API } from './api';

export const caseStudiesService = {
  /**
   * Get all published case studies
   */
  async getAllCaseStudies(page = 1, limit = 12, filters = {}) {
    try {
      const queryParams = new URLSearchParams({
        page,
        limit,
        publish: 'true',
        ...filters,
      });

      const response = await apiService.get(
        `/case-studies?${queryParams}`
      );

      if (!response.ok) {
        throw new Error(response.message || 'Failed to fetch case studies');
      }

      return response.data;
    } catch (error) {
      console.error('Get case studies error:', error);
      throw error;
    }
  },

  /**
   * Get a single case study by ID
   */
  async getCaseStudyById(id) {
    try {
      const response = await apiService.get(`/case-studies/${id}`);

      if (!response.ok) {
        throw new Error(response.message || 'Failed to fetch case study');
      }

      return response.data;
    } catch (error) {
      console.error('Get case study error:', error);
      throw error;
    }
  },

  /**
   * Get a case study by slug or ID
   */
  async getCaseStudyBySlug(slug) {
    try {
      const response = await apiService.get(`/case-studies/${slug}`);

      if (!response.ok) {
        throw new Error(response.message || 'Case study not found');
      }

      return response.data;
    } catch (error) {
      console.error('Get case study by slug error:', error);
      throw error;
    }
  },

  /**
   * Create a new case study (admin only)
   */
  async createCaseStudy(caseStudyData) {
    try {
      const response = await apiService.post('/case-studies', caseStudyData);

      if (!response.ok) {
        throw new Error(response.message || 'Failed to create case study');
      }

      return response.data;
    } catch (error) {
      console.error('Create case study error:', error);
      throw error;
    }
  },

  /**
   * Update a case study (admin only)
   */
  async updateCaseStudy(id, caseStudyData) {
    try {
      const response = await apiService.put(`/case-studies/${id}`, caseStudyData);

      if (!response.ok) {
        throw new Error(response.message || 'Failed to update case study');
      }

      return response.data;
    } catch (error) {
      console.error('Update case study error:', error);
      throw error;
    }
  },

  /**
   * Delete a case study (admin only)
   */
  async deleteCaseStudy(id) {
    try {
      const response = await apiService.delete(`/case-studies/${id}`);

      if (!response.ok) {
        throw new Error(response.message || 'Failed to delete case study');
      }

      return response.data;
    } catch (error) {
      console.error('Delete case study error:', error);
      throw error;
    }
  },
};

export default caseStudiesService;
