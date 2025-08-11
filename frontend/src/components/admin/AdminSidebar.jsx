// src/components/admin/AdminSidebar.jsx
import { NavLink } from "react-router-dom";
import {
  MdDashboard,
  MdInventory,
  MdGroup,
  MdSettings,
  MdAddBox,
  MdShoppingCart,
} from "react-icons/md";
import "./AdminSidebar.css";

const AdminSidebar = () => {
  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar__title">SNEAKERHEAD</div>
      <nav className="admin-sidebar__nav">
        <NavLink to="/admin" className="admin-sidebar__link">
          <MdDashboard /> <span>Dashboard</span>
        </NavLink>
        <NavLink to="/admin/products" className="admin-sidebar__link">
          <MdInventory /> <span>Products</span>
        </NavLink>
        {/* <NavLink to="/admin/add-product" className="admin-sidebar__link">
          <MdAddBox /> <span>Add Product</span>
        </NavLink> */}
        <NavLink to="/admin/orders" className="admin-sidebar__link">
          <MdShoppingCart /> <span>Orders</span>
        </NavLink>
        <NavLink to="/admin/sellers" className="admin-sidebar__link">
          <MdGroup /> <span>Sellers</span>
        </NavLink>
        <NavLink to="/admin/settings" className="admin-sidebar__link">
          <MdSettings /> <span>Settings</span>
        </NavLink>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
