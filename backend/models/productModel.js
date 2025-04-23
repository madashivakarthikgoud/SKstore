import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: Number,
  images: [  {
    url: String,
    public_id: String
  }],           // An array of image URL strings
  category: String,
  subCategory: String,
  sizes: [String],            // For example ["S", "M"] etc.
  bestseller: Boolean,
  date: { type: Date, default: Date.now }
});

const productModel = mongoose.model('Product', productSchema);

export default productModel;
