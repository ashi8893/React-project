import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const AdminContext = createContext();
export const useAdmin = () => useContext(AdminContext);

export const AdminProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState({
        products: false,
        users: false,
        orders: false
    });

    const apiURL = "http://localhost:3001";

    const fetchProducts = async () => {
        setLoading(prev => ({ ...prev, products: true }));
        try {
            const res = await axios.get(`${apiURL}/products`);
            setProducts(res.data);
        } catch (err) {
            console.log(err);
            toast.error("Failed to fetch products");
        } finally {
            setLoading(prev => ({ ...prev, products: false }));
        }
    };

    const fetchUsers = async () => {
        setLoading(prev => ({ ...prev, users: true }));
        try {
            const res = await axios.get(`${apiURL}/users`);
            setUsers(res.data);
        } catch (err) {
            console.log(err);
            toast.error("Failed to fetch users");
        } finally {
            setLoading(prev => ({ ...prev, users: false }));
        }
    };

    const fetchOrders = async () => {
        setLoading(prev => ({ ...prev, orders: true }));
        try {
            const res = await axios.get(`${apiURL}/orders`);
            setOrders(res.data);
        } catch (err) {
            console.log(err);
            toast.error("Failed to fetch orders");
        } finally {
            setLoading(prev => ({ ...prev, orders: false }));
        }
    };

    const addProduct = async (product) => {
        try {
            const res = await axios.post(`${apiURL}/products`, product);
            setProducts((prev) => [...prev, res.data]); // Fixed: added return
            toast.success("Product added!");
        } catch (err) {
            toast.error("Failed to add product");
        }
    };

    const deleteProduct = async (id) => {
        try {
            await axios.delete(`${apiURL}/products/${id}`);
            setProducts((prev) => prev.filter((p) => p.id !== id));
            toast.info("Product deleted");
        } catch (err) {
            toast.error("Failed to delete product");
        }
    };

    const editProduct = async (id, updatedData) => {
        try {
            const res = await axios.patch(`${apiURL}/products/${id}`, updatedData);
            setProducts((prev) =>
                prev.map((p) => (p.id === id ? res.data : p))
            );
            toast.success("Product updated");
        } catch (err) {
            console.log(err);
            toast.error("Failed to update product");
        }
    };

    const deleteOrder = async (id) => {
        try {
            await axios.delete(`${apiURL}/orders/${id}`);
            setOrders((prev) => prev.filter((o) => o.id !== id));
            toast.info("Order deleted");
        } catch (err) {
            console.log(err);
            toast.error("Failed to delete order");
        }
    };

    const updateOrderStatus = async (id, status) => {
        try {
            const res = await axios.patch(`${apiURL}/orders/${id}`, { status });
            setOrders((prev) => 
                prev.map((o) => (o.id === id ? { ...o, status: res.data.status } : o))
            );
            toast.success("Order status updated!");
        } catch (err) {
            console.log(err);
            toast.error("Failed to update order status");
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
                loading,
                fetchProducts,
                fetchUsers,
                fetchOrders,
                addProduct,
                deleteProduct,
                editProduct,
                deleteOrder,
                updateOrderStatus,
            }}
        >
            {children}
        </AdminContext.Provider>
    );
};