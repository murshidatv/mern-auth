
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import { errorHandler } from './error.js';

export const verifyAdmin = async (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) return next(errorHandler(401, 'Not authenticated'));

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user || user.isAdmin !== 1) {
      return next(errorHandler(403, 'Access denied: Admins only'));
    }

    req.user = user; 
    next();
  } catch (err) {
    next(errorHandler(403, 'Token is not valid'));
  }
};