import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrders } from "../../../../features/orders/order";
import { formatCurrencyToIDR } from "../../../../utils/formatters";

const BillCard = () => {
  const dispatch = useDispatch(); // Inisialisasi dispatch untuk mengirim tindakan ke Redux
  const { orders, status, error } = useSelector((state) => state.order); // Mengambil data pesanan, status, dan error dari Redux
  const user_id = useSelector((state) => state.user.User.id); // Mengambil ID pengguna dari Redux
  const no_table = localStorage.getItem("tableId"); // Mengambil nomor meja dari localStorage

  useEffect(() => {
    if (user_id && no_table) {
      dispatch(fetchOrders({ user_id, no_table, status: "pending" })); // Memanggil pesanan dengan status pending
    }
  }, [dispatch, user_id, no_table]); // Mengulangi useEffect jika salah satu nilai dependensi berubah

  // Jika data masih dimuat
  if (status === "loading")
    return <div className="text-center py-10 text-gray-600">Loading...</div>;
  // Jika terjadi error
  if (status === "failed")
    return <div className="text-center py-10 text-red-500">Error: {error}</div>;
  const ordersArray = Array.isArray(orders) ? orders : []; // Memastikan orders adalah array

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="bg-teal-500 text-white py-4 px-6">
        <h2 className="text-3xl font-serif font-bold text-center">
          Order Details
        </h2>
      </div>
      {ordersArray.length === 0 ? (
        <p className="text-center text-gray-600 py-8">No orders found</p>
      ) : (
        ordersArray.map(
          (
            order // Mapping setiap pesanan
          ) => (
            <div key={order.id} className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                <div>
                  <p className="font-semibold text-gray-600">Table Number:</p>
                  <p className="text-gray-800">{order.no_table}</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-600">Order Date:</p>
                  <p className="text-gray-800">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="font-semibold text-gray-600">Status:</p>
                  <p
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      order.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : order.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {order.status.toUpperCase()}
                  </p>
                </div>
              </div>
              <div className="mb-6">
                <p className="font-semibold text-gray-600 mb-3">Products:</p>
                <ul className="divide-y divide-gray-200">
                  {order.OrderDetails.map(
                    (
                      item // Mapping setiap detail pesanan
                    ) => (
                      <li
                        key={item.id}
                        className="py-4 flex justify-between items-center"
                      >
                        <div className="flex items-center">
                          {item.Product.product_image && (
                            <img
                              src={item.Product.product_image}
                              alt={item.Product.product_name}
                              className="w-16 h-16 object-cover rounded-md mr-4"
                            />
                          )}
                          <div>
                            <p className="font-medium text-gray-800">
                              {item.Product.product_name}
                            </p>
                            <p className="text-sm text-gray-500">
                              {item.quantity} x{" "}
                              {formatCurrencyToIDR(item.product_price)}
                            </p>
                          </div>
                        </div>
                        <p className="font-medium text-gray-800">
                          {formatCurrencyToIDR(
                            item.quantity * item.product_price
                          )}
                        </p>
                      </li>
                    )
                  )}
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-200">
                <p className="text-xl font-bold text-right text-gray-800">
                  Total: {formatCurrencyToIDR(order.total_price)}
                </p>
              </div>
            </div>
          )
        )
      )}
    </div>
  );
};

export default BillCard;
