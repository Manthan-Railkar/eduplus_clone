import { Schema, model, Document, Types } from 'mongoose';

export interface ICourse {
  srNo: number;
  courseCode: string;
  courseName: string;
  courseCredit: number;
  grade: string;
  creditEarned: number;
  gradePoint: number;
  cgp: number;
}

export interface IGradeCard extends Document {
  userId: Types.ObjectId;
  studentName: string;
  seatNumber: string;
  examination: string;
  programme: string;
  academicYear: string;
  semester: string;
  result: string;
  resultDeclaredOn: string;
  courses: ICourse[];
  totalCredits: number;
  sgpa: number;
  semesterPerformance: Map<string, string>;
  mtuSemesterPerformance: Map<string, string>;
  note?: string;
  createdAt: Date;
  updatedAt: Date;
}

const CourseSchema = new Schema<ICourse>({
  srNo: { type: Number, required: true },
  courseCode: { type: String, required: true, trim: true },
  courseName: { type: String, required: true, trim: true },
  courseCredit: { type: Number, required: true },
  grade: { type: String, required: true, trim: true },
  creditEarned: { type: Number, required: true },
  gradePoint: { type: Number, required: true },
  cgp: { type: Number, required: true }
});

const GradeCardSchema = new Schema<IGradeCard>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User reference is required']
    },
    studentName: {
      type: String,
      required: [true, 'Student Name is required'],
      trim: true
    },
    seatNumber: {
      type: String,
      required: [true, 'Seat Number is required'],
      trim: true
    },
    examination: {
      type: String,
      required: [true, 'Examination period is required'], // e.g. "Jun 2026"
      trim: true
    },
    programme: {
      type: String,
      required: [true, 'Programme is required'],
      trim: true
    },
    academicYear: {
      type: String,
      required: [true, 'Academic Year is required'], // e.g. "2025-26"
      trim: true
    },
    semester: {
      type: String,
      required: [true, 'Semester is required'], // e.g. "2"
      trim: true
    },
    result: {
      type: String,
      required: [true, 'Result status is required'], // e.g. "Successful"
      trim: true
    },
    resultDeclaredOn: {
      type: String,
      required: [true, 'Result declared date is required'], // e.g. "10.07.2026"
      trim: true
    },
    courses: [CourseSchema],
    totalCredits: {
      type: Number,
      required: true
    },
    sgpa: {
      type: Number,
      required: true
    },
    semesterPerformance: {
      type: Map,
      of: String,
      required: true
    },
    mtuSemesterPerformance: {
      type: Map,
      of: String,
      required: true
    },
    note: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

// Indexes for fast querying and constraint enforcement
// 1. Single index for fetching gradecards of a user
GradeCardSchema.index({ userId: 1 });
// 2. Compound index to ensure a student only has one gradecard per academic year and semester
GradeCardSchema.index({ seatNumber: 1, academicYear: 1, semester: 1 }, { unique: true });

export const GradeCard = model<IGradeCard>('GradeCard', GradeCardSchema);
export default GradeCard;
