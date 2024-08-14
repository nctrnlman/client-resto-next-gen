import { Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { isTokenValid } from "./auth";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const token = localStorage.getItem("token");
  const tableId = new URLSearchParams(location.search).get("tableId");

  useEffect(() => {
    if (!localStorage.getItem("tableId")) {
      localStorage.setItem("tableId", "99");
    }

    if (tableId) {
      localStorage.setItem("tableId", tableId);
    }
  }, [tableId]);

  if (!isTokenValid(token)) {
    if (location.pathname.startsWith("/admin")) {
      return <Navigate to="/admin/login" />;
    }
    return <Navigate to="/login" />;
  }

  if (
    location.pathname === "/admin/login" &&
    location.pathname.startsWith("/admin")
  ) {
    return <Navigate to="/admin/home" />;
  }

  if (
    location.pathname === "/login" &&
    !location.pathname.startsWith("/admin")
  ) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
