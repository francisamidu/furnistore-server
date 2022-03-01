import express from "express";
import { check } from "express-validator";

import { registrationService } from "../services/index";

const router = express.Router();
router.post(
  "/",
  [
    check("email").isEmail(),
    check("fullName").isLength({ min: 3 }),
    check("username").isLength({ min: 3 }),
    check("page").isLength({ min: 3 }),
    check("password").isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minNumbers: 1,
      minUppercase: 1,
      minSymbols: 1,
    }),
  ],
  registrationService
);

export default router;
