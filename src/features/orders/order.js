import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

export const fetchOrders = createAsyncThunk(
  "order/fetchOrders",
  async ({ user_id, no_table }) => {
    const response = await axiosInstance.get("/orders", {
      params: { user_id, no_table, status: "pending" },
    });
    return response.data.data;
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default orderSlice.reducer;
