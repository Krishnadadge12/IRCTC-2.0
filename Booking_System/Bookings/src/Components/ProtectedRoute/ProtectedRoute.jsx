import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) return null;

  // Not logged in
  if (!user) {
    return <Navigate to="/home/login" replace />;
  }

  // Only passengers can access these routes
  if (user.role !== "ROLE_PASSENGERS") {
    return <Navigate to="/home" replace />;
  }

  if (user.role === "ROLE_ADMIN") {
  return <Navigate to="/admin/home" replace />;
}

if (user.role === "ROLE_TC") {
  return <Navigate to="/tc" replace />;
}
  return <Outlet />;
};

export default ProtectedRoute;
