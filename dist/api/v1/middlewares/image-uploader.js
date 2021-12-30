"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination: (req, file, callback) => {
        return callback(null, "public");
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 25)}`;
        cb(null, `furnistore-${uniqueSuffix}.${file.mimetype.split("/")[1]}`);
    },
});
const fileFilter = (req, file, cb) => {
    const acceptedFileExtensions = [
        "jpg",
        "jpeg",
        "webp",
        "png",
        "jiff",
        "gif",
        "svg",
    ];
    const fileType = file.mimetype.split("/")[1];
    if (acceptedFileExtensions.includes(fileType)) {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
exports.default = (0, multer_1.default)({
    fileFilter,
    storage,
});
