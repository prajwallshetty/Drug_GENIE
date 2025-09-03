import mongoose, { Document, Model } from 'mongoose';

interface IReminder extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  medicineName: string;
  dosage: string;
  frequency: string;
  times: string[];
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  notes?: string;
}

interface IReminderModel extends Model<IReminder> {}

const reminderSchema = new mongoose.Schema<IReminder, IReminderModel>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  medicineName: { type: String, required: true },
  dosage: { type: String, required: true },
  frequency: { type: String, required: true },
  times: [{ type: String, required: true }],
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  isActive: { type: Boolean, default: true },
  notes: { type: String },
}, { timestamps: true });

const Reminder = mongoose.model<IReminder, IReminderModel>('Reminder', reminderSchema);
export default Reminder;