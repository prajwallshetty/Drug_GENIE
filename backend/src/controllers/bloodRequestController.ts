import expressAsyncHandler from 'express-async-handler';
import BloodRequest from '../models/bloodRequestModel'; 
import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware'; 
import { createBloodRequestNotifications } from './notificationController';

// Get active blood requests
const getActiveBloodRequests = expressAsyncHandler(async (req: AuthRequest, res: Response) => {
  const requests = await BloodRequest.find({ status: 'active' }).sort({ createdAt: -1 });
  
  // Map MongoDB _id to id for frontend compatibility
  const mappedRequests = requests.map(request => ({
    id: request._id,
    requesterId: request.requesterId,
    requesterName: request.requesterName,
    bloodGroup: request.bloodGroup,
    urgency: request.urgency,
    location: request.location,
    contactNumber: request.contactNumber,
    hospitalName: request.hospitalName,
    unitsNeeded: request.unitsNeeded,
    createdAt: request.createdAt,
    status: request.status,
  }));
  
  res.json(mappedRequests);
});

// Create new blood request
const createBloodRequest = expressAsyncHandler(async (req: AuthRequest, res: Response) => {
  const { bloodGroup, urgency, location, contactNumber, hospitalName, unitsNeeded } = req.body;

  const bloodRequest = await BloodRequest.create({
    requesterId: req.user?._id,
    requesterName: req.user?.name,
    bloodGroup,
    urgency,
    location,
    contactNumber,
    hospitalName,
    unitsNeeded,
    status: 'active',
  });

  // Create notifications for compatible donors
  try {
    await createBloodRequestNotifications(
      bloodGroup,
      req.user?.name || 'Someone',
      location,
      urgency,
      bloodRequest._id.toString()
    );
  } catch (error) {
    console.error('Failed to create notifications:', error);
  }

  // Map response for frontend compatibility
  res.status(201).json({
    id: bloodRequest._id,
    requesterId: bloodRequest.requesterId,
    requesterName: bloodRequest.requesterName,
    bloodGroup: bloodRequest.bloodGroup,
    urgency: bloodRequest.urgency,
    location: bloodRequest.location,
    contactNumber: bloodRequest.contactNumber,
    hospitalName: bloodRequest.hospitalName,
    unitsNeeded: bloodRequest.unitsNeeded,
    createdAt: bloodRequest.createdAt,
    status: bloodRequest.status,
  });
});

export { getActiveBloodRequests, createBloodRequest };