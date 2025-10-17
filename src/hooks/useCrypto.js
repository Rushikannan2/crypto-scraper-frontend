import { useState, useEffect, useCallback } from 'react';
import { cryptoAPI } from '../services/cryptoApi';

/**
 * Custom hook for managing cryptocurrency data and operations
 */
export const useCrypto = (initialParams = {}) => {
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 20,
  });

  // Search and filter parameters
  const [params, setParams] = useState({
    page: 1,
    limit: 20,
    search: '',
    sortBy: 'rank',
    sortOrder: 'asc',
    ...initialParams,
  });

  /**
   * Fetch cryptocurrency data from API
   */
  const fetchCrypto = useCallback(async (fetchParams = {}) => {
    const requestParams = { ...params, ...fetchParams };
    
    setLoading(true);
    setError(null);

    try {
      const response = await cryptoAPI.getCrypto(requestParams);
      const { data, pagination: paginationData } = response.data;

      setCryptoData(data);
      setPagination(paginationData);
      
      return { success: true, data, pagination: paginationData };
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch cryptocurrency data';
      setError(errorMessage);
      console.error('Error fetching crypto data:', err);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [params]);

  /**
   * Update search parameters
   */
  const updateParams = useCallback((newParams) => {
    setParams(prev => ({ ...prev, ...newParams }));
  }, []);

  /**
   * Search cryptocurrencies
   */
  const searchCrypto = useCallback((searchQuery) => {
    updateParams({ search: searchQuery, page: 1 });
  }, [updateParams]);

  /**
   * Sort cryptocurrencies
   */
  const sortCrypto = useCallback((sortBy, sortOrder = 'asc') => {
    updateParams({ sortBy, sortOrder, page: 1 });
  }, [updateParams]);

  /**
   * Change page
   */
  const changePage = useCallback((page) => {
    updateParams({ page });
  }, [updateParams]);

  /**
   * Change items per page
   */
  const changeItemsPerPage = useCallback((limit) => {
    updateParams({ limit: parseInt(limit), page: 1 });
  }, [updateParams]);

  /**
   * Clear all filters
   */
  const clearFilters = useCallback(() => {
    updateParams({
      search: '',
      sortBy: 'rank',
      sortOrder: 'asc',
      page: 1,
    });
  }, [updateParams]);

  /**
   * Refresh cryptocurrency data
   */
  const refreshCrypto = useCallback(() => {
    return fetchCrypto();
  }, [fetchCrypto]);

  /**
   * Delete a cryptocurrency
   */
  const deleteCrypto = useCallback(async (cryptoId) => {
    try {
      await cryptoAPI.deleteCrypto(cryptoId);
      
      // Remove from local state
      setCryptoData(prev => prev.filter(crypto => crypto._id !== cryptoId));
      
      // Update pagination
      setPagination(prev => ({
        ...prev,
        totalItems: prev.totalItems - 1,
      }));

      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to delete cryptocurrency';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  }, []);

  // Fetch crypto data when parameters change
  useEffect(() => {
    fetchCrypto();
  }, [fetchCrypto]);

  return {
    // Data
    cryptoData,
    loading,
    error,
    pagination,
    params,

    // Actions
    fetchCrypto,
    searchCrypto,
    sortCrypto,
    changePage,
    changeItemsPerPage,
    clearFilters,
    refreshCrypto,
    deleteCrypto,
    updateParams,
  };
};

/**
 * Custom hook for top cryptocurrencies
 */
export const useTopCrypto = (limit = 10) => {
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTopCrypto = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await cryptoAPI.getTopCrypto({ limit });
      setCryptoData(response.data.data);
      return { success: true, data: response.data.data };
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch top cryptocurrencies';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchTopCrypto();
  }, [fetchTopCrypto]);

  return {
    cryptoData,
    loading,
    error,
    fetchTopCrypto,
  };
};

/**
 * Custom hook for latest cryptocurrency data
 */
export const useLatestCrypto = (limit = 50) => {
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchLatestCrypto = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await cryptoAPI.getLatestCrypto({ limit });
      setCryptoData(response.data.data);
      return { success: true, data: response.data.data };
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch latest cryptocurrency data';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchLatestCrypto();
  }, [fetchLatestCrypto]);

  return {
    cryptoData,
    loading,
    error,
    fetchLatestCrypto,
  };
};
