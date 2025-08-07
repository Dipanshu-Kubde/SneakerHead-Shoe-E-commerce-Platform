import axios from "axios";

const API_BASE = "http://localhost:8080/api/cart";
const token = localStorage.getItem("token");

export const addToCart = async (productId, quantity = 1) => {
  return axios.post(
    `${API_BASE}/add`,
    null,
    {
      params: { productId, quantity },
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const fetchCartItems = async () => {
  return axios.get(`${API_BASE}/items/my`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateCartItem = async (itemId, quantity) => {
  return axios.put(
    `${API_BASE}/item/${itemId}`,
    null,
    {
      params: { quantity },
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const removeCartItem = async (itemId) => {
  return axios.delete(
    `${API_BASE}/remove/${itemId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const clearCart = () => {
  const token = localStorage.getItem("token");
  return axios.delete(`${API_BASE}/clear`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};


