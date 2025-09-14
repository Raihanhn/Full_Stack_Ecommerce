import AdminLayout from "@/components/admin/AdminLayout";

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white shadow p-6 rounded-lg">
          <h2 className="text-xl font-semibold">Products</h2>
          <p className="text-2xl font-bold">7</p>
        </div>
        <div className="bg-white shadow p-6 rounded-lg">
          <h2 className="text-xl font-semibold">Orders</h2>
          <p className="text-2xl font-bold">3</p>
        </div>
        <div className="bg-white shadow p-6 rounded-lg">
          <h2 className="text-xl font-semibold">Users</h2>
          <p className="text-2xl font-bold">15</p>
        </div>
      </div>
    </AdminLayout>
  );
}
