import { Category } from "../../db/models";
import { Request } from "express";

// Gets a single Category
const getCategory = async ({ categoryId }: any, req: Request) => {};

// Gets all Categories
const getCategories = async (context: any, req: Request) => {};

// Gets Category Stats
const getCategoryStats = async (context: any, req: Request) => {};

// Creates a single category
const createCategory = async ({}: any, req: Request) => {};

// Deletes a single category
const deleteCategory = async ({ categoryId }: any, req: Request) => {};

// Updates a single category
const updateCategory = async ({ categoryId }: any, req: Request) => {};

export {
  createCategory,
  deleteCategory,
  getCategory,
  getCategories,
  getCategoryStats,
  updateCategory,
};
