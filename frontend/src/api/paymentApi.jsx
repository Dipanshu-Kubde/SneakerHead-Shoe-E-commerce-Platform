import axios from "axios";

const token = localStorage.getItem("token");

export const createOrder = async (amount) => {
  return axios.post(
    "http://localhost:8080/api/payments/create-order", // <-- updated URL
    null, // No body — using query param instead
    {
      params: { amount }, // <-- pass amount as query param
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};


export const verifyPayment = async (payload) => {
  return axios.post(
    "http://localhost:8080/api/payments/verify",
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
