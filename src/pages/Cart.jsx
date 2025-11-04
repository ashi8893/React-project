import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [myCars, setMyCars] = useState([]);
  const navigate = useNavigate();

  // ✅ Load cart from localStorage
  const loadCart = () => {
    const savedCars = JSON.parse(localStorage.getItem("cart")) || [];
    setMyCars(savedCars);
  };

  // ✅ Load cart first time only
  useEffect(() => {
    loadCart();
  }, []);

  // ✅ Listen for global cart updates (NO REFRESH NEEDED)
  useEffect(() => {
    window.addEventListener("cartUpdated", loadCart);
    return () => window.removeEventListener("cartUpdated", loadCart);
  }, []);

  // ✅ Increase Quantity
  const increaseQty = (id) => {
    const updated = myCars.map((item) =>
      item.id === id ? { ...item, qty: (item.qty || 1) + 1 } : item
    );

    setMyCars(updated);
    localStorage.setItem("cart", JSON.stringify(updated));

    // ✅ Tell navbar + other pages to update
    window.dispatchEvent(new Event("cartUpdated"));
  };

  // ✅ Decrease Quantity
  const decreaseQty = (id) => {
    const updated = myCars
      .map((item) =>
        item.id === id ? { ...item, qty: (item.qty || 1) - 1 } : item
      )
      .filter((item) => item.qty > 0);

    setMyCars(updated);
    localStorage.setItem("cart", JSON.stringify(updated));

    window.dispatchEvent(new Event("cartUpdated"));
  };

  // ✅ Remove item directly
  const removeFromMyCars = (id) => {
    const updated = myCars.filter((car) => car.id !== id);
    setMyCars(updated);
    localStorage.setItem("cart", JSON.stringify(updated));

    window.dispatchEvent(new Event("cartUpdated"));
  };

  // ✅ Total
  const totalValue = myCars.reduce(
    (sum, car) => sum + car.price * (car.qty || 1),
    0
  );

  const handleGlobalBuyNow = () => {
    localStorage.setItem("selectedCar", JSON.stringify(myCars));
    navigate("/Payment");
  };

  return (
    <div className="bg-gray-50 py-10 px-6 sm:px-10 lg:px-20 min-h-screen relative">
      <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">
        My Cart
      </h1>

      {/* Summary Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8 max-w-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-gray-800">{myCars.length}</p>
            <p className="text-gray-600">Total Items</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-600">₹{totalValue}</p>
            <p className="text-gray-600">Total Value</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-blue-600">
              {myCars.length > 0
                ? Math.round(totalValue / myCars.length)
                : 0}
            </p>
            <p className="text-gray-600">Average Price</p>
          </div>
        </div>
      </div>

      {/* Cart Grid */}
      {myCars.length > 0 ? (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {myCars.map((car) => (
            <div
              key={`${car.id}-${car.addedDate}`}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden w-80 mx-auto flex flex-col justify-between"
            >
              <div className="w-full h-72 overflow-hidden">
                <img
                  src={car.image}
                  alt={car.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-5 flex flex-col flex-grow justify-between text-center">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">
                    {car.name}
                  </h2>
                  <p className="text-gray-600 text-sm mb-2">{car.category}</p>
                  <p className="text-grey-950 font-bold text-xl mb-4">
                    ₹{car.price * (car.qty || 1)}
                  </p>

                  {/* ✅ Quantity Buttons */}
                  <div className="flex justify-center items-center gap-4 mb-3">
                    <button
                      onClick={() => decreaseQty(car.id)}
                      className="bg-gray-300 px-3 py-1 rounded-md text-lg"
                    >
                      -
                    </button>
                    <span className="text-lg font-semibold">
                      {car.qty || 1}
                    </span>
                    <button
                      onClick={() => increaseQty(car.id)}
                      className="bg-gray-300 px-3 py-1 rounded-md text-lg"
                    >
                      +
                    </button>
                  </div>

                  <p className="text-gray-500 text-xs">
                    Added on: {new Date(car.addedDate).toLocaleDateString()}
                  </p>
                </div>

                <button
                  onClick={() => removeFromMyCars(car.id)}
                  className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition duration-300 mt-4"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="bg-white rounded-lg shadow-md p-8 max-w-md mx-auto">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Your collection is empty
            </h3>
            <p className="text-gray-600 mb-6">
              Start adding cars to your collection!
            </p>
          </div>
        </div>
      )}

      {/* ✅ GLOBAL BUY NOW BUTTON */}
      {myCars.length > 0 && (
        <button
          onClick={handleGlobalBuyNow}
          className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full shadow-lg text-lg font-semibold transition-all"
        >
          Buy Now
        </button>
      )}
    </div>
  );
};

export default Cart;
