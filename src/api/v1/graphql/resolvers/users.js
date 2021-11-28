const User = require("../../db/models/User");

// Gets user statistics
const getUserStats = async (context, req) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear - 1));

  try {
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
    return { users };
  } catch (error) {
    throw error;
  }
};

// Gets a single User
const getUser = async ({ userId }, req) => {
  try {
    const result = await User.findById(userId);
    return {
      _id: result._id,
      ...result._doc,
    };
  } catch (error) {
    throw error;
  }
};

// Gets all users
const getUsers = async (context, req) => {
  try {
    const result = await User.find({});
    const users = result.map((user) => ({
      _id: user._id.toString(),
      ...user._doc,
    }));
    return { users };
  } catch (error) {
    throw error;
  }
};

// Deletes a single user
const deleteUser = async ({ userId }, req) => {};

// Updates a single user
const updateUser = async ({ userId, userInput }, req) => {};

module.exports = {
  deleteUser,
  getUser,
  getUsers,
  getUserStats,
  updateUser,
};
