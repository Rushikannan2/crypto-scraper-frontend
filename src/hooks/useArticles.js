import { useState, useEffect, useCallback } from 'react';
import { articlesAPI } from '../services/api';

/**
 * Custom hook for managing articles data and operations
 */
export const useArticles = (initialParams = {}) => {
  const [articles, setArticles] = useState([]);
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
    sortBy: 'scrapedAt',
    sortOrder: 'desc',
    ...initialParams,
  });

  /**
   * Fetch articles from API
   */
  const fetchArticles = useCallback(async (fetchParams = {}) => {
    const requestParams = { ...params, ...fetchParams };
    
    setLoading(true);
    setError(null);

    try {
      const response = await articlesAPI.getArticles(requestParams);
      const { data, pagination: paginationData } = response.data;

      setArticles(data);
      setPagination(paginationData);
      
      return { success: true, data, pagination: paginationData };
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch articles';
      setError(errorMessage);
      console.error('Error fetching articles:', err);
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
   * Search articles
   */
  const searchArticles = useCallback((searchQuery) => {
    updateParams({ search: searchQuery, page: 1 });
  }, [updateParams]);

  /**
   * Sort articles
   */
  const sortArticles = useCallback((sortBy, sortOrder = 'desc') => {
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
      sortBy: 'scrapedAt',
      sortOrder: 'desc',
      page: 1,
    });
  }, [updateParams]);

  /**
   * Refresh articles
   */
  const refreshArticles = useCallback(() => {
    return fetchArticles();
  }, [fetchArticles]);

  /**
   * Delete an article
   */
  const deleteArticle = useCallback(async (articleId) => {
    try {
      await articlesAPI.deleteArticle(articleId);
      
      // Remove from local state
      setArticles(prev => prev.filter(article => article._id !== articleId));
      
      // Update pagination
      setPagination(prev => ({
        ...prev,
        totalItems: prev.totalItems - 1,
      }));

      return { success: true };
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to delete article';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    }
  }, []);

  // Fetch articles when parameters change
  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  return {
    // Data
    articles,
    loading,
    error,
    pagination,
    params,

    // Actions
    fetchArticles,
    searchArticles,
    sortArticles,
    changePage,
    changeItemsPerPage,
    clearFilters,
    refreshArticles,
    deleteArticle,
    updateParams,
  };
};

/**
 * Custom hook for recent articles
 */
export const useRecentArticles = (limit = 10) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRecentArticles = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await articlesAPI.getRecentArticles({ limit });
      setArticles(response.data.data);
      return { success: true, data: response.data.data };
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch recent articles';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchRecentArticles();
  }, [fetchRecentArticles]);

  return {
    articles,
    loading,
    error,
    fetchRecentArticles,
  };
};

/**
 * Custom hook for top articles
 */
export const useTopArticles = (limit = 10) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTopArticles = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await articlesAPI.getTopArticles({ limit });
      setArticles(response.data.data);
      return { success: true, data: response.data.data };
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch top articles';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchTopArticles();
  }, [fetchTopArticles]);

  return {
    articles,
    loading,
    error,
    fetchTopArticles,
  };
};
