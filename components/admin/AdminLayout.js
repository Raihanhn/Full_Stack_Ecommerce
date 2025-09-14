import Link from "next/link";

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-6">
        <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
        <nav className="flex flex-col space-y-4">
          <Link href="/admin" className="hover:text-yellow-400">Dashboard</Link>
          <Link href="/admin/products" className="hover:text-yellow-400">Products</Link>
          <Link href="/admin/orders" className="hover:text-yellow-400">Orders</Link>
          <Link href="/admin/users" className="hover:text-yellow-400">Users</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-gray-100">{children}</main>
    </div>
  );
}
