// pages/admin/products/create.js
import { useState } from "react";
import { useRouter } from "next/router";

const getAuthHeader = () => {
  const token = (typeof window !== "undefined") ? localStorage.getItem("token") : null;
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export default function CreateProduct() {
  const router = useRouter();
  const [form, setForm] = useState({ title: "", description: "", price: 0, category: "", stock: 0, image: "" });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json", ...getAuthHeader() },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setLoading(false);
    if (data.success) {
      router.push("/admin/products");
    } else {
      alert(data.message || data.error || "Error creating product");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl mb-4">Create Product</h1>
      <form onSubmit={submit} className="space-y-3 max-w-md">
        <input value={form.title} onChange={(e)=>setForm({...form,title:e.target.value})} placeholder="Title" className="w-full p-2 border rounded"/>
        <textarea value={form.description} onChange={(e)=>setForm({...form,description:e.target.value})} placeholder="Description" className="w-full p-2 border rounded"/>
        <input type="number" value={form.price} onChange={(e)=>setForm({...form,price:Number(e.target.value)})} placeholder="Price" className="w-full p-2 border rounded"/>
        <input value={form.category} onChange={(e)=>setForm({...form,category:e.target.value})} placeholder="Category" className="w-full p-2 border rounded"/>
        <input type="number" value={form.stock} onChange={(e)=>setForm({...form,stock:Number(e.target.value)})} placeholder="Stock" className="w-full p-2 border rounded"/>
        <input value={form.image} onChange={(e)=>setForm({...form,image:e.target.value})} placeholder="Image URL" className="w-full p-2 border rounded"/>
        <div>
          <button disabled={loading} className="px-4 py-2 bg-green-600 text-white rounded">{loading ? "Saving..." : "Create"}</button>
        </div>
      </form>
    </div>
  );
}
