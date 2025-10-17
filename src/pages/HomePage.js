import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Button,
  Alert,
  CircularProgress,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';

// Components
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import ArticleList from '../components/Articles/ArticleList';
import SearchBar from '../components/Articles/SearchBar';
import Pagination from '../components/Articles/Pagination';
import {
  TotalArticlesCard,
  TodayArticlesCard,
  AverageScoreCard,
  LastScrapeCard,
} from '../components/Dashboard/StatsCard';

// Hooks
import { useArticles } from '../hooks/useArticles';
import { useStats } from '../hooks/useStats';

/**
 * Home page component - main dashboard with articles and statistics
 */
const HomePage = () => {
  // Articles hook
  const {
    articles,
    loading: articlesLoading,
    error: articlesError,
    pagination,
    params,
    searchArticles,
    sortArticles,
    changePage,
    changeItemsPerPage,
    clearFilters,
    refreshArticles,
    deleteArticle,
  } = useArticles();

  // Stats hook
  const {
    stats,
    loading: statsLoading,
    error: statsError,
    triggerScraping,
  } = useStats();

  // Handle refresh
  const handleRefresh = async () => {
    await Promise.all([
      refreshArticles(),
      triggerScraping(),
    ]);
  };

  // Handle search
  const handleSearch = (searchQuery) => {
    searchArticles(searchQuery);
  };

  // Handle sort
  const handleSort = (sortBy, sortOrder) => {
    sortArticles(sortBy, sortOrder);
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

  // Handle delete article
  const handleDeleteArticle = async (articleId) => {
    const result = await deleteArticle(articleId);
    if (result.success) {
      // Optionally show success message
      console.log('Article deleted successfully');
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Header */}
      <Header
        onRefresh={handleRefresh}
        isRefreshing={articlesLoading}
        stats={stats}
        lastScrapeTime={stats?.lastScrape}
      />

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ flexGrow: 1, py: 4 }}>
        {/* Page Title */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Live News Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Real-time news aggregation from Hacker News with automatic updates
          </Typography>
        </Box>

        {/* Statistics Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <TotalArticlesCard stats={stats} loading={statsLoading} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <TodayArticlesCard stats={stats} loading={statsLoading} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AverageScoreCard stats={stats} loading={statsLoading} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <LastScrapeCard stats={stats} loading={statsLoading} />
          </Grid>
        </Grid>

        {/* Stats Error */}
        {statsError && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {statsError}
          </Alert>
        )}

        {/* Search and Filters */}
        <SearchBar
          searchQuery={params.search}
          onSearchChange={handleSearch}
          sortBy={params.sortBy}
          onSortChange={(sortBy) => handleSort(sortBy, params.sortOrder)}
          sortOrder={params.sortOrder}
          onSortOrderChange={(sortOrder) => handleSort(params.sortBy, sortOrder)}
          onClearFilters={handleClearFilters}
          totalResults={pagination.totalItems}
        />

        {/* Articles List */}
        <ArticleList
          articles={articles}
          loading={articlesLoading}
          error={articlesError}
          onRefresh={handleRefresh}
          onDelete={handleDeleteArticle}
          emptyMessage="No articles found. Try refreshing or check back later."
        />

        {/* Pagination */}
        {!articlesLoading && !articlesError && articles.length > 0 && (
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
            disabled={statsLoading || articlesLoading}
            sx={{ minWidth: 200 }}
          >
            {statsLoading ? 'Scraping...' : 'Refresh Data'}
          </Button>
        </Box>
      </Container>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default HomePage;
