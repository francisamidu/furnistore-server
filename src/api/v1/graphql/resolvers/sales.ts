import { Request } from "express";

import Order from "../../db/models/Order";

const getSales = async (context: any, req: Request) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(date.setMonth(lastMonth.getMonth() - 1));

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
  const sales = result.map((res: any) => ({
    _id: res._id.toString(),
    ...res._doc,
  }));
  return sales;
};

export { getSales };
