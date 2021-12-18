"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CartSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Types.ObjectId,
        required: true,
    },
    products: [
        {
            productId: {
                type: mongoose_1.Types.ObjectId,
                required: true,
            },
            quantity: {
                type: Number,
                default: 1,
            },
        },
    ],
    isDeleted: {
        type: Boolean,
        required: false,
        default: false,
    },
});
exports.default = (0, mongoose_1.model)("cart", CartSchema);
