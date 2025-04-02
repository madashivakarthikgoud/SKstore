import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js'; // Ensure this import is correct
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js'; // Import product routes

import dotenv from 'dotenv';
dotenv.config();


// App Config
const app = express();
const port = process.env.PORT || 4000;

// Middlewares
app.use(express.json());
app.use(cors());

// API endpoints
app.use('/api/user',userRouter); // User routes
app.use('/api/product', productRouter); // Product routes

app.get('/', (req, res) => {
  res.send('API Working');
});

// Connect to MongoDB and Cloudinary, then start the server
connectDB()
  .then(() => {
    connectCloudinary(); // Configure Cloudinary
    app.listen(port, () => console.log(`Server started on port: ${port}`));
  })
  .catch(err => {
    console.error('Failed to connect to database:', err);
  });
