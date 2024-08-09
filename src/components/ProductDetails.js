import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
      <p>Category: {product.category}</p>
      <p>Price: Rs.{product.price}</p>
      <p>Size: {product.size}</p>
      <p>Color: {product.color}</p>
      <p>Brand: {product.brand}</p>
      <p>Popularity: {product.popularity}</p>
      <button
        onClick={() => navigate('/checkout')}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Buy Now
      </button>
    </div>
  );
};

export default ProductDetails;
