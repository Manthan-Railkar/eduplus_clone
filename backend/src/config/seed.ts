import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { User } from '../models/user.model';
import { GradeCard } from '../models/gradeCard.model';

// Load env variables
dotenv.config({ path: path.join(__dirname, '../../.env') });

const mockGradeCardData1 = {
  studentName: 'RAILKAR MANTHAN MERASE',
  examination: 'Jun 2026',
  seatNumber: '2025800102',
  programme: 'B.Tech. Computer Science And Engineering',
  academicYear: '2025-26',
  semester: '2',
  result: 'Successful',
  resultDeclaredOn: '10.07.2026',
  courses: [
    {
      srNo: 1,
      courseCode: 'MAT01',
      courseName: 'ENGINEERING CALCULUS',
      courseCredit: 4,
      grade: 'AA',
      creditEarned: 4,
      gradePoint: 10,
      cgp: 40
    },
    {
      srNo: 2,
      courseCode: 'CSE01',
      courseName: 'PROGRAMMING-I',
      courseCredit: 2,
      grade: 'AA',
      creditEarned: 2,
      gradePoint: 10,
      cgp: 20
    },
    {
      srNo: 3,
      courseCode: 'AEC07',
      courseName: 'SOFT SKILL-I',
      courseCredit: 2,
      grade: 'AA',
      creditEarned: 2,
      gradePoint: 10,
      cgp: 20
    },
    {
      srNo: 4,
      courseCode: 'BSC02',
      courseName: 'BASIC ELECTRICAL ENGINEERING',
      courseCredit: 4,
      grade: 'BB',
      creditEarned: 4,
      gradePoint: 8,
      cgp: 32
    },
    {
      srNo: 5,
      courseCode: 'AEC02',
      courseName: 'UNIVERSAL HUMAN VALUES',
      courseCredit: 1,
      grade: 'AA',
      creditEarned: 1,
      gradePoint: 6,
      cgp: 18
    },
    {
      srNo: 6,
      courseCode: 'AEC05',
      courseName: 'ENGINEERING GRAPHICS',
      courseCredit: 3,
      grade: 'AA',
      creditEarned: 3,
      gradePoint: 10,
      cgp: 15
    },
    {
      srNo: 7,
      courseCode: 'LLC01',
      courseName: 'LANDSCAPE SENSING',
      courseCredit: 1,
      grade: 'DD',
      creditEarned: 1,
      gradePoint: 0,
      cgp: 14
    }
  ],
  totalCredits: 22,
  sgpa: 9.12,
  semesterPerformance: {
    I: '9.12',
    II: '',
    III: '',
    IV: '',
    V: '',
    VI: '',
    VII: '',
    VIII: '',
    CGPA: '9.12'
  },
  mtuSemesterPerformance: {
    I: '',
    II: '',
    III: '',
    IV: '',
    V: '',
    VI: '',
    VII: '',
    VIII: '',
    CGPA: ''
  },
  note: 'Note : LLC core courses excluded from sgpa/cgpa calculation'
};

const mockGradeCardData2 = {
  studentName: 'JANE SMITH',
  examination: 'Jun 2026',
  seatNumber: '2025800103',
  programme: 'B.Tech. Computer Science And Engineering',
  academicYear: '2025-26',
  semester: '2',
  result: 'Successful',
  resultDeclaredOn: '10.07.2026',
  courses: [
    {
      srNo: 1,
      courseCode: 'MAT01',
      courseName: 'ENGINEERING CALCULUS',
      courseCredit: 4,
      grade: 'AB',
      creditEarned: 4,
      gradePoint: 9,
      cgp: 36
    },
    {
      srNo: 2,
      courseCode: 'CSE01',
      courseName: 'PROGRAMMING-I',
      courseCredit: 2,
      grade: 'AA',
      creditEarned: 2,
      gradePoint: 10,
      cgp: 20
    },
    {
      srNo: 3,
      courseCode: 'AEC07',
      courseName: 'SOFT SKILL-I',
      courseCredit: 2,
      grade: 'BB',
      creditEarned: 2,
      gradePoint: 8,
      cgp: 16
    },
    {
      srNo: 4,
      courseCode: 'BSC02',
      courseName: 'BASIC ELECTRICAL ENGINEERING',
      courseCredit: 4,
      grade: 'AA',
      creditEarned: 4,
      gradePoint: 10,
      cgp: 40
    },
    {
      srNo: 5,
      courseCode: 'AEC02',
      courseName: 'UNIVERSAL HUMAN VALUES',
      courseCredit: 1,
      grade: 'BC',
      creditEarned: 1,
      gradePoint: 7,
      cgp: 7
    },
    {
      srNo: 6,
      courseCode: 'AEC05',
      courseName: 'ENGINEERING GRAPHICS',
      courseCredit: 3,
      grade: 'AB',
      creditEarned: 3,
      gradePoint: 9,
      cgp: 27
    },
    {
      srNo: 7,
      courseCode: 'LLC01',
      courseName: 'LANDSCAPE SENSING',
      courseCredit: 1,
      grade: 'CC',
      creditEarned: 1,
      gradePoint: 5,
      cgp: 5
    }
  ],
  totalCredits: 22,
  sgpa: 8.85,
  semesterPerformance: {
    I: '8.85',
    II: '',
    III: '',
    IV: '',
    V: '',
    VI: '',
    VII: '',
    VIII: '',
    CGPA: '8.85'
  },
  mtuSemesterPerformance: {
    I: '',
    II: '',
    III: '',
    IV: '',
    V: '',
    VI: '',
    VII: '',
    VIII: '',
    CGPA: ''
  },
  note: 'Note : LLC core courses excluded from sgpa/cgpa calculation'
};

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/eduplus_clone';
    console.log(`Connecting to database to seed: ${mongoUri}`);
    await mongoose.connect(mongoUri);

    // Clear existing collections
    console.log('Clearing existing users and grade cards...');
    await User.deleteMany({});
    await GradeCard.deleteMany({});

    // 1. Create Student User 1
    console.log('Seeding student user 1...');
    const studentUser1 = await User.create({
      seatNumber: '2025800102',
      studentName: 'RAILKAR MANTHAN MERASE',
      email: 'manthan.railkar@spt.edu',
      password: 'password123', // Will be hashed by pre-save hook
      programme: 'B.Tech. Computer Science And Engineering',
      role: 'student'
    });
    console.log(`Created Student 1: ${studentUser1.studentName} (Seat No: ${studentUser1.seatNumber})`);

    // 2. Create Student User 2
    console.log('Seeding student user 2...');
    const studentUser2 = await User.create({
      seatNumber: '2025800103',
      studentName: 'JANE SMITH',
      email: 'jane.smith@spt.edu',
      password: 'password123', // Will be hashed by pre-save hook
      programme: 'B.Tech. Computer Science And Engineering',
      role: 'student'
    });
    console.log(`Created Student 2: ${studentUser2.studentName} (Seat No: ${studentUser2.seatNumber})`);

    // 3. Create Admin User
    console.log('Seeding admin user...');
    const adminUser = await User.create({
      seatNumber: 'admin',
      studentName: 'EduPlus Administrator',
      email: 'admin@spt.edu',
      password: 'adminpassword123',
      programme: 'Administration Office',
      role: 'admin'
    });
    console.log(`Created Admin: ${adminUser.studentName}`);

    // 4. Create Student 1 Grade Card
    console.log('Seeding student 1 grade card...');
    const student1GradeCard = await GradeCard.create({
      userId: studentUser1._id,
      studentName: mockGradeCardData1.studentName,
      seatNumber: mockGradeCardData1.seatNumber,
      examination: mockGradeCardData1.examination,
      programme: mockGradeCardData1.programme,
      academicYear: mockGradeCardData1.academicYear,
      semester: mockGradeCardData1.semester,
      result: mockGradeCardData1.result,
      resultDeclaredOn: mockGradeCardData1.resultDeclaredOn,
      courses: mockGradeCardData1.courses,
      totalCredits: mockGradeCardData1.totalCredits,
      sgpa: mockGradeCardData1.sgpa,
      semesterPerformance: mockGradeCardData1.semesterPerformance,
      mtuSemesterPerformance: mockGradeCardData1.mtuSemesterPerformance,
      note: mockGradeCardData1.note
    });
    console.log(`Created Grade Card for: ${student1GradeCard.studentName} (Sem ${student1GradeCard.semester})`);

    // 5. Create Student 2 Grade Card
    console.log('Seeding student 2 grade card...');
    const student2GradeCard = await GradeCard.create({
      userId: studentUser2._id,
      studentName: mockGradeCardData2.studentName,
      seatNumber: mockGradeCardData2.seatNumber,
      examination: mockGradeCardData2.examination,
      programme: mockGradeCardData2.programme,
      academicYear: mockGradeCardData2.academicYear,
      semester: mockGradeCardData2.semester,
      result: mockGradeCardData2.result,
      resultDeclaredOn: mockGradeCardData2.resultDeclaredOn,
      courses: mockGradeCardData2.courses,
      totalCredits: mockGradeCardData2.totalCredits,
      sgpa: mockGradeCardData2.sgpa,
      semesterPerformance: mockGradeCardData2.semesterPerformance,
      mtuSemesterPerformance: mockGradeCardData2.mtuSemesterPerformance,
      note: mockGradeCardData2.note
    });
    console.log(`Created Grade Card for: ${student2GradeCard.studentName} (Sem ${student2GradeCard.semester})`);

    console.log('Seeding process completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed with error:', error);
    process.exit(1);
  }
};

seedDatabase();
