import express from "express";
import { check } from "express-validator";

import { validateOTPService } from "../services/index";

const router = express.Router();

router.post("/", check("otp").isEmpty(), validateOTPService);

export default router;
