import { Request } from "express";

import Product from "../../db/models/Product";

// Gets a single product
const getProduct = async ({ productId }: any, req: Request) => {
  const result = await Product.findById(productId);
  return {
    _id: result._id,
    ...result._doc,
  };
};

// Gets all products
const getProducts = async (context: any, req: Request) => {
  const result = await Product.find({ isDeleted: false }).populate(
    "categories"
  );
  const products = result.map((product) => ({
    _id: product._id.toString(),
    ...product._doc,
  }));
  return products;
};

// Gets products by categories
const getProductsByCategories = async (context: any, req: Request) => {
  console.log(context);
  const result = await Product.find({
    isDeleted: false,
    categories: { $in: ["categories"] },
  });
  const products = result.map((product) => ({
    _id: product._id.toString(),
    ...product._doc,
  }));
  return products;
};

// Gets new Products
const getNewProducts = async (context: any, req: Request) => {
  console.log(context);
  const result = await Product.find({
    isDeleted: false,
  })
    .sort({ createdAt: -1 })
    .limit(10);
  const products = result.map((product) => ({
    _id: product._id.toString(),
    ...product._doc,
  }));
  return products;
};

// Gets product statistics
const getProductStats = async (context: any, req: Request) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  const result = await Product.aggregate([
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
  const products = result.map((product) => ({
    _id: product._id.toString(),
    ...product._doc,
  }));
  return products;
};

// Creates a single product
const createProduct = async (
  { color, description, image, price, quantity, size, title }: any,
  req: Request
) => {
  const newProduct = new Product({
    color,
    description,
    image,
    price,
    quantity,
    size,
    title,
  });
  await newProduct.save();
  return {
    _id: newProduct._id,
    ...newProduct,
  };
};

// Deletes a single product
const deleteProduct = async ({ productId }: any, req: Request) => {
  const product = await Product.findById(productId);
  product.isDeleted = true;
  const deletedProduct = await product.save();
  return { product: deletedProduct._doc };
};

// Updates a single product
const updateProduct = async ({}: any, req: Request) => {};

export {
  createProduct,
  deleteProduct,
  getProduct,
  getNewProducts,
  getProducts,
  getProductStats,
  getProductsByCategories,
  updateProduct,
};
