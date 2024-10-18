import { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
const useFetchProducts = () => {
  // Menggunakan state untuk menyimpan nilai dari input form
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get("/products", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (response.data.status === "success") {
        setProducts(response.data.data); // Menyimpan data produk jika berhasil
      } else {
        setError(response.data.message || "Failed to fetch products"); // Menyimpan pesan error jika tidak berhasil
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  // Memanggil fetchProducts saat komponen dimuat
  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, loading, error, refetch: fetchProducts };
};

export default useFetchProducts;
