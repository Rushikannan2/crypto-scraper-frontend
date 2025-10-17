import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Button,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  Refresh as RefreshIcon,
} from '@mui/icons-material';

// Components
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import CryptoList from '../components/Crypto/CryptoList';
import CryptoSearchBar from '../components/Crypto/CryptoSearchBar';
import Pagination from '../components/Articles/Pagination';
import {
  TotalCryptoCard,
  TodayCryptoCard,
  TopCryptoCard,
  LastUpdateCard,
} from '../components/Dashboard/CryptoStatsCard';

// Hooks
import { useCrypto } from '../hooks/useCrypto';
import { useCryptoStats } from '../hooks/useCryptoStats';

/**
 * Cryptocurrency dashboard page - main dashboard with crypto data and statistics
 */
const CryptoDashboard = () => {
  // Crypto data hook
  const {
    cryptoData,
    loading: cryptoLoading,
    error: cryptoError,
    pagination,
    params,
    searchCrypto,
    sortCrypto,
    changePage,
    changeItemsPerPage,
    clearFilters,
    refreshCrypto,
    deleteCrypto,
  } = useCrypto();

  // Stats hook
  const {
    stats,
    loading: statsLoading,
    error: statsError,
    triggerScraping,
  } = useCryptoStats();

  // Handle refresh
  const handleRefresh = async () => {
    await Promise.all([
      refreshCrypto(),
      triggerScraping(),
    ]);
  };

  // Handle search
  const handleSearch = (searchQuery) => {
    searchCrypto(searchQuery);
  };

  // Handle sort
  const handleSort = (sortBy, sortOrder) => {
    sortCrypto(sortBy, sortOrder);
  };

  // Handle page change
  const handlePageChange = (page) => {
    changePage(page);
  };

  // Handle items per page change
  const handleItemsPerPageChange = (itemsPerPage) => {
    changeItemsPerPage(itemsPerPage);
  };

  // Handle clear filters
  const handleClearFilters = () => {
    clearFilters();
  };

  // Handle delete crypto
  const handleDeleteCrypto = async (cryptoId) => {
    const result = await deleteCrypto(cryptoId);
    if (result.success) {
      console.log('Cryptocurrency deleted successfully');
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Header */}
      <Header
        onRefresh={handleRefresh}
        isRefreshing={cryptoLoading}
        stats={stats}
        lastScrapeTime={stats?.lastScrape}
      />

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ flexGrow: 1, py: 4 }}>
        {/* Page Title */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Cryptocurrency Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Real-time cryptocurrency prices and market data with automatic updates
          </Typography>
        </Box>

        {/* Statistics Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <TotalCryptoCard stats={stats} loading={statsLoading} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TodayCryptoCard stats={stats} loading={statsLoading} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TopCryptoCard stats={stats} loading={statsLoading} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <LastUpdateCard stats={stats} loading={statsLoading} />
          </Grid>
        </Grid>

        {/* Stats Error */}
        {statsError && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {statsError}
          </Alert>
        )}

        {/* Search and Filters */}
        <CryptoSearchBar
          searchQuery={params.search}
          onSearchChange={handleSearch}
          sortBy={params.sortBy}
          onSortChange={(sortBy) => handleSort(sortBy, params.sortOrder)}
          sortOrder={params.sortOrder}
          onSortOrderChange={(sortOrder) => handleSort(params.sortBy, sortOrder)}
          onClearFilters={handleClearFilters}
          totalResults={pagination.totalItems}
        />

        {/* Cryptocurrency List */}
        <CryptoList
          cryptoData={cryptoData}
          loading={cryptoLoading}
          error={cryptoError}
          onRefresh={handleRefresh}
          onDelete={handleDeleteCrypto}
          emptyMessage="No cryptocurrency data found. Try refreshing or check back later."
        />

        {/* Pagination */}
        {!cryptoLoading && !cryptoError && cryptoData.length > 0 && (
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            totalItems={pagination.totalItems}
            itemsPerPage={pagination.itemsPerPage}
            onPageChange={handlePageChange}
            onItemsPerPageChange={handleItemsPerPageChange}
          />
        )}

        {/* Manual Scraping Button */}
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button
            variant="contained"
            size="large"
            startIcon={statsLoading ? <CircularProgress size={20} /> : <RefreshIcon />}
            onClick={handleRefresh}
            disabled={statsLoading || cryptoLoading}
            sx={{ minWidth: 200 }}
          >
            {statsLoading ? 'Scraping...' : 'Refresh Crypto Data'}
          </Button>
        </Box>
      </Container>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default CryptoDashboard;
