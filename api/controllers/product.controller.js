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
  const product = await Product.find({id: req.params.id});
  console.log(product);
  
  if(!product){
    return next(errorHandler(404, 'Not Found'));
  }
  res.status(200).json(product);
}

export const getAllProducts = async (req, res, next) => {
  const product = await Product.find({id: req.params.id});
  console.log(product);
  
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
      req.params.productId,
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
    res.status(200).json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  if(!req.user.isAdmin){
    return next(errorHandler(403, 'You are not allowed to update a Product'));
  }
  try {
    const deletedProduct = await Product.findByIdAndDelete({id: req.params.id});
    res.status(200).json(deleteProduct);
  } catch(err){
    next(err);
  }
}