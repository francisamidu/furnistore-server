import { Request } from "express";
import Cart from "../../db/models/Cart";

// Gets all carts
const getCarts = async (context: any, req: Request) => {
  const carts = await Cart.find({ isDeleted: false });
  return carts;
};

// Gets a single cart
const getCart = async ({ cartId }: any, req: Request) => {
  const cart = await Cart.findById(cartId);
  return {
    _id: cart._id.toString(),
    ...cart,
  };
};
// Create a single cart
const createCart = async (
  { cart: { userId, products } }: any,
  req: Request
) => {
  const newCart = new Cart({
    userId,
    products,
  });
  await newCart.save();
  return {
    ...newCart._doc,
    _id: newCart._id.toString(),
  };
};

// Deletes a single cart
const deleteCart = async ({ cartId }: any, req: Request) => {
  const cart = await Cart.findById(cartId);
  cart.isDeleted = true;
  await cart.save();
  return {
    _id: cart._id.toString(),
  };
};

// Updates a single cart
const updateCart = async ({ cartId, userId, products }: any, req: Request) => {
  const cart = await Cart.findById(cartId);
  cart.products = products;
  await cart.save();
  return {
    ...cart,
    _id: cart._id.toString(),
  };
};

export { createCart, deleteCart, getCart, getCarts, updateCart };
