import jwt from 'jsonwebtoken';
import expressAsyncHandler from 'express-async-handler';
import User, { IUser } from '../models/userModel';
import { Request, Response, NextFunction } from 'express';

// Define a custom interface for our request object that includes the user
export interface AuthRequest extends Request {
  user?: IUser;
}

const protect = expressAsyncHandler(async (req: AuthRequest, res: Response, next: NextFunction) => {
  let token;

  // Check for the token in the authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header (Bearer TOKEN)
      token = req.headers.authorization.split(' ')[1];

      // Verify the token using the secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: string };
      
      // Find the user by ID from the token payload and attach it to the request
      // We exclude the password for security
      req.user = await User.findById(decoded.id).select('-password');
      
      next(); // Proceed to the next middleware or route handler
    } catch (error) {
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

export { protect };