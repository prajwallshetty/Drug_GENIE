import express from 'express';
import { getReminders, createReminder, deleteReminder } from '../controllers/reminderController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/').get(protect, getReminders).post(protect, createReminder);
router.route('/:id').delete(protect, deleteReminder);

export default router;