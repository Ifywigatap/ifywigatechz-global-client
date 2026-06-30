/**
 * Authentication utilities for handling JWT tokens and user session
 */

import { apiService, API } from './api';
import { auth, googleProvider } from '../data/firebase.js';
import { signInWithPopup } from 'firebase/auth';

class AuthService {
  constructor() {
    this.tokenKey = 'authToken';
    this.userKey = 'currentUser';
    this.listeners = [];
  }

  /**
   * Register a new user
   */
  async register(name, email, password) {
    try {
      const response = await apiService.post(API.auth.register, {
        name,
        email,
        password,
      });

      if (response.ok && response.data?.token) {
        this.setCurrentUser(response.data.user);
        this.notifyListeners('login', response.data.user);
        return response.data;
      }

      throw new Error(response.message || 'Registration failed');
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  /**
   * Login user
   */
  async login(email, password) {
    try {
      const response = await apiService.post(API.auth.login, {
        email,
        password,
      });

      if (response.ok && response.data?.token) {
        this.setAuthToken(response.data.token);
        this.setCurrentUser(response.data.user);
        this.notifyListeners('login', response.data.user);
        return response.data;
      }

      throw new Error(response.message || 'Login failed');
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  /**
   * Login or Register user via Google Firebase
   */
  async loginWithGoogle() {
    try {
      // 1. Authenticate with Firebase
      const result = await signInWithPopup(auth, googleProvider);
      const firebaseUser = result.user;

      // 2. Send Firebase user data to our Express backend
      const response = await apiService.post('/api/auth/google', {
        email: firebaseUser.email,
        name: firebaseUser.displayName,
        avatar: firebaseUser.photoURL,
        uid: firebaseUser.uid
      });

      if (response.ok && response.data?.user) {
        this.setCurrentUser(response.data.user);
        this.notifyListeners('login', response.data.user);
        return response.data;
      }
      throw new Error(response.message || 'Google Login failed on server');
    } catch (error) {
      console.error('Google Auth Error:', error);
      throw error;
    }
  }

  /**
   * Logout user
   */
  async logout() {
    try {
      // Attempt to notify server of logout
      await apiService.post(API.auth.logout, {}).catch(() => {});
    } catch (error) {
      console.error('Logout API error:', error);
    } finally {
      // Always clear local data
      this.clearAuth();
      this.notifyListeners('logout');
    }
  }

  /**
   * Get current user profile
   */
  async getCurrentUser() {
    try {
      const response = await apiService.get(API.auth.getCurrentUser);
      if (response.ok && response.data) {
        this.setCurrentUser(response.data);
        return response.data;
      }
    } catch (error) {
      console.error('Get current user error:', error);
      this.clearAuth();
      throw error;
    }
  }

  /**
   * Update user profile
   */
  async updateProfile(profileData) {
    try {
      const response = await apiService.put(API.auth.updateProfile, profileData);
      if (response.ok && response.data) {
        this.setCurrentUser(response.data);
        this.notifyListeners('profileUpdated', response.data);
        return response.data;
      }
      throw new Error(response.message || 'Profile update failed');
    } catch (error) {
      console.error('Profile update error:', error);
      throw error;
    }
  }

  /**
   * Set current user
   */
  setCurrentUser(user) {
    if (user) {
      localStorage.setItem(this.userKey, JSON.stringify(user));
      // Also sync with server
      apiService.put('/auth/profile', user).catch(console.error);
    }
  }

  /**
   * Get current user
   */
  getCurrentUserData() {
    const data = localStorage.getItem(this.userKey);
    return data ? JSON.parse(data) : null;
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated() {
    // Since we can't read the HttpOnly token, we check if user data exists
    return !!this.getCurrentUserData();
  }

  /**
   * Clear all authentication data
   */
  clearAuth() {
    localStorage.removeItem(this.userKey);
  }

  /**
   * Subscribe to auth state changes
   */
  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  /**
   * Notify all listeners of auth state change
   */
  notifyListeners(event, data) {
    this.listeners.forEach((listener) => {
      try {
        listener({ event, data });
      } catch (error) {
        console.error('Auth listener error:', error);
      }
    });
  }
}

// Export singleton instance
export const authService = new AuthService();

// Listen for unauthorized events from API
window.addEventListener('unauthorized', () => {
  authService.clearAuth();
});

export default authService;
