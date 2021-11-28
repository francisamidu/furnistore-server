const { model, Schema, Types } = require("mongoose");

const ProductSchema = new Schema({
  color: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
  categories: {
    type: Array,
  },
  isDeleted: {
    type: Boolean,
    required: false,
    default: false,
  },
});

module.exports = model("product", ProductSchema);
