import React from "react";
import { MdInventory, MdAttachMoney, MdGroup, MdShoppingCart } from "react-icons/md";
import "./admindashboard.css";

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <h1 className="dashboard-title">Sneakerhead Admin Panel</h1>

      <div className="dashboard-cards">
        <div className="card">
          <MdInventory className="card-icon" />
          <div>
            <p className="card-title">Products</p>
            <p className="card-value">128</p>
          </div>
        </div>
        <div className="card">
          <MdShoppingCart className="card-icon" />
          <div>
            <p className="card-title">Orders</p>
            <p className="card-value">342</p>
          </div>
        </div>
        <div className="card">
          <MdGroup className="card-icon" />
          <div>
            <p className="card-title">Sellers</p>
            <p className="card-value">21</p>
          </div>
        </div>
        <div className="card">
          <MdAttachMoney className="card-icon" />
          <div>
            <p className="card-title">Revenue</p>
            <p className="card-value">₹2.5L</p>
          </div>
        </div>
      </div>

      <div className="dashboard-section">
        <h2>📈 Top Selling Products</h2>
        <div className="chart-placeholder">[Chart Coming Soon]</div>
      </div>

      <div className="dashboard-section">
        <h2>🕒 Recent Activity</h2>
        <ul className="activity-feed">
          <li>👤 Seller <strong>@alina</strong> added <em>Air Max 90</em></li>
          <li>🛒 New order for <em>Air Jordan 350</em></li>
          <li>📦 Restocked <em>Nike Dunk Low</em> - 50 units</li>
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
