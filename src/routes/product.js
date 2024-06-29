import express from 'express';
const router = express.Router();
import { createProduct, getProduct, updateProduct, deleteProduct } from '../controllers/productController.js';

router.post('/create', createProduct);
router.get('/:id', getProduct);
router.put('/:id/update', updateProduct);
router.delete('/:id/delete', deleteProduct);

export default router;
