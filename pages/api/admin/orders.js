// pages/api/admin/orders.js
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import { requireAdmin } from "@/lib/requireAdmin";
import mongoose from "mongoose";

const handler = async (req, res) => {
  await connectDB();

  // GET /api/admin/orders -> list orders (with optional ?status=paid)
  if (req.method === "GET") {
    try {
      const { status, page = 1, limit = 20 } = req.query;
      const filter = {};
      if (status) filter.paymentStatus = status;
      const skip = (Number(page) - 1) * Number(limit);
      const orders = await Order.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit));
      const total = await Order.countDocuments(filter);
      return res.status(200).json({ success: true, orders, total });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }

  // PUT /api/admin/orders -> update order (body: { id, paymentStatus })
  if (req.method === "PUT") {
    try {
      const { id, paymentStatus } = req.body;
      if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(400).json({ success: false, message: "Invalid order id" });

      const order = await Order.findByIdAndUpdate(
        id,
        { paymentStatus },
        { new: true }
      );
      if (!order) return res.status(404).json({ success: false, message: "Order not found" });
      return res.status(200).json({ success: true, order });
    } catch (error) {
      return res.status(400).json({ success: false, error: error.message });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
};

export default requireAdmin(handler);
