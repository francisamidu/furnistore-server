import {
  createCategory,
  deleteCategory,
  getCategory,
  getCategories,
  getCategoryStats,
  updateCategory,
} from "./categories";

import { createCart, deleteCart, getCart, getCarts, updateCart } from "./cart";

import { getSales } from "./sales";

import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  getProductStats,
  getProductsByCategories,
  updateProduct,
} from "./products";

import {
  createOrder,
  deleteOrder,
  getOrder,
  getOrders,
  getOrderByUser,
  getOrdersByUser,
  getOrderStats,
  updateOrder,
} from "./orders";

import {
  deleteUser,
  getUser,
  getUsers,
  getUserStats,
  updateUser,
} from "./users";

export default {
  category: getCategory,
  categories: getCategories,
  categoryStats: getCategoryStats,
  createCategory,
  deleteCategory,
  updateCategory,

  cart: getCart,
  carts: getCarts,
  createCart,
  deleteCart,
  updateCart,

  sales: getSales,

  order: getOrder,
  orders: getOrders,
  orderStats: getOrderStats,
  orderByUser: getOrderByUser,
  ordersByUser: getOrdersByUser,
  createOrder,
  deleteOrder,
  updateOrder,

  product: getProduct,
  products: getProducts,
  productStats: getProductStats,
  productByCategories: getProductsByCategories,
  createProduct,
  deleteProduct,
  updateProduct,

  user: getUser,
  users: getUsers,
  userStats: getUserStats,
  deleteUser,
  updateUser,
};
