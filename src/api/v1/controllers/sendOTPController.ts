import express from "express";

import { check } from "express-validator";

import { sendOTPService } from "../services/index";

const router = express.Router();
router.post("/", check("email").isEmpty(), sendOTPService);

export default router;
