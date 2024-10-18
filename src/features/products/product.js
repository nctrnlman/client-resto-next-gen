import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ category, search }, thunkAPI) => {
    try {
      // Melakukan permintaan GET untuk mengambil data produk
      const response = await axios.get("http://localhost:8000/api/products", {
        params: {
          categoryId: category || "", // Mengirim kategori jika ada
          search: search || "", // Mengirim query pencarian jika ada
        },
        // headers: {
        //   Authorization: `Bearer ${localStorage.getItem("token")}`, // Adjust this as needed
        // },
      });
      return response.data.data; // Mengembalikan data produk dari response
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.errors);
    }
  }
);

// Membuat slice untuk produk
const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [], // State untuk menyimpan daftar produk
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Mengelola state berdasarkan status fetch
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading"; // Mengatur status menjadi loading saat permintaan dimulai
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded"; // Mengatur status menjadi succeeded saat permintaan berhasil
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed"; // Mengatur status menjadi failed saat permintaan gagal
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
