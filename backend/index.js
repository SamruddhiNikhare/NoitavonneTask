const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// products
const products = [
  { id: 1, name: 'Black Jeans', category: 'Jeans', price: 120, size: 'M', color: 'Black', brand: 'Roadster', popularity: 4, description: 'Comfortable black jeans with a modern fit.' },
  { id: 2, name: 'Blue Jeans', category: 'Jeans', price: 150, size: 'L', color: 'Blue', brand: 'DressBerry', popularity: 5, description: 'Stylish blue jeans with a slim fit.' },
  { id: 3, name: 'Red Top', category: 'Top', price: 80, size: 'S', color: 'Red', brand: 'Berrylush', popularity: 3, description: 'Elegant red top perfect for evening outings.' },
  { id: 4, name: 'White Top', category: 'Top', price: 90, size: 'M', color: 'White', brand: 'H&M', popularity: 4, description: 'Classic white top with a comfortable fit.' },
  { id: 5, name: 'Blue Top', category: 'Top', price: 85, size: 'L', color: 'Blue', brand: 'Tokyo Talkies', popularity: 2, description: 'Casual blue top ideal for everyday wear.' },
  { id: 6, name: 'Green Top', category: 'Top', price: 100, size: 'M', color: 'Green', brand: 'Roadster', popularity: 5, description: 'Vibrant green top with a relaxed fit.' },
];


app.get('/api/products', (req, res) => {
  let filteredProducts = [...products];

  // category filter
  if (req.query.category) {
    filteredProducts = filteredProducts.filter(
      (product) => product.category === req.query.category
    );
  }

  // search
  if (req.query.search) {
    const searchQuery = req.query.search.toLowerCase();
    filteredProducts = filteredProducts.filter((product) =>
      product.name.toLowerCase().includes(searchQuery)
    );
  }

  // size 
  if (req.query.size) {
    filteredProducts = filteredProducts.filter(
      (product) => product.size === req.query.size
    );
  }
  // color 
  if (req.query.color) {
    filteredProducts = filteredProducts.filter(
      (product) => product.color === req.query.color
    );
  }
  if (req.query.brand) {
    filteredProducts = filteredProducts.filter(
      (product) => product.brand === req.query.brand
    );
  }

  // Sorting
  if (req.query.sortBy) {
    const sortKey = req.query.sortBy;
    const sortOrder = req.query.order === 'desc' ? -1 : 1;
    filteredProducts.sort((a, b) => (a[sortKey] > b[sortKey] ? sortOrder : -sortOrder));
  }

  // Pagination (lazy loading)
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 6;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  res.json(paginatedProducts);
});

// for product details
app.get('/api/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const product = products.find(p => p.id === productId);
  
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
