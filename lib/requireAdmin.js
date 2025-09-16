// lib/requireAdmin.js
import jwt from "jsonwebtoken";

export const requireAdmin = (handler) => async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ message: "No token provided" });
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Expect token payload to include role (your login should include that)
    if (!decoded || decoded.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }
    req.user = decoded;
    return handler(req, res);
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
