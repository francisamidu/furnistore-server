const { model, Schema, Types } = require("mongoose");

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

module.exports = model("categorie", CategorySchema);
