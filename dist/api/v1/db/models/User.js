"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    isVerified: {
        type: Boolean,
        required: false,
        default: false,
    },
    isDeleted: {
        type: Boolean,
        required: false,
        default: false,
    },
    avatar: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    gender: {
        type: String,
        required: false,
        default: "Male",
    },
    username: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: true,
    },
    roles: [
        {
            type: mongoose_1.Types.ObjectId,
            required: true,
        },
    ],
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("user", UserSchema);
