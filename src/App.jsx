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
  const location = useLocation(); // Get current URL location
  const [isCartOpen, setIsCartOpen] = useState(false); // State to control cart modal visibility
  const dispatch = useDispatch(); // Initialize Redux dispatch
  const user = useSelector((state) => state.user.User); // Get user data from Redux store

  // Fetch user details when component first mounts
  useEffect(() => {
    const token = localStorage.getItem("token"); // Get token from local storage

    // If token exists and user data has not been fetched
    if (token && user.length === 0) {
      const fetchUser = async () => {
        try {
          const userData = await fetchUserDetail(token); // Fetch user data
          dispatch(setUser(userData.data)); // Store user data in Redux
        } catch (error) {
          console.error("Error fetching user data:", error.message);
        }
      };

      fetchUser();
    }
  }, [dispatch, user]); // Run this effect when dispatch or user changes

  // Function to open cart modal
  const handleCartIconClick = () => {
    setIsCartOpen(true);
  };

  // Function to close cart modal
  const handleCloseCartModal = () => {
    setIsCartOpen(false);
  };

  // Hide cart on specific routes
  const hideCartOnRoutes = ["/login", "/register", "/admin/login"];

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

      {/* Show cart icon and modal if not on admin route or specific login/register routes */}
      {!location.pathname.startsWith("/admin") &&
        !hideCartOnRoutes.includes(location.pathname) && (
          <>
            <CartIcon onClick={handleCartIconClick} />
            <CartModal isOpen={isCartOpen} onClose={handleCloseCartModal} />
          </>
        )}
    </>
  );
}

export default App;
