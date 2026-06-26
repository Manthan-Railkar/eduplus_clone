// Mock grade card data matching the screenshot
export const GRADE_CARD_DATA = {
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

export const ACADEMIC_YEARS = [
  '2025-26',
  '2024-25',
  '2023-24',
  '2022-23'
];

export const SEMESTERS = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5', label: '5' },
  { value: '6', label: '6' },
  { value: '7', label: '7' },
  { value: '8', label: '8' }
];
