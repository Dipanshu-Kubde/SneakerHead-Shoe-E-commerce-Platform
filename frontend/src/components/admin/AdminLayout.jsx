// src/components/admin/AdminLayout.jsx
import React from "react";
import AdminSidebar from "./AdminSidebar";
import "./admin.css";

const AdminLayout = ({ children }) => {
  return (
    <div className="admin-layout flex min-h-screen bg-gray-50">
      <AdminSidebar />
      <main className="flex-1 p-6 overflow-y-auto">{children}</main>
    </div>
  );
};

export default AdminLayout;
