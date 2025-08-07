// src/pages/auth/Register.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./auth.css";

const Register = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/auth/register", form);
      alert("✅ Registration successful!");
      navigate("/login");
    } catch (err) {
      console.error("❌ Register error:", err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-box" onSubmit={handleSubmit}>
        <h1 className="auth-title">Create your account</h1>
        <p className="auth-subtitle">Start shopping with us today.</p>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="auth-input"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email address"
          value={form.email}
          onChange={handleChange}
          className="auth-input"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="auth-input"
          required
        />

        <button type="submit" className="auth-btn">
          Register
        </button>

        <div className="auth-divider">or</div>

        <div className="auth-alt">
          <button className="alt-btn google">Continue with Google</button>
          <button className="alt-btn apple">Continue with Apple</button>
          <button className="alt-btn facebook">Continue with Facebook</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
