import axiosInstance from "../utils/axiosInstance";

export const fetchUserDetail = async (token) => {
  try {
    // Melakukan permintaan GET untuk mengambil detail pengguna
    const response = await axiosInstance.get("/users/token", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Mengembalikan data pengguna yang diterima dari API
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch user data"
    );
  }
};
