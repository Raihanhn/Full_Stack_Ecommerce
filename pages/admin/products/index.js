// pages/admin/products/index.js
import { useEffect, useState } from "react";
import Link from "next/link";

const getAuthHeader = () => {
  const token = (typeof window !== "undefined") ? localStorage.getItem("token") : null;
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchProducts = async () => {
    setLoading(true);
    const res = await fetch("/api/products");
    const data = await res.json();
    if (data.success) setProducts(data.products);
    setLoading(false);
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete product?")) return;
    const res = await fetch(`/api/products/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json", ...getAuthHeader() },
    });
    const data = await res.json();
    if (data.success) {
      setProducts((p) => p.filter((x) => x._id !== id));
      alert("Deleted");
    } else {
      alert(data.message || data.error || "Error deleting");
    }
  };

  return (
    <div className="p-6 min-h-screen">
      <div className="flex justify-between items-center mb-4 mt-14">
        <h1 className="text-xl font-semibold">Products</h1>
        <Link href="/admin/products/create" className="px-4 py-2 bg-blue-600 text-white rounded">Add Product</Link>
      </div>
      {loading ? <p>Loading...</p> : (
        <div className="bg-white shadow rounded">
          <table className="min-w-full">
            <thead>
              <tr className="text-left">
                <th className="p-2">Title</th>
                <th className="p-2">Price</th>
                <th className="p-2">Category</th>
                <th className="p-2">Stock</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p._id} className="border-t">
                  <td className="p-2">{p.title}</td>
                  <td className="p-2">{p.price}</td>
                  <td className="p-2">{p.category}</td>
                  <td className="p-2">{p.stock}</td>
                  <td className="p-2">
                    <Link href={`/admin/products/${p._id}`}
                    className="mr-2 text-blue-600"
                    >Edit</Link>
                    <button onClick={() => handleDelete(p._id)} className="text-red-600">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
