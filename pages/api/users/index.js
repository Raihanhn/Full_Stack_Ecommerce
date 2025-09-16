import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { verifyToken } from "@/lib/authMiddleware";

const handler = async (req, res) => {
  await connectDB();

  // GET: Fetch all users
  if (req.method === "GET") {
    try {
      const users = await User.find().select("-password"); // exclude password
      return res.status(200).json({ success: true, users });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
};

// Protect route so only admins can view users
export default (req, res) => verifyToken(handler)(req, res);
