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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProduct = exports.getTrendingProductStats = exports.getProductsByCategories = exports.getProductStats = exports.getProducts = exports.getNewProducts = exports.getProduct = exports.deleteProduct = exports.createProduct = void 0;
const models_1 = require("../../db/models");
// Gets a single product
const getProduct = ({ productId }, _) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield models_1.Product.findById(productId);
    return Object.assign({ _id: result._id }, result._doc);
});
exports.getProduct = getProduct;
// Gets all products
const getProducts = (context, _) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield models_1.Product.find({ isDeleted: false });
    const products = result.map((product) => (Object.assign({ _id: product._id.toString() }, product._doc)));
    return products;
});
exports.getProducts = getProducts;
// Gets products by categories
const getProductsByCategories = (context, _) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield models_1.Product.find({
        isDeleted: false,
        categories: { $in: ["categories"] },
    });
    const products = result.map((product) => (Object.assign({ _id: product._id.toString() }, product._doc)));
    return products;
});
exports.getProductsByCategories = getProductsByCategories;
// Gets new Products
const getNewProducts = (context, _) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield models_1.Product.find({
        isDeleted: false,
    })
        .sort({ createdAt: -1 })
        .limit(10);
    const products = result.map((product) => (Object.assign({ _id: product._id.toString() }, product._doc)));
    return products;
});
exports.getNewProducts = getNewProducts;
// Gets product statistics
const getTrendingProductStats = (context, _) => __awaiter(void 0, void 0, void 0, function* () {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
    const result = yield models_1.Product.aggregate([
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
    return result.map((r) => (Object.assign(Object.assign({}, r._doc), { _id: r._id })));
});
exports.getTrendingProductStats = getTrendingProductStats;
// Gets product statistics
const getProductStats = (context, _) => __awaiter(void 0, void 0, void 0, function* () {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
    const result = yield models_1.Product.aggregate([
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
const createProduct = ({ product: { colors, description, image, price, quantity, sizes, name, categories, }, }, _) => __awaiter(void 0, void 0, void 0, function* () {
    const newProduct = new models_1.Product({
        categories,
        colors,
        description,
        name,
        image,
        price,
        quantity,
        sizes,
    });
    yield newProduct.save();
    return Object.assign({ _id: newProduct._id }, newProduct._doc);
});
exports.createProduct = createProduct;
// Deletes a single product
const deleteProduct = ({ productId }, _) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield models_1.Product.findById(productId);
    product.isDeleted = true;
    const deletedProduct = yield product.save();
    return Object.assign(Object.assign({}, deletedProduct._doc), { _id: deletedProduct._id });
});
exports.deleteProduct = deleteProduct;
// Updates a single product
const updateProduct = ({ productId, product: { color, description, image, price, quantity, size, name, categories, }, }, _) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield models_1.Product.findById(productId);
    product.categories = categories;
    product.color = color;
    product.description = description;
    product.name = name;
    product.image = image;
    product.price = price;
    product.quantity = quantity;
    product.size = size;
    yield product.save();
    return Object.assign(Object.assign({}, product), { _id: product._id.toString() });
});
exports.updateProduct = updateProduct;
