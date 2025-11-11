import { Navigate } from "react-router-dom";

const ProtectedAdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));

  // ✅ User not logged in → go to login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ✅ User logged in but NOT admin → go to home
  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // ✅ Admin user → allow access
  return children;
};

export default ProtectedAdminRoute;
