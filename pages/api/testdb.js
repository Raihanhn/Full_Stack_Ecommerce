import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "POST") {
    try {
      const user = await User.create({
        name: "Test User",
        email: "test@example.com",
        password: "123456",
      });
      return res.status(201).json({ success: true, user });
    } catch (error) {
      return res.status(400).json({ success: false, error: error.message });
    }
  }

  if (req.method === "GET") {
    const users = await User.find();
    return res.status(200).json({ success: true, users });
  }

  return res.status(405).json({ message: "Method not allowed" });
}

