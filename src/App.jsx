import { Route, Routes } from "react-router-dom";
import "./App.css";
import DashboardAdmin from "./pages/admin/dashboard/DashboardAdmin";
import LoginAdmin from "./pages/admin/auth/LoginAdmin";
import Index from "./pages/base/Index";
import DashboardCustomer from "./pages/customer/dashboard/DashboardCustomer";
import OrdersAdmin from "./pages/admin/orders/OrdersAdmin";
import FavoriteCustomer from "./pages/customer/favorite/FavoriteCustomer";
import CategoriesCustomer from "./pages/customer/categories/CategoriesCustomer";

function App() {
  return (
    <>
      <Routes>
        {/* <Route path="/" element={<Index />} /> */}
        <Route path="/" element={<DashboardCustomer />} />
        <Route path="/favorite" element={<FavoriteCustomer />} />
        <Route path="/categories" element={<CategoriesCustomer />} />
        <Route path="/admin/dashboard" element={<DashboardAdmin />} />
        <Route path="/admin/orders" element={<OrdersAdmin />} />
        <Route path="/admin/login" element={<LoginAdmin />} />
      </Routes>
    </>
  );
}

export default App;
