import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';
export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  console.log('unauth')
  if (!token) {
    return next(errorHandler(401, 'Unauthorized'));
  }
  jwt.verify(token, 'pankaj123456pankaj123456pankaj123456pankaj123456pankaj123456-', (err, user) => {
    if (err) {
      console.log('unauthorized')
      return next(errorHandler(401, 'Unauthorized'));
    }
    req.user = user;
    next();
  });
};