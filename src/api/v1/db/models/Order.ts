import { model, Types, Schema } from "mongoose";

const OrderSchema = new Schema({
  userId: {
    type: Types.ObjectId,
    required: true,
  },
  products: [
    {
      productId: {
        type: Types.ObjectId,
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
  amount: {
    type: Number,
    required: true,
  },
  address: {
    type: Types.ObjectId,
    required: true,
    ref: "address",
  },
  status: {
    type: String,
    default: "pending",
  },
  isDeleted: {
    type: Boolean,
    required: false,
    default: false,
  },
});

export default model("order", OrderSchema);
