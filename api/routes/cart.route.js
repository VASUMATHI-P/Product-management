import express from 'express';
import { addProduct, deleteProduct, getCart } from '../controllers/cart.controller.js';

const router = express.Router();

router.post('/addToCart', addProduct);
router.get('/', getCart);
router.delete('/delete/:id', deleteProduct)


export default router;