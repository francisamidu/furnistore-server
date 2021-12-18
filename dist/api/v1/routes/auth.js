"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router = require("express").Router();
const loginController_1 = __importDefault(require("../controllers/loginController"));
const logoutController_1 = __importDefault(require("../controllers/logoutController"));
const registrationController_1 = __importDefault(require("../controllers/registrationController"));
const use_1 = __importDefault(require("../middlewares/use"));
// Register routes
router.use("/login", (0, use_1.default)(loginController_1.default));
router.use("/logout", (0, use_1.default)(logoutController_1.default));
router.use("/register", (0, use_1.default)(registrationController_1.default));
exports.default = router;
