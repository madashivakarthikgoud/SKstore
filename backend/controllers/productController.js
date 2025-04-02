import { v2 as cloudinary } from 'cloudinary';
import productModel from '../models/productModel.js';

const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, sizes, bestseller } = req.body;

        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];

        const images = [image1, image2, image3, image4].filter(item => item !== undefined);

        console.log(name, description, price, category, subCategory, sizes, bestseller);
        console.log(images);

        let imageUrls = await Promise.all(
            images.map(async (image) => {
                let result = await cloudinary.uploader.upload(image.path, { resource_type: 'image' });
                return result.secure_url;
            })
        );

        const productData = {
            name,
            description,
            price: Number(price),
            images: imageUrls,
            category,
            subCategory,
            sizes: JSON.parse(sizes),
            bestseller: bestseller === 'true'? true : false,
            date: Date.now()
        };

        console.log(productData);

        const product = new productModel(productData);
        await product.save();

        res.json({ success: true, message: 'Product added successfully', imageUrls });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};




// function for get list products
const listProduct = async (req, res) => {
    try{
        const products = await productModel.find({})
        res.json({success: true, products})
    }catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}

// function for removing product
const removeProduct = async (req, res) => {
    try{
        await productModel.findByIdAndDelete(req.params.id)
        res.json({success: true, message: 'Product removed successfully'})
    }catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
    
}

//funtion for single product info
const singleProduct = async (req, res) => {
    try{
        const {productId} = req.body
        const product = await productModel.findById(productId)
        res.json({success: true, product})
    }catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}

export { addProduct, listProduct, removeProduct, singleProduct };