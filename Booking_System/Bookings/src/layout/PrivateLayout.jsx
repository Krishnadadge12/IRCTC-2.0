import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../Components/Navbar/Navbar";

const PrivateLayout = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return null;
  if (!isAuthenticated) return <Navigate to="/home/login" />;

  return (
    <div className="app-layout">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default PrivateLayout;
