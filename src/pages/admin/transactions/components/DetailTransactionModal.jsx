import {
  formatCurrencyToIDR,
  formatDateTime,
} from "../../../../utils/formatters";

const DetailTransactionModal = ({ isOpen, onClose, order }) => {
  if (!isOpen) return null;

  const handleClose = (e) => {
    if (e.target.id === "modal-container" || e.target.tagName === "BUTTON") {
      onClose();
    }
  };

  return (
    <div
      id="modal-container"
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleClose}
    >
      <div className="bg-white p-4 rounded-lg w-full max-w-lg relative">
        <h2 className="text-xl font-bold mb-4">Order Details</h2>
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
        <div className="mb-4">
          <strong>Order ID:</strong> {order.id || "N/A"}
        </div>
        <div className="mb-4">
          <strong>User Name:</strong> {order.users?.name || "N/A"}
        </div>
        <div className="mb-4">
          <strong>Table Number:</strong> {order.no_table || "N/A"}
        </div>
        <div className="mb-4">
          <strong>Status:</strong> {order.status || "N/A"}
        </div>
        <div className="mb-4">
          <strong>Total Price:</strong>{" "}
          {formatCurrencyToIDR(order.total_price) || "N/A"}
        </div>
        <div className="mb-4">
          <strong>Created At:</strong>{" "}
          {formatDateTime(order.createdAt) || "N/A"}
        </div>
        <div className="mb-4">
          <strong>Updated At:</strong>{" "}
          {formatDateTime(order.updatedAt) || "N/A"}
        </div>
        <div className="mb-4">
          <strong>Order Details:</strong>
          {order.orderDetails && order.orderDetails.length > 0 ? (
            <ul>
              {order.orderDetails.map((detail) => (
                <li key={detail.id}>
                  {detail.Product.product_name} - {detail.quantity} x{" "}
                  {formatCurrencyToIDR(detail.product_price)}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-red-500">No order details available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailTransactionModal;
