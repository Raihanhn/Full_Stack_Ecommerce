import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import { verifyToken } from "@/lib/authMiddleware";

const handler = async (req, res) => {
  await connectDB();

  // GET: Public access
  if (req.method === "GET") {
    try {
      const products = await Product.find();
      return res.status(200).json({ success: true, products });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }

  // POST: Protected
  if (req.method === "POST") {
    try {
      // verifyToken will run only for POST
      if (!req.user) return res.status(401).json({ message: "Unauthorized" });

      const product = await Product.create(req.body);
      return res.status(201).json({ success: true, product, user: req.user });
    } catch (error) {
      return res.status(400).json({ success: false, error: error.message });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
};

// Only wrap POST requests with verifyToken
const wrappedHandler = (req, res) => {
  if (req.method === "POST") {
    return verifyToken(handler)(req, res);
  } else {
    return handler(req, res);
  }
};

export default wrappedHandler;
