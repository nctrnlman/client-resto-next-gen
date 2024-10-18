import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "../features/users/user";
import ProductReducer from "../features/products/product";
import OrderReducer from "../features/orders/order";
import CategoriesReducer from "../features/categories/category";
import CartReducer from "../features/cart/cart";

// Mengonfigurasi store Redux
export default configureStore({
  reducer: {
    user: UserReducer, // Mengaitkan reducer pengguna dengan key 'user'
    products: ProductReducer, // Mengaitkan reducer produk dengan key 'products'
    categories: CategoriesReducer, // Mengaitkan reducer kategori dengan key 'categories'
    cart: CartReducer, // Mengaitkan reducer keranjang dengan key 'cart'
    order: OrderReducer, // Mengaitkan reducer pesanan dengan key 'order'
  },
});
