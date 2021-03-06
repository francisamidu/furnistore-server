"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const index_1 = require("../services/index");
const router = express_1.default.Router();
router.post("/", [(0, express_validator_1.check)("username").isEmpty(), (0, express_validator_1.check)("password").isLength({ min: 1 })], index_1.loginService);
exports.default = router;
