import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./ProductSlider.css";

const ProductRider = ({ title, products }) => {
  const navigate = useNavigate();
  const sliderRef = useRef(null);

  const scroll = (direction) => {
    if (!sliderRef.current) return;

    const scrollAmount = sliderRef.current.clientWidth;

    if (direction === "left") {
      sliderRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="product-slider">
      <h2>{title}</h2>
      <div className="slider-wrapper">
        <button className="slider-btn left" onClick={() => scroll("left")}>
          ‹
        </button>

        <div className="horizontal-scroll" ref={sliderRef}>
          {products.map((p) => (
            <div
              key={p.id}
              className="product-card"
              onClick={() => navigate(`/product/${p.id}`)}
            >
              <img src={p.imageUrl} alt={p.name} />
              <h4>{p.name}</h4>
              <p>₹{p.price.toLocaleString()}</p>
            </div>
          ))}
        </div>

        <button className="slider-btn right" onClick={() => scroll("right")}>
          ›
        </button>
      </div>
    </section>
  );
};

export default ProductRider;
