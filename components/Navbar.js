// components/Navbar.js
import Link from "next/link";
import { useSelector } from "react-redux";

export default function Navbar() {
  const cartItems = useSelector((state) => state.cart.items);

  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <Link href="/">
        <span className="text-2xl font-bold text-blue-600 cursor-pointer">
          MyStore
        </span>
      </Link>
      <div className="flex items-center space-x-6">
        <Link href="/products">
          <span className="text-gray-700 hover:text-blue-600 transition cursor-pointer">
            Products
          </span>
        </Link>
        <Link href="/cart">
          <div className="relative cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-700 hover:text-blue-600 transition"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.2 6h12.4M7 13L5.4 5M16 21a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2">
                {cartItems.length}
              </span>
            )}
          </div>
        </Link>
      </div>
    </nav>
  );
}
