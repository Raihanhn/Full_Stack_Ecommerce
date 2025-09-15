import Link from "next/link";

export default function Categories({ categories }) {
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
      </div>
    </div>
  );
}

// Fetch categories from API
export async function getStaticProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`);
  const data = await res.json();

  return {
    props: {
      categories: data.categories || ["electronics", "fashion", "books", "toys", "beauty"],
    },
    revalidate: 60, // optional
  };
}
