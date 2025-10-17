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
 * Cryptocurrency API service
 */
export const cryptoAPI = {
  /**
   * Get all cryptocurrencies with pagination and search
   * @param {Object} params - Query parameters
   * @returns {Promise} API response
   */
  getCrypto: (params = {}) => {
    return api.get('/crypto', { params });
  },

  /**
   * Get top cryptocurrencies by market cap
   * @param {Object} params - Query parameters
   * @returns {Promise} API response
   */
  getTopCrypto: (params = {}) => {
    return api.get('/crypto/top', { params });
  },

  /**
   * Get latest cryptocurrency data
   * @param {Object} params - Query parameters
   * @returns {Promise} API response
   */
  getLatestCrypto: (params = {}) => {
    return api.get('/crypto/latest', { params });
  },

  /**
   * Get cryptocurrency by symbol
   * @param {string} symbol - Cryptocurrency symbol
   * @returns {Promise} API response
   */
  getCryptoBySymbol: (symbol) => {
    return api.get(`/crypto/symbol/${symbol}`);
  },

  /**
   * Get cryptocurrency statistics
   * @returns {Promise} API response
   */
  getStats: () => {
    return api.get('/crypto/stats');
  },

  /**
   * Get a specific cryptocurrency by ID
   * @param {string} id - Cryptocurrency ID
   * @returns {Promise} API response
   */
  getCryptoById: (id) => {
    return api.get(`/crypto/${id}`);
  },

  /**
   * Trigger manual crypto scraping
   * @returns {Promise} API response
   */
  triggerScraping: () => {
    return api.post('/crypto/scrape');
  },

  /**
   * Delete a cryptocurrency (soft delete)
   * @param {string} id - Cryptocurrency ID
   * @returns {Promise} API response
   */
  deleteCrypto: (id) => {
    return api.delete(`/crypto/${id}`);
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
