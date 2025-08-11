import React, { useState, useEffect } from "react";

const AdminProductForm = ({ product, onSave }) => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    brand: "",
    imageUrl: "",
    stock: "",
  });

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name,
        description: product.description,
        price: product.price,
        brand: product.brand,
        imageUrl: product.imageUrl || "",
        stock: product.stock,
      });
    } else {
      setForm({
        name: "",
        description: "",
        price: "",
        brand: "",
        imageUrl: "",
        stock: "",
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      price: parseFloat(form.price),
      stock: parseInt(form.stock),
    };
    onSave(payload);
  };

  return (
    <div style={{ marginTop: "20px", marginBottom: "20px" }}>
      <h3>{product ? "Edit Product" : "Add Product"}</h3>
      <form onSubmit={handleSubmit}>
        {["name", "description", "price", "brand", "imageUrl", "stock"].map((field) => (
          <div key={field}>
            <input
              name={field}
              type={field === "price" || field === "stock" ? "number" : "text"}
              placeholder={field}
              value={form[field]}
              onChange={handleChange}
              required={field !== "imageUrl"}
              style={{ margin: "5px", padding: "5px" }}
            />
          </div>
        ))}
        <button type="submit" style={{ marginTop: "10px" }}>
          {product ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
};

export default AdminProductForm;
