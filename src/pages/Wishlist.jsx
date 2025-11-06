import React from "react";
import { FaHeart, FaTrash } from "react-icons/fa";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlist.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md mx-auto">
          <FaHeart className="text-4xl text-gray-400 mx-auto mb-4" />
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Your wishlist is empty
          </h3>

          <button
            onClick={() => (window.location.href = "/products")}
            className="px-6 py-2 bg-[#FD5600] text-white rounded-lg hover:bg-orange-600 transition duration-300"
          >
            Add Products
          </button>
        </div>
      </div>
    );
  }

  const totalValue = wishlist.reduce((sum, item) => sum + (item.price || 0), 0);

  return (
    <div className="bg-gray-100 py-10 px-6 sm:px-10 lg:px-20 min-h-screen">
      <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-8 tracking-tight">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-red-500">
          My Wishlist
        </span>
      </h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8 max-w-2xl mx-auto">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
    <div className="flex flex-col items-center justify-center">
      <p className="text-2xl font-bold text-gray-800">{wishlist.length}</p>
      <p className="text-gray-600">Total Items</p>
    </div>

    <div className="flex flex-col items-center justify-center">
      <p className="text-2xl font-bold text-green-600">₹{totalValue}</p>
      <p className="text-gray-600">Total Price</p>
    </div>
  </div>
</div>


      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {wishlist.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden w-80 mx-auto flex flex-col justify-between border-2 border-pink-200"
          >
            <div className="w-full h-72 overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-5 flex flex-col flex-grow justify-between text-center">
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  {product.name}
                </h2>
                <p className="text-gray-600 text-sm mb-2">{product.category}</p>
                <p className="text-gray-900 font-bold text-xl mb-4">
                  ₹{product.price}
                </p>
              </div>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition duration-300 flex items-center justify-center gap-2"
                >
                  <FaTrash className="text-sm" />
                  Remove
                </button>

                <button
                  onClick={() => {
                    addToCart(product);
                    removeFromWishlist(product.id);
                  }}
                  className="flex-1 bg-[#097203] text-white py-2 rounded-lg hover:bg-green-900 transition duration-300"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
  