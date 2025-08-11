// src/pages/ThankYou.jsx
import React from "react";
import { Link } from "react-router-dom";

const ThankYou = () => {
  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
        background: "linear-gradient(135deg, #6B73FF 0%, #000DFF 100%)",
        color: "#fff",
        textAlign: "center",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: "120px", height: "120px", marginBottom: "1.5rem" }}
        fill="none"
        viewBox="0 0 24 24"
        stroke="white"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12l2 2 4-4M7.5 12A4.5 4.5 0 1112 16.5a4.48 4.48 0 01-4.5-4.5z"
        />
      </svg>

      <h1 style={{ fontSize: "3.5rem", fontWeight: "900", marginBottom: "1rem" }}>
        Thank You! 🎉
      </h1>

      <p style={{ fontSize: "1.5rem", maxWidth: "600px", marginBottom: "2rem", lineHeight: 1.6 }}>
        Your order has been successfully placed. We’re preparing it with care and
        will notify you once it ships. You will receive an email confirmation shortly.
      </p>

      <Link
        to="/"
        style={{
          backgroundColor: "#fff",
          color: "#000DFF",
          padding: "0.75rem 2.5rem",
          borderRadius: "40px",
          fontWeight: "700",
          fontSize: "1.2rem",
          textDecoration: "none",
          boxShadow: "0 6px 12px rgba(0, 13, 255, 0.4)",
          transition: "background-color 0.3s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e0e0ff")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#fff")}
      >
        Continue Shopping
      </Link>
    </div>
  );
};

export default ThankYou;
