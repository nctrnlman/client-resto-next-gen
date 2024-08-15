import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "../features/users/user";
import ProductReducer from "../features/products/product";
import OrderReducer from "../features/orders/order";
import CategoriesReducer from "../features/categories/category";
import CartReducer from "../features/cart/cart";

export default configureStore({
  reducer: {
    user: UserReducer,
    products: ProductReducer,
    categories: CategoriesReducer,
    cart: CartReducer,
    order: OrderReducer,
  },
});
