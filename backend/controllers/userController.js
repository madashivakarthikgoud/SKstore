import userModel from '../models/userModel.js';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Helper to create a JWT with an object payload and 1h expiry
const createToken = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

/** POST /api/login */
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: 'User not found' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: 'Invalid credentials' });
    }

    // Issue token
    const token = createToken({ id: user._id });
    res.json({ success: true, token });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

/** POST /api/register */
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Basic validation
    if (!email || typeof email !== 'string') {
      return res.json({ success: false, message: 'Email is required and must be a string' });
    }
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: 'Invalid email format' });
    }
    if (!password || typeof password !== 'string') {
      return res.json({ success: false, message: 'Password is required and must be a string' });
    }
    if (password.length < 6) {
      return res.json({
        success: false,
        message: 'Password must be at least 6 characters long',
      });
    }

    // Check for existing user
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create and save user
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });
    const user = await newUser.save();

    // Issue token
    const token = createToken({ id: user._id });
    res.json({ success: true, token });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

/** POST /api/admin/login */
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verify against env vars
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      // Issue admin token with role claim
      const token = createToken({ role: 'admin', email });
      return res.json({ success: true, token });
    }

    return res.json({ success: false, message: 'Invalid credentials' });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export { loginUser, registerUser, adminLogin };
