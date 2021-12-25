"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router = require("express").Router();
const controllers_1 = require("../controllers");
const use_1 = __importDefault(require("../middlewares/use"));
// Register routes
router.use("/login", (0, use_1.default)(controllers_1.loginController));
router.use("/logout", (0, use_1.default)(controllers_1.logoutController));
router.use("/signup", (0, use_1.default)(controllers_1.registrationController));
router.use("/send-otp", (0, use_1.default)(controllers_1.sendOTPController));
router.use("/reset-password", (0, use_1.default)(controllers_1.resetPasswordController));
router.use("/validate-otp", (0, use_1.default)(controllers_1.validateOTPController));
exports.default = router;
