import { createSlice } from "@reduxjs/toolkit";

export const UserSlice = createSlice({
  name: "User",
  initialState: {
    User: [], // State awal untuk menyimpan informasi pengguna
  },
  reducers: {
    // Reducer untuk mengatur state pengguna
    setUser: (state, action) => {
      state.User = action.payload; // Mengupdate state User dengan payload yang diterima
    },
  },
});

// Mengekspor action setUser untuk digunakan di komponen
export const { setUser } = UserSlice.actions;

export default UserSlice.reducer;
