import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Admin login route
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Check for the admin email and password
  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    // Generate a JWT token
    const token = jwt.sign(
      { email, role: 'admin' },  // payload with admin email and role
      process.env.JWT_SECRET,    // secret key for signing JWT
      { expiresIn: '1h' }       // token expiry time
    );

    // Send token in response
    res.json({ success: true, token });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

export default router;
