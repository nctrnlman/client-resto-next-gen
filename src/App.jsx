import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import DashboardAdmin from "./pages/admin/dashboard/DashboardAdmin";
import LoginAdmin from "./pages/admin/auth/LoginAdmin";
import Index from "./pages/base/Index";
import DashboardCustomer from "./pages/customer/dashboard/DashboardCustomer";
import TransactionsAdmin from "./pages/admin/transactions/TransactionsAdmin";
import FavoriteCustomer from "./pages/customer/favorite/FavoriteCustomer";
import CategoriesCustomer from "./pages/customer/categories/CategoriesCustomer";
import PrivateRoute from "./utils/PrivateRoute";
import UsersAdmin from "./pages/admin/users/UsersAdmin";
import ProductsAdmin from "./pages/admin/products/ProductsAdmin";

import { useState } from "react";
import CartIcon from "./components/common/icons/CartIcon";
import CartModal from "./components/common/cards/CartModal";

function App() {
  const location = useLocation();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleCartIconClick = () => {
    setIsCartOpen(true);
  };

  const handleCloseCartModal = () => {
    setIsCartOpen(false);
  };

  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      <Routes>
        {/* <Route path="/" element={<Index />} /> */}
        <Route path="/" element={<DashboardCustomer />} />
        <Route path="/favorite" element={<FavoriteCustomer />} />
        <Route path="/categories" element={<CategoriesCustomer />} />
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

      {!isAdminRoute && (
        <>
          <CartIcon onClick={handleCartIconClick} />
          <CartModal isOpen={isCartOpen} onClose={handleCloseCartModal} />
        </>
      )}
    </>
  );
}

export default App;
