import { Router } from 'express';
import authRoutes from './auth.routes';
import gradeCardRoutes from './gradeCard.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/grade-cards', gradeCardRoutes);

export default router;
