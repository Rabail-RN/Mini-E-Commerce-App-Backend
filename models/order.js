import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "product", required: true },
      quantity: { type: Number, required: true }
    }
  ],
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ["pending", "paid", "shipped", "delivered"], default: "pending" }
}, { timestamps: true });

const orderModel = mongoose.model("order", orderSchema);
export default orderModel;