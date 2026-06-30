import axios from 'axios';

// Global Axios defaults
axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Axios Response Interceptor for automatic token refresh
axios.interceptors.response.use(
  (response) => response, // Let successful responses pass through
  async (error) => {
    const originalRequest = error.config;

    // If error is 401, request hasn't been retried yet, and it's NOT the refresh endpoint itself
    if (error.response?.status === 401 && !originalRequest._retry && !originalRequest.url.includes('/refresh')) {

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => axios(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true; // Mark as retried to prevent infinite loops
      isRefreshing = true;

      try {
        // Attempt to refresh the token (httpOnly refresh cookie is sent automatically)
        await axios.post('/api/auth/refresh');
        
        processQueue(null);
        isRefreshing = false;

        // If successful, retry the original failed request seamlessly
        return axios(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        isRefreshing = false;
        // If refresh fails (e.g. refresh token is also expired), force redirect to login
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axios;