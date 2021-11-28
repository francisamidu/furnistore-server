const Cart = require("../../db/models/Cart");

// Gets all carts
const getCarts = async (context, req) => {};

// Gets a single cart
const getCart = async ({ cartId }, req) => {
  try {
    const cart = await Cart.findById(cartId);
    return {
      _id: cart._id,
      ...cart,
    };
  } catch (error) {
    throw error;
  }
};
// Create a single cart
const createCart = async (context, req) => {};

// Deletes a single cart
const deleteCart = async (context, req) => {};

// Updates a single cart
const updateCart = async (context, req) => {};

module.exports = {
  createCart,
  deleteCart,
  getCart,
  getCarts,
  updateCart,
};
