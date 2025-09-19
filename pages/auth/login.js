import { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";  // ✅ Import dispatch
import { login } from "@/redux/userSlice";   // ✅ Import your Redux login action
import Link from "next/link";

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();  // ✅ Initialize dispatch
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        // ✅ Dispatch Redux login
        dispatch(login({ ...data.user, token: data.token }));

        // ✅ Save JWT token in localStorage (optional, for API requests)
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        router.push("/"); // redirect to homepage
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full p-3 mb-4 border rounded text-gray-900 placeholder-gray-500"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full p-3 mb-4 border rounded text-gray-900 placeholder-gray-500"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600"
        >
          Login
        </button>

        <p className="mt-4 text-center text-gray-600">
          Don’t have an account?{" "}
          <Link href="/auth/signup" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}
