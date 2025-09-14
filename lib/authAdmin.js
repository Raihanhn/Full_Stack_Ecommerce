import jwt from "jsonwebtoken";

export function verifyAdmin(req) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) throw new Error("Unauthorized");

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (decoded.role !== "admin") throw new Error("Not an admin");

  return decoded;
}
