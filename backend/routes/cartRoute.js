import express from 'express';
import authUser from '../middleware/auth.js';
import { addToCart, updateCart, getUserCart } from '../controllers/cartController.js';

const router = express.Router();

router.use(authUser);                   // protect all cart routes
router.post('/add',    addToCart);
router.post('/update', updateCart);
router.get('/',        getUserCart);

export default router;
