// src/pages/ProductDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./productdetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [p, setP] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [cart, setCart] = useState(() => {
    // Load cart from localStorage or start empty
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    const load = async () => {
      try {
        if (id.startsWith("d-")) {
          const realId = id.replace("d-", "");
          const res = await axios.get(`https://dummyjson.com/products/${realId}`);
          setP({
            id: realId,
            name: res.data.title,
            description: res.data.description,
            price: Math.round(res.data.price * 100),
            brand: res.data.brand || "",
            imageUrl: res.data.thumbnail,
            stock: res.data.stock ?? 10,
            isDummy: true,
          });
        } else {
          const res = await axios.get(`http://localhost:8080/api/products/${id}`);
          setP(res.data);
        }
      } catch {
        setP(null);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  useEffect(() => {
    // Persist cart to localStorage when cart changes
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const getImageUrl = (url) => {
    if (!url) return "/default-image.jpg";
    return url.startsWith("http") ? url : `http://localhost:8080/${url}`;
  };

  const addToCart = async (product) => {
    // Simulate async operation
    return new Promise((resolve) => {
      setTimeout(() => {
        setCart((prevCart) => {
          const existing = prevCart.find((item) => item.id === product.id);
          if (existing) {
            return prevCart.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
          }
          return [...prevCart, { ...product, quantity: 1 }];
        });
        resolve();
      }, 300);
    });
  };

  const handleAddToCart = async () => {
    if (!p) return;
    try {
      await addToCart(p);
      setMessage("✅ Added to cart");
    } catch (err) {
      console.error("❌ Failed to add to cart", err);
      setMessage("❌ Error adding to cart");
    }
    setTimeout(() => setMessage(""), 3000);
  };

  const handleBuyNow = async () => {
  if (!p) return;

  try {
    await addToCart(p); // Reuse your existing cart logic
    navigate("/cart");  // Let user checkout like normal
  } catch (err) {
    console.error("❌ Failed to add to cart for Buy Now", err);
    alert("❌ Something went wrong");
  }
};

  if (loading) return <div className="pd-loading">Loading...</div>;
  if (!p) return <div className="pd-error">Product not found</div>;

  const imgSrc = getImageUrl(p.imageUrl);

  return (
    <div className="pd-container">
      <div className="pd-main">
        <img src={imgSrc} alt={p.name} className="pd-image" />
        <div className="pd-info">
          <h1>{p.name}</h1>
          <div className="pd-brand">Brand: {p.brand}</div>
          <div className="pd-price">₹ {p.price.toLocaleString()}</div>
          <div className="pd-stock">
            {p.stock > 0 ? `In Stock: ${p.stock}` : "Out of Stock"}
          </div>
          <p className="pd-desc">{p.description}</p>

          <div className="pd-buttons">
            <button
              className="btn-add"
              disabled={p.isDummy}
              onClick={handleAddToCart}
            >
              {p.isDummy ? "Demo Only" : "Add to Cart"}
            </button>
            <button
              className="btn-buy"
              disabled={p.isDummy}
              onClick={handleBuyNow}
            >
              {p.isDummy ? "Unavailable" : "Buy Now"}
            </button>
          </div>

          {message && <p className="pd-feedback">{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
