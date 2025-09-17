import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import multer from "multer";
import path from "path";
import fs from "fs";

// Create uploads folder if not exists
if (!fs.existsSync("./public/uploads")) fs.mkdirSync("./public/uploads", { recursive: true });

// Multer storage
const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/uploads",
    filename: (req, file, cb) =>
      cb(null, Date.now() + path.extname(file.originalname)),
  }),
});

// Wrapper to run multer in Next.js API
const runMiddleware = (req, res, fn) =>
  new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) reject(result);
      else resolve(result);
    });
  });

const handler = async (req, res) => {
  await connectDB();

  if (req.method !== "PUT") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    // Handle file upload
    await runMiddleware(req, res, upload.single("profileImage"));

    const { id, name, email } = req.body;

    // Update user
    const profileImage = req.file ? `/uploads/${req.file.filename}` : req.body.profileImage;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email, profileImage },
      { new: true }
    ).select("-password");

    return res.status(200).json({ success: true, user: updatedUser });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export default handler;

export const config = {
  api: {
    bodyParser: false, // required for multer
  },
};
