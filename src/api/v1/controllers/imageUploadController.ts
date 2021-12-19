import express from "express";

import { imageUploadService } from "../services/index";

import { imageUploader, validateImage } from "../middlewares";

const router = express.Router();
router.post(
  "/",
  [imageUploader.single("image"), validateImage],
  imageUploadService
);

export default router;
