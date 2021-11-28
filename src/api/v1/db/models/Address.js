const { model, Schema } = require("mongoose");

const AddressSchema = new Schema({
  phone: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
  isDeleted: {
    type: Boolean,
    required: false,
    default: false,
  },
});

module.exports = model("addresse", AddressSchema);
