import { Navigate } from "react-router-dom";
import { isTokenValid } from "./auth";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!isTokenValid(token)) {
    return <Navigate to="/admin/login" />;
  }

  return children;
};

export default PrivateRoute;
