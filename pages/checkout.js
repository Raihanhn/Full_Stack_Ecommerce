import { useSelector } from "react-redux";

export default function Checkout() {
  const cartItems = useSelector((state) => state.cart.items);

  const handleCheckout = async () => {
    const res = await fetch("/api/checkout_sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ cartItems, userId: "dummyUserId" }), // replace with real userId later
    });

    const data = await res.json();
    if (data.url) window.location = data.url; // redirect to Stripe
  };

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-10 px-6">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <p className="mb-6 text-lg">Total: ${total}</p>
      <button
        onClick={handleCheckout}
        className="bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition"
      >
        Pay with Card
      </button>
    </div>
  );
}
