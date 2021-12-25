const router = require("express").Router();

import {
  loginController,
  logoutController,
  registrationController,
  resetPasswordController,
  sendOTPController,
  validateOTPController,
} from "../controllers";

import use from "../middlewares/use";

// Register routes
router.use("/login", use(loginController));
router.use("/logout", use(logoutController));
router.use("/signup", use(registrationController));
router.use("/send-otp", use(sendOTPController));
router.use("/reset-password", use(resetPasswordController));
router.use("/validate-otp", use(validateOTPController));

export default router;
