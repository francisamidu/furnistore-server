import express from "express";
import { check } from "express-validator";

import { loginService } from "../services/index";

const router = express.Router();

router.post(
  "/",
  [check("username").isEmpty(), check("password").isEmpty()],
  loginService
);

export default router;
