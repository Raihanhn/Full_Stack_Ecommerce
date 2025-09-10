import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        _id: String,
        title: String,
        price: Number,
        quantity: Number,
      },
    ],
    total: { type: Number, required: true },
    paymentStatus: { type: String, default: "pending" }, // pending, paid, failed
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);

