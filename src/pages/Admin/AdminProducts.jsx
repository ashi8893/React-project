import { useState } from "react";
import { useAdmin } from "./context/AdminContext";

import { Edit3, Plus, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import AdminAddProducts from "./AdminAddProducts";

export default function AdminProducts() {
  const { products, addProduct, deleteProduct, editProduct } = useAdmin();
    const [isModalOpen,setIsModalOpen]=useState(false)
    const [editingProduct,setEditingProduct]=useState(null)
  

    const handleAdd =()=>{
      setEditingProduct(null)
      setIsModalOpen(true);

    }

    const handleEdit =(product)=>{
      setEditingProduct(product);
       setIsModalOpen(true);
    }

 
return (
  <div className="min-h-screen bg-gray-950 px-4 py-10 ml-14">
  <div className="max-w-6xl mx-auto">
    
    <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
      <h1 className="text-3xl font-semibold text-white">Manage Products</h1>

      <button
        onClick={handleAdd}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-white"
      >
        <Plus size={18} /> Add Product
      </button>
    </div>

    
    <div className="overflow-x-auto">
      <table className="w-full border border-gray-800 text-sm text-white">
        <thead className="bg-gray-800">
          <tr>
            <th className="p-3 text-left">Image</th>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Category</th>
            <th className="p-3 text-left">Price</th>
            <th className="p-3 text-left">Stock</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          
            {!products ? (
  <tr>
    <td colSpan="6" className="text-center p-6 text-slate-400">
      Loading products...
    </td>
  </tr>
) : products.length === 0 ? (
  <tr>
    <td colSpan="6" className="text-center p-6 text-slate-400">
      No products found.
    </td>
  </tr>
) : (
  products.map((p) => (
    <tr key={p.id} className="border-t border-gray-800">
      <td className="p-3">
        <img
          src={p.image}
          alt={p.name}
          className="w-16 h-16 object-cover rounded-lg"
        />
      </td>
      <td className="p-3">{p.name}</td>
      <td className="p-3">{p.category}</td>
      <td className="p-3">₹ {p.price}</td>
      <td className="p-3">{p.stock}</td>
      <td className="p-3 flex items-center justify-center gap-4">
        <button
          onClick={() => handleEdit(p)}
          className="text-blue-400 hover:text-blue-300 mx-2"
        >
          <Edit3 size={18} />
        </button>
        <button
          onClick={() => deleteProduct(p.id)}
          className="text-red-500 hover:text-red-400 mx-2"
        >
          <Trash2 size={20} />
        </button>
      </td>
    </tr>
  ))
)}
          
        </tbody>
      </table>
    </div>
  </div>

  {isModalOpen && (
    <AdminAddProducts
      onClose={() => setIsModalOpen(false)}
      editingProduct={editingProduct}
    />
  )}
</div>
)

}