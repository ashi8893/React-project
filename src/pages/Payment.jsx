import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Payment = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [upiId, setUpiId] = useState("");

  const navigate = useNavigate();

  // ✅ Load user + cart data
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (!user) {
      toast.warning("Please log in before proceeding to payment.");
      navigate("/login");
      return;
    }

    setLoggedInUser(user);

    const urlParams = new URLSearchParams(window.location.search);
    const isSingleBuy = urlParams.get("single") === "true";

    // ✅ Single Buy
    if (isSingleBuy) {
      const singleCar = JSON.parse(localStorage.getItem("selectedCar"));
      if (singleCar) {
        setCartItems([{ ...singleCar, qty: singleCar.qty || 1 }]);
        return;
      }
    }

    // ✅ Cart Buy
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    if (savedCart.length === 0) {
      toast.info("Your cart is empty. Add items before checkout.");
      navigate("/cart");
      return;
    }

    setCartItems(
      savedCart.map((item) => ({
        ...item,
        qty: item.qty || 1,
      }))
    );
  }, [navigate]);

  // ✅ Correct total calculation
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * (item.qty || 1),
    0
  );

  // ✅ Handle Payment + Save order to JSON Server
  const handlePayment = async (e) => {
    e.preventDefault();

    if (!address || !phone) {
      toast.warning("Please fill in all required fields.");
      return;
    }

    if (paymentMethod === "card" && !cardNumber) {
      toast.error("Please enter your card number.");
      return;
    }

    if (paymentMethod === "upi" && !upiId) {
      toast.error("Please enter your UPI ID.");
      return;
    }

    const newOrder = {
      id: Date.now().toString(),
      email: loggedInUser.email,
      orderId: "ORD" + Math.floor(Math.random() * 100000),
      address,
      phone,
      paymentMethod,
      totalAmount: totalPrice, // ✅ Correct amount saved
      status: "Processing",
      createdAt: new Date().toISOString(),
      trackingId: "TRK" + Math.floor(Math.random() * 999999),

      // ✅ Save qty also
      items: cartItems.map((item) => ({
        name: item.name,
        price: item.price,
        qty: item.qty || 1,
      })),
    };

    try {
      const response = await fetch("http://localhost:3001/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newOrder),
      });

      if (!response.ok) throw new Error("Failed to save order");

      toast.success("🎉 Payment Successful! Order placed successfully.");

      localStorage.removeItem("cart");
      localStorage.removeItem("selectedCar");

      setTimeout(() => navigate("/shipping"), 1500);
    } catch (error) {
      console.error("Order saving failed:", error);
      toast.error("❌ Failed to place order. Please try again.");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-6 sm:px-10 lg:px-20">
      <h1 className="text-3xl md:text-4xl font-bold text-center text-orange-700 mb-8">
        Payment Checkout
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* ✅ LEFT SIDE — PAYMENT FORM */}
        <form
          onSubmit={handlePayment}
          className="bg-white rounded-2xl shadow-lg p-8 space-y-6"
        >
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Billing Details
          </h2>

          <div>
            <label className="block text-gray-600 mb-1">Full Name</label>
            <input
              type="text"
              value={loggedInUser?.name || ""}
              readOnly
              className="w-full border border-gray-300 rounded-lg px-4 py-2 bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Address</label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your shipping address"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Phone</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>

          {/* ✅ Payment Method */}
          <div>
            <label className="block text-gray-600 mb-2">Payment Method</label>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="card"
                  checked={paymentMethod === "card"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Credit / Debit Card
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="upi"
                  checked={paymentMethod === "upi"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                UPI
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Cash on Delivery
              </label>
            </div>
          </div>

          {/* ✅ Conditional Payment Inputs */}
          {paymentMethod === "card" && (
            <div>
              <label className="block text-gray-600 mb-1">Card Number</label>
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="XXXX XXXX XXXX XXXX"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500"
                maxLength="16"
              />
            </div>
          )}

          {paymentMethod === "upi" && (
            <div>
              <label className="block text-gray-600 mb-1">UPI ID</label>
              <input
                type="text"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                placeholder="example@upi"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-orange-500"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-orange-700 text-white py-3 rounded-lg text-lg font-semibold hover:bg-orange-600 transition duration-300"
          >
            Confirm Payment
          </button>
        </form>

        {/* ✅ RIGHT SIDE — ORDER SUMMARY */}
        <div className="bg-white rounded-2xl shadow-lg p-8 h-fit">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Order Summary
          </h2>

          <div className="divide-y divide-gray-200">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between py-3">
                <p className="text-gray-700 font-medium">
                  {item.name} × {item.qty}
                </p>
                <p className="text-gray-800 font-semibold">
                  ₹{item.price * item.qty}
                </p>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mt-6 border-t pt-4">
            <p className="text-xl font-semibold text-gray-800">Total</p>
            <p className="text-xl font-bold text-orange-700">₹{totalPrice}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
