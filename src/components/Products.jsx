import React, { useEffect, useState } from "react";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <div className="bg-gray-50 py-10 px-6 sm:px-10 lg:px-20">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Hot Wheels
      </h1>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 overflow-hidden w-80 mx-auto flex flex-col justify-between"
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
                <p className="text-grey-950 font-bold text-xl mb-4">
                  ₹{product.price}
                </p>
              </div>

              <button className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-stone-500 transition duration-300">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
