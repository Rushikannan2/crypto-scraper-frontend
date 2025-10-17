import axios from 'axios';

// API base configuration - Use a working demo backend
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://crypto-scraper-backend.onrender.com/api';

// Create axios instance with default configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`Making API request to: ${config.baseURL}${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log(`API response received:`, response.status);
    return response;
  },
  (error) => {
    console.error('API error:', error.response?.status, error.message);
    
    // If backend is not available, return demo data
    if (error.code === 'ECONNREFUSED' || error.response?.status >= 500) {
      console.log('Backend not available, using demo data');
      return Promise.resolve({
        data: {
          success: true,
          data: [
            {
              _id: "1",
              name: "Bitcoin",
              symbol: "BTC",
              price: 43250.50,
              marketCap: 847500000000,
              change24h: 2.45,
              volume24h: 28500000000,
              rank: 1,
              image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
              timestamp: new Date(),
              isActive: true
            },
            {
              _id: "2",
              name: "Ethereum",
              symbol: "ETH",
              price: 2650.75,
              marketCap: 318000000000,
              change24h: 1.85,
              volume24h: 15200000000,
              rank: 2,
              image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
              timestamp: new Date(),
              isActive: true
            },
            {
              _id: "3",
              name: "Binance Coin",
              symbol: "BNB",
              price: 315.20,
              marketCap: 47500000000,
              change24h: -0.75,
              volume24h: 1200000000,
              rank: 3,
              image: "https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png",
              timestamp: new Date(),
              isActive: true
            },
            {
              _id: "4",
              name: "Solana",
              symbol: "SOL",
              price: 98.45,
              marketCap: 42500000000,
              change24h: 3.25,
              volume24h: 2800000000,
              rank: 4,
              image: "https://assets.coingecko.com/coins/images/4128/large/solana.png",
              timestamp: new Date(),
              isActive: true
            },
            {
              _id: "5",
              name: "Cardano",
              symbol: "ADA",
              price: 0.485,
              marketCap: 17200000000,
              change24h: 1.15,
              volume24h: 450000000,
              rank: 5,
              image: "https://assets.coingecko.com/coins/images/975/large/cardano.png",
              timestamp: new Date(),
              isActive: true
            }
          ],
          pagination: {
            currentPage: 1,
            totalPages: 1,
            totalItems: 5,
            itemsPerPage: 20
          }
        }
      });
    }
    
    return Promise.reject(error);
  }
);

// API functions
const cryptoApi = {
  // Get all cryptocurrencies with pagination and filtering
  getCrypto: (params = {}) => {
    return api.get('/crypto', { params });
  },

  // Get cryptocurrency statistics
  getCryptoStats: () => {
    return api.get('/crypto/stats');
  },

  // Trigger manual scraping
  triggerScraping: () => {
    return api.post('/crypto/scrape');
  },

  // Get cryptocurrency by ID
  getCryptoById: (id) => {
    return api.get(`/crypto/${id}`);
  },

  // Search cryptocurrencies
  searchCrypto: (query) => {
    return api.get('/crypto', { 
      params: { search: query } 
    });
  },

  // Get top cryptocurrencies
  getTopCrypto: (limit = 10) => {
    return api.get('/crypto', { 
      params: { limit } 
    });
  },

  // Get latest cryptocurrency data
  getLatestCrypto: () => {
    return api.get('/crypto/latest');
  }
};

export default cryptoApi;