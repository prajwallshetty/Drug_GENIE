import express from 'express';
import { 
  getUserNotifications, 
  getUnreadCount, 
  markAsRead, 
  markAllAsRead,
  clearAllNotifications,
  createTestNotification 
} from '../controllers/notificationController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/')
  .get(protect, getUserNotifications);

router.route('/unread-count')
  .get(protect, getUnreadCount);

router.route('/mark-all-read')
  .put(protect, markAllAsRead);

router.route('/clear-all')
  .delete(protect, clearAllNotifications);

router.route('/test')
  .post(protect, createTestNotification);

router.route('/:id/read')
  .put(protect, markAsRead);

export default router;
