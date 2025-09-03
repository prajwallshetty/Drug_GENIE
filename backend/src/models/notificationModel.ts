import mongoose, { Document, Model } from 'mongoose';

interface INotification extends Document {
  userId: mongoose.Schema.Types.ObjectId;
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
  createdAt: Date;
  updatedAt: Date;
}

interface INotificationModel extends Model<INotification> {}

const notificationSchema = new mongoose.Schema<INotification, INotificationModel>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  title: { type: String, required: true },
  message: { type: String, required: true },
  type: {
    type: String,
    enum: ['blood_request', 'reminder', 'system', 'health_alert'],
    required: true,
  },
  isRead: { type: Boolean, default: false },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium',
  },
  actionUrl: { type: String },
  metadata: {
    bloodGroup: String,
    medicationName: String,
    requestId: String,
  },
}, { timestamps: true });

const Notification = mongoose.model<INotification, INotificationModel>('Notification', notificationSchema);
export default Notification;
