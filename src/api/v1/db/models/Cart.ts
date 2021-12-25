import { model, Types, Schema } from "mongoose";

const CartSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      required: true,
    },
    products: [
      {
        productId: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
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

export default model("cart", CartSchema);
