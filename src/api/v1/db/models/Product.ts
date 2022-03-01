import { model, Schema, Types } from "mongoose";

const ProductSchema = new Schema({
  colors: {
    type: Array,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  sizes: {
    type: Array,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    required: true,
  },
  categories: {
    type: Array,
  },
  isDeleted: {
    type: Boolean,
    required: false,
    default: false,
  },
  orders: {
    type: Number,
    required: false,
    default: 0,
  },
});

export default model("product", ProductSchema);
