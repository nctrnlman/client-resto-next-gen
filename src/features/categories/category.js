import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, thunkAPI) => {
    // Fungsi async
    try {
      // Mengambil data kategori dari API
      const response = await axios.get("http://localhost:8000/api/categories", {
        // headers: { Authorization: `Bearer ${thunkAPI.getState().auth.token}` },
      });
      return response.data.data; // Mengembalikan data kategori
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.errors);
    }
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading"; // Mengatur status menjadi loading saat permintaan dimulai
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "succeeded"; // Mengatur status menjadi succeeded saat permintaan berhasil
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; // Mengatur status menjadi failed saat permintaan gagal
      });
  },
});

export default categoriesSlice.reducer;
