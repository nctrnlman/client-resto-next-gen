import { useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../utils/axiosInstance";

const useCheckout = (orderType) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [responseData, setResponseData] = useState(null);

  const user = useSelector((state) => state.user.User);
  const cartItems = useSelector((state) => state.cart.items);
  const tableId = localStorage.getItem("tableId");

  const total_price = cartItems.reduce(
    (total, item) => total + parseFloat(item.product_price) * item.quantity,
    0
  );

  const checkout = async () => {
    setLoading(true);
    setError(null);

    const checkoutData = {
      user_id: user.id,
      no_table: tableId,
      orderDetails: cartItems,
      total_price,
      order_type: orderType,
    };

    try {
      const response = await axiosInstance.post("/orders", checkoutData);
      setResponseData(response.data);
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
