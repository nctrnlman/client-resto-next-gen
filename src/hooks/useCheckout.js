import { useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../utils/axiosInstance";

const useCheckout = (orderType) => {
  // Menggunakan state untuk menyimpan nilai dari input form
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [responseData, setResponseData] = useState(null);

  const user = useSelector((state) => state.user.User); // Mengambil data user dari Redux
  const cartItems = useSelector((state) => state.cart.items); // Mengambil data item keranjang dari Redux
  const tableId = localStorage.getItem("tableId"); // Mengambil ID tabel dari localStorage

  // Menghitung total harga dari item keranjang
  const total_price = cartItems.reduce(
    (total, item) => total + parseFloat(item.product_price) * item.quantity,
    0
  );

  // Fungsi untuk melakukan checkout
  const checkout = async () => {
    setLoading(true);
    setError(null);

    // Data yang akan dikirim ke server

    const checkoutData = {
      user_id: user.id,
      no_table: tableId,
      orderDetails: cartItems,
      total_price,
      order_type: orderType,
    };

    try {
      // Mengirim permintaan POST ke server dengan data checkout
      const response = await axiosInstance.post("/orders", checkoutData);
      setResponseData(response.data); // Menyimpan data respons
      return response;
    } catch (err) {
      console.error("Checkout failed:", err);
      setError("Checkout failed. Please try again.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { checkout, loading, error, responseData };
};

export default useCheckout;
