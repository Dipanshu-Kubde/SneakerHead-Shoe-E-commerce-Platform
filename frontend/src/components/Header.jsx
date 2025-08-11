import React, { useState, useRef, useEffect } from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiHeart, FiShoppingCart, FiUser } from "react-icons/fi";
import { useAuth } from "../context/AuthContext"; // ✅ import from context
import "./Header.css";
import useProductSearch from "../hooks/useProductSearch";

const NAV_LINKS = [
  { label: "Shoes", to: "/all" },
  { label: "Men", to: "/men" },
  { label: "Women", to: "/women" },
  { label: "Kids", to: "/kids" },
];

const Header = () => {
  const { user, logout } = useAuth(); // ✅ use context for auth state
  const navigate = useNavigate();
  const { query, setQuery, results } = useProductSearch();
  const location = useLocation();
  const dropdownRef = useRef();


  useEffect(() => {
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);

  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleLogout = () => {
    logout(); // ✅ from context
    navigate("/");
  };

  const toggleDropdown = () => setDropdownVisible(prev => !prev);

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
                onClick={() => {
                  setQuery("");
                  navigate(`/product/${product.id}`);
                }}
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

        {!user ? (
  <>
    <Link to="/login" className="auth-link">Login</Link>
    <Link to="/register" className="auth-link">Register</Link>
  </>
) : (
  <div className="user-dropdown">
  <FiUser size={22} className="user-icon" />
  <div className="dropdown-menu">
    <div className="user-info">
      <strong>{user.name || user.username}</strong>
      <p>{user.email}</p>
    </div>
    <hr />
    <Link to="/profile">Profile</Link>
    <Link to="/orders">Orders</Link>
    <Link to="/favorites">Favorites</Link>
    <Link to="/settings">Settings</Link>
    <button onClick={handleLogout} className="logout-btn">Logout</button>
  </div>
</div>

)}

      </div>
    </header>
  );
};

export default Header;
