import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";

export const fetchOrders = createAsyncThunk(
  "order/fetchOrders",
  async ({ user_id, no_table, status }) => {
    // Parameter input untuk fungsi async
    const params = { user_id, no_table }; // Membuat objek parameter untuk permintaan

    // Menambahkan status ke parameter jika ada
    if (status) {
      params.status = status;
    }
    // Melakukan permintaan GET untuk mengambil data pesanan
    const response = await axiosInstance.get("/orders", {
      params, // Mengirim parameter sebagai query string
    });

    return response.data.data; // Mengembalikan data pesanan dari response
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [], // State untuk menyimpan daftar pesanan
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Mengelola state berdasarkan status fetch
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = "loading"; // Mengatur status menjadi loading saat permintaan dimulai
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = "succeeded"; // Mengatur status menjadi succeeded saat permintaan berhasil
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = "failed"; // Mengatur status menjadi failed saat permintaan gagal
        state.error = action.error.message;
      });
  },
});

export default orderSlice.reducer;
