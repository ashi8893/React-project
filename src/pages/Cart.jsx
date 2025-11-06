import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity } = useCart();

  const totalValue = cart.reduce((sum, car) => sum + car.price * (car.qty || 1), 0);

  const handleBuyNow = () => {
    if (cart.length === 0) {
      toast.info("Your cart is empty. Add items before checkout.");
      return;
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.removeItem("selectedCar");

    navigate("/payment");
  };

  return (
    <div className="bg-gray-50 py-10 px-6 sm:px-10 lg:px-20 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">My Cart</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8 max-w-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-gray-800">{cart.length}</p>
            <p className="text-gray-600">Total Items</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-600">₹{totalValue}</p>
            <p className="text-gray-600">Total Price</p>
          </div>
        </div>
      </div>

      {cart.length > 0 ? (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {cart.map((car) => (
            <div
              key={car.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden w-80 mx-auto"
            >
              <div className="w-full h-72 overflow-hidden">
                <img src={car.image} alt={car.name} className="w-full h-full object-cover" />
              </div>

              <div className="p-5 text-center">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">{car.name}</h2>
                <p className="text-gray-600 text-sm mb-2">{car.category}</p>
                <p className="text-gray-900 font-bold text-xl mb-4">₹{car.price * (car.qty || 1)}</p>

                <div className="flex justify-center items-center gap-4 mb-3">
                  <button
                    onClick={() => updateQuantity(car.id, (car.qty || 1) - 1)}
                    className="bg-gray-300 px-3 py-1 rounded-md text-lg"
                  >
                    -
                  </button>
                  <span className="text-lg font-semibold">{car.qty || 1}</span>
                  <button
                    onClick={() => updateQuantity(car.id, (car.qty || 1) + 1)}
                    className="bg-gray-300 px-3 py-1 rounded-md text-lg"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeFromCart(car.id)}
                  className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition duration-300 mt-4"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h2 className="text-center text-xl text-gray-600 mt-10">Your cart is empty</h2>
      )}

      {cart.length > 0 && (
        <button
          onClick={handleBuyNow}
          className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full shadow-lg text-lg font-semibold transition-all"
        >
          Buy Now
        </button>
      )}
    </div>
  );
};

export default Cart;
