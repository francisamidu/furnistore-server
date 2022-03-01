"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const OrderSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Types.ObjectId,
        required: true,
    },
    orderId: {
        type: Number,
        required: true,
    },
    products: [
        {
            name: {
                type: String,
                required: true,
                unique: true,
            },
            image: {
                type: String,
                required: true,
            },
            productId: {
                type: mongoose_1.Types.ObjectId,
                required: true,
                ref: "product",
            },
            quantity: {
                type: Number,
                default: 1,
            },
        },
    ],
    amount: {
        type: Number,
        required: true,
    },
    address: {
        type: mongoose_1.Types.ObjectId,
        required: true,
        ref: "address",
    },
    status: {
        type: String,
        default: "pending",
    },
    isDeleted: {
        type: Boolean,
        required: false,
        default: false,
    },
}, {
    timestamps: true,
});
exports.default = (0, mongoose_1.model)("order", OrderSchema);
