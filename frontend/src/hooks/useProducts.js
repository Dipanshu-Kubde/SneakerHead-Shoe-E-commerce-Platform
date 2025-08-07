// src/hooks/useProducts.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/products');
      setProducts(res.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleAdd = async (product) => {
    try {
      const res = await axios.post('http://localhost:8080/api/products', product);
      setProducts((prev) => [...prev, res.data]);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleUpdate = async (product) => {
    try {
      const res = await axios.put(`http://localhost:8080/api/products/${product.id}`, product);
      setProducts((prev) => prev.map((p) => (p.id === product.id ? res.data : p)));
      setEditingProduct(null);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/products/${id}`);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return {
    products: filteredProducts,
    editingProduct,
    setEditingProduct,
    handleAdd,
    handleUpdate,
    handleDelete,
    searchTerm,
    setSearchTerm
  };
};

export default useProducts;
