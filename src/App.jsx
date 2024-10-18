import { Route, Routes, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./features/users/user";
import { fetchUserDetail } from "./hooks/useFetchUserDetail";
import "./App.css";
import DashboardAdmin from "./pages/admin/dashboard/DashboardAdmin";
import LoginAdmin from "./pages/admin/auth/LoginAdmin";
import DashboardCustomer from "./pages/customer/dashboard/DashboardCustomer";
import TransactionsAdmin from "./pages/admin/transactions/TransactionsAdmin";
import CategoriesCustomer from "./pages/customer/categories/CategoriesCustomer";
import PrivateRoute from "./utils/PrivateRoute";
import UsersAdmin from "./pages/admin/users/UsersAdmin";
import ProductsAdmin from "./pages/admin/products/ProductsAdmin";
import CartIcon from "./components/common/icons/CartIcon";
import CartModal from "./components/common/cards/CartModal";
import LoginCustomer from "./pages/customer/auth/login/LoginCustomer";
import RegisterCustomer from "./pages/customer/auth/register/RegisterCustomer";
import BillCustomer from "./pages/customer/bill/BillCustomer";

function App() {
  const location = useLocation(); // Mendapatkan lokasi saat ini dari URL
  const [isCartOpen, setIsCartOpen] = useState(false); // State untuk mengontrol visibilitas modal keranjang
  const dispatch = useDispatch(); // Menginisialisasi dispatch dari Redux
  const user = useSelector((state) => state.user.User); // Mengambil data pengguna dari Redux store

  // Mengambil detail pengguna saat komponen pertama kali dimuat
  useEffect(() => {
    const token = localStorage.getItem("token"); // Mengambil token dari local storage

    // Jika token ada dan data pengguna belum diambil
    if (token && user.length === 0) {
      const fetchUser = async () => {
        try {
          const userData = await fetchUserDetail(token); // Mengambil data pengguna
          dispatch(setUser(userData.data)); // Menyimpan data pengguna ke Redux store
        } catch (error) {
          console.error("Error fetching user data:", error.message);
        }
      };

      fetchUser();
    }
  }, [dispatch, user]); // Menjalankan efek ini saat dispatch atau user berubah

  // Mengatur fungsi untuk membuka modal keranjang
  const handleCartIconClick = () => {
    setIsCartOpen(true);
  };

  // Mengatur fungsi untuk menutup modal keranjang
  const handleCloseCartModal = () => {
    setIsCartOpen(false);
  };

  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginCustomer />} />
        <Route path="/register" element={<RegisterCustomer />} />

        {/* Private Routes for Customers */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <DashboardCustomer />
            </PrivateRoute>
          }
        />
        <Route
          path="/bill"
          element={
            <PrivateRoute>
              <BillCustomer />
            </PrivateRoute>
          }
        />
        <Route
          path="/categories"
          element={
            <PrivateRoute>
              <CategoriesCustomer />
            </PrivateRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin/home"
          element={
            <PrivateRoute>
              <DashboardAdmin />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <PrivateRoute>
              <ProductsAdmin />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/transactions"
          element={
            <PrivateRoute>
              <TransactionsAdmin />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <PrivateRoute>
              <UsersAdmin />
            </PrivateRoute>
          }
        />
        <Route path="/admin/login" element={<LoginAdmin />} />
      </Routes>

      {/* Show cart icon and modal if not on admin route */}
      {!location.pathname.startsWith("/admin") && (
        <>
          <CartIcon onClick={handleCartIconClick} />
          <CartModal isOpen={isCartOpen} onClose={handleCloseCartModal} />
        </>
      )}
    </>
  );
}

export default App;
