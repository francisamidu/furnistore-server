"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const verify_roles_1 = __importDefault(require("../../middlewares/verify-roles"));
const categories_1 = require("./categories");
const cart_1 = require("./cart");
const sales_1 = require("./sales");
const address_1 = require("./address");
const products_1 = require("./products");
const orders_1 = require("./orders");
const role_1 = require("./role");
const users_1 = require("./users");
exports.default = {
    address: address_1.getAddress,
    addresses: address_1.getAddresses,
    createAddress: address_1.createAddress,
    deleteAddress: address_1.deleteAddress,
    updateAddress: address_1.updateAddress,
    category: categories_1.getCategory,
    categories: categories_1.getCategories,
    categoryStats: categories_1.getCategoryStats,
    createCategory: categories_1.createCategory,
    deleteCategory: categories_1.deleteCategory,
    updateCategory: categories_1.updateCategory,
    cart: cart_1.getCart,
    carts: cart_1.getCarts,
    createCart: cart_1.createCart,
    deleteCart: cart_1.deleteCart,
    updateCart: cart_1.updateCart,
    sales: sales_1.getSales,
    order: orders_1.getOrder,
    orders: orders_1.getOrders,
    orderStats: orders_1.getOrderStats,
    orderByUser: orders_1.getOrderByUser,
    ordersByUser: orders_1.getOrdersByUser,
    createOrder: orders_1.createOrder,
    deleteOrder: orders_1.deleteOrder,
    updateOrder: orders_1.updateOrder,
    product: products_1.getProduct,
    products: (0, verify_roles_1.default)(products_1.getProducts),
    productStats: products_1.getProductStats,
    productByCategories: products_1.getProductsByCategories,
    createProduct: products_1.createProduct,
    deleteProduct: products_1.deleteProduct,
    updateProduct: products_1.updateProduct,
    assignPermission: role_1.assignPermissionToUserRole,
    role: role_1.getRole,
    roles: role_1.getRoles,
    user: users_1.getUser,
    users: users_1.getUsers,
    userStats: users_1.getUserStats,
    createUser: users_1.createUser,
    deleteUser: users_1.deleteUser,
    updateUser: users_1.updateUser,
};
