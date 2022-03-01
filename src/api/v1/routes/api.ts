const router = require("express").Router();

import {
  imageUploadController,
  generateNewTokenController,
} from "../controllers";

import { use } from "../middlewares";

// Register routes
router.use("/upload-image", use(imageUploadController));
router.use("/refresh-token", use(generateNewTokenController));

export default router;
