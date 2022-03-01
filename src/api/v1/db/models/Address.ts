import { model, Schema, Types } from "mongoose";

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
  userId: {
    type: Types.ObjectId,
    required: true,
    ref: "user",
  },
});

export default model("addresse", AddressSchema);
