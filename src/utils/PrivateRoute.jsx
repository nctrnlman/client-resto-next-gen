import { Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { isTokenValid } from "./auth";

const PrivateRoute = ({ children }) => {
  const location = useLocation(); // Mendapatkan objek lokasi saat ini
  const token = localStorage.getItem("token"); // Mengambil token dari local storage
  const tableId = new URLSearchParams(location.search).get("tableId"); // Mengambil nilai tableId dari query parameter

  // Mengatur efek samping untuk mengelola tableId di local storage
  useEffect(() => {
    // Jika tableId belum ada di local storage, set ke nilai default "99"
    if (!localStorage.getItem("tableId")) {
      localStorage.setItem("tableId", "99");
    }

    // Jika ada tableId di URL, simpan ke local storage
    if (tableId) {
      localStorage.setItem("tableId", tableId);
    }
  }, [tableId]); // Bergantung pada perubahan tableId

  // Memeriksa apakah token valid
  if (!isTokenValid(token)) {
    // Jika token tidak valid dan berada di rute admin, arahkan ke halaman login admin
    if (location.pathname.startsWith("/admin")) {
      return <Navigate to="/admin/login" />;
    }
    // Jika token tidak valid dan tidak di rute admin, arahkan ke halaman login umum
    return <Navigate to="/login" />;
  }

  // Jika berada di rute login admin dan sudah memiliki token, arahkan ke halaman home admin
  if (
    location.pathname === "/admin/login" &&
    location.pathname.startsWith("/admin")
  ) {
    return <Navigate to="/admin/home" />;
  }

  // Jika berada di rute login pelanggan dan sudah memiliki token, arahkan ke dashboard pelanggan
  if (
    location.pathname === "/login" &&
    !location.pathname.startsWith("/admin")
  ) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
