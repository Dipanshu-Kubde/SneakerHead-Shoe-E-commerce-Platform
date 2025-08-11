import "./AdminSettings.css";

export default function AdminSettings() {
  const role = localStorage.getItem("role") || "CUSTOMER";

  return (
    <div className="admin-settings">
      <h1>Settings</h1>
      <p>Your current role:</p>
      <p className="role-tag">{role}</p>
      <p className="mt-4">
        Access: {role === "ADMIN" ? "Full access to all pages" : role === "SELLER" ? "Can manage products & orders" : "Customer access only"}
      </p>
    </div>
  );
}
