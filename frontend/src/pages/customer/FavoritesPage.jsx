import React from "react";
import { useFavorites } from "../..//context/FavoritesContext";
import ProductCard from "../../components/customer/ProductCard";


const FavoritesPage = () => {
  const { favorites } = useFavorites();

  if (favorites.length === 0) {
    return <p style={{ padding: "2rem" }}>No favorites yet.</p>;
  }

  return (
    <div className="product-slider">
      <div className="horizontal-scroll">
        {favorites.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={() => {}} />
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
