/**
 * Contact service - All contact form related API calls
 */

import { apiService, API } from './api';

export const contactService = {
  /**
   * Submit a contact form
   * @returns {Promise} - { ok: true, data: {...} }
   */
  async submitContact(formData) {
    try {
      console.log('[contactService] Submitting contact form');
      const response = await apiService.post(API.contacts.create, {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || '',
        subject: formData.subject || 'Contact Request',
        message: formData.message,
        category: formData.category || 'general',
      });

      if (!response.ok) {
        throw new Error(response.message || 'Failed to submit contact form');
      }

      console.log('[contactService] Contact submitted successfully');
      return response;
    } catch (error) {
      console.error('[contactService] submitContact error:', error);
      throw error;
    }
  },

  /**
   * Get all contacts (admin only)
   * @returns {Promise} - { ok: true, data: [], pagination: {} }
   */
  async getAllContacts(page = 1, limit = 20, filters = {}) {
    try {
      const queryParams = new URLSearchParams({
        page,
        limit,
        ...filters,
      });

      console.log('[contactService] Fetching contacts');
      const response = await apiService.get(
        `${API.contacts.getAll}?${queryParams}`
      );

      if (!response.ok) {
        throw new Error(response.message || 'Failed to fetch contacts');
      }

      console.log('[contactService] Got contacts:', response.data?.length || 0);
      return response;
    } catch (error) {
      console.error('[contactService] getAllContacts error:', error);
      throw error;
    }
  },

  /**
   * Get a single contact by ID (admin only)
   */
  async getContactById(id) {
    try {
      const response = await apiService.get(API.contacts.getById(id));

      if (!response.ok) {
        throw new Error(response.message || 'Failed to fetch contact');
      }

      return response.data;
    } catch (error) {
      console.error('Get contact error:', error);
      throw error;
    }
  },

  /**
   * Update contact status (admin only)
   */
  async updateContactStatus(id, statusUpdate) {
    try {
      const response = await apiService.put(API.contacts.update(id), statusUpdate);

      if (!response.ok) {
        throw new Error(response.message || 'Failed to update contact');
      }

      return response.data;
    } catch (error) {
      console.error('Update contact error:', error);
      throw error;
    }
  },

  /**
   * Delete a contact (admin only)
   */
  async deleteContact(id) {
    try {
      const response = await apiService.delete(API.contacts.delete(id));

      if (!response.ok) {
        throw new Error(response.message || 'Failed to delete contact');
      }

      return response.data;
    } catch (error) {
      console.error('Delete contact error:', error);
      throw error;
    }
  },
};

export default contactService;
