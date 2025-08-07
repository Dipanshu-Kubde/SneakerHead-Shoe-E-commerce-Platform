import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import AdminProductForm from "./AdminProductForm";

const AdminProductList = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const token = localStorage.getItem("token");

  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:8080/api/products", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSave = async (form) => {
    const method = editingProduct ? "put" : "post";
    const url = editingProduct
      ? `http://localhost:8080/api/products/${editingProduct.id}`
      : "http://localhost:8080/api/products";

    await axios[method](url, form, {
      headers: { Authorization: `Bearer ${token}` },
    });

    fetchProducts();
    setShowForm(false);
    setEditingProduct(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    await axios.delete(`http://localhost:8080/api/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchProducts();
  };

  return (
    <div>
      <h1>Admin Products</h1>

      <button
        onClick={() => {
          setShowForm(true);
          setEditingProduct(null);
        }}
      >
        + Add Product
      </button>

      {showForm && (
        <AdminProductForm
          product={editingProduct}
          onSave={handleSave}
        />
      )}

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Brand</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.brand}</td>
              <td>{p.price}</td>
              <td>{p.stock}</td>
              <td>
                <button onClick={() => {
                  setEditingProduct(p);
                  setShowForm(true);
                }}>
                  <FaEdit />
                </button>
                <button onClick={() => handleDelete(p.id)}>
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProductList;
