import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrders } from "../../../../features/orders/order";
import { formatCurrency } from "../../../../utils/formatCurrency";

const BillCard = () => {
  const dispatch = useDispatch();
  const { orders, status, error } = useSelector((state) => state.order);
  const user_id = useSelector((state) => state.user.User.id);
  const no_table = localStorage.getItem("tableId");

  useEffect(() => {
    if (user_id && no_table) {
      dispatch(fetchOrders({ user_id, no_table }));
    }
  }, [dispatch, user_id, no_table]);

  if (status === "loading") return <div>Loading...</div>;
  if (status === "failed") return <div>Error: {error}</div>;
  const ordersArray = Array.isArray(orders) ? orders : [];

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg ">
      <h2 className="text-2xl font-bold mb-4">Order Details</h2>
      {ordersArray.length === 0 ? (
        <p>No orders found</p>
      ) : (
        ordersArray.map((order) => (
          <div key={order.id} className="mb-6">
            <div className="mb-4">
              <p className="font-semibold">Table Number:</p>
              <p>{order.no_table}</p>
            </div>
            <div className="mb-4">
              <p className="font-semibold">Order Date:</p>
              <p>{new Date(order.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="mb-4">
              <p className="font-semibold">Status:</p>
              <p>{order.status}</p>
            </div>
            <div className="mb-4">
              <p className="font-semibold">Products:</p>
              <ul>
                {order.OrderDetails.map((item) => (
                  <li key={item.id} className="flex justify-between py-2">
                    <div className="flex items-center">
                      {item.Product.product_image && (
                        <img
                          src={item.Product.product_image}
                          alt={item.Product.product_name}
                          className="w-16 h-16 object-cover mr-4"
                        />
                      )}
                      <div>
                        <p>{item.Product.product_name}</p>
                        <p className="text-sm text-gray-600">
                          {item.quantity} x {formatCurrency(item.product_price)}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-4 border-t pt-4">
              <p className="text-lg font-bold">
                Total Price: {formatCurrency(order.total_price)}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default BillCard;
