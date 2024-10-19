import { useState, useEffect } from "react";

const UpdateStatusModal = ({ isOpen, onClose, onSubmit, currentStatus }) => {
  const [status, setStatus] = useState(currentStatus);

  // Menggunakan useEffect untuk memperbarui status ketika currentStatus berubah
  useEffect(() => {
    setStatus(currentStatus); // Mengupdate status ketika currentStatus berubah
  }, [currentStatus]); // Dependensi: currentStatus

  // Jika modal tidak terbuka, kembalikan null

  if (!isOpen) return null;

  const handleSubmit = () => {
    // Menangani pengiriman status yang diperbarui
    onSubmit(status); // Memanggil fungsi onSubmit dengan status baru
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-xl font-bold mb-4">Update Order Status</h2>
        <div className="mb-4">
          <label htmlFor="status" className="block text-sm font-medium mb-2">
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full"
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <button
          className="bg-teal-500 text-white px-4 py-2 rounded mr-2"
          onClick={handleSubmit}
        >
          Update Status Order
        </button>
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default UpdateStatusModal;
