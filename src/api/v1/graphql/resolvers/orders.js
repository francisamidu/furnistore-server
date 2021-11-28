const Order = require("../../db/models/Order");

// Gets single order
const getOrder = async ({ orderId }, req) => {
  try {
    const result = await Order.findById(orderId);
    return {
      _id: result._id,
      ...result._doc,
    };
  } catch (error) {
    throw error;
  }
};

// Gets all orders
const getOrders = async (context, req) => {
  try {
    const result = await Orders.find({});
    const orders = result.map((order) => ({
      _id: order._id.toString(),
      ...order._doc,
    }));
    return { orders };
  } catch (error) {
    throw error;
  }
};

// Gets single order by user
const getOrderByUser = async ({ userId }, req) => {
  try {
    const result = await Order.findOne({ userId });
    return {
      _id: result._id,
      ...result._doc,
    };
  } catch (error) {
    throw error;
  }
};
// Gets order by user
const getOrdersByUser = async ({ userId }, req) => {
  try {
    const result = await Orders.find({ userId });
    const orders = result.map((order) => ({
      _id: order._id.toString(),
      ...order._doc,
    }));
    return { orders };
  } catch (error) {
    throw error;
  }
};

// Gets order statistics
const getOrderStats = async (context, req) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear - 1));

  try {
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
    return { orders };
  } catch (error) {
    throw error;
  }
};

// Creates a single order
const createOrder = async ({}, req) => {};

// Deletes a single order
const deleteOrder = async ({}, req) => {};

// Updates a single order
const updateOrder = async ({}, req) => {};

module.exports = {
  createOrder,
  deleteOrder,
  getOrder,
  getOrders,
  getOrderStats,
  getOrderByUser,
  getOrdersByUser,
  updateOrder,
};
