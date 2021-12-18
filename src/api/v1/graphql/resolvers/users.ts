import { Request } from "express";

import User from "../../db/models/User";

// Gets user statistics
const getUserStats = async (context: any, req: Request) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  const result = await User.aggregate([
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
  const users = result.map((user) => ({
    _id: user._id.toString(),
    ...user._doc,
  }));
  return users;
};

// Gets a single User
const getUser = async ({ userId }: any, req: Request) => {
  const result = await User.findById(userId);
  return {
    _id: result._id,
    ...result._doc,
  };
};

// Gets all users
const getUsers = async (context: any, req: Request) => {
  const result = await User.find({ isDeleted: false });
  const users = result.map((user) => ({
    _id: user._id.toString(),
    ...user._doc,
  }));
  return users;
};

// Deletes a single user
const deleteUser = async ({ userId }: any, req: Request) => {};

// Updates a single user
const updateUser = async ({ userId, userInput }: any, req: Request) => {};

export { deleteUser, getUser, getUsers, getUserStats, updateUser };
