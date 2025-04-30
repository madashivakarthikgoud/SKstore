// File: server.js
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import dotenv from 'dotenv';

dotenv.config();

import connectDB from './config/mongodb.js';
import { connectCloudinary } from './config/cloudinary.js';

import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';   // ← Make sure this is here

const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors());

// Route mounts
app.use('/api/user',    userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart',    cartRouter);
app.use('/api/order',   orderRouter);

app.get('/', (req, res) => {
  res.send('API Working');
});

// Connect to DB then start server
connectDB()
  .then(() => {
    connectCloudinary(); // Initialize Cloudinary
    app.listen(port, () => {
      console.log(`Server started on port: ${port}`);
    });
  })
  .catch(err => {
    console.error('Failed to connect to database:', err);
  });
