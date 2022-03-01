import { Request } from "express";

import { Address, Order, User } from "../../db/models";

// Gets single order
const getOrder = async ({ orderId }: any, _: Request) => {
  const result = await Order.findById(orderId);
  return {
    _id: result._id,
    ...result._doc,
  };
};

// Gets all orders
const getOrders = async (context: any, _: Request) => {
  const result = await Order.find({});
  const orders = result.map((order: any) => ({
    _id: order._id.toString(),
    ...order._doc,
  }));
  return orders;
};

// Gets single order by user
const getOrderByUser = async ({ userId }: any, _: Request) => {
  const result = await Order.findOne({ userId });
  return {
    _id: result._id,
    ...result._doc,
  };
};
// Gets order by user
const getOrdersByUser = async ({ userId }: any, _: Request) => {
  const result = await Order.find({ userId });
  const orders = result.map((order: any) => ({
    _id: order._id.toString(),
    ...order._doc,
  }));
  return orders;
};

// Gets order statistics
const getOrderStats = async (context: any, _: Request) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  const result = await Order.aggregate([
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
  const orders = result.map((order) => ({
    _id: order._id.toString(),
    ...order._doc,
  }));
  return orders;
};

// Creates a single order
const createOrder = async (
  { userId, product, amount, address }: any,
  _: Request
) => {
  const user = await User.findById(userId);
  const storedAddress = await Address.findById(address);
  if (!storedAddress) {
    throw new Error("Address doesnt exist");
  }
  if (!user) {
    throw new Error("User doesnt exist");
  }
  const newOrder = new Order({
    amount,
    address: storedAddress,
    product,
    userId: user,
  });
  await newOrder.save();
  return {
    ...newOrder._doc,
    _id: newOrder._id.toString(),
  };
};

// Deletes a single order
const deleteOrder = async ({ orderId }: any, _: Request) => {
  const order = await Order.findById(orderId);
  order.isDeleted = true;
  await order.save();
  return {
    ...order._doc,
    _id: order._id.toString(),
  };
};

// Updates a single order
const updateOrder = async (
  { orderId, orderInput: { userId, products, amount, address } }: any,
  _: Request
) => {
  const order = await Order.findById(orderId);
  order.userId = userId;
  order.products = products;
  order.amount = amount;
  order.address = address;
  await order.save();
  return {
    ...order._doc,
    _id: order._id.toString(),
  };
};

export {
  createOrder,
  deleteOrder,
  getOrder,
  getOrders,
  getOrderStats,
  getOrderByUser,
  getOrdersByUser,
  updateOrder,
};
