import { Routes, Route } from "react-router-dom";
// import Shop from "../pages/customer/Shop";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import CartPage from "../pages/customer/CartPage";
import ThankYou from "../pages/customer/ThankYou";
import ProductDetails from "../pages/customer/ProductDetails";
import AdminLayout from "../components/admin/AdminLayout";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminProductList from "../pages/admin/AdminProductList";
import AdminProductForm from "../pages/admin/AdminProductForm";
import OrderList from "../pages/admin/OrderList";
import SellerList from "../pages/admin/SellerList";
import AdminSettings from "../pages/admin/AdminSettings";
import Shop from "../pages/Customer/Shop";
import HomePage from "../pages/HomePage";
import VerifyOtp from "../pages/auth/VerifyOtp";
import Profile from "../pages/user/Profile";
import Orders from "../pages/user/Orders";
import Settings from "../pages/user/Settings";
import ProductRider from "../components/customer/ProductRider";
import FavoritesPage from "../pages/customer/FavoritesPage";

const AppRoutes = () => (
  <Routes>
    {/* Auth */}
    <Route path="/register" element={<Register />} />
    <Route path="/login" element={<Login />} />

    {/* Admin */}
    <Route path="/admin" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
    <Route path="/admin/products" element={<AdminLayout><AdminProductList /></AdminLayout>} />
    <Route path="/admin/add-product" element={<AdminLayout><AdminProductForm /></AdminLayout>} />
    <Route path="/admin/orders" element={<AdminLayout><OrderList /></AdminLayout>} />
    <Route path="/admin/sellers" element={<AdminLayout><SellerList /></AdminLayout>} />
    <Route path="/admin/settings" element={<AdminLayout><AdminSettings /></AdminLayout>} />

    {/* Customer */}
    <Route path="/" element={<HomePage />} />
    <Route path="/all" element={<Shop category="all" />} />
    <Route path="/men" element={<Shop category="men" />} />
    <Route path="/women" element={<Shop category="women" />} />
    <Route path="/kids" element={<Shop category="kids" />} />
    <Route path="/cart" element={<CartPage />} />
    <Route path="/thank-you" element={<ThankYou />} />
    <Route path="/product/:id" element={<ProductDetails />} />
    <Route path="/verify-otp" element={<VerifyOtp />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/orders" element={<Orders />} />
    <Route path="/settings" element={<Settings />} />
    <Route path="/settings" element={<ProductRider />} />
    <Route path="/favorites" element={<FavoritesPage />} />

    {/* <Route path="/thank-you" element={<ThankYou />} />
    <Route path="/thank-you" element={<Order />} />
    <Route path="/thank-you" element={<ThankYou />} /> */}
  </Routes>
);

export default AppRoutes;
