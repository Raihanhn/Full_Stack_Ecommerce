// pages/admin/users/index.js
import { useEffect, useState } from "react";

const getAuthHeader = () => {
  const token = (typeof window !== "undefined") ? localStorage.getItem("token") : null;
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  useEffect(()=>{ fetchUsers(); }, []);
  const fetchUsers = async () => {
    const res = await fetch("/api/admin/users", { headers: getAuthHeader() });
    const data = await res.json();
    if (data.success) setUsers(data.users);
  };

  const changeRole = async (id, role) => {
    const res = await fetch("/api/admin/users", {
      method: "PUT",
      headers: { "Content-Type": "application/json", ...getAuthHeader() },
      body: JSON.stringify({ id, role }),
    });
    const data = await res.json();
    if (data.success) fetchUsers();
    else alert(data.message || data.error);
  };

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-xl mb-4 mt-14">Users</h1>
      <div className="bg-white rounded shadow p-4">
        {users.map(u => (
          <div key={u._id} className="flex justify-between items-center border-b py-2">
            <div>
              <div className="font-semibold">{u.name} ({u.email})</div>
              <div className="text-sm text-gray-500">{u.role}</div>
            </div>
            <div>
              {u.role !== "admin" && <button onClick={()=>changeRole(u._id,"admin")} className="px-3 py-1 bg-blue-600 text-white rounded">Make Admin</button>}
              {u.role === "admin" && <button onClick={()=>changeRole(u._id,"user")} className="px-3 py-1 bg-gray-600 text-white rounded">Revoke Admin</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
