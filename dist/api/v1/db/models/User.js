"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    isAdmin: {
        type: Boolean,
        required: false,
        default: false,
    },
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
    name: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: true,
    },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("user", UserSchema);
