const { model, Schema, Types } = require("mongoose");

const ProductSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
  categories: [
    {
      type: Types.ObjectId,
      ref: "product",
      required: false,
    },
  ],
});

module.exports = model("product", ProductSchema);
