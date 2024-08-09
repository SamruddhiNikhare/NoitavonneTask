import React, { useState } from 'react';

const SearchBar = ({ onSearchChange }) => {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    onSearchChange(query);
  };

  return (
    <div className="mb-4 flex items-center">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search products..."
        className="p-2 border rounded w-full mr-2"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
