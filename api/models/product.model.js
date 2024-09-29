import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true 
    },

    price: {
      type: Number,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default:
        'https://tse3.mm.bing.net/th?id=OIP.yibaLwUlAfTNs2XYECgRBQHaE8&pid=Api&P=0&h=180',
    },
    rating: {
      type: Number,
      default: '5',
    }, 
    quantity: {
      type: Number,
      default: 1
    }
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);

export default Product;