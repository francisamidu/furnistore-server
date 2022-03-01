import verifyRoles from "../../middlewares/verify-roles";

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
  createAddress,
  deleteAddress,
  getAddress,
  getAddresses,
  updateAddress,
} from "./address";
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

import { assignPermissionToUserRole, getRole, getRoles } from "./role";

import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  getUserStats,
  updateUser,
} from "./users";

export default {
  address: getAddress,
  addresses: getAddresses,
  createAddress,
  deleteAddress,
  updateAddress,

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
  products: verifyRoles(getProducts),
  productStats: getProductStats,
  productByCategories: getProductsByCategories,
  createProduct,
  deleteProduct,
  updateProduct,

  assignPermission: assignPermissionToUserRole,
  role: getRole,
  roles: getRoles,

  user: getUser,
  users: getUsers,
  userStats: getUserStats,
  createUser,
  deleteUser,
  updateUser,
};
