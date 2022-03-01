import { model, Types, Schema } from "mongoose";

const OrderSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      required: true,
    },
    orderId: {
      type: Number,
      required: true,
    },
    products: [
      {
        name: {
          type: String,
          required: true,
          unique: true,
        },
        image: {
          type: String,
          required: true,
        },
        productId: {
          type: Types.ObjectId,
          required: true,
          ref: "product",
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
  },
  {
    timestamps: true,
  }
);

export default model("order", OrderSchema);
