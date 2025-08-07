import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import "./Header.css";
import useProductSearch from "../hooks/useProductSearch";

const NAV_LINKS = [
  { label: "Shoes", to: "/all" },
  { label: "Men", to: "/men" },
  { label: "Women", to: "/women" },
  { label: "Kids", to: "/kids" },
];

const Header = () => {
  const navigate = useNavigate();
  const { query, setQuery, results } = useProductSearch();

  const handleSelectProduct = (id) => {
    setQuery("");
    navigate(`/product/${id}`);
  };

  const location = useLocation();

  return (
    <header className="header">
      <div className="header__left">
        <Link to="/" className="header__logo">👟 SneakerHead</Link>
        <nav className="header__nav">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`nav-link ${location.pathname === link.to ? "active" : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="header__center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search shoes, brands, etc."
          className="search-input"
        />
        {query && results.length > 0 && (
          <div className="search-results-dropdown">
            {results.map((product) => (
              <div
                key={product.id}
                className="search-result-item"
                onClick={() => handleSelectProduct(product.id)}
              >
                {product.name}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="header__right">
        <Link to="/favorites" className="icon-button" title="Favorites"><FiHeart size={20} /></Link>
        <Link to="/cart" className="icon-button" title="Cart"><FiShoppingCart size={20} /></Link>
        <Link to="/login" className="auth-link">Login</Link>
        <Link to="/register" className="auth-link">Register</Link>
      </div>
    </header>
  );
};

export default Header;
