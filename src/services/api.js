import axios from 'axios';

// API base configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance with default configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Response Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

/**
 * Articles API service
 */
export const articlesAPI = {
  /**
   * Get all articles with pagination and search
   * @param {Object} params - Query parameters
   * @returns {Promise} API response
   */
  getArticles: (params = {}) => {
    return api.get('/articles', { params });
  },

  /**
   * Get recent articles
   * @param {Object} params - Query parameters
   * @returns {Promise} API response
   */
  getRecentArticles: (params = {}) => {
    return api.get('/articles/recent', { params });
  },

  /**
   * Get top articles by score
   * @param {Object} params - Query parameters
   * @returns {Promise} API response
   */
  getTopArticles: (params = {}) => {
    return api.get('/articles/top', { params });
  },

  /**
   * Get article statistics
   * @returns {Promise} API response
   */
  getStats: () => {
    return api.get('/articles/stats');
  },

  /**
   * Get a specific article by ID
   * @param {string} id - Article ID
   * @returns {Promise} API response
   */
  getArticle: (id) => {
    return api.get(`/articles/${id}`);
  },

  /**
   * Trigger manual scraping
   * @returns {Promise} API response
   */
  triggerScraping: () => {
    return api.post('/articles/scrape');
  },

  /**
   * Delete an article (soft delete)
   * @param {string} id - Article ID
   * @returns {Promise} API response
   */
  deleteArticle: (id) => {
    return api.delete(`/articles/${id}`);
  },
};

/**
 * Health check API
 */
export const healthAPI = {
  /**
   * Check server health
   * @returns {Promise} API response
   */
  checkHealth: () => {
    return api.get('/health');
  },
};

export default api;
