import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "GET") {
    try {
      const products = await Product.find();
      return res.status(200).json({ success: true, products });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }

  if (req.method === "POST") {
    try {
      const product = await Product.create(req.body);
      return res.status(201).json({ success: true, product });
    } catch (error) {
      return res.status(400).json({ success: false, error: error.message });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}

