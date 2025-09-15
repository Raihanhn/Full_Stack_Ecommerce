import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartSlice";

export default function ProductDetail({ product }) {
    const dispatch = useDispatch();

   const handleAddToCart = () => {
    dispatch(addToCart(product));
    alert("✅ Added to Cart!");
  };

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500 text-lg">Product not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
        {/* Product Image */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden flex items-center justify-center">
          {product.image ? (
            <img
              src={product.image}
              alt={product.title}
              className="object-cover w-full h-full"
            />
          ) : (
            <span className="text-gray-400 p-10">No Image</span>
          )}
        </div>

        {/* Product Info */}
        <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              {product.title}
            </h1>
            <p className="text-gray-600 mb-6">{product.description}</p>
            <p className="text-xl font-semibold text-blue-600 mb-4">
              ${product.price}
            </p>
            <p
              className={`mb-6 ${
                product.stock > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {product.stock > 0
                ? `In Stock (${product.stock})`
                : "Out of Stock"}
            </p>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

// Generate all product paths at build time
export async function getStaticPaths() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`);
  const products = await res.json();

  const paths = products.products.map((product) => ({
    params: { id: product._id },
  }));

  return {
    paths,
    fallback: "blocking", // if product page not pre-rendered, generate it on demand
  };
}

// Fetch product data at build time
export async function getStaticProps({ params }) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${params.id}`
    );
    const data = await res.json();

    return {
      props: {
        product: data.product || null,
      },
      revalidate: 60, // optional: regenerate the page every 60s
    };
  } catch (err) {
    return { props: { product: null } };
  }
}
