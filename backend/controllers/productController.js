import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';
import productModel from '../models/productModel.js';

// Cloudinary Upload Helper
const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: 'image' },
      (error, result) => {
        if (error) return reject(error);
        resolve({ url: result.secure_url, public_id: result.public_id });
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};


// Add New Product
const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

    // Pick up files using keys 'image1', 'image2', etc.
    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    // Filter out any undefined files
    const images = [image1, image2, image3, image4].filter(Boolean);

    console.log("Uploading images:", images.map(img => img.originalname));

    // Use the file buffer (because you're using memoryStorage) to upload each image
    const imageUrls = await Promise.all(
      images.map(img => uploadToCloudinary(img.buffer))
    );

    // Product data includes both URL and public_id
    const productData = {
      name,
      description,
      price: Number(price),
      images: imageUrls,  // now this will be [{ url, public_id }]
      category,
      subCategory,
      sizes: JSON.parse(sizes),
      bestseller: bestseller === 'true',
      date: Date.now()
    };

    const product = new productModel(productData);
    await product.save();

    res.json({ success: true, message: 'Product added successfully', imageUrls });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};


// List All Products
const listProduct = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// Remove Product by ID (from req.body)
// Remove Product by ID (from req.body)
const removeProduct = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

    // Parallel deletion of images from Cloudinary
    await Promise.all(product.images.map(img => {
      if (img.public_id) {
        return cloudinary.uploader.destroy(img.public_id).catch(err => {
          console.error(`Error deleting image from Cloudinary: ${err.message}`);
        });
      }
    }));

    // Delete the product from DB
    await productModel.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Product removed successfully' });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};





// Get Single Product
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);
    res.json({ success: true, product });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export { addProduct, listProduct, removeProduct, singleProduct };
