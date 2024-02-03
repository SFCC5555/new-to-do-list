import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const profile = useSelector((state) => state.profile);

  if (!profile.auth) return <Navigate to="/login" replace />;
  return <Outlet />;
};

export { ProtectedRoute };
