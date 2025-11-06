import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const Shipping = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      const user = JSON.parse(localStorage.getItem("loggedInUser"));
      if (!user) {
        navigate("/login");
        return;
      }

      try {
        const res = await fetch(
          `http://localhost:3001/orders?email=${user.email}`
        );
        if (!res.ok) throw new Error("Failed to load orders");
        const data = await res.json();
        setOrders(data.reverse());
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate]);

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700";
      case "Processing":
        return "bg-yellow-100 text-yellow-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-blue-100 text-blue-700";
    }
  };

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    try {
      const res = await fetch(`http://localhost:3001/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Cancelled" }),
      });

      if (!res.ok) throw new Error("Failed to cancel order");

      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, status: "Cancelled" } : order
        )
      );
      alert("Order has been cancelled successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to cancel the order. Try again later.");
    }
  };

 

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-6 font-sans">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-orange-700 mb-10 tracking-wide">
          My Orders & Shipping
        </h2>

        {loading ? (
          <div className="max-w-4xl mx-auto space-y-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="animate-pulse bg-gray-200 rounded-2xl h-32 w-full"
              ></div>
            ))}
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center mt-10">
            <p className="text-lg text-gray-600 mb-4">
              You don’t have any orders yet.
            </p>
            <button
              onClick={() => navigate("/Products")}
              className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg text-sm transition-all"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="max-w-5xl mx-auto space-y-8">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white border border-gray-200 shadow-lg rounded-2xl p-6 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row justify-between border-b pb-4 mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        Order ID:{" "}
                        <span className="text-orange-600 font-bold">
                          {order.orderId}
                        </span>
                      </h3>
                      <p className="text-gray-500 text-sm">
                        Placed on:{" "}
                        {new Date(order.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 text-sm font-semibold rounded-full self-start md:self-center ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </div>

                  <div className="space-y-3">
                    {order.items?.map((item, i) => (
                      <div
                        key={i}
                        className="flex justify-between items-center text-sm text-gray-700"
                      >
                        <span>
                          {item.name} × {item.qty}
                        </span>
                        <span className="font-medium">
                          ₹{item.price * item.qty}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex justify-between border-t pt-3 text-gray-800 font-semibold">
                    <span>Total Amount</span>
                    <span>
                      ₹
                      {order.items?.reduce(
                        (acc, item) =>
                          acc +
                          (Number(item.price) || 0) * (Number(item.qty) || 1),
                        0
                      )}
                    </span>
                  </div>

                  <div className="mt-4 text-sm text-gray-600 space-y-1">
                    <p>
                      <strong>Tracking ID:</strong>{" "}
                      {order.trackingId || "Not Assigned Yet"}
                    </p>
                    <p>
                      <strong>Shipping Address:</strong> {order.address}
                    </p>
                  </div>

                  <div className="mt-6 flex justify-end gap-3">
                    {order.status !== "Cancelled" &&
                      order.status !== "Delivered" && (
                        <button
                          onClick={() => handleCancelOrder(order.id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-all"
                        >
                          Cancel Order
                        </button>
                      )}
                  </div>
                </div>
              ))}
            </div>

           
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Shipping;
