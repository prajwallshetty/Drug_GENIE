import expressAsyncHandler from 'express-async-handler';
import Notification from '../models/notificationModel';
import User from '../models/userModel';
import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';

// Get user notifications
const getUserNotifications = expressAsyncHandler(async (req: AuthRequest, res: Response) => {
  const notifications = await Notification.find({ userId: req.user?._id })
    .sort({ createdAt: -1 })
    .limit(50);

  res.json(notifications);
});

// Get unread notification count
const getUnreadCount = expressAsyncHandler(async (req: AuthRequest, res: Response) => {
  const count = await Notification.countDocuments({ 
    userId: req.user?._id, 
    isRead: false 
  });

  res.json({ count });
});

// Mark notification as read
const markAsRead = expressAsyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  const notification = await Notification.findOneAndUpdate(
    { _id: id, userId: req.user?._id },
    { isRead: true },
    { new: true }
  );

  if (!notification) {
    res.status(404);
    throw new Error('Notification not found');
  }

  res.json(notification);
});

// Mark all notifications as read
const markAllAsRead = expressAsyncHandler(async (req: AuthRequest, res: Response) => {
  await Notification.updateMany(
    { userId: req.user?._id, isRead: false },
    { isRead: true }
  );

  res.json({ message: 'All notifications marked as read' });
});

// Create notification (for system use)
const createNotification = async (
  userId: string,
  title: string,
  message: string,
  type: 'blood_request' | 'reminder' | 'system' | 'health_alert',
  priority: 'low' | 'medium' | 'high' | 'urgent' = 'medium',
  actionUrl?: string,
  metadata?: any
) => {
  return await Notification.create({
    userId,
    title,
    message,
    type,
    priority,
    actionUrl,
    metadata,
  });
};

// Create blood request notifications for compatible donors
const createBloodRequestNotifications = async (
  bloodGroup: string,
  requesterName: string,
  location: string,
  urgency: string,
  requestId: string
) => {
  // Blood compatibility mapping
  const compatibility: { [key: string]: string[] } = {
    'A+': ['A+', 'A-', 'O+', 'O-'],
    'A-': ['A-', 'O-'],
    'B+': ['B+', 'B-', 'O+', 'O-'],
    'B-': ['B-', 'O-'],
    'AB+': ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    'AB-': ['A-', 'B-', 'AB-', 'O-'],
    'O+': ['O+', 'O-'],
    'O-': ['O-']
  };

  const compatibleDonorGroups = compatibility[bloodGroup] || [];
  
  // Find users with compatible blood groups
  const compatibleUsers = await User.find({
    bloodGroup: { $in: compatibleDonorGroups }
  });

  // Create notifications for each compatible user
  const notifications = compatibleUsers.map(user => 
    createNotification(
      (user._id as any).toString(),
      `🩸 Blood Donation Request - ${bloodGroup}`,
      `${requesterName} needs ${bloodGroup} blood in ${location}. You can help save a life!`,
      'blood_request',
      urgency as any,
      '/blood-bank',
      { bloodGroup, requestId }
    )
  );

  await Promise.all(notifications);
  return notifications.length;
};

// Create blood request cancellation notifications for compatible donors
const createBloodRequestCancellationNotifications = async (
  bloodGroup: string,
  requesterName: string,
  location: string,
  requestId: string
) => {
  // Blood compatibility mapping
  const compatibility: { [key: string]: string[] } = {
    'A+': ['A+', 'A-', 'O+', 'O-'],
    'A-': ['A-', 'O-'],
    'B+': ['B+', 'B-', 'O+', 'O-'],
    'B-': ['B-', 'O-'],
    'AB+': ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
    'AB-': ['A-', 'B-', 'AB-', 'O-'],
    'O+': ['O+', 'O-'],
    'O-': ['O-']
  };

  const compatibleDonorGroups = compatibility[bloodGroup] || [];
  
  // Find users with compatible blood groups
  const compatibleUsers = await User.find({
    bloodGroup: { $in: compatibleDonorGroups }
  });

  // Create cancellation notifications for each compatible user
  const notifications = compatibleUsers.map(user => 
    createNotification(
      (user._id as any).toString(),
      `❌ Blood Request Cancelled - ${bloodGroup}`,
      `${requesterName}'s blood request for ${bloodGroup} blood in ${location} has been cancelled.`,
      'blood_request',
      'medium',
      '/blood-bank',
      { bloodGroup, requestId, cancelled: true }
    )
  );

  await Promise.all(notifications);
  return notifications.length;
};

// Create test notification (for debugging)
const createTestNotification = expressAsyncHandler(async (req: AuthRequest, res: Response) => {
  const testNotification = await Notification.create({
    userId: req.user?._id as string,
    title: '🧪 Test Notification',
    message: 'This is a test notification to verify the system is working correctly.',
    type: 'system',
    priority: 'medium',
    actionUrl: '/dashboard',
  });

  res.status(201).json(testNotification);
});

export { 
  getUserNotifications, 
  getUnreadCount, 
  markAsRead, 
  markAllAsRead, 
  createNotification,
  createBloodRequestNotifications,
  createBloodRequestCancellationNotifications,
  createTestNotification
};
