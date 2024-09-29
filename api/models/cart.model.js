import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CartSchema = new Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },

  quantity: {
    type: Number,
    required: true,
    default: 1,
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true,
  },
  
} , {timestamps: true});


const Cart = mongoose.model('Cart', CartSchema);

export default Cart;
