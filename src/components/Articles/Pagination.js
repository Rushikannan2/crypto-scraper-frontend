import React from 'react';
import {
  Box,
  Pagination,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
} from '@mui/material';

/**
 * Pagination component for article lists
 */
const PaginationComponent = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  showItemsPerPage = true,
}) => {
  const handlePageChange = (event, page) => {
    onPageChange(page);
  };

  const handleItemsPerPageChange = (event) => {
    onItemsPerPageChange(event.target.value);
  };

  // Calculate display range
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <Box sx={{ mt: 3, mb: 2 }}>
      <Grid container spacing={2} alignItems="center">
        {/* Items Per Page Selector */}
        {showItemsPerPage && (
          <Grid item xs={12} sm={6} md={4}>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Items per page</InputLabel>
              <Select
                value={itemsPerPage}
                label="Items per page"
                onChange={handleItemsPerPageChange}
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={50}>50</MenuItem>
                <MenuItem value={100}>100</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        )}

        {/* Results Info */}
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="body2" color="text.secondary">
            Showing {startItem}-{endItem} of {totalItems} articles
          </Typography>
        </Grid>

        {/* Pagination Controls */}
        <Grid item xs={12} sm={12} md={4}>
          <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' } }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              size="large"
              showFirstButton
              showLastButton
              disabled={totalPages <= 1}
            />
          </Box>
        </Grid>
      </Grid>

      {/* Page Info */}
      {totalPages > 1 && (
        <Box sx={{ textAlign: 'center', mt: 1 }}>
          <Typography variant="caption" color="text.secondary">
            Page {currentPage} of {totalPages}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default PaginationComponent;
