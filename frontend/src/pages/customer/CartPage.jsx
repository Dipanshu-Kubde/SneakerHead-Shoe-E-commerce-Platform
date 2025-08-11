import React, { useEffect, useState } from "react";
import {
  fetchCartItems,
  updateCartItem,
  removeCartItem,
  clearCart,
} from "../../api/cartApi";
import { createOrder, verifyPayment } from "../../api/paymentApi";
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
  
useEffect(() => {
  window.addEventListener("focus", loadCart);
  return () => window.removeEventListener("focus", loadCart);
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

  // const handleCheckout = async () => {
  //   if (!items.length) {
  //     alert("Your cart is empty!");
  //     return;
  //   }

  const handleCheckout = async () => {
  if (!items.length) {
    alert("Your cart is empty!");
    return;
  }

    // const totalAmountInPaise = totalPrice * 100;
  setIsLoading(true);

  

  try {
    // 1. Create order on backend
    const { data } = await createOrder(totalPrice);
    console.log("Order creation response:", data);

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Replace this with your test/live Razorpay key
      amount: data.amount,
      currency: data.currency,
      name: "MiniMart",
      description: "Order Payment",
      order_id: data.orderId,
      handler: async function (response) {
        console.log("Razorpay Response:", response);
        try {
          const verification = await verifyPayment({
            payment_id: response.razorpay_payment_id,
            order_id: response.razorpay_order_id,
            signature: response.razorpay_signature,
          });


          alert(verification.data); // Can customize this message
          await clearCart(); // Clear cart after successful payment
          setItems([]);
          navigate("/thank-you");
        } catch (verifyErr) {
          console.error("Verification failed:", verifyErr);
          alert("❌ Payment verification failed.");
        }
      },
      prefill: {
        name: "Light Yagami",
        email: "yagami@example.com",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const razor = new window.Razorpay(options);
    razor.open();
  } catch (err) {
    console.error("Checkout error:", err);
    alert("❌ Checkout failed");
  } finally {
    setIsLoading(false);
  }
};

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
