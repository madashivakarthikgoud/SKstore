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

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

// ✅ CORS configuration
const allowedOrigins = ['https://skstore-admin.onrender.com'];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'token'], // ← include your custom "token" header too
}));

// Middleware
app.use(express.json());

// Route mounts
app.use('/api/user',    userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart',    cartRouter);
app.use('/api/order',   orderRouter);

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
