import getRawBody from "raw-body";
import Stripe from "stripe";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";

export const config = {
  api: {
    bodyParser: false, // Stripe requires raw body
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const sig = req.headers["stripe-signature"];
    const buf = await getRawBody(req);

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        buf.toString(),
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.log("Webhook signature verification failed.", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the checkout.session.completed event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      try {
        await connectDB();

        // Find order by userId and total (optional: store sessionId in order)
        const order = await Order.findOne({
          total: session.amount_total / 100,
          paymentStatus: "pending",
        });

        if (order) {
          order.paymentStatus = "paid";
          await order.save();
          console.log("✅ Order marked as paid:", order._id);
        }
      } catch (err) {
        console.log("Error updating order:", err.message);
      }
    }

    res.status(200).json({ received: true });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
