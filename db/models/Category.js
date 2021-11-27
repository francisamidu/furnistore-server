const { model, Schema, Types } = require("mongoose");

const CategorySchema = new Schema({
  title: {
    type: String,
    required: true,
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
