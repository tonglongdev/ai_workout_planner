import { Navigate, Outlet } from "react-router-dom";
import { isAuthenticated } from "../util/auth";

const GuestRoute = () => {
  if (isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  return <Outlet/>;
};
export default GuestRoute;