import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const TCProtectedRoute = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) return null;

  if (!user || user.role !== "ROLE_TC") {
    return <Navigate to="/home/login" replace />;
  }

  return <Outlet />;
};

export default TCProtectedRoute;
