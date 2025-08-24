import expressAsyncHandler from 'express-async-handler';
import Reminder from '../models/reminderModel';
import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware'; // Import the custom request type

const getReminders = expressAsyncHandler(async (req: AuthRequest, res: Response) => {
  // Use req.user._id, which is now correctly typed
  const reminders = await Reminder.find({ user: req.user?._id }).sort({ createdAt: -1 });
  res.json(reminders);
});

// (Other functions like createReminder, deleteReminder remain the same,
// but ensure they also use AuthRequest if they access req.user)
// ...

export { getReminders, createReminder, deleteReminder };