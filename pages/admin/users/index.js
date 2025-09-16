// pages/admin/users/index.js
import { useEffect, useState } from "react";

const getAuthHeader = () => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch users
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/users", {
        headers: getAuthHeader(),
      });
      const data = await res.json();

      if (data.success) {
        setUsers(data.users);
        setError("");
      } else {
        setError(data.message || "Failed to load users");
      }
    } catch (err) {
      setError("Something went wrong while fetching users");
    } finally {
      setLoading(false);
    }
  };

  // Change role
  const changeRole = async (id, role) => {
    try {
      const res = await fetch("/api/admin/users", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeader(),
        },
        body: JSON.stringify({ id, role }),
      });

      const data = await res.json();
      if (data.success) {
        fetchUsers(); // refresh users after role change
      } else {
        alert(data.message || data.error);
      }
    } catch (err) {
      alert("Error updating role");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 mt-14">Users</h1>

      {/* Loading & Error States */}
      {loading && <p className="text-gray-600">Loading users...</p>}
      {error && <p className="text-red-600 mb-4">{error}</p>}

      {/* Users Table */}
      {!loading && !error && (
        <div className="bg-white rounded shadow p-4 overflow-x-auto">
          {users.length === 0 ? (
            <p className="text-gray-500">No users found.</p>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="border p-2">Name</th>
                  <th className="border p-2">Email</th>
                  <th className="border p-2">Role</th>
                  <th className="border p-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id} className="hover:bg-gray-50">
                    <td className="border p-2 font-medium">{u.name}</td>
                    <td className="border p-2">{u.email}</td>
                    <td className="border p-2">{u.role}</td>
                    <td className="border p-2 text-center">
                      {u.role !== "admin" ? (
                        <button
                          onClick={() => changeRole(u._id, "admin")}
                          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                          Make Admin
                        </button>
                      ) : (
                        <button
                          onClick={() => changeRole(u._id, "user")}
                          className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700"
                        >
                          Revoke Admin
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
