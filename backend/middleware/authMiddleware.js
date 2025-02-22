import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const protect = async (req, res, next) => {
  let token;

  console.log('Headers:', req.headers);
  if (req.headers.authorization?.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
    console.log('Token received:', token);
  }

  if (!token) {
    console.log('No token provided');
    return res.status(401).json({ message: 'Not authorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded token:', decoded);
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) {
      console.log('User not found for ID:', decoded.id);
      return res.status(404).json({ message: 'User not found' });
    }
    next();
  } catch (error) {
    console.error('JWT Verification Error:', error.name, error.message);
    res.status(401).json({ message: 'Token failed' });
  }
};

