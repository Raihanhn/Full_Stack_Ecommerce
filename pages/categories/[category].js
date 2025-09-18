import Link from "next/link";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

export default function CategoryPage({ category, products }) {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 capitalize">
            {category}
          </h1>
          <Link href="/categories">
            <span className="text-blue-600 hover:underline cursor-pointer">
              ← Back to Categories
            </span>
          </Link>
        </div>

        {products.length === 0 ? (
          <p className="text-gray-500 text-lg text-center">
            No products found in this category.
          </p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition"
              >
                <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.title}
                      className="object-cover h-full w-full"
                    />
                  ) : (
                    <span className="text-gray-400">No Image</span>
                  )}
                </div>
                <div className="p-4 flex flex-col justify-between h-40">
                  <h2 className="text-lg font-semibold text-gray-800 truncate">
                    {product.title}
                  </h2>
                  <p className="text-gray-600 mt-1">${product.price}</p>
                  <Link href={`/products/${product._id}`}>
                    <span className="mt-4 inline-block text-center w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition">
                      View Details
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Fetch products by category
export async function getServerSideProps({ params }) {
  await connectDB();

  const productsData = await Product.find({ category: params.category }).lean();

  const products = productsData.map((p) => ({
    ...p,
    _id: p._id.toString(),
    createdAt: p.createdAt?.toISOString(),
    updatedAt: p.updatedAt?.toISOString(),
  }));

  return {
    props: {
      category: params.category,
      products,
    },
  };
}
