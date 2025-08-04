import { Router } from 'express';
import petRoutes from './petRoutes.js';
import storeRoutes from './storeRoutes.js';
import userRoutes from './userRoutes.js';

const router = Router();

router.use('/api/v3', petRoutes);
router.use('/api/v3', storeRoutes);
router.use('/api/v3', userRoutes);

export default router;