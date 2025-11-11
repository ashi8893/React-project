import { Eye, Trash2 } from "lucide-react";
import { useAdmin } from "./context/AdminContext";
import { motion } from "framer-motion";
import { useState } from "react";

export default function AdminOrders() {
  const { orders, deleteOrder, updateOrderStatus } = useAdmin();
  const [selectedOrder, setSelectedOrder] = useState(null);

  const getTotalPrice = (items) => {
    return items.reduce((sum, item) => sum + item.price * (item.qty || 1), 0);
  };

  const getTotalQty = (items) => {
    return items.reduce((sum, item) => sum + (item.qty || 1), 0);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      await deleteOrder(id);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    await updateOrderStatus(id, newStatus);
  };

  return (
    <div className="min-h-screen bg-gray-950 px-4 py-10 flex justify-center ml-13">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="bg-gray-900/80 backdrop-blur-xl border border-gray-800 rounded-2xl p-8 w-full max-w-6xl shadow-[0_0_40px_rgba(255,255,255,0.05)]"
      >
        <h2 className="text-4xl text-center font-[Cinzel] tracking-[0.25em] text-slate-100 mb-10">
          Manage Orders
        </h2>

        {orders.length === 0 ? (
          <p className="text-center text-slate-400">No orders found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-gray-800 text-slate-300 text-sm uppercase tracking-wider">
                <tr>
                  <th className="p-4 text-left">Order ID</th>
                  <th className="p-4 text-left">User</th>
                  <th className="p-4 text-left">Total</th>
                  <th className="p-4 text-center">Quantity</th>
                  <th className="p-4 text-center">Status</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <motion.tr
                    key={order.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border-b border-gray-800 hover:bg-gray-800/40 transition-all duration-200"
                  >
                    <td className="p-4 text-slate-100">{order.orderId}</td>
                    <td className="p-4 text-slate-200">{order.email}</td>
                    <td className="p-4 text-slate-100">
                      ${getTotalPrice(order.items)}
                    </td>
                    <td className="p-4 text-slate-100 text-center">
                      {getTotalQty(order.items)}
                    </td>
                    <td className="p-4 text-center">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(order.id, e.target.value)
                        }
                        className="bg-gray-800 text-slate-200 px-3 py-2 rounded-md border border-gray-700 focus:outline-none focus:ring-1 focus:ring-slate-400"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>

                    <td className="p-4 text-center flex items-center justify-center gap-4">
                      {/* ✅ SHOW ORDER DETAILS */}
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="text-blue-400 hover:text-blue-300 transition"
                      >
                        <Eye size={18} />
                      </button>

                      <button
                        onClick={() => handleDelete(order.id)}
                        className="text-red-500 hover:text-red-400 transition"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

      {/* ✅ MODAL FOR ORDER DETAILS */}
      {selectedOrder && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 w-full max-w-xl shadow-xl">
            <h2 className="text-2xl text-slate-100 mb-4">
              Order Details – {selectedOrder.orderId}
            </h2>

            {selectedOrder.items.map((item) => (
              <div
                key={item.name}
                className="flex items-center gap-4 bg-gray-800 p-3 rounded-lg mb-3"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div>
                  <p className="text-slate-100 font-semibold">{item.name}</p>
                  <p className="text-slate-300 text-sm">
                    Qty: {item.qty} × ₹{item.price}
                  </p>
                </div>
              </div>
            ))}

            <button
              onClick={() => setSelectedOrder(null)}
              className="w-full mt-4 bg-red-600 hover:bg-red-500 text-white py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
