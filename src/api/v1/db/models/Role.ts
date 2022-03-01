import { model, Schema } from "mongoose";

import { userPermissions } from "../../config/permissions";

const RoleSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    code: {
      type: Number,
      required: true,
    },
    permissions: {
      type: [
        {
          action: String,
          code: Number,
        },
      ],
      required: false,
      default: userPermissions,
    },
  },
  { timestamps: true }
);

export default model("role", RoleSchema);
