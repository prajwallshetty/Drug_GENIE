import expressAsyncHandler from 'express-async-handler';
import BloodRequest from '../models/bloodRequestModel'; 
import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware'; 
import { createBloodRequestNotifications, createBloodRequestCancellationNotifications } from './notificationController';

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
    console.log('Creating notifications for blood request:', {
      bloodGroup,
      requesterName: req.user?.name,
      location,
      urgency,
      requestId: (bloodRequest._id as any).toString(),
      requesterId: (req.user?._id as any).toString()
    });
    
    const notificationCount = await createBloodRequestNotifications(
      bloodGroup,
      req.user?.name || 'Someone',
      location,
      urgency,
      (bloodRequest._id as any).toString(),
      (req.user?._id as any).toString()
    );
    
    console.log(`Created ${notificationCount} notifications for blood request`);
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

// Cancel blood request (only by requester)
const cancelBloodRequest = expressAsyncHandler(async (req: AuthRequest, res: Response) => {
  const { id } = req.params;

  const bloodRequest = await BloodRequest.findById(id);

  if (!bloodRequest) {
    res.status(404);
    throw new Error('Blood request not found');
  }

  // Check if the user is the requester
  if (bloodRequest.requesterId.toString() !== (req.user?._id as any).toString()) {
    res.status(403);
    throw new Error('You can only cancel your own blood requests');
  }

  // Check if request is already cancelled or fulfilled
  if (bloodRequest.status !== 'active') {
    res.status(400);
    throw new Error('Blood request is already cancelled or fulfilled');
  }

  // Update status to cancelled
  bloodRequest.status = 'cancelled';
  await bloodRequest.save();

  // Create cancellation notifications for users who were notified
  try {
    await createBloodRequestCancellationNotifications(
      bloodRequest.bloodGroup,
      req.user?.name || 'Someone',
      bloodRequest.location,
      id,
      (req.user?._id as any).toString()
    );
  } catch (error) {
    console.error('Failed to create cancellation notifications:', error);
  }

  // Map response for frontend compatibility
  res.json({
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

export { getActiveBloodRequests, createBloodRequest, cancelBloodRequest };