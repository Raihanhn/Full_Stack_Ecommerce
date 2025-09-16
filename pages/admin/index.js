// pages/admin/index.js
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import jwt from "jsonwebtoken";

export default function AdminHome() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/404"); // no token → 404 page
      return;
    }

    try {
      const decoded = jwt.decode(token); // use decode instead of verify (since no secret client-side)
      if (!decoded || decoded.role !== "admin") {
        router.replace("/404");
      } else {
        setLoading(false);
      }
    } catch (err) {
      router.replace("/404");
    }
  }, [router]);

  if (loading) return <p className="p-10">Loading...</p>;

  return (
    <div className="p-10 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 mt-10">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          href="/admin/products"
          className="p-4 rounded-lg shadow hover:shadow-md bg-white text-center font-medium"
        >
          Products
        </Link>
        <Link
          href="/admin/orders"
          className="p-4 rounded-lg shadow hover:shadow-md bg-white text-center font-medium"
        >
          Orders
        </Link>
        <Link
          href="/admin/users"
          className="p-4 rounded-lg shadow hover:shadow-md bg-white text-center font-medium"
        >
          Users
        </Link>
      </div>
    </div>
  );
}
