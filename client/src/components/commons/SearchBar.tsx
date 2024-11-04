import React from 'react';
import { TextField } from '@mui/material';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(event.target.value);
  };

  return (
    <TextField
      variant="outlined"
      placeholder="Search users..."
      onChange={handleChange}
      fullWidth
    />
  );
}

export default SearchBar;
