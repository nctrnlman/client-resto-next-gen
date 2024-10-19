import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../../../features/orders/order";
import { toast } from "react-toastify";
import axiosInstance from "../../../../utils/axiosInstance";
import DataTable from "../../../../components/common/tables/DataTable";
import DetailTransactionModal from "../components/DetailTransactionModal";
import UpdateStatusModal from "../components/UpdateStatusModal";
import {
  formatCurrencyToIDR,
  formatDateTime,
} from "../../../../utils/formatters";

const TransactionList = () => {
  const dispatch = useDispatch(); // Mendapatkan fungsi dispatch dari Redux
  const { orders, status, error } = useSelector((state) => state.order); // Mengambil data pesanan, status, dan error dari state Redux
  const [selectedOrder, setSelectedOrder] = useState(null); // Menyimpan pesanan yang dipilih
  const [isDetailModalOpen, setDetailModalOpen] = useState(false); // Menyimpan status apakah modal detail terbuka
  const [isStatusModalOpen, setStatusModalOpen] = useState(false); // Menyimpan status apakah modal update status terbuka

  useEffect(() => {
    // Mengambil data pesanan saat komponen dimuat
    dispatch(fetchOrders({ user_id: null, no_table: null }));
  }, [dispatch]); // Menjalankan efek ini hanya ketika dispatch berubah

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setDetailModalOpen(true);
  };

  const handleUpdateStatus = (order) => {
    setSelectedOrder(order);
    setStatusModalOpen(true);
  };

  const handleStatusUpdateSubmit = async (updatedStatus) => {
    // Menangani pengiriman pembaruan status pesanan
    try {
      const response = await axiosInstance.put(
        `/orders/${selectedOrder.id}`, // Endpoint untuk memperbarui status pesanan
        { status: updatedStatus }, // Data yang akan dikirim
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      dispatch(fetchOrders({ user_id: null, no_table: null })); // Mengambil ulang data pesanan setelah pembaruan
      setStatusModalOpen(false); // Menutup modal setelah berhasil
      toast.success(response.data.message);
    } catch (error) {
      console.error("Failed to update order status:", error);
      toast.error(
        error.response?.data?.message || "Failed to update order status"
      );
    }
  };

  // Definisi kolom untuk DataTable
  const columns = [
    { field: "id", headerName: "Order ID", width: 100 },
    { field: "user_id", headerName: "Customer Name", width: 150 },
    { field: "no_table", headerName: "Table Number", width: 150 },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params) => (
        <span
          className={`px-2 py-1 rounded text-white font-semibold ${
            params.value === "completed" ? "bg-green-500" : "bg-blue-500"
          }`}
        >
          {params.value.charAt(0).toUpperCase() + params.value.slice(1)}
        </span>
      ),
    },
    {
      field: "total_price",
      headerName: "Total Price",
      width: 150,
      renderCell: (params) => formatCurrencyToIDR(params.value),
    },
    {
      field: "createdAt",
      headerName: "Order Time",
      width: 200,
      renderCell: (params) => formatDateTime(params.value),
    },
    {
      field: "updatedAt",
      headerName: "Updated Time",
      width: 200,
      renderCell: (params) => formatDateTime(params.value),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <div className="flex space-x-2">
          <button
            onClick={() => handleViewDetails(params.row)}
            className=" text-teal-500 hover:text-teal-800 px-3 py-2 rounded  transition duration-200"
            title="See Details"
          >
            See Details
          </button>
          <button
            onClick={() => handleUpdateStatus(params.row)}
            className="text-brand-500  px-3 py-2 rounded hover:text-brand-800 transition duration-200"
            title="Update Status"
          >
            Update Status
          </button>
        </div>
      ),
    },
  ];
  // Menangani kondisi error
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Orders List</h1>
      <DataTable
        rows={orders.map((order) => ({
          id: order.id,
          user_id: order.user.name, // Mengambil nama pengguna dari data pesanan
          no_table: order.no_table,
          status: order.status,
          total_price: order.total_price,
          createdAt: order.createdAt,
          updatedAt: order.updatedAt,
          orderDetails: order.OrderDetails, // Mengambil detail pesanan
          users: order.user, // Menyimpan data pengguna
        }))}
        columns={columns} // Menggunakan kolom yang telah didefinisikan
        loading={status === "loading"} // Menampilkan loading jika statusnya loading
      />

      {/* Modal untuk menampilkan detail transaksi */}
      <DetailTransactionModal
        isOpen={isDetailModalOpen}
        onClose={() => setDetailModalOpen(false)} // Menutup modal detail
        order={selectedOrder || {}} // Mengirimkan data pesanan yang dipilih
      />
      {/* Modal untuk memperbarui status pesanan */}
      <UpdateStatusModal
        isOpen={isStatusModalOpen}
        onClose={() => setStatusModalOpen(false)} // Menutup modal update status
        onSubmit={handleStatusUpdateSubmit} // Mengirimkan fungsi pembaruan status
        currentStatus={selectedOrder?.status || ""} // Mengirimkan status saat ini
      />
    </div>
  );
};

export default TransactionList;
