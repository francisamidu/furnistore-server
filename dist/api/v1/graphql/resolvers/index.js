"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const categories_1 = require("./categories");
const cart_1 = require("./cart");
const sales_1 = require("./sales");
const products_1 = require("./products");
const orders_1 = require("./orders");
const users_1 = require("./users");
exports.default = {
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
    products: products_1.getProducts,
    productStats: products_1.getProductStats,
    productByCategories: products_1.getProductsByCategories,
    createProduct: products_1.createProduct,
    deleteProduct: products_1.deleteProduct,
    updateProduct: products_1.updateProduct,
    user: users_1.getUser,
    users: users_1.getUsers,
    userStats: users_1.getUserStats,
    createUser: users_1.createUser,
    deleteUser: users_1.deleteUser,
    updateUser: users_1.updateUser,
};
