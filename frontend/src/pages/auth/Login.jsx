import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../../context/AuthContext";
import "./auth.css";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [user, setUser] = useState(null);  // <-- Add user state here
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/auth/login", form);
      login(res.data.token);
      // Optionally fetch user info after login and set it:
      setUser(res.data.user); // assuming user info sent with token response
      navigate("/");
    } catch {
      alert("❌ Invalid credentials");
    }
  };

  const handleGoogleSuccess = async cred => {
    console.log("Google token:", cred.credential);
    try {
      const res = await axios.post("http://localhost:8080/api/auth/google", {
        token: cred.credential
      });
      login(res.data.token);
      setUser(res.data.user);  // Set user info here from backend response
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

        {/* Show login button only if not logged in */}
        {!user ? (
          <>
            <button type="submit" className="auth-btn green">
              Login
            </button>

            <div className="auth-divider">or</div>
            <div className="auth-alt">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => alert("❌ Google login failed")}
              />
              <button className="alt-btn apple">Continue with Apple</button>
              <button className="alt-btn facebook">Continue with Facebook</button>
            </div>
          </>
        ) : (
          // Show user logo/avatar after login
          <div className="user-profile">
            <img
              src={user.picture || "/default-avatar.png"}
              alt={user.name || "User"}
              className="user-avatar"
            />
            <p>Hello, {user.name || user.email}</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default Login;
