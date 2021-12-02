import { model, Schema } from "mongoose";

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

export default model("addresse", AddressSchema);
