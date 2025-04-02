import userModel from '../models/userModel.js';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Function to create a JWT token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1h', // Token expiration time
  });
};

// Route for user login
const loginUser = async (req, res) => {
  try{
    const{email, password} = req.body;
    // Check if email and password are provided and are strings
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: 'User not found' });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
        const token = createToken(user._id);
        res.json({ success: true, token });
    }
    else{
        res.json({ success: false, message: 'Invalid credentials' });
    }
  }catch{
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// Route for user registration
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if email and password are provided and are strings
    if (!email || typeof email !== 'string') {
      return res.json({ success: false, message: 'Email is required and must be a string' });
    }
    if (!password || typeof password !== 'string') {
      return res.json({ success: false, message: 'Password is required and must be a string' });
    }

    // Check if user already exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: 'User already exists' });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: 'Invalid email format' });
    }

    // Validate password length
    if (password.length < 6) {
      return res.json({
        success: false,
        message: 'Password must be at least 6 characters long',
      });
    }

    // Hash the user's password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user instance
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    const user = await newUser.save();

    // Generate a token for the user
    const token = createToken(user._id);

    res.json({ success: true, token });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// Route for admin login
const adminLogin = async (req, res) => {
  try{
    const{email, password} = req.body;
    if(email == process.env.ADMIN_EMAIL && password == process.env.ADMIN_PASSWORD){
      const token =jwt.sign(email+password, process.env.JWT_SECRET);
      res.json({ success: true, token });
    }else{
      res.json({ success: false, message: 'Invalid credentials' });
    }
  }catch(error){
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export { loginUser, registerUser, adminLogin };
