const { model, Types, Schema } = require("mongoose");

const CartSchema = new Schema({
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
  isDeleted: {
    type: Boolean,
    required: false,
    default: false,
  },
});

module.exports = model("cart", CartSchema);
