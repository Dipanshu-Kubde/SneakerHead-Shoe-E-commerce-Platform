import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // You might pass email as state when navigating here from register
  const email = location.state?.email;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/auth/verify-otp", { email, otp });
      alert("✅ Email verified successfully!");
      navigate("/login");
    } catch (err) {
      alert("❌ Invalid or expired OTP");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-box" onSubmit={handleSubmit}>
        <h1>Verify your Email</h1>
        <p>Enter the code sent to your email: {email}</p>

        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
          className="auth-input"
        />

        <button type="submit" className="auth-btn">
          Verify
        </button>
      </form>
    </div>
  );
};

export default VerifyOtp;
