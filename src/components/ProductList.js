import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { setProducts } from '../features/products/productsSlice';
import Filters from './Filters';
import Sorting from './Sorting';
import SearchBar from './SearchBar';

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const [visibleProducts, setVisibleProducts] = useState(4);
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState({ sortBy: 'price', order: 'asc' });
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      const params = {
        page,
        limit: visibleProducts,
        ...filters,
        ...sort,
        search: searchQuery,
      };
      const response = await axios.get('http://localhost:5000/api/products', { params });
      dispatch(setProducts(response.data));
    };

    fetchProducts();
  }, [dispatch, visibleProducts, filters, sort, page, searchQuery]);

  const loadMore = () => {
    setPage((prev) => prev + 1);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPage(1); // Reset to the first page when filters change
  };

  const handleSortChange = (newSort) => {
    setSort(newSort);
    setPage(1); // Reset to the first page when sorting changes
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setPage(1); // Reset to the first page when search query changes
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Product List</h2>

      <SearchBar onSearchChange={handleSearchChange} />
      <Filters onFilterChange={handleFilterChange} />
      <Sorting onSortChange={handleSortChange} />

  
      <ul className="grid grid-cols-2 gap-4">
        {products.map((product) => (
          <li 
            key={product.id} 
            className="border p-4 flex justify-center items-center text-center bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300" 
            style={{ width: '150px', height: '150px' }}  // style
          >
            <Link to={`/product/${product.id}`}>
              {product.name} - Rs.{product.price}
            </Link>
          </li>
        ))}
      </ul>

      
      <button
        onClick={loadMore}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Load More
      </button>
    </div>
  );
};

export default ProductList;
