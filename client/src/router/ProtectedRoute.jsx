import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children, allowed }) {
  const { user, token } = useAuth();

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (allowed && !allowed.includes(user.role)) {
    return <Navigate to="/" replace />; // or show Access Denied page
  }

  return children;
}