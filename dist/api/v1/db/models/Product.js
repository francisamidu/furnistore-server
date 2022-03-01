"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ProductSchema = new mongoose_1.Schema({
    colors: {
        type: Array,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    sizes: {
        type: Array,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
        unique: true,
    },
    image: {
        type: String,
        required: true,
    },
    categories: {
        type: Array,
    },
    isDeleted: {
        type: Boolean,
        required: false,
        default: false,
    },
    orders: {
        type: Number,
        required: false,
        default: 0,
    },
});
exports.default = (0, mongoose_1.model)("product", ProductSchema);
