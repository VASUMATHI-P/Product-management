import express from 'express'
import { create, deleteProduct, getAllProducts, getProduct, updateProduct } from '../controllers/product.controller.js';
import { verifyToken } from '../middleware/verifyUser.js';

const router = express.Router();

router.post('/create', verifyToken ,create);
router.get('/:id', getProduct);
router.get('/', getAllProducts);
router.put('/:id', verifyToken ,updateProduct);
router.delete('/:id', verifyToken ,deleteProduct);

export default router;