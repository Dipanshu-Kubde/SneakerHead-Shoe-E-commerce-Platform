import React from "react";
import { useFavorites } from "../contexts/FavoritesContext";
import ProductCard from "./ProductCard";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const FavoriteProductCard = ({ product, onAddToCart }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const liked = isFavorite(product.id);

  return (
    <div style={{ position: "relative" }}>
      {/* Overlay favorite icon */}
      <div
        onClick={() => toggleFavorite(product)}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          zIndex: 10,
          cursor: "pointer",
          fontSize: "1.5rem",
        }}
      >
        {liked ? <FaHeart color="black" /> : <FaRegHeart />}
      </div>

      {/* Original ProductCard untouched */}
      <ProductCard product={product} onAddToCart={onAddToCart} />
    </div>
  );
};

export default FavoriteProductCard;
