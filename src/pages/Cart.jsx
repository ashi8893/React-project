import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ✅ for navigation to checkout

const MyCars = () => {
  const [myCars, setMyCars] = useState([]);
  const navigate = useNavigate(); // ✅ navigation hook

  // Load cars from localStorage on component mount
  useEffect(() => {
    const savedCars = JSON.parse(localStorage.getItem("myCars")) || [];
    setMyCars(savedCars);
  }, []);

  // Remove car from My Cars
  const removeFromMyCars = (carId) => {
    const updatedCars = myCars.filter((car) => car.id !== carId);
    setMyCars(updatedCars);
    localStorage.setItem("myCars", JSON.stringify(updatedCars));
  };

  // ✅ Handle Buy Now
  const handleBuyNow = (car) => {
    // Store selected car in localStorage for checkout
    localStorage.setItem("selectedCar", JSON.stringify(car));
    navigate("/checkout"); // ✅ Navigate to checkout page
  };

  // Calculate total value
  const totalValue = myCars.reduce((sum, car) => sum + car.price, 0);

  return (
    <div className="bg-gray-50 py-10 px-6 sm:px-10 lg:px-20 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">
        My Cars Collection
      </h1>

      {/* Summary */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8 max-w-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-gray-800">{myCars.length}</p>
            <p className="text-gray-600">Total Cars</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-600">₹{totalValue}</p>
            <p className="text-gray-600">Total Value</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-blue-600">
              {myCars.length > 0 ? Math.round(totalValue / myCars.length) : 0}
            </p>
            <p className="text-gray-600">Average Price</p>
          </div>
        </div>
      </div>

      {/* Cars Grid */}
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
                    ₹{car.price}
                  </p>
                  <p className="text-gray-500 text-xs">
                    Added on: {new Date(car.addedDate).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex flex-col gap-3 mt-4">
                  {/* ✅ Buy Now Button */}
                  <button
                    onClick={() => handleBuyNow(car)}
                    className="w-full bg-green-700 text-white py-2 rounded-lg hover:bg-green-800 transition duration-300"
                  >
                    Buy Now
                  </button>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromMyCars(car.id)}
                    className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition duration-300"
                  >
                    Remove from Collection
                  </button>
                </div>
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
              Start building your Hot Wheels collection by adding cars from the
              products page!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCars;
