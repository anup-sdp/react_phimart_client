import { Navigate } from "react-router";
import useAuthContext from "../hooks/useAuthContext";

const PrivateRoute = ({ children }) => {
  const { user, isLoading } = useAuthContext();

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  // Redirect to login if not authenticated
  return user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;