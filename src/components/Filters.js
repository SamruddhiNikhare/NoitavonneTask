import React from 'react';

const Filters = ({ onFilterChange }) => {
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    onFilterChange(prevFilters => ({ ...prevFilters, [name]: value }));
  };

  return (
    <div className="mb-4">
      <select name="category" onChange={handleFilterChange} className="mr-2 p-2 border rounded">
        <option value="">All Categories</option>
        <option value="Jeans">Jeans</option>
        <option value="Top">Tops</option>
      </select>
      <select name="size" onChange={handleFilterChange} className="mr-2 p-2 border rounded">
        <option value="">All Sizes</option>
        <option value="S">Small</option>
        <option value="M">Medium</option>
        <option value="L">Large</option>
      </select>
      <select name="color" onChange={handleFilterChange} className="mr-2 p-2 border rounded">
        <option value="">All Colors</option>
        <option value="Red">Red</option>
        <option value="Blue">Blue</option>
        <option value="Green">Green</option>
        <option value="Black">Black</option>
        <option value="White">White</option>
      </select>
      
    </div>
  );
};

export default Filters;
