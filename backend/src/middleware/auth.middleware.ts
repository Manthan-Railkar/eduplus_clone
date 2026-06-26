import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    seatNumber: string;
    role: 'student' | 'admin';
  };
}

export const protect = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  let token: string | undefined;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    res.status(401).json({
      status: 'error',
      message: 'Not authorized, token missing',
    });
    return;
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'your_super_secret_jwt_key_change_in_production'
    ) as { id: string; role: 'student' | 'admin' };

    // Fetch the user to ensure they still exist
    const user = await User.findById(decoded.id).select('seatNumber role');
    if (!user) {
      res.status(401).json({
        status: 'error',
        message: 'The user belonging to this token no longer exists',
      });
      return;
    }

    // Attach user to request
    req.user = {
      id: user._id.toString() as string,
      seatNumber: user.seatNumber,
      role: user.role,
    };

    next();
  } catch (error) {
    res.status(401).json({
      status: 'error',
      message: 'Not authorized, token invalid or expired',
    });
  }
};

export const restrictTo = (...roles: ('student' | 'admin')[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403).json({
        status: 'error',
        message: 'You do not have permission to perform this action',
      });
      return;
    }
    next();
  };
};
