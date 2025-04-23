import jwt from 'jsonwebtoken';

// auth.js
const authUser = (req, res, next) => {
    const authHeader = req.headers.authorization;               // “Bearer …”
    if (!authHeader) return res.status(401).json({ success: false, message: 'Auth token missing' });
    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.body.userId = decoded.id;                              // correctly assign
      next();
    } catch (err) {
      console.error(err);
      res.status(401).json({ success: false, message: 'Invalid token' });
    }
  };
  export default authUser;