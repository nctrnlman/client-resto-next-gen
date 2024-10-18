import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/products/product";

function useProducts() {
  const dispatch = useDispatch();
  // Mengakses data produk, status, dan error dari store Redux
  const products = useSelector((state) => state.products.products);
  const productStatus = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);

  // useEffect hook untuk mengambil produk saat status idle
  useEffect(() => {
    if (productStatus === "idle") {
      dispatch(fetchProducts()); // Mengirim action fetchProducts untuk mendapatkan data produk
    }
  }, [productStatus, dispatch]); // Daftar ketergantungan mencakup productStatus dan dispatch

  // Mengembalikan produk, status, dan error untuk digunakan dalam komponen
  return { products, productStatus, error };
}

export default useProducts;
