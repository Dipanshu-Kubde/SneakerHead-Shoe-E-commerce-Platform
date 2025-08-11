// decode JWT payload
export function getUserFromToken() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload; // e.g., { name: "John", email: "john@example.com" }
  } catch (e) {
    return null;
  }
}
// check if user is authenticated