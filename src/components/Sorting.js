import React from 'react';

const Sorting = ({ onSortChange }) => {
  const handleSortChange = (e) => {
    const [sortBy, order] = e.target.value.split('-');
    onSortChange({ sortBy, order });
  };

  return (
    <div className="mb-4">
      <select onChange={handleSortChange} className="p-2 border rounded">
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="popularity-asc">Popularity: Low to High</option>
        <option value="popularity-desc">Popularity: High to Low</option>
      </select>
    </div>
  );
};

export default Sorting;
