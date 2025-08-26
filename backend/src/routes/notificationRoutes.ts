import express from 'express';
import { 
  getUserNotifications, 
  getUnreadCount, 
  markAsRead, 
  markAllAsRead,
  createTestNotification
} from '../controllers/notificationController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

// All routes are protected
router.use(protect);

// GET /api/notifications - Get user notifications
router.get('/', getUserNotifications);

// GET /api/notifications/unread-count - Get unread count
router.get('/unread-count', getUnreadCount);

// POST /api/notifications/test - Create test notification
router.post('/test', createTestNotification);

// PUT /api/notifications/:id/read - Mark notification as read
router.put('/:id/read', markAsRead);

// PUT /api/notifications/mark-all-read - Mark all as read
router.put('/mark-all-read', markAllAsRead);

export default router;
