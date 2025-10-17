import { useState, useEffect, useCallback } from 'react';
import { cryptoAPI } from '../services/cryptoApi';

/**
 * Custom hook for managing cryptocurrency statistics
 */
export const useCryptoStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fetch statistics from API
   */
  const fetchStats = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await cryptoAPI.getStats();
      setStats(response.data.data);
      return { success: true, data: response.data.data };
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch cryptocurrency statistics';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Trigger manual crypto scraping
   */
  const triggerScraping = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await cryptoAPI.triggerScraping();
      
      // Refresh stats after scraping
      await fetchStats();
      
      return { success: true, data: response.data };
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || 'Failed to trigger crypto scraping';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [fetchStats]);

  // Fetch stats on mount
  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return {
    stats,
    loading,
    error,
    fetchStats,
    triggerScraping,
  };
};
