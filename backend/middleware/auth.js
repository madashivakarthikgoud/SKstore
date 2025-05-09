// middleware/authUser.js
import jwt from 'jsonwebtoken';

const authUser = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Check if the Authorization header exists and starts with "Bearer "
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ success: false, message: 'Auth token missing or malformed' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach decoded user info (email, role) to the request object
    req.user = {
      email: decoded.email,
      role: decoded.role
    };

    next(); // Proceed to next middleware or route
  } catch (err) {
    console.error('JWT verification error:', err);

    const msg = err.name === 'TokenExpiredError'
      ? 'Token expired'
      : 'Invalid token';

    res.status(401).json({ success: false, message: msg });
  }
};

export default authUser;
