import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

export default function AdminProducts({ products }) {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Manage Products</h1>
      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Title</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Stock</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p._id}>
              <td className="border p-2">{p.title}</td>
              <td className="border p-2">${p.price}</td>
              <td className="border p-2">{p.stock}</td>
              <td className="border p-2 space-x-2">
                <button className="bg-blue-500 text-white px-3 py-1 rounded">Edit</button>
                <button className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="mt-6 bg-green-600 text-white px-4 py-2 rounded">+ Add New Product</button>
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
  const products = await Product.find().lean();

  return {
    props: { products: JSON.parse(JSON.stringify(products)) },
  };
}
