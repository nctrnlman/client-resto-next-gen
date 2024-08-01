import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "../features/users/user";

export default configureStore({
  reducer: {
    user: UserReducer,
  },
});
