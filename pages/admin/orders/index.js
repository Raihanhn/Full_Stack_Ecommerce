// pages/admin/orders/index.js
import { useEffect, useState } from "react";

const getAuthHeader = () => {
  const token = (typeof window !== "undefined") ? localStorage.getItem("token") : null;
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    fetchOrders();
  }, []);
  const fetchOrders = async () => {
    const res = await fetch("/api/admin/orders", { headers: getAuthHeader() });
    const data = await res.json();
    if (data.success) setOrders(data.orders);
    else alert(data.error || data.message);
  };

  const updateStatus = async (id, status) => {
    const res = await fetch("/api/admin/orders", {
      method: "PUT",
      headers: { "Content-Type": "application/json", ...getAuthHeader() },
      body: JSON.stringify({ id, paymentStatus: status }),
    });
    const data = await res.json();
    if (data.success) fetchOrders();
    else alert(data.error || data.message);
  };

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-xl mb-4 mt-14">Orders</h1>
      <div className="space-y-4">
        {orders.map(o => (
          <div key={o._id} className="p-4 bg-white rounded shadow">
            <div className="flex justify-between">
              <div>
                <div className="font-semibold">Order: {o._id}</div>
                <div>Total: {o.total}</div>
                <div>Payment: {o.paymentStatus}</div>
                <div>Created: {new Date(o.createdAt).toLocaleString()}</div>
              </div>
              <div className="space-y-2">
                <button onClick={()=>updateStatus(o._id,"paid")} className="px-3 py-1 bg-green-600 text-white rounded">Mark Paid</button>
                <button onClick={()=>updateStatus(o._1d,"failed")} className="px-3 py-1 bg-red-600 text-white rounded">Mark Failed</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
