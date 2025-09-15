// components/Navbar.js
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/userSlice";

export default function Navbar() {
  const cartItems = useSelector((state) => state.cart.items);
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const user = useSelector((state) => state.user.user); // Redux user
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef();
  const dispatch = useDispatch();

  // Close profile dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout()); // update Redux state
    setProfileOpen(false);
    setMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md w-full fixed top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <span className="text-2xl font-bold text-blue-600 cursor-pointer">
                MyStore
              </span>
            </Link>
          </div>

          {/* Center Menu - Desktop */}
          <div className="hidden md:flex space-x-8">
            <Link href="/">
              <span className="text-gray-700 hover:text-blue-600 cursor-pointer transition">
                Home
              </span>
            </Link>
            <Link href="/products">
              <span className="text-gray-700 hover:text-blue-600 cursor-pointer transition">
                Products
              </span>
            </Link>
            <Link href="/categories">
              <span className="text-gray-700 hover:text-blue-600 cursor-pointer transition">
                Categories
              </span>
            </Link>
            <Link href="/about">
              <span className="text-gray-700 hover:text-blue-600 cursor-pointer transition">
                About
              </span>
            </Link>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Cart - only show if user logged in */}
            {user && (
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
                  {totalQuantity > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2">
                      {totalQuantity}
                    </span>
                  )}
                </div>
                {totalQuantity > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2">
                    {totalQuantity}
                  </span>
                )}
                {totalQuantity > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2">
                    {totalQuantity}
                  </span>
                )}
                {totalQuantity > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2">
                    {totalQuantity}
                  </span>
                )}
              </Link>
            )}

            {/* Profile */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 hover:bg-gray-400 transition"
              >
                <span className="text-sm font-bold">
                  {user ? user.name.charAt(0).toUpperCase() : "P"}
                </span>
              </button>
              {profileOpen && (
                <div className="absolute right-0 mt-4 w-40 bg-white border-none rounded-b-md shadow-lg py-2 z-50">
                  {!user && (
                    <>
                      <Link href="/auth/login">
                        <div className="px-4 py-2 hover:bg-blue-100 cursor-pointer">
                          Sign In
                        </div>
                      </Link>
                      <Link href="/auth/signup">
                        <div className="px-4 py-2 hover:bg-blue-100 cursor-pointer">
                          Sign Up
                        </div>
                      </Link>
                    </>
                  )}
                  {user && (
                    <div
                      onClick={handleLogout}
                      className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                    >
                      Logout
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-gray-700 hover:text-blue-600 focus:outline-none"
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {menuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <Link href="/">
            <div className="px-4 py-2 hover:bg-blue-100 cursor-pointer">
              Home
            </div>
          </Link>
          <Link href="/products">
            <div className="px-4 py-2 hover:bg-blue-100 cursor-pointer">
              Products
            </div>
          </Link>
          <Link href="/categories">
            <div className="px-4 py-2 hover:bg-blue-100 cursor-pointer">
              Categories
            </div>
          </Link>
          <Link href="/about">
            <div className="px-4 py-2 hover:bg-blue-100 cursor-pointer">
              About
            </div>
          </Link>
          {!user && (
            <>
              <Link href="/auth/login">
                <div className="px-4 py-2 hover:bg-blue-100 cursor-pointer">
                  Sign In
                </div>
              </Link>
              <Link href="/auth/signup">
                <div className="px-4 py-2 hover:bg-blue-100 cursor-pointer">
                  Sign Up
                </div>
              </Link>
            </>
          )}
          {user && (
            <div
              onClick={handleLogout}
              className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
            >
              Logout
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
