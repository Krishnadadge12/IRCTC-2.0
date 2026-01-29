import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// Protects routes that require admin role
const AdminProtectedRoute = ({ children }) => {
  const { user, isLoading } = useAuth();

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '50vh',
        fontSize: '18px'
      }}>
        Loading...
      </div>
    );
  }

  // Check if user exists and has admin role
  const isAdmin = user && (user.role === 'admin' || user.role === 'Admin');

  if (!isAdmin) {
    // Redirect non-admin users to login
    return <Navigate to="/home/login" replace />;
  }

  // If children provided, render them (for direct usage)
  // Otherwise, render Outlet for nested routes
  return children ? children : <Outlet />;
};

export default AdminProtectedRoute;
