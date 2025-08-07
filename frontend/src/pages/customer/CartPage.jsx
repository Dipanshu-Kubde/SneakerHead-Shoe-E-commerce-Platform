import React, { useEffect, useState } from "react";
import {
  fetchCartItems,
  updateCartItem,
  removeCartItem,
  clearCart,
} from "../../api/cartApi";
import { useNavigate } from "react-router-dom";
import "./CartPage.css";


const CartPage = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.quantity * item.product.price,
    0
  );

  const loadCart = async () => {
    try {
      const res = await fetchCartItems();
      setItems(res.data || []);
    } catch (err) {
      console.error("Failed to load cart items", err);
      setItems([]);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const handleQuantityChange = async (itemId, quantity) => {
    if (!itemId) return;
    if (quantity < 1) return;
    try {
      await updateCartItem(itemId, quantity);
      loadCart();
    } catch (err) {
      console.error("Failed to update quantity", err);
    }
  };

  const handleRemove = async (itemId) => {
    if (!itemId) return;
    try {
      await removeCartItem(itemId);
      loadCart();
    } catch (err) {
      console.error("Failed to remove item", err);
    }
  };

  const handleCheckout = async () => {
    if (!items.length) {
      alert("Your cart is empty!");
      return;
    }

    setIsLoading(true);
    try {
      await clearCart();
      setItems([]);
      alert("✅ Checkout successful!");
      navigate("/thank-you");
    } catch (err) {
      console.error("Checkout failed", err);
      alert("❌ Something went wrong during checkout.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!items.length) {
    return (
      <div className="p-4">
        <p>🛒 Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="cart-container">
  <h1 className="cart-title">🛒 My Cart</h1>

  <ul className="space-y-4">
    {items.map(item => (
      <li key={item.id} className="cart-item">
        <div className="cart-item-details">
          <p className="cart-item-name">{item.product.name}</p>
          <p className="cart-item-price">₹{item.product.price} each</p>
        </div>

        <div className="flex items-center">
          <button
            className="cart-qty-btn"
            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
            disabled={item.quantity <= 1}
          >➖</button>
          <span className="mx-2">{item.quantity}</span>
          <button
            className="cart-qty-btn"
            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
          >➕</button>
          <button
            className="cart-remove-btn"
            onClick={() => handleRemove(item.id)}
          >Remove</button>
        </div>
      </li>
    ))}
  </ul>

  <div className="cart-summary">
    <p className="cart-total-items">🧾 Total Items: <span>{totalItems}</span></p>
    <p className="cart-total-price">💰 Total Price: ₹{totalPrice}</p>
    <button
      onClick={handleCheckout}
      disabled={isLoading}
      className={`checkout-btn ${isLoading ? "disabled" : ""}`}
    >
      {isLoading ? "Processing..." : "🧾 Proceed to Checkout"}
    </button>
  </div>
</div>

  );
};

export default CartPage;
