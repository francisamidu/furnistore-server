import { model, Schema, Types } from "mongoose";

const UserSchema = new Schema(
  {
    isVerified: {
      type: Boolean,
      required: false,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      required: false,
      default: false,
    },
    avatar: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
      required: false,
      default: "Male",
    },
    username: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: true,
    },
    roles: [
      {
        type: Types.ObjectId,
        required: true,
      },
    ],
  },
  { timestamps: true }
);

export default model("user", UserSchema);
