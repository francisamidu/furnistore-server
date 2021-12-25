"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router = require("express").Router();
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
// Register routes
router.use("/upload-image", (0, middlewares_1.use)(controllers_1.imageUploadController));
exports.default = router;
