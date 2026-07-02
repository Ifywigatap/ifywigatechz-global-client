/**
 * User Profile Service
 * Manages user account and profile operations
 */

import { apiService } from './api';

export const userService = {
  /**
   * Get user course access status
   * @returns {Promise<{itCoursePaid, graphicCoursePaid, microsoftCoursePaid}>}
   */
  async getCourseAccess() {
    try {
      console.log('[userService] Fetching course access');
      const response = await apiService.get('/auth/me');
      return {
        ok: true,
        itCoursePaid: response.data.itCoursePaid || false,
        graphicCoursePaid: response.data.graphicCoursePaid || false,
        microsoftCoursePaid: response.data.microsoftCoursePaid || false
      };
    } catch (error) {
      console.error('[userService] getCourseAccess error:', error);
      return { ok: false, itCoursePaid: false, graphicCoursePaid: false, microsoftCoursePaid: false };
    }
  },
  /**
   * Get current user profile
   * @returns {Promise}
   */
  async getProfile() {
    try {
      console.log('[userService] Fetching user profile');
      return await apiService.get('/auth/me');
    } catch (error) {
      console.error('[userService] getProfile error:', error);
      throw error;
    }
  },

  /**
   * Update user profile
   * @param {object} profileData
   * @returns {Promise}
   */
  async updateProfile(profileData) {
    try {
      console.log('[userService] Updating profile:', profileData);
      return await apiService.put('/auth/profile', profileData);
    } catch (error) {
      console.error('[userService] updateProfile error:', error);
      throw error;
    }
  },

  /**
   * Change password
   * @param {string} oldPassword
   * @param {string} newPassword
   * @returns {Promise}
   */
  async changePassword(oldPassword, newPassword) {
    try {
      console.log('[userService] Changing password');
      return await apiService.put('/auth/change-password', {
        currentPassword: oldPassword,
        newPassword
      });
    } catch (error) {
      console.error('[userService] changePassword error:', error);
      throw error;
    }
  },

  /**
   * Update billing address
   * @param {object} address
   * @returns {Promise}
   */
  async updateBillingAddress(address) {
    try {
      console.log('[userService] Updating billing address');
      return await apiService.put('/auth/profile', { billingAddress: address });
    } catch (error) {
      console.error('[userService] updateBillingAddress error:', error);
      throw error;
    }
  },

  /**
   * Get user certificates
   * @returns {Promise}
   */
  async getCertificates() {
    console.warn('[userService] getCertificates is not supported by the current backend API');
    return { ok: false, message: 'Certificates are not available yet.' };
  },

  /**
   * Get user enrollments (course progress)
   * @returns {Promise}
   */
  async getEnrollments() {
    try {
      console.log('[userService] Fetching enrollments');
      return await apiService.get('/courses/user/enrolled');
    } catch (error) {
      console.error('[userService] getEnrollments error:', error);
      return { ok: false, message: 'Failed to load enrollments', data: [] };
    }
  },

  /**
   * Download certificate
   * @param {string} certificateId
   * @returns {Promise}
   */
  async downloadCertificate(certificateId) {
    console.warn('[userService] downloadCertificate is not supported by the current backend API');
    return { ok: false, message: 'Certificate download is not available yet.' };
  },

  /**
   * Update notification preferences
   * @param {object} preferences
   * @returns {Promise}
   */
  async updatePreferences(preferences) {
    try {
      console.log('[userService] Updating preferences');
      return await apiService.put('/auth/profile', { preferences });
    } catch (error) {
      console.error('[userService] updatePreferences error:', error);
      throw error;
    }
  },

  /**
   * Delete user account
   * @param {string} password
   * @returns {Promise}
   */
  async deleteAccount(password) {
    console.warn('[userService] deleteAccount is not supported by the current backend API');
    return { ok: false, message: 'Account deletion is not available yet.' };
  }
};
