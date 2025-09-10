import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import { verifyToken } from "@/lib/authMiddleware";
import mongoose from "mongoose";

const handler = async (req, res) => {
  await connectDB();
  const { id } = req.query;

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid product ID" });
  }

  // GET: Get single product (public)
  if (req.method === "GET") {
    try {
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ success: false, message: "Product not found" });
      }
      return res.status(200).json({ success: true, product });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }

  // PUT: Update product (protected)
  if (req.method === "PUT") {
    try {
      if (!req.user) return res.status(401).json({ message: "Unauthorized" });

      const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedProduct) {
        return res.status(404).json({ success: false, message: "Product not found" });
      }
      return res.status(200).json({ success: true, product: updatedProduct });
    } catch (error) {
      return res.status(400).json({ success: false, error: error.message });
    }
  }

  // DELETE: Delete product (protected)
  if (req.method === "DELETE") {
    try {
      if (!req.user) return res.status(401).json({ message: "Unauthorized" });

      const deletedProduct = await Product.findByIdAndDelete(id);
      if (!deletedProduct) {
        return res.status(404).json({ success: false, message: "Product not found" });
      }
      return res.status(200).json({ success: true, message: "Product deleted" });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
};

// Wrap protected routes (PUT, DELETE) with verifyToken
const wrappedHandler = (req, res) => {
  if (["PUT", "DELETE"].includes(req.method)) {
    return verifyToken(handler)(req, res);
  } else {
    return handler(req, res);
  }
};

export default wrappedHandler;
