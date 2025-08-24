import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
import reminderRoutes from './routes/reminderRoutes';
import bloodRequestRoutes from './routes/bloodRequestRoutes';
// Correct the import path for the error middleware
import { notFound, errorHandler } from './middleware/errorMiddleware';

dotenv.config();
connectDB();

const app = express();
// (The rest of the file remains the same)
// ...