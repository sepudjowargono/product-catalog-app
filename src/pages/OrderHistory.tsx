import { useEffect, useState } from "react";
import { auth } from "../firebaseConfig";
import { getUserOrders } from "../services/orderService";
import type { Order } from "../types/Order";

// this component will display the user's order history, allowing time to view past orders and their details
const OrderHistory = () => {
  const [orders, setOrders] = useState<Order[]>([]); // state to hold the user's previous orders
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null); // state that stores which order the user clicked

  // useEffect to fetch the user's order history when the component mounts
  useEffect(() => {
    const fetchOrders = async () => {
      const currentUser = auth.currentUser; // get the currently authenticated user

      if (!currentUser) return; // if no user is authenticated, exit the function

      const userOrders = (await getUserOrders(currentUser.uid)) as Order[]; // fetch the user's orders from the backend

      setOrders(userOrders); // update the state with the fetched orders
    };

    fetchOrders(); // call the function to fetch orders
  }, []); // empty dependency array means this effect runs once when the component mounts

  const selectedOrder = orders.find((order) => order.id === selectedOrderId); // finds the full order details for the clicked order

  return (
    <div className="order-history">
      <h1>Order History</h1>

      {orders.length === 0 ? (
        <p>You have no order history.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="order-card">
            <h3>Order ID: {order.id}</h3>
            <p>
              Date:{" "}
              {order.createdAt
                ? new Date(order.createdAt.seconds * 1000).toLocaleString()
                : "Pending"}
            </p>
            <p>Total Price: ${order.totalPrice.toFixed(2)}</p>

            <button
              type="button"
              onClick={() =>
                setSelectedOrderId(
                  selectedOrderId === order.id ? null : order.id,
                )
              }
            >
              {selectedOrderId === order.id ? "Hide Details" : "View Details"}
            </button>
          </div>
        ))
      )}

      {selectedOrder && (
        <div className="order-details">
          <h2>Order Details</h2>

          <ul>
            {selectedOrder.items.map((item) => (
              <li key={item.id}>
                {item.title} - Quantity: {item.quantity} - Price: $
                {item.price.toFixed(2)}
              </li>
            ))}
          </ul>

          <p>Total: ${selectedOrder.totalPrice.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
