// src/pages/admin/OrderList.jsx
import React, { useEffect, useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import "./OrderList.css";

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // TODO: Replace with real API fetch
    setOrders([
      { id: 101, buyer: "Rahul Yadav", amount: 5499, status: "Shipped" },
      { id: 102, buyer: "Anjali Sharma", amount: 7999, status: "Pending" },
      { id: 103, buyer: "Rohan Das", amount: 6299, status: "Delivered" }
    ]);
  }, []);

  return (
    <div className="layout">
      <AdminSidebar />
      <main className="admin-main">
        <h1>Orders</h1>
        <table className="order-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Buyer</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(o => (
              <tr key={o.id}>
                <td>{o.id}</td>
                <td>{o.buyer}</td>
                <td>₹{o.amount}</td>
                <td>{o.status}</td>
                <td>
                  <button className="btn-small">Update</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default OrderList;
