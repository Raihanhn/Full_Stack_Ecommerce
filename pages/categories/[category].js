import Link from "next/link";
import Image from "next/image"; // optional: better image optimization

export default function CategoryPage({ category, products }) {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
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

        {/* Products Grid */}
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
  );
}

// ------------------- DATA FETCHING -------------------

// Use relative path for internal API call
export async function getServerSideProps({ params }) {
  const { category } = params;

  try {
    // Use relative URL, works both locally and on Vercel
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/api/products?category=${category}`);
    const data = await res.json();

    return {
      props: {
        category,
        products: data.products || [],
      },
    };
  } catch (err) {
    console.error("Error fetching products by category:", err);

    return {
      props: {
        category,
        products: [],
      },
    };
  }
}
