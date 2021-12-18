import express from "express";

import { check } from "express-validator";

import { resetPasswordService } from "../services/index";

const router = express.Router();
router.post(
  "/",
  [check("email").isEmpty(), check("password").isEmpty()],
  resetPasswordService
);

export default router;
