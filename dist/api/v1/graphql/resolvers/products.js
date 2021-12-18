"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProduct = exports.getProductsByCategories = exports.getProductStats = exports.getProducts = exports.getNewProducts = exports.getProduct = exports.deleteProduct = exports.createProduct = void 0;
const Product_1 = __importDefault(require("../../db/models/Product"));
// Gets a single product
const getProduct = ({ productId }, req) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Product_1.default.findById(productId);
    return Object.assign({ _id: result._id }, result._doc);
});
exports.getProduct = getProduct;
// Gets all products
const getProducts = (context, req) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Product_1.default.find({ isDeleted: false }).populate("categories");
    const products = result.map((product) => (Object.assign({ _id: product._id.toString() }, product._doc)));
    return products;
});
exports.getProducts = getProducts;
// Gets products by categories
const getProductsByCategories = (context, req) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(context);
    const result = yield Product_1.default.find({
        isDeleted: false,
        categories: { $in: ["categories"] },
    });
    const products = result.map((product) => (Object.assign({ _id: product._id.toString() }, product._doc)));
    return products;
});
exports.getProductsByCategories = getProductsByCategories;
// Gets new Products
const getNewProducts = (context, req) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(context);
    const result = yield Product_1.default.find({
        isDeleted: false,
    })
        .sort({ createdAt: -1 })
        .limit(10);
    const products = result.map((product) => (Object.assign({ _id: product._id.toString() }, product._doc)));
    return products;
});
exports.getNewProducts = getNewProducts;
// Gets product statistics
const getProductStats = (context, req) => __awaiter(void 0, void 0, void 0, function* () {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
    const result = yield Product_1.default.aggregate([
        {
            $match: {
                createdAt: {
                    $gte: lastYear,
                },
            },
        },
        {
            $project: {
                month: {
                    $month: "createdAt",
                },
            },
        },
        {
            $group: {
                _id: "$month",
                total: {
                    sum: 1,
                },
            },
        },
    ]);
    const products = result.map((product) => (Object.assign({ _id: product._id.toString() }, product._doc)));
    return products;
});
exports.getProductStats = getProductStats;
// Creates a single product
const createProduct = ({ color, description, image, price, quantity, size, title }, req) => __awaiter(void 0, void 0, void 0, function* () {
    const newProduct = new Product_1.default({
        color,
        description,
        image,
        price,
        quantity,
        size,
        title,
    });
    yield newProduct.save();
    return Object.assign({ _id: newProduct._id }, newProduct);
});
exports.createProduct = createProduct;
// Deletes a single product
const deleteProduct = ({ productId }, req) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield Product_1.default.findById(productId);
    product.isDeleted = true;
    const deletedProduct = yield product.save();
    return { product: deletedProduct._doc };
});
exports.deleteProduct = deleteProduct;
// Updates a single product
const updateProduct = ({}, req) => __awaiter(void 0, void 0, void 0, function* () { });
exports.updateProduct = updateProduct;
