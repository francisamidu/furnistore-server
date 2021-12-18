"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const VerificationTokenSchema = new mongoose_1.Schema({
    token: {
        type: String,
        required: true,
        index: {
            expires: 36000,
        },
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("verificationToken", VerificationTokenSchema);
