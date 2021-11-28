const Product = require("../../db/models/Product");

// Gets a single product
const getProduct = async ({ productId }, req) => {
  try {
    const result = await Product.findById(productId);
    return {
      _id: result._id,
      ...result._doc,
    };
  } catch (error) {
    throw error;
  }
};

// Gets all products
const getProducts = async (context, req) => {
  console.log(context);
  try {
    const result = await Product.find({ isDeleted: false }).populate(
      "categories"
    );
    const products = result.map((product) => ({
      _id: product._id.toString(),
      ...product._doc,
    }));
    return { products };
  } catch (error) {
    throw error;
  }
};

// Gets products by categories
const getProductsByCategories = async ({ categories }, req) => {
  console.log(context);
  try {
    const result = await Product.find({
      isDeleted: false,
      categories: { $in: [categories] },
    });
    const products = result.map((product) => ({
      _id: product._id.toString(),
      ...product._doc,
    }));
    return { products };
  } catch (error) {
    throw error;
  }
};

// Gets new Products
const getProductsByCategories = async ({ categories }, req) => {
  console.log(context);
  try {
    const result = await Product.find({
      isDeleted: false,
    })
      .sort({ createdAt: -1 })
      .limit(10);
    const products = result.map((product) => ({
      _id: product._id.toString(),
      ...product._doc,
    }));
    return { products };
  } catch (error) {
    throw error;
  }
};

// Gets product statistics
const getProductStats = (context, req) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear - 1));

  try {
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
    return { products };
  } catch (error) {
    throw error;
  }
};

// Creates a single product
const createProduct = async (
  { color, description, image, price, quantity, size, title },
  req
) => {
  try {
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
  } catch (error) {
    throw error;
  }
};

// Deletes a single product
const deleteProduct = async ({ productId }, req) => {
  try {
    const product = await Product.findById(productId);
    product.isDeleted = true;
    const deletedProduct = await product.save();
    return { product: deletedProduct._doc };
  } catch (error) {
    throw error;
  }
};

// Updates a single product
const updateProduct = async ({}, req) => {};

module.exports = {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  getProductStats,
  getProductsByCategories,
  updateProduct,
};
