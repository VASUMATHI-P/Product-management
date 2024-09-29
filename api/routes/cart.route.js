import express from 'express';
import { addProduct, deleteProduct, getCart } from '../controllers/cart.controller.js';
import { verifyToken } from '../middleware/verifyUser.js';

const router = express.Router();

router.post('/addToCart', verifyToken, addProduct);
router.get('/', verifyToken, getCart);
router.delete('/delete/:id', verifyToken, deleteProduct)


export default router;