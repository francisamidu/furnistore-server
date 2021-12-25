import { Request } from "express";

import User from "../../db/models/User";
import { hashValue } from "../../helpers";

//Creates an individual user
const createUser = async (
  { user: { avatar, email, name, password, gender } }: any,
  req: Request
) => {
  const hashedPassword = await hashValue(password);
  const user = new User({
    avatar,
    email,
    name,
    gender,
    password: hashedPassword,
  });
  await user.save();
  return {
    ...user._doc,
    _id: user._id.toString(),
  };
};

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
const deleteUser = async ({ userId }: any, req: Request) => {
  const user = await User.findById(userId);
  user.isDeleted = true;
  await user.save();
  return {
    ...user,
    _id: user._id.toString(),
  };
};

// Updates a single user
const updateUser = async (
  { userId, user: { avatar, email, name, password, gender } }: any,
  req: Request
) => {
  const user = await User.findById(userId);
  user.avatar = avatar;
  user.email = email;
  user.name = name;
  user.password = password;
  user.gender = gender;
  await user.save();
  return {
    ...user,
    _id: user._id.toString(),
  };
};

export { createUser, deleteUser, getUser, getUsers, getUserStats, updateUser };
