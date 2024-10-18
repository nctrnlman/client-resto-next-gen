import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // Inisialisasi state awal keranjang dengan array kosong
};

// Membuat slice untuk keranjang belanja
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Reducer untuk menambah item ke keranjang
    addToCart: (state, action) => {
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id // Mencari indeks item berdasarkan ID
      );
      if (itemIndex >= 0) {
        // Jika item sudah ada di keranjang
        state.items[itemIndex].quantity += 1; // Tambah kuantitas
      } else {
        // Jika item belum ada di keranjang
        state.items.push({ ...action.payload, quantity: 1 }); // Tambah item baru dengan kuantitas 1
      }
    },
    // Reducer untuk menghapus item dari keranjang
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id); // Menghapus item berdasarkan ID
    },
    // Reducer untuk menghapus semua item dari keranjang
    clearCart: (state) => {
      state.items = []; // Mengatur keranjang menjadi array kosong
    },
  },
});

// Mengekspor action yang telah dibuat
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
