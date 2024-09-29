import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";
import { errorHandler } from "../utils/error.js"

export const create = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, 'You are not allowed to create a Product'));
  }

  if (!req.body.name || !req.body.price) {
    return next(errorHandler(400, 'Please provide all required fields'));
  }
  
  const newProduct = new Product({
    ...req.body,
  });

  try {
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    next(error);
  }
};


export const getProduct = async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  
  if(!product){
    return next(errorHandler(404, 'Not Found'));
  }
  res.status(200).json(product);
}

export const getAllProducts = async (req, res, next) => {
  const limit = parseInt(req.query.limit, 10) || 6;
  const page = parseInt(req.query.page, 10) || 1;
  const skip = (page - 1) * limit;
  const searchQuery = req.query.search;
  const product = await Product.find().sort({createdAt:-1}).limit(limit).skip(skip);
  
  if(!product){
    return next(errorHandler(404, 'Not Found'));
  }
  res.status(200).json(product);
}

export const updateProduct = async (req, res, next) => {
  if(!req.user.isAdmin){
    return next(errorHandler(403, 'You are not allowed to update a Product'));
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name: req.body.name,
          price: req.body.price,
          description: req.body.description,
          rating: req.body.rating,
          ...req.body
        },
      },
      { new: true }
    );
    console.log(updatedProduct);
    
    res.status(200).json(updatedProduct);

  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  if(!req.user.isAdmin){
    return next(errorHandler(403, 'You are not allowed to delete a Product'));
  }
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    console.log(deletedProduct);
    
    await Cart.deleteMany({productId: deletedProduct._id});
    res.status(200).json(deletedProduct);
  } catch(err){
    console.log(err);
    next(err);
  }
}

export const searchProduct = async (req, res, next) => {
  
  try {
    const searchQuery = req.query.search;
    if (!searchQuery || searchQuery.trim() === "") {
      return next(errorHandler(400, "Please provide a valid search query"));
    }

    const products = await Product.find({
      $or: [
        { name: { $regex: searchQuery, $options: "i" } }, 
        { description: { $regex: searchQuery, $options: "i" } } 
      ]
    });

    if (products.length === 0) {
      return next(errorHandler(404, "No products found matching your search"));
    }
    res.status(200).json(products);
  } catch (error) {
    next(errorHandler(500, "Server Error"));
  }
};
