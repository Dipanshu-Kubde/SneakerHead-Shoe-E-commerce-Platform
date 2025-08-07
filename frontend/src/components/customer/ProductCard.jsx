import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import "./productcard.css";

const ProductCard = ({ product, onAddToCart }) => {
  const [message, setMessage] = useState("");
  const [liked, setLiked] = useState(false);
  const toggleFavorite = () => setLiked(!liked);
  const [expanded, setExpanded] = useState(false);

  const handleClick = async () => {
    try {
      await onAddToCart(product);
      setMessage("✅ Added to cart");
    } catch (err) {
      console.error("❌ Failed to add to cart", err);
      setMessage("❌ Error");
    }
    setTimeout(() => setMessage(""), 3000);
  };

  const getImageUrl = (url) => {
    if (!url) return "/default-image.jpg";
    const cleaned = url.trim();
    if (cleaned.startsWith("http://") || cleaned.startsWith("https://")) {
      return cleaned;
    }
    return `http://localhost:8080/${cleaned.replace(/^\/?images\//, "images/")}`;
  };

  const imageUrl = getImageUrl(product.imageUrl);

  return (
    <div className={`product-card ${expanded ? "expanded" : ""}`}>
      <div className="favorite-icon" onClick={toggleFavorite}>
  {liked ? <FaHeart color="black" /> : <FaRegHeart />}
</div>

      <Link to={`/product/${product.id}`} className="card-link">
        <div className="image-container">
          <img
  src={imageUrl}
  alt={product.name}
  className="product-img"
  style={{
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center",
    display: "block",
  }}
  onError={(e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = "/default-image.jpg";
  }}
/>

        </div>
        <div className="info">
          <h2 className="product-title">{product.name}</h2>
          <p className="product-description">{product.description}</p>
          <p className="product-price">₹{product.price}</p>
        </div>
      </Link>

      <button onClick={handleClick} className="add-btn">
        Add to Cart
      </button>

      {/* <button
        className="expand-btn"
        onClick={() => setExpanded((e) => !e)}
      >
        {expanded ? "▲ View Less" : "▼ View More"}
      </button>

      <div className="expand-section">
        {expanded && (
          <div className="additional-content">
            <p>{product.description}</p>
          </div>
        )}
      </div> */}

      {message && <p className="feedback-msg">{message}</p>}
    </div>
  );
};

export default ProductCard;
