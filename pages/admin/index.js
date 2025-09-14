import AdminLayout from "@/components/admin/AdminLayout";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import Order from "@/models/Order";
import User from "@/models/User";

export default function AdminDashboard({ stats }) {
  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white shadow p-6 rounded-lg">
          <h2 className="text-xl font-semibold">Products</h2>
          <p className="text-2xl font-bold">{stats.products}</p>
        </div>
        <div className="bg-white shadow p-6 rounded-lg">
          <h2 className="text-xl font-semibold">Orders</h2>
          <p className="text-2xl font-bold">{stats.orders}</p>
        </div>
        <div className="bg-white shadow p-6 rounded-lg">
          <h2 className="text-xl font-semibold">Users</h2>
          <p className="text-2xl font-bold">{stats.users}</p>
        </div>
      </div>
    </AdminLayout>
  );
}


export async function getServerSideProps({ req }) {
  const token = req.cookies.token; // 👈 must be set when login

  if (!token) {
    return { redirect: { destination: "/login", permanent: false } };
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return { redirect: { destination: "/login", permanent: false } };
  }

  // ✅ check if user is admin
  if (decoded.role !== "admin") {
    return { redirect: { destination: "/", permanent: false } };
  }

  await connectDB();

  const products = await Product.countDocuments();
  const orders = await Order.countDocuments();
  const users = await User.countDocuments();

  return {
    props: {
      stats: { products, orders, users },
    },
  };
}

