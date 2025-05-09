import jwt from 'jsonwebtoken';

const adminAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1] || req.headers.token;

    if (!token) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if the decoded token has admin credentials
    if (
      decoded.role !== 'admin' ||
      decoded.email !== process.env.ADMIN_EMAIL
    ) {
      return res.status(403).json({ success: false, message: 'Not authorized, login again' });
    }

    req.user = decoded; // You can pass the decoded user info for downstream use
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};

export default adminAuth;
