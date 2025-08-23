// backend/src/controllers/bloodRequestController.ts (CORRECTED)
import expressAsyncHandler from 'express-async-handler';
import BloodRequest from '../models/bloodRequestModel';
import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';

// @desc    Get all active blood requests
// @route   GET /api/blood-requests
// @access  Private
const getActiveBloodRequests = expressAsyncHandler(async (req: AuthRequest, res: Response) => {
  const requests = await BloodRequest.find({ status: 'active' }).sort({ createdAt: -1 });
  res.json(requests);
});

// @desc    Create a new blood request
// @route   POST /api/blood-requests
// @access  Private
const createBloodRequest = expressAsyncHandler(async (req: AuthRequest, res: Response) => {
  const { bloodGroup, unitsNeeded, urgency, hospitalName, location, contactNumber } = req.body;
  
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  const request = new BloodRequest({
    user: req.user._id,
    requesterName: req.user.name,
    bloodGroup, 
    unitsNeeded, 
    urgency, 
    hospitalName, 
    location, 
    contactNumber
  });

  const createdRequest = await request.save();
  res.status(201).json(createdRequest);
});

// Make sure both functions are exported correctly
export { getActiveBloodRequests, createBloodRequest };