import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
import reminderRoutes from './routes/reminderRoutes';
import bloodRequestRoutes from './routes/bloodRequestRoutes';

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/reminders', reminderRoutes);
app.use('/api/blood-requests', bloodRequestRoutes);

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`Backend server running on port ${PORT}`));