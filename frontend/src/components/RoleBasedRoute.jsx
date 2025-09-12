import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RoleBasedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();
  return allowedRoles.includes(user?.role) ? children : <Navigate to="/auth" />;
};

export default RoleBasedRoute;
   