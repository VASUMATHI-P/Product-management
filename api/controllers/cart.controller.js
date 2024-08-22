import Cart from "../models/cart.model.js";

export const getCart = async (req, res, next) => {
  if(!req.user.id) {
    return next(errorHandler(403, 'You are not authorized'));
  }

  const cartItems = await Cart.find();
  res.status(200).json(cartItems);
}

export const addProduct = async (req, res, next) => {
  if(!req.user.id) {
    return next(errorHandler(403, 'You are not authorized'));
  }
  const product = new Cart({
    productId: req.product.id,
    userId: req.user.id,
    quantity: req.user.quantity,
  })
  try{
    const newProduct = await product.save();
    res.status(200).json(newProduct);
  } catch(err){
    next(err);
  }
}

export const deleteProduct = async (req, res, next) => {
  if(!req.user.id) {
    return next(errorHandler(403, 'You are not authorized'));
  }
  try {
    const validProduct = await Cart.findById({id: req.params.id});
    if(!validProduct){
      return next(errorHandler(404, 'Item not found'));
    }
    if(req.user.id !== validProduct.userId){
      return next(errorHandler(403, 'You are not authorized'));
    }
    const deletdProduct = await Cart.findByIdAndDelete({id: req.params.id});
    res.status(200).json(deletdProduct);
  } catch(err){
    next(err);
  }
}