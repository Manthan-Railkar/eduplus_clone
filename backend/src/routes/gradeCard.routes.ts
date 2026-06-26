import { Router } from 'express';
import { protect, restrictTo } from '../middleware/auth.middleware';
import {
  getMyGradeCards,
  getMyGradeCardBySemester,
  createGradeCard
} from '../controllers/gradeCard.controller';

const router = Router();

// Protect all routes under this namespace
router.use(protect);

router.get('/my-cards', getMyGradeCards);
router.get('/my-card', getMyGradeCardBySemester);

// Admin-only operations (e.g. creating/seeding data)
router.post('/', restrictTo('admin'), createGradeCard);

export default router;
