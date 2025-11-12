import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const AdminContext = createContext();
export const useAdmin = () => useContext(AdminContext);

export const AdminProvider = ({ children }) => {
  const apiURL = "https://my-project-db.onrender.com";
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);

  // ✅ Fetch Products
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${apiURL}/products`);
      setProducts(res.data);
    } catch (error) {
      toast.error("Failed to fetch products");
    }
  };

  // ✅ Fetch Users
  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${apiURL}/users`);
      setUsers(res.data);
    } catch (error) {
      toast.error("Failed to fetch users");
    }
  };

  // ✅ Fetch Orders
  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${apiURL}/orders`);
      setOrders(res.data);
    } catch (error) {
      toast.error("Failed to fetch orders");
    }
  };

  // ✅ Add Product
  const addProduct = async (newProduct) => {
    try {
      const res = await axios.post(`${apiURL}/products`, newProduct);
      setProducts((prev) => [...prev, res.data]);
      toast.success("Product added!");
    } catch (error) {
      toast.error("Failed to add product");
    }
  };

  // ✅ Delete Product
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${apiURL}/products/${id}`);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      toast.success("Product deleted!");
    } catch (error) {
      toast.error("Failed to delete product");
    }
  };

  // ✅ Edit Product
  const editProduct = async (id, updatedProduct) => {
    try {
      const res = await axios.put(`${apiURL}/products/${id}`, updatedProduct);
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? res.data : p))
      );
      toast.success("Product updated!");
    } catch (error) {
      toast.error("Failed to update product");
    }
  };

  // ✅ UPDATE USER (Role/Status)
  const updateUser = async (id, updatedData) => {
    try {
      const res = await axios.patch(`${apiURL}/users/${id}`, updatedData);
      setUsers(prev => 
        prev.map(user => 
          user.id === id ? { ...user, ...res.data } : user
        )
      );
      toast.success("User updated successfully!");
      return res.data;
    } catch (error) {
      toast.error("Failed to update user");
      throw error;
    }
  };

  // ✅ DELETE USER
  const deleteUser = async (id) => {
    try {
      await axios.delete(`${apiURL}/users/${id}`);
      setUsers(prev => prev.filter(user => user.id !== id));
      toast.success("User deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete user");
      throw error;
    }
  };

  // ✅ UPDATE ORDER STATUS
  const updateOrderStatus = async (id, newStatus) => {
    try {
      const res = await axios.patch(`${apiURL}/orders/${id}`, {
        status: newStatus
      });
      
      // Update local state
      setOrders(prev => 
        prev.map(order => 
          order.id === id ? { ...order, status: newStatus } : order
        )
      );
      
      toast.success(`Order status updated to ${newStatus}!`);
      return res.data;
    } catch (error) {
      toast.error("Failed to update order status");
      throw error;
    }
  };

  // ✅ DELETE ORDER WITH CORRECT STOCK RESTORE
  const deleteOrder = async (id) => {
    try {
      // Get the full order
      const orderRes = await axios.get(`${apiURL}/orders/${id}`);
      const order = orderRes.data;

      // ✅ FIX — match product by NAME, not by item.id
      for (let item of order.items) {
        const product = products.find((p) => p.name === item.name);

        if (product) {
          await axios.patch(`${apiURL}/products/${product.id}`, {
            stock: (product.stock || 0) + item.qty,
          });
        }
      }

      // Delete order
      await axios.delete(`${apiURL}/orders/${id}`);

      // Update UI
      setOrders((prev) => prev.filter((o) => o.id !== id));

      toast.success("Order deleted & stock restored!");
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete order");
      fetchOrders(); // refresh UI
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchUsers();
    fetchOrders();
  }, []);

  return (
    <AdminContext.Provider
      value={{
        products,
        users,
        orders,
        addProduct,
        deleteProduct,
        editProduct,
        deleteOrder,
        updateOrderStatus,
        updateUser, // ✅ ADDED
        deleteUser, // ✅ ADDED
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
