import { useState, useEffect } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function Home({ products }) {
  const cartItems = useSelector((state) => state.cart.items);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);

  // Live search effect
  useEffect(() => {
    const query = searchQuery.toLowerCase().trim();

    if (!query) {
      setFilteredProducts(products); // reset to all products
    } else {
      const results = products.filter((product) => {
        return (
          product.title.toLowerCase().includes(query) ||
          product.category?.toLowerCase().includes(query) ||
          (product.tags &&
            product.tags.some((tag) => tag.toLowerCase().includes(query)))
        );
      });

      setFilteredProducts(results);
    }
  }, [searchQuery, products]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Search */}
      <section className="text-center py-20 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <h1 className="text-4xl font-bold mb-6">Welcome to MyStore</h1>
        <p className="text-lg mb-8">
          Browse our latest products and shop with confidence!
        </p>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto flex flex-col sm:flex-row gap-4 px-4">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 px-4 py-3 rounded-lg text-gray-800 border border-gray-400 outline-none placeholder-gray-400"
          />
          <button
            onClick={() => {}}
            className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition"
          >
            Search
          </button>
        </div>
      </section>

      {/* Featured / Filtered Products */}
      <section className="max-w-7xl mx-auto py-12 px-6">
        {filteredProducts.length === 0 ? (
          <h2 className="text-2xl font-semibold text-gray-800 text-center">
            Sorry, product not found.
          </h2>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-8 text-gray-800">
              {searchQuery ? "Search Results" : "Featured Products"}
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {filteredProducts.map((product) => (
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
          </>
        )}
      </section>
    </div>
  );
}

// Fetch products from API for home page
export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`);
  const data = await res.json();

  return {
    props: {
      products: data.products || [],
    },
  };
}
