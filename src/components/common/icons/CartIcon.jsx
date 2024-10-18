import React from "react";
import { useSelector } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";

const CartIcon = ({ onClick }) => {
  // Mengambil items dari state cart menggunakan useSelector
  const cartItems = useSelector((state) => state.cart.items);
  // Menghitung total jumlah item dalam keranjang
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div
      className="fixed bottom-4 right-4 mr-4 flex items-center justify-center bg-teal-500 text-white p-4 rounded-full shadow-lg cursor-pointer"
      onClick={onClick}
    >
      <FaShoppingCart size={24} />
      {itemCount > 0 && (
        <span className="ml-2 text-sm bg-white text-teal-500 rounded-full px-2">
          {itemCount} {/* Menampilkan total jumlah item */}
        </span>
      )}
    </div>
  );
};

export default CartIcon;
