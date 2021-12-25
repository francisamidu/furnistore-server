"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CategorySchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    isDeleted: {
        type: Boolean,
        required: false,
        default: false,
    },
    products: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: "product",
            required: false,
        },
    ],
}, {
    timestamps: true,
});
exports.default = (0, mongoose_1.model)("categorie", CategorySchema);
