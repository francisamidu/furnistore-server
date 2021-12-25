"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const index_1 = require("../services/index");
const router = express_1.default.Router();
router.post("/", (0, express_validator_1.check)("otp").isEmpty(), index_1.validateOTPService);
exports.default = router;
