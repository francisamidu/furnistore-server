import { Request } from "express";
import Cart from "../../db/models/Cart";

// Gets all carts
const getCarts = async (context: any, req: Request) => {};

// Gets a single cart
const getCart = async ({ cartId }: any, req: Request) => {
  const cart = await Cart.findById(cartId);
  return {
    _id: cart._id,
    ...cart,
  };
};
// Create a single cart
const createCart = async (context: any, req: Request) => {};

// Deletes a single cart
const deleteCart = async (context: any, req: Request) => {};

// Updates a single cart
const updateCart = async (context: any, req: Request) => {};

export default {
  createCart,
  deleteCart,
  getCart,
  getCarts,
  updateCart,
};
