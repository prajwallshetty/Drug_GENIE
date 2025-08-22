// backend/src/routes/bloodRequestRoutes.ts (CORRECTED)
import express from 'express';
// Corrected import to use named imports
import { getActiveBloodRequests, createBloodRequest } from '../controllers/bloodRequestController'; 
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/').get(protect, getActiveBloodRequests).post(protect, createBloodRequest);

export default router;