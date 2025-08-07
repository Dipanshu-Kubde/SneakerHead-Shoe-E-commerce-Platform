import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import "./auth.css";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/auth/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      alert("✅ Login successful!");
      navigate("/");
    } catch {
      alert("❌ Invalid credentials");
    }
  };

  const handleGoogleSuccess = async cred => {
    try {
      const res = await axios.post("http://localhost:8080/api/auth/google", {
        token: cred.credential
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      navigate("/");
    } catch {
      alert("❌ Google login failed");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-box" onSubmit={handleSubmit}>
        <h1 className="auth-title">Welcome back</h1>
        <p className="auth-subtitle">Log in to your account</p>

        <input type="email" name="email" placeholder="Email address"
          value={form.email} onChange={handleChange} className="auth-input" required />
        <input type="password" name="password" placeholder="Password"
          value={form.password} onChange={handleChange} className="auth-input" required />

        <button type="submit" className="auth-btn green">Login</button>

        <div className="auth-divider">or</div>
        <div className="auth-alt">
          <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => alert("❌ Google login failed")} />
          <button className="alt-btn apple">Continue with Apple</button>
          <button className="alt-btn facebook">Continue with Facebook</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
