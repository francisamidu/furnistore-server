const router = require("express").Router();

import { imageUploadController } from "../controllers";

import { use } from "../middlewares";

// Register routes
router.use("/upload-image", use(imageUploadController));

export default router;
