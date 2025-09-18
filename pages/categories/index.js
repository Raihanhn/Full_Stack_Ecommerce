import Link from "next/link";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

// Component
export default function Categories({ categories, products }) {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-7xl mx-auto mt-10">
        {/* Page Heading */}
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Our Categories
        </h1>

        {/* Categories Grid */}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {categories.map((category) => (
            <Link
              key={category}
              href={`/categories/${category}`}
              className="bg-white rounded-2xl shadow-md p-6 flex items-center justify-center cursor-pointer hover:shadow-xl transition"
            >
              <span className="text-xl font-semibold text-gray-800 capitalize">
                {category}
              </span>
            </Link>
          ))}
        </div>

        {/* All Products Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8 text-gray-800 text-center">
            All Products
          </h2>
          {products.length === 0 ? (
            <p className="text-center text-gray-600">No products available.</p>
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
    </div>
  );
}

// Fetch data from MongoDB directly at build time
export async function getStaticProps() {
  await connectDB();

  // Fetch all products
  const productsData = await Product.find().lean();

  // Get unique categories from products
  const categoriesData = [
    ...new Set(productsData.map((product) => product.category)),
  ];

  // Convert _id to string (required for Next.js)
  const products = productsData.map((p) => ({
    ...p,
    _id: p._id.toString(),
  }));

  return {
    props: {
      categories: categoriesData,
      products,
    },
    revalidate: 60, // Re-generate the page every 60s
  };
}
