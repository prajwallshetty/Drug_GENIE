import express from 'express';
import { getActiveBloodRequests, createBloodRequest, cancelBloodRequest } from '../controllers/bloodRequestController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/')
  .get(protect, getActiveBloodRequests)
  .post(protect, createBloodRequest);

router.route('/:id/cancel')
  .put(protect, cancelBloodRequest);

export default router;