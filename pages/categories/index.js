import Link from "next/link";
import Image from "next/image";

export default function Categories({ categories, products = [] }) {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-7xl mx-auto mt-10">
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
                  <div className="w-full h-48 bg-gray-100 flex items-center justify-center relative">
                    {product.image ? (
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-cover"
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

// ------------------- DATA FETCHING -------------------

// Use relative paths for internal API calls
export async function getStaticProps() {
  try {
    const [categoriesRes, productsRes] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/api/categories`),
      fetch(`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/api/products`),
    ]);

    const categoriesData = await categoriesRes.json();
    const productsData = await productsRes.json();

    return {
      props: {
        categories: categoriesData.categories || [
          "electronics",
          "fashion",
          "books",
          "toys",
          "beauty",
        ],
        products: productsData.products || [],
      },
      revalidate: 60,
    };
  } catch (err) {
    return {
      props: {
        categories: ["electronics", "fashion", "books", "toys", "beauty"],
        products: [],
      },
      revalidate: 60,
    };
  }
}
