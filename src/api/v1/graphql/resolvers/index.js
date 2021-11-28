const {
  createCategory,
  deleteCategory,
  getCategory,
  getCategories,
  getCategoryStats,
  updateCategory,
} = require("../resolvers/categories");

const {
  createCart,
  deleteCart,
  getCart,
  getCarts,
  updateCart,
} = require("../resolvers/cart");

const { getSales } = require("../resolvers/Sales");

const {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  getProductStats,
  getProductsByCategories,
  updateProduct,
} = require("../resolvers/products");

const {
  createOrder,
  deleteOrder,
  getOrder,
  getOrders,
  getOrderByUser,
  getOrdersByUser,
  getOrderStats,
  updateOrder,
} = require("../resolvers/orders");

const {
  deleteUser,
  getUser,
  getUsers,
  getUserStats,
  updateUser,
} = require("../resolvers/users");

module.exports = {
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
