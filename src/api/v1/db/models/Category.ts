import { model, Schema, Types } from "mongoose";

const CategorySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    required: false,
    default: false,
  },
  products: [
    {
      type: Types.ObjectId,
      ref: "product",
      required: false,
    },
  ],
});

export default model("categorie", CategorySchema);
