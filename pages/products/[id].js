import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { addToCart } from "../../redux/cartSlice";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

export default function ProductDetail({ product }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state) => state.user.user); // logged-in user

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      router.replace("/auth/login");
    }
  }, [user, router]);

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

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500 text-lg">Redirecting to login...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-10 mt-10">
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

// ============================
// SSG: fetch paths & props from MongoDB
// ============================

export async function getStaticPaths() {
  await connectDB();

  const products = await Product.find().select("_id").lean();

  const paths = products.map((p) => ({
    params: { id: p._id.toString() },
  }));

  return {
    paths,
    fallback: "blocking", // generate pages on-demand
  };
}

export async function getStaticProps({ params }) {
  await connectDB();

  const productData = await Product.findById(params.id).lean();

  if (!productData) {
    return {
      notFound: true,
    };
  }

  const product = {
    ...productData,
    _id: productData._id.toString(),
  };

  return {
    props: { product },
    revalidate: 60, // ISR: regenerate every 60 seconds
  };
}
