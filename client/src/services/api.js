/**
 * Centralized API Service
 * Handles all API communication with the backend
 * Includes error handling, authentication, and request/response interceptors
 */

class APIService {
  constructor() {
    this.baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
    this.timeout = 30000; // 30 seconds
    this.tokenKey = 'authToken';
    this.debug = import.meta.env.VITE_DEBUG === 'true';
  }

  /**
   * Get the current authentication token
   */
  getAuthToken() {
    return localStorage.getItem(this.tokenKey);
  }

  /**
   * Set the authentication token
   */
  setAuthToken(token) {
    if (token) {
      localStorage.setItem(this.tokenKey, token);
    } else {
      localStorage.removeItem(this.tokenKey);
    }
  }

  /**
   * Clear authentication token
   */
  clearAuthToken() {
    localStorage.removeItem(this.tokenKey);
  }

  /**
   * Build request headers with authentication
   */
  getHeaders(customHeaders = {}) {
    const headers = {
      'Content-Type': 'application/json',
      ...customHeaders,
    };

    const token = this.getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  /**
   * Handle API errors with consistent error structure
   */
  handleError(error, endpoint) {
    console.error(`API Error [${endpoint}]:`, error);

    if (error instanceof TypeError) {
      throw new Error('Network error. Please check your connection.');
    }

    if (error.response) {
      const { status, data } = error.response;
      const message = data?.message || data?.error || 'An error occurred';

      if (status === 401) {
        this.clearAuthToken();
        window.dispatchEvent(new Event('unauthorized'));
        throw new Error('Session expired. Please login again.');
      }

      if (status === 403) {
        throw new Error('You do not have permission to perform this action.');
      }

      if (status === 404) {
        throw new Error('Resource not found.');
      }

      if (status >= 500) {
        throw new Error('Server error. Please try again later.');
      }

      throw new Error(message);
    }

    throw error;
  }

  /**
   * Generic fetch wrapper with timeout and error handling
   * Returns: { ok, data, message, pagination }
   */
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const method = options.method || 'GET';
    const headers = this.getHeaders(options.headers);
    
    const config = {
      method,
      headers,
      ...options,
      signal: AbortSignal.timeout(this.timeout),
    };

    if (options.body && typeof options.body === 'object') {
      config.body = JSON.stringify(options.body);
    }

    // Log the request when debug is enabled
    if (this.debug) {
      console.log(`%c[APIService] ${method} ${endpoint}`, 'color: #0066cc; font-weight: bold;');
    }

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const error = new Error('API Error');
        error.response = {
          status: response.status,
          data: await response.json().catch(() => ({})),
        };
        console.error(`%c[APIService] ✗ ${response.status}`, 'color: #cc0000; font-weight: bold;', error);
        throw error;
      }

      const data = await response.json();
      if (this.debug) {
        console.log(`%c[APIService] ✓ ${response.status}`, 'color: #00aa00; font-weight: bold;', data);
      }
      return data;
    } catch (error) {
      if (this.debug) {
        console.error(`%c[APIService] ERROR on ${endpoint}`, 'color: #cc0000; font-weight: bold;', error.message);
      }
      return this.handleError(error, endpoint);
    }
  }

  /**
   * GET request
   */
  async get(endpoint, options = {}) {
    return this.request(endpoint, { method: 'GET', ...options });
  }

  /**
   * POST request
   */
  async post(endpoint, body, options = {}) {
    return this.request(endpoint, { method: 'POST', body, ...options });
  }

  /**
   * PUT request
   */
  async put(endpoint, body, options = {}) {
    return this.request(endpoint, { method: 'PUT', body, ...options });
  }

  /**
   * PATCH request
   */
  async patch(endpoint, body, options = {}) {
    return this.request(endpoint, { method: 'PATCH', body, ...options });
  }

  /**
   * DELETE request
   */
  async delete(endpoint, options = {}) {
    return this.request(endpoint, { method: 'DELETE', ...options });
  }
}

// Export singleton instance
export const apiService = new APIService();

/**
 * API Endpoints - Organized by module
 */
export const API = {
  // Auth endpoints
  auth: {
    register: '/auth/register',
    login: '/auth/login',
    logout: '/auth/logout',
    getCurrentUser: '/auth/me',
    updateProfile: '/auth/profile',
  },

  // Contact endpoints
  contacts: {
    create: '/contacts',
    getAll: '/contacts',
    getById: (id) => `/contacts/${id}`,
    update: (id) => `/contacts/${id}`,
    delete: (id) => `/contacts/${id}`,
  },

  // Blog endpoints
  blog: {
    getAll: () => '/blog?publish=true',
    getById: (id) => `/blog/${id}`,
    getBySlug: (slug) => `/blog/slug/${slug}`,
    create: '/blog',
    update: (id) => `/blog/${id}`,
    delete: (id) => `/blog/${id}`,
  },

  // Case Study endpoints
  caseStudies: {
    getAll: () => '/case-studies?publish=true',
    getById: (id) => `/case-studies/${id}`,
    getBySlug: (slug) => `/case-studies/slug/${slug}`,
    create: '/case-studies',
    update: (id) => `/case-studies/${id}`,
    delete: (id) => `/case-studies/${id}`,
  },

  // Course endpoints
  courses: {
    getAll: () => '/courses',
    getById: (id) => `/courses/${id}`,
    getRelated: (id) => `/courses/${id}/related`,
  },
};

export default apiService;
