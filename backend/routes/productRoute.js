import express from 'express';
import { addProduct, listProduct, removeProduct, singleProduct } from '../controllers/productController.js';
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';

const productRouter = express.Router();

// Add product (POST)
productRouter.post('/add', adminAuth, upload.fields([{ name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1 }, { name: 'image3', maxCount: 1 }, { name: 'image4', maxCount: 1 }]), addProduct);

// Remove product (DELETE)
productRouter.delete('/remove/:id', adminAuth, removeProduct);  // Updated to DELETE with :id parameter

// Get a single product (POST)
productRouter.post('/single', singleProduct);

// List all products (GET)
productRouter.get('/list', listProduct);

export default productRouter;
