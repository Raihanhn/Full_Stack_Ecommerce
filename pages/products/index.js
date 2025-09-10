import Link from "next/link";

export default function Products({ products }) {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Page Heading */}
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Our Products
        </h1>
        {/* Product Grid */}
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow"
            >
              {/* Product Image */}
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

              {/* Product Info */}
              <div className="p-4 flex flex-col justify-between h-40">
                <h2 className="text-lg font-semibold text-gray-800 truncate">
                  {product.title}
                </h2>
                <p className="text-gray-600 mt-1">${product.price}</p>

                {/* View Details Button */}
                <Link href={`/products/${product._id}`}>
                  <span className="mt-4 inline-block text-center w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition">
                    View Details
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// SSR: Fetch products from API
export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`);
  const data = await res.json();

  return {
    props: {
      products: data.products || [],
    },
  };
}
