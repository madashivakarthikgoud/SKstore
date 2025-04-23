// File: server.js
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import dotenv from 'dotenv';
import cartRouter from './routes/cartRoute.js';
dotenv.config();

import connectDB from './config/mongodb.js';
import { connectCloudinary } from './config/cloudinary.js'; // Using the named export

import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());

app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);

app.get('/', (req, res) => {
  res.send('API Working');
});

connectDB()
  .then(() => {
    connectCloudinary(); // Configure Cloudinary with the updated env keys
    app.listen(port, () => console.log(`Server started on port: ${port}`));
  })
  .catch(err => {
    console.error('Failed to connect to database:', err);
  });
