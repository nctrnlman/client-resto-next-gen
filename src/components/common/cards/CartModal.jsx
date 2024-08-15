import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart, removeFromCart } from "../../../features/cart/cart";
import { FaTimes, FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { fetchOrders } from "../../../features/orders/order";
import useCheckout from "../../../hooks/useCheckout";

const CartModal = ({ isOpen, onClose }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const orders = useSelector((state) => state.order.orders);
  const user = useSelector((state) => state.user.User);
  const dispatch = useDispatch();
  const [orderType, setOrderType] = useState("");
  const [orderExists, setOrderExists] = useState(false);
  const { checkout, loading, error } = useCheckout(orderType);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrderStatus = async () => {
      try {
        const no_table = localStorage.getItem("tableId");
        await dispatch(fetchOrders({ user_id: user.id, no_table })).unwrap();
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      }
    };

    if (isOpen && user.id) {
      fetchOrderStatus();
    }
  }, [isOpen, user.id, dispatch]);

  useEffect(() => {
    setOrderExists(orders.length > 0);
  }, [orders]);

  if (!isOpen) return null;

  const totalPrice = cartItems.reduce(
    (total, item) => total + parseFloat(item.product_price) * item.quantity,
    0
  );

  const handleCheckout = async () => {
    try {
      const response = await checkout();
      if (response && response.data && response.data.message) {
        toast.success(response.data.message);
        dispatch(clearCart());
        navigate("/bill");
      }
    } catch (err) {
      toast.error("Checkout failed. Please try again.");
    } finally {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Cart</h2>
          <button onClick={onClose} className="text-red-500">
            <FaTimes size={24} />
          </button>
        </div>
        {cartItems.length === 0 ? (
          <p className="text-center">Your cart is empty</p>
        ) : (
          <div>
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center mb-4"
              >
                <div>
                  <h3 className="font-bold">{item.product_name}</h3>
                  <p>
                    IDR {item.product_price} x {item.quantity}
                  </p>
                </div>
                <button
                  onClick={() => dispatch(removeFromCart(item))}
                  className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-200"
                >
                  <FaTrashAlt size={20} />
                </button>
              </div>
            ))}
            <div className="mt-4">
              <p className="text-lg font-bold">Total Price: IDR {totalPrice}</p>
              {!orderExists && (
                <div className="mt-4">
                  <label className="block mb-2">Order Type:</label>
                  <select
                    value={orderType}
                    onChange={(e) => setOrderType(e.target.value)}
                    className="border rounded-md p-2 w-full"
                  >
                    <option value="">Choose Type</option>
                    <option value="dine_in">Dine In</option>
                    <option value="take_away">Takeaway</option>
                  </select>
                </div>
              )}
            </div>
            <div className="mt-6">
              <button
                onClick={handleCheckout}
                className="bg-teal-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-300 transition duration-200 w-full"
                disabled={loading}
              >
                {loading ? "Processing..." : "Checkout"}
              </button>
              {error && <p className="text-red-500 mt-2">{error}</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;
