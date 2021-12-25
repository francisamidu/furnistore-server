"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateImage = (req, res, next) => {
    if (!req.file) {
        return res
            .status(422)
            .json({ message: "Image not uploaded", success: false });
    }
    next();
};
exports.default = validateImage;
