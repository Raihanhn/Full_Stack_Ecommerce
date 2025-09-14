import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";

export default function AdminOrders({ orders }) {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Manage Orders</h1>
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Order ID</th>
            <th className="border p-2">User</th>
            <th className="border p-2">Total</th>
            <th className="border p-2">Payment Status</th>
            <th className="border p-2">Created At</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o._id}>
              <td className="border p-2">{o._id}</td>
              <td className="border p-2">{o.userId}</td>
              <td className="border p-2">${o.total}</td>
              <td className="border p-2">{o.paymentStatus}</td>
              <td className="border p-2">{new Date(o.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export async function getServerSideProps({ req }) {
  const token = req.cookies.token;
  if (!token) return { redirect: { destination: "/login", permanent: false } };

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return { redirect: { destination: "/login", permanent: false } };
  }

  if (decoded.role !== "admin") {
    return { redirect: { destination: "/", permanent: false } };
  }

  await connectDB();
  const orders = await Order.find().sort({ createdAt: -1 }).lean();

  return {
    props: { orders: JSON.parse(JSON.stringify(orders)) },
  };
}
