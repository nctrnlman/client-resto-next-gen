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
  const dispatch = useDispatch();
  const { orders, status, error } = useSelector((state) => state.order);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isDetailModalOpen, setDetailModalOpen] = useState(false);
  const [isStatusModalOpen, setStatusModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchOrders({ user_id: null, no_table: null }));
  }, [dispatch]);

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setDetailModalOpen(true);
  };

  const handleUpdateStatus = (order) => {
    setSelectedOrder(order);
    setStatusModalOpen(true);
  };

  const handleStatusUpdateSubmit = async (updatedStatus) => {
    try {
      const response = await axiosInstance.put(
        `/orders/${selectedOrder.id}`,
        { status: updatedStatus },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      dispatch(fetchOrders({ user_id: null, no_table: null }));
      setStatusModalOpen(false);
      toast.success(response.data.message);
    } catch (error) {
      console.error("Failed to update order status:", error);
      toast.error(
        error.response?.data?.message || "Failed to update order status"
      );
    }
  };

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

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Orders List</h1>
      <DataTable
        rows={orders.map((order) => ({
          id: order.id,
          user_id: order.user.name,
          no_table: order.no_table,
          status: order.status,
          total_price: order.total_price,
          createdAt: order.createdAt,
          updatedAt: order.updatedAt,
          orderDetails: order.OrderDetails,
          users: order.user,
        }))}
        columns={columns}
        loading={status === "loading"}
      />

      <DetailTransactionModal
        isOpen={isDetailModalOpen}
        onClose={() => setDetailModalOpen(false)}
        order={selectedOrder || {}}
      />
      <UpdateStatusModal
        isOpen={isStatusModalOpen}
        onClose={() => setStatusModalOpen(false)}
        onSubmit={handleStatusUpdateSubmit}
        currentStatus={selectedOrder?.status || ""}
      />
    </div>
  );
};

export default TransactionList;
