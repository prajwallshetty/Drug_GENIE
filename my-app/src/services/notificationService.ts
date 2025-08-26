import { api } from './api';

export interface Notification {
  _id: string;
  title: string;
  message: string;
  type: 'blood_request' | 'reminder' | 'system' | 'health_alert';
  isRead: boolean;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  actionUrl?: string;
  metadata?: {
    bloodGroup?: string;
    medicationName?: string;
    requestId?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export const notificationService = {
  // Get user notifications
  getNotifications: async (): Promise<Notification[]> => {
    const response = await api.get('/api/notifications');
    return response.data;
  },

  // Get unread notification count
  getUnreadCount: async (): Promise<number> => {
    const response = await api.get('/api/notifications/unread-count');
    return response.data.count;
  },

  // Mark notification as read
  markAsRead: async (id: string): Promise<Notification> => {
    const response = await api.put(`/api/notifications/${id}/read`);
    return response.data;
  },

  // Mark all notifications as read
  markAllAsRead: async (): Promise<void> => {
    await api.put('/api/notifications/mark-all-read');
  },
};
