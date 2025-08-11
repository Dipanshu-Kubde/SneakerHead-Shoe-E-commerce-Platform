// src/components/filters/FilterSidebar.jsx
import React from "react";
import "./FilterSidebar.css";

const SIZES = Array.from({ length: 24 }, (_, i) => (2.5 + i * 0.5).toFixed(1));
const COLORS = ["black", "white", "gray", "blue", "red", "green", "orange"];

const OPTIONS = {
  Featured: ["New Arrivals", "Bestsellers", "Shop All Sale"],
  Shoes: ["All Shoes", "Lifestyle", "Jordan", "Running", "Gym & Training", "Football", "Basketball", "Sandals", "Special for You"],
  Gender: ["Men", "Women"],
  Type: ["Road Running", "Trail Running", "Athletics", "High Tops", "Slip Ons"],
  Material: ["Tree", "Wool", "Cotton", "Canvas"],
  Utility: [
    "Responsive Cushioning",
    "Supportive Cushioning",
    "Cool-weather",
    "Everyday",
    "Warm-weather",
    "Running"
  ],
  Price: ["₹2,501–7,500", "₹7,501–12,999", "₹13,000+"]
};

const FilterSidebar = ({ filters, setFilters }) => {
  const toggle = (category, value) => {
    setFilters(prev => {
      const arr = prev[category] || [];
      const next = arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value];
      return { ...prev, [category]: next };
    });
  };

  return (
    <aside className="nike-sidebar">
      {Object.entries(OPTIONS).map(([cat, vals]) => (
        <div key={cat} className="filter-group">
          <h3>{cat}</h3>
          <div className="btn-grid">
            {vals.map(val => (
              <button
                key={val}
                className={`toggle-btn ${filters[cat]?.includes(val) ? "active" : ""}`}
                onClick={() => toggle(cat, val)}
              >
                {val}
              </button>
            ))}
          </div>
        </div>
      ))}

      <div className="filter-group">
        <h3>Size</h3>
        <div className="btn-grid">
          {SIZES.map(s => (
            <button
              key={s}
              className={`toggle-btn ${filters.Size?.includes(s) ? "active" : ""}`}
              onClick={() => toggle("Size", s)}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <h3>Color</h3>
        <div className="color-swatches">
          {COLORS.map(c => (
            <span
              key={c}
              className={`swatch ${filters.Color?.includes(c) ? "selected" : ""}`}
              style={{ backgroundColor: c }}
              onClick={() => toggle("Color", c)}
            />
          ))}
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;