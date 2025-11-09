import { useEffect, useState } from "react";
import { useAdmin } from "./context/AdminContext";
import { motion } from 'framer-motion'
export default function AdminAddProducts({onClose,editingProduct}){
const {addProduct,editProduct} = useAdmin()



const [formData, setFormData] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    image: "",
   
  });

 useEffect(() => {
    if (editingProduct) setFormData(editingProduct);
  }, [editingProduct]);

const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingProduct) {
      await editProduct(editingProduct.id, formData);
    } else {
      await addProduct(formData);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60  backdrop-blur flex justify-center items-center text-white z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-gray-900 p-8 rounded-2xl w-full max-w-lg shadow-lg border border-gray-800"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">
          {editingProduct ? "Edit Product" : "Add Product"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white"
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white"
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white"
          />
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={formData.stock}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white"
          />
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={formData.image}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white"
          />

          
          {formData.image && (
            <div className="mt-4 flex justify-center">
              <img
                src={formData.image}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-lg border border-gray-700"
              />
            </div>
          )}

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg"
            >
              {editingProduct ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}