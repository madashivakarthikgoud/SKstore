// middleware/authUser.js
import jwt from 'jsonwebtoken';

const authUser = (req, res, next) => {
  const authHeader = req.headers.authorization;                // “Bearer …”
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ success: false, message: 'Auth token missing or malformed' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Attach user info to req.user instead of mutating req.body
    req.user = { id: decoded.id };
    next();
  } catch (err) {
    console.error('JWT verification error:', err);
    // Distinguish expired vs. invalid if desired
    const msg = err.name === 'TokenExpiredError'
      ? 'Token expired'
      : 'Invalid token';
    res.status(401).json({ success: false, message: msg });
  }
};

export default authUser;
