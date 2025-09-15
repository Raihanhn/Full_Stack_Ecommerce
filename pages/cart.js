import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  addToCart,
  clearCart,
  decrementQuantity,
} from "../redux/cartSlice";
import Link from "next/link";
import { Plus, Minus, Trash2 } from "lucide-react"; // Icons for buttons

export default function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleRemove = (id) => dispatch(removeFromCart(id));
  const handleIncrement = (item) => dispatch(addToCart(item));
  const handleDecrement = (id) => dispatch(decrementQuantity(id));
  const handleClear = () => dispatch(clearCart());

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6"> 
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md p-6 mt-12"> 
        <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between border-b pb-4"
            >
              {/* Left part: image and title */}
              <div className="flex items-center space-x-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div>
                  <h2 className="font-semibold">{item.title}</h2>
                  <p className="text-gray-600">${item.price}</p>
                </div>
              </div>

              {/* Right part: +, quantity, -, delete */}
              <div className="flex items-center space-x-4 flex-1 justify-end">
                <button
                  onClick={() => handleIncrement(item)}
                  className="p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  <Plus size={16} />
                </button>

                <span className="px-4 font-medium">{item.quantity}</span>

                <button
                  onClick={() => handleDecrement(item._id)}
                  className="p-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
                  disabled={item.quantity === 1}
                >
                  <Minus size={16} />
                </button>

                {/* Delete icon far right */}
                <button
                  onClick={() => handleRemove(item._id)}
                  className="ml-8 p-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Footer */}
        <div className="mt-6 flex justify-between items-center">
          <h2 className="text-xl font-bold">Total: ${total}</h2>
          <div className="space-x-4">
            <span
              onClick={handleClear}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition cursor-pointer"
            >
              Clear Cart
            </span>
            <Link href="/checkout">
              <span className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition cursor-pointer">
                Checkout
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
