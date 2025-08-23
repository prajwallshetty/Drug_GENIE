import expressAsyncHandler from 'express-async-handler';
import Reminder from '../models/reminderModel';
import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';

const getReminders = expressAsyncHandler(async (req: AuthRequest, res: Response) => {
  const reminders = await Reminder.find({ user: req.user._id });
  res.json(reminders);
});

const createReminder = expressAsyncHandler(async (req: AuthRequest, res: Response) => {
  const { medicineName, dosage, frequency, times, startDate, endDate, notes } = req.body;
  const reminder = new Reminder({
    user: req.user._id,
    medicineName, dosage, frequency, times, startDate, endDate, notes,
  });
  const createdReminder = await reminder.save();
  res.status(201).json(createdReminder);
});

const deleteReminder = expressAsyncHandler(async (req: AuthRequest, res: Response) => {
  const reminder = await Reminder.findById(req.params.id);
  if (reminder && reminder.user.toString() === req.user._id.toString()) {
    await reminder.deleteOne();
    res.json({ message: 'Reminder removed' });
  } else {
    res.status(404);
    throw new Error('Reminder not found or user not authorized');
  }
});

export { getReminders, createReminder, deleteReminder };