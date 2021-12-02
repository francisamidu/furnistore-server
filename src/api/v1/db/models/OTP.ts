import { model, Schema } from "mongoose";

const VerificationTokenSchema = new Schema(
  {
    token: {
      type: String,
      required: true,
      index: {
        expires: 36000,
      },
    },
  },
  { timestamps: true }
);

export default model("verificationToken", VerificationTokenSchema);
