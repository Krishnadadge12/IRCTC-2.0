import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const AdminProtectedRoute = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) return null;

  // Not logged in
  if (!user) {
    return <Navigate to="/home/login" replace />;
  }

  // Block NON-admins
  if (user.role !== "ROLE_ADMIN") {
    return <Navigate to="/home" replace />;
  }

  // ✅ Admin allowed
  return <Outlet />;
};

export default AdminProtectedRoute;
