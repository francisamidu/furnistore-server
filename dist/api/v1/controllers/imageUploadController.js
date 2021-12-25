"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = require("../services/index");
const middlewares_1 = require("../middlewares");
const router = express_1.default.Router();
router.put("/", [middlewares_1.imageUploader.single("image"), middlewares_1.validateImage], index_1.imageUploadService);
exports.default = router;
