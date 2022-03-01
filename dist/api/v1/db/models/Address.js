"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const AddressSchema = new mongoose_1.Schema({
    phone: {
        type: String,
        required: false,
    },
    city: {
        type: String,
        required: false,
    },
    address: {
        type: String,
        required: false,
    },
    isDeleted: {
        type: Boolean,
        required: false,
        default: false,
    },
    userId: {
        type: mongoose_1.Types.ObjectId,
        required: true,
        ref: "user",
    },
});
exports.default = (0, mongoose_1.model)("addresse", AddressSchema);
