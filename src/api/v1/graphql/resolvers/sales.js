const Order = require("../../db/models/Order");

const getSales = async (context, req) => {
  try {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth - 1));
    const previousMonth = new Date(date.setMonth(lastMonth.getMonth - 1));

    const result = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: previousMonth,
          },
        },
      },
      {
        $project: {
          month: {
            $month: "createdAt",
          },
          sales: "$amount",
        },
      },
      {
        $group: {
          _id: "$month",
          total: {
            $sum: "$sales",
          },
        },
      },
    ]);
    const sales = result.map((res) => ({
      _id: res._id.toString(),
      ...res._doc,
    }));
    return { sales };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getSales,
};
