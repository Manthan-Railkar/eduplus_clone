import { Response, NextFunction } from 'express';
import { Types } from 'mongoose';
import { AuthenticatedRequest } from '../middleware/auth.middleware';
import { GradeCard } from '../models/gradeCard.model';

export const getMyGradeCards = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Only fetch gradecards belonging to the logged-in user
    const userId = req.user?.id;
    
    if (!userId) {
      res.status(401).json({
        status: 'error',
        message: 'You must be logged in to access this resource'
      });
      return;
    }

    const gradeCards = await GradeCard.find({ userId: new Types.ObjectId(userId) });

    res.status(200).json({
      status: 'success',
      results: gradeCards.length,
      data: {
        gradeCards
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getMyGradeCardBySemester = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { academicYear, semester } = req.query;

    if (!userId) {
      res.status(401).json({
        status: 'error',
        message: 'You must be logged in to access this resource'
      });
      return;
    }

    if (!academicYear || !semester) {
      res.status(400).json({
        status: 'error',
        message: 'Please provide both academicYear and semester query parameters'
      });
      return;
    }

    const gradeCard = await GradeCard.findOne({
      userId: new Types.ObjectId(userId),
      academicYear: academicYear as string,
      semester: semester as string
    });

    if (!gradeCard) {
      res.status(404).json({
        status: 'error',
        message: `No grade card found for academic year ${academicYear} and semester ${semester}`
      });
      return;
    }

    res.status(200).json({
      status: 'success',
      data: {
        gradeCard
      }
    });
  } catch (error) {
    next(error);
  }
};

// Admin only method to insert or seed grade card records
export const createGradeCard = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      userId,
      studentName,
      seatNumber,
      examination,
      programme,
      academicYear,
      semester,
      result,
      resultDeclaredOn,
      courses,
      totalCredits,
      sgpa,
      semesterPerformance,
      mtuSemesterPerformance,
      note
    } = req.body;

    const newGradeCard = await GradeCard.create({
      userId,
      studentName,
      seatNumber,
      examination,
      programme,
      academicYear,
      semester,
      result,
      resultDeclaredOn,
      courses,
      totalCredits,
      sgpa,
      semesterPerformance,
      mtuSemesterPerformance,
      note
    });

    res.status(201).json({
      status: 'success',
      data: {
        gradeCard: newGradeCard
      }
    });
  } catch (error) {
    next(error);
  }
};
