import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../../../features/cart/cart";
import { FaTimes, FaTrashAlt } from "react-icons/fa";

const CartModal = ({ isOpen, onClose }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  if (!isOpen) return null;

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
          <div className="">
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
            <div className="mt-6">
              <button
                onClick={() => {
                  dispatch(clearCart());
                  onClose();
                }}
                className="bg-teal-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-300 transition duration-200 w-full"
              >
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;
