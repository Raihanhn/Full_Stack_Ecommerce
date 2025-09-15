import Product from "../../models/Product";
import { connectDB } from "../../lib/mongodb";  // ✅ use correct file & function

export default async function handler(req, res) {
  await connectDB();  // ✅ fix here

  try {
    // Get unique categories from Product collection
    const categories = await Product.distinct("category");
    res.status(200).json({ categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
}
