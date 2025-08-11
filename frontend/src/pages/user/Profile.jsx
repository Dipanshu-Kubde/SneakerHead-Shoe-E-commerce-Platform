import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import "./Profile.css";

const Profile = () => {
  // Get token from context or fallback to localStorage
  const contextAuth = useAuth();
  const token = contextAuth?.token || localStorage.getItem("token");

  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!token) {
          console.warn("No token found. User might not be logged in.");
          setLoading(false);
          return;
        }

        console.log("Fetching profile with token:", token);

        const { data } = await axios.get("http://localhost:8080/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Profile data:", data);

        // Safely set form data with fallbacks
        setForm({
          username: data.username || data.email || "",
          email: data.email || "",
          name: data.name || "",
          phone: data.phone || "",
          role: data.role || "",
        });
      } catch (err) {
        console.error("❌ Error fetching profile:", err.response?.status, err.response?.data || err.message);
        alert("❌ Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      if (!token) {
        alert("You are not logged in.");
        return;
      }

      await axios.put(
        "http://localhost:8080/api/users/profile",
        {
          name: form.name,
          phone: form.phone,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("✅ Profile updated!");
    } catch (err) {
      console.error("❌ Error updating profile:", err.response?.status, err.response?.data || err.message);
      alert("❌ Failed to update profile.");
    }
  };

  // Loading & Error UI
  if (loading) return <div>Loading profile...</div>;
  if (!form) return <div>Error loading profile data.</div>;

  // UI
  return (
    <div className="profile-container">
      <h2>My Profile</h2>
      <form className="profile-form" onSubmit={handleUpdate}>
        <label>
          Username:
          <input type="text" value={form.username} disabled />
        </label>
        <label>
          Email:
          <input type="email" value={form.email} disabled />
        </label>
        <label>
          Full Name:
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Phone:
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Role:
          <input type="text" value={form.role} disabled />
        </label>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default Profile;
