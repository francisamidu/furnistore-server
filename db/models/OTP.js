const { model, Schema } = require("mongoose");

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

module.exports = model("verificationToken", VerificationTokenSchema);
