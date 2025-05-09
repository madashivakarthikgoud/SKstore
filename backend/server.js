// File: server.js

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import 'dotenv/config';

import connectDB from './config/mongodb.js';
import { connectCloudinary } from './config/cloudinary.js';

import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import adminRouter from './routes/adminRoute.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// ✅ CORS configuration: allow both admin and user frontends
const allowedOrigins = [
  'https://skstore-admin.onrender.com',
  'https://skstore.onrender.com'
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'token'],
}));

// Middleware
app.use(express.json());

// Route mounts
app.use('/api/user',    userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart',    cartRouter);
app.use('/api/order',   orderRouter);
app.use('/api/admin',   adminRouter);

// Default route
app.get('/', (req, res) => {
  res.send('API Working');
});

// Connect to DB then start server
connectDB()
  .then(() => {
    connectCloudinary();
    app.listen(port, () => {
      console.log(`Server started on port: ${port}`);
    });
  })
  .catch(err => {
    console.error('Failed to connect to database:', err);
  });
