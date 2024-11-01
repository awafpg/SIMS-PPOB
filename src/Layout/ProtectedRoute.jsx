import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getAuthToken } from "../utils/memberUtil";

const ProtectedRoute = () => {
  const token = getAuthToken();
  const location = useLocation();

  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
export default ProtectedRoute;
