import React, { useState } from 'react';
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Button,
} from '@mui/material';
import {
  Search as SearchIcon,
  Clear as ClearIcon,
  Sort as SortIcon,
  FilterList as FilterIcon,
} from '@mui/icons-material';

/**
 * Search and filter bar component for articles
 */
const SearchBar = ({ 
  searchQuery, 
  onSearchChange, 
  sortBy, 
  onSortChange, 
  sortOrder, 
  onSortOrderChange,
  onClearFilters,
  totalResults 
}) => {
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearchChange(localSearchQuery);
  };

  const handleClearSearch = () => {
    setLocalSearchQuery('');
    onSearchChange('');
  };

  return (
    <Box sx={{ mb: 3 }}>
      {/* Search Form */}
      <Box
        component="form"
        onSubmit={handleSearchSubmit}
        sx={{
          display: 'flex',
          gap: 2,
          mb: 2,
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        {/* Search Input */}
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search articles by title or author..."
          value={localSearchQuery}
          onChange={(e) => setLocalSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
            endAdornment: localSearchQuery && (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClearSearch}
                  edge="end"
                  size="small"
                >
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{ minWidth: 300 }}
        />

        {/* Sort By */}
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sortBy}
            label="Sort By"
            onChange={(e) => onSortChange(e.target.value)}
            startAdornment={<SortIcon sx={{ mr: 1 }} />}
          >
            <MenuItem value="scrapedAt">Date Scraped</MenuItem>
            <MenuItem value="score">Score</MenuItem>
            <MenuItem value="comments">Comments</MenuItem>
            <MenuItem value="title">Title</MenuItem>
          </Select>
        </FormControl>

        {/* Sort Order */}
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Order</InputLabel>
          <Select
            value={sortOrder}
            label="Order"
            onChange={(e) => onSortOrderChange(e.target.value)}
          >
            <MenuItem value="desc">Descending</MenuItem>
            <MenuItem value="asc">Ascending</MenuItem>
          </Select>
        </FormControl>

        {/* Search Button */}
        <Button
          type="submit"
          variant="contained"
          startIcon={<SearchIcon />}
          sx={{ minWidth: 120 }}
        >
          Search
        </Button>
      </Box>

      {/* Active Filters Display */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'center' }}>
        {/* Results Count */}
        {totalResults !== null && (
          <Chip
            label={`${totalResults} results`}
            color="primary"
            variant="outlined"
            size="small"
          />
        )}

        {/* Search Query Filter */}
        {searchQuery && (
          <Chip
            label={`Search: "${searchQuery}"`}
            onDelete={() => onSearchChange('')}
            color="secondary"
            variant="outlined"
            size="small"
          />
        )}

        {/* Sort Filter */}
        <Chip
          label={`Sort: ${sortBy} (${sortOrder})`}
          color="default"
          variant="outlined"
          size="small"
        />

        {/* Clear All Filters */}
        {(searchQuery || sortBy !== 'scrapedAt' || sortOrder !== 'desc') && (
          <Button
            variant="outlined"
            size="small"
            startIcon={<FilterIcon />}
            onClick={onClearFilters}
            sx={{ ml: 1 }}
          >
            Clear Filters
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default SearchBar;
