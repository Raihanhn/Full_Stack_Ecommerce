import { useEffect } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { clearCart } from "@/redux/cartSlice";

export default function Success() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Clear cart after successful payment
    dispatch(clearCart());
  }, [dispatch]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6">
      <div className="bg-white shadow-lg rounded-2xl p-10 text-center max-w-lg">
        <svg
          className="mx-auto mb-6 h-16 w-16 text-green-500"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12l2 2l4-4m6 2a9 9 0 11-18 0a9 9 0 0118 0z"
          />
        </svg>
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Payment Successful 🎉
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase! Your order has been placed successfully.
        </p>
        <Link href="/products">
          <span className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition cursor-pointer">
            Continue Shopping
          </span>
        </Link>
      </div>
    </div>
  );
}
