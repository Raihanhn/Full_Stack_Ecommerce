// pages/admin/index.js
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminHome() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    // Example: fetch counts (you can implement a /api/admin/stats later)
    // For now show links
  }, []);

  return (
    <div className="p-10 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 mt-10">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link href="/admin/products"
        className="p-4 rounded-lg shadow hover:shadow-md bg-white"
        >
         Products
        </Link>
        <Link href="/admin/orders"
        className="p-4 rounded-lg shadow hover:shadow-md bg-white"
        >
          Orders
        </Link>
        <Link href="/admin/users"
        className="p-4 rounded-lg shadow hover:shadow-md bg-white"
        >
          Users
        </Link>
      </div>
    </div>
  );
}
