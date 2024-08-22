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
        'https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2021/09/how-to-write-a-blog-product.png',
    },
    rating: {
      type: Number,
      default: '5',
    }
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productSchema);

export default Product;