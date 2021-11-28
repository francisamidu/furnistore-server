const Category = require("../../db/models/Category");

// Gets a single Category
const getCategory = async ({ categoryId }, req) => {};

// Gets all Categories
const getCategories = async (context, req) => {};

// Gets Category Stats
const getCategoryStats = async (context, req) => {};

// Creates a single category
const createCategory = async ({}, req) => {};

// Deletes a single category
const deleteCategory = async ({ categoryId }, req) => {};

// Updates a single category
const updateCategory = async ({ categoryId }, req) => {};

module.exports = {
  createCategory,
  deleteCategory,
  getCategory,
  getCategories,
  getCategoryStats,
  updateCategory,
};
