import { Request } from "express";
import { Cart } from "../../db/models";

// Gets all carts
const getCarts = async (context: any, _: Request) => {
  const result = await Cart.find({ isDeleted: false });
  const carts = result.map((res) => ({
    ...res._doc,
    _id: res._id,
  }));
  return carts;
};

// Gets a single cart
const getCart = async ({ cartId }: any, _: Request) => {
  const cart = await Cart.findById(cartId);
  return {
    _id: cart._id.toString(),
    ...cart._doc,
  };
};
// Create a single cart
const createCart = async ({ cart: { userId, products } }: any, _: Request) => {
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
const deleteCart = async ({ cartId }: any, _: Request) => {
  const cart = await Cart.findById(cartId);
  cart.isDeleted = true;
  await cart.save();
  return {
    _id: cart._id.toString(),
  };
};

// Updates a single cart
const updateCart = async ({ cartId, userId, products }: any, _: Request) => {
  const cart = await Cart.findById(cartId);
  cart.products = products;
  await cart.save();
  return {
    ...cart._doc,
    _id: cart._id.toString(),
  };
};

export { createCart, deleteCart, getCart, getCarts, updateCart };
