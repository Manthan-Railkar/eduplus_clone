import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model';

const signToken = (id: string, role: string): string => {
  return jwt.sign(
    { id, role },
    process.env.JWT_SECRET || 'your_super_secret_jwt_key_change_in_production',
    {
      expiresIn: (process.env.JWT_EXPIRES_IN || '7d') as any,
    }
  );
};

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { seatNumber, studentName, email, password, programme } = req.body;

    const existingUser = await User.findOne({ $or: [{ email }, { seatNumber }] });
    if (existingUser) {
      res.status(400).json({
        status: 'error',
        message: 'A student with this Email or Seat Number already exists',
      });
      return;
    }

    const newUser = await User.create({
      seatNumber,
      studentName,
      email,
      password,
      programme,
      role: 'student',
    });

    const token = signToken(newUser._id.toString() as string, newUser.role);

    res.status(201).json({
      status: 'success',
      token,
      data: {
        user: {
          id: newUser._id,
          studentName: newUser.studentName,
          seatNumber: newUser.seatNumber,
          email: newUser.email,
          programme: newUser.programme,
          role: newUser.role,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { seatNumber, password } = req.body;

    if (!seatNumber || !password) {
      res.status(400).json({
        status: 'error',
        message: 'Please provide both seat number and password',
      });
      return;
    }

    const user = await User.findOne({ seatNumber }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      res.status(401).json({
        status: 'error',
        message: 'Incorrect seat number or password',
      });
      return;
    }

    const token = signToken(user._id.toString() as string, user.role);

    res.status(200).json({
      status: 'success',
      token,
      data: {
        user: {
          id: user._id,
          studentName: user.studentName,
          seatNumber: user.seatNumber,
          email: user.email,
          programme: user.programme,
          role: user.role,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};
