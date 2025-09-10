import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import { verifyToken } from "@/lib/authMiddleware";

const handler = async (req, res) => {
  await connectDB();

  if (req.method === "GET") {
    try {
      const products = await Product.find();
      return res.status(200).json({ success: true, products, user: req.user });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }

  if (req.method === "POST") {
    try {
      const product = await Product.create(req.body);
      return res.status(201).json({ success: true, product, user: req.user });
    } catch (error) {
      return res.status(400).json({ success: false, error: error.message });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
};

export default verifyToken(handler);
