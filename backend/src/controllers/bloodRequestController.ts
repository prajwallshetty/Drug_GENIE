import express from 'express';
import { getActiveBloodRequests, createBloodRequest } from '../controllers/bloodRequestController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/').get(protect, getActiveBloodRequests).post(protect, createBloodRequest);

export default router;