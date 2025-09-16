// pages/api/admin/users.js
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { requireAdmin } from "@/lib/requireAdmin";
import mongoose from "mongoose";

const handler = async (req, res) => {
  await connectDB();

  // GET -> list users (pagination)
  if (req.method === "GET") {
    try {
      const { page = 1, limit = 50 } = req.query;
      const skip = (Number(page) - 1) * Number(limit);
      const users = await User.find()
        .select("-password")
        .skip(skip)
        .limit(Number(limit))
        .sort({ createdAt: -1 });
      const total = await User.countDocuments();
      return res.status(200).json({ success: true, users, total });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }

  // PUT -> update user role (body: { id, role })
  if (req.method === "PUT") {
    try {
      const { id, role } = req.body;
      if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(400).json({ success: false, message: "Invalid user id" });
      if (!["user", "admin"].includes(role))
        return res.status(400).json({ success: false, message: "Invalid role" });

      const user = await User.findByIdAndUpdate(id, { role }, { new: true }).select("-password");
      if (!user) return res.status(404).json({ success: false, message: "User not found" });
      return res.status(200).json({ success: true, user });
    } catch (error) {
      return res.status(400).json({ success: false, error: error.message });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
};

export default requireAdmin(handler);
