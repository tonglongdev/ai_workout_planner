import { Navigate, Outlet } from "react-router-dom";
import { useCurrentUser } from "../hooks/useCurrentUser";

const ProtectedRoute = () => {
  const { data, isLoading, isError } = useCurrentUser();

  if (isLoading) return <div>Loading...</div>;

  if (isError || !data) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
